import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { type Category, useStore } from '../../store/useStore';
import { OrbitingTask } from './OrbitingTask';

interface PlanetProps {
    category: Category;
}

export const Planet = ({ category }: PlanetProps) => {
    const meshRef = useRef<THREE.Mesh>(null!);
    const groupRef = useRef<THREE.Group>(null!);
    const { tasks, setActivePlanetId } = useStore();

    const categoryTasks = tasks.filter(t => t.category_id === category.id);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Rotate the planet itself
        meshRef.current.rotation.y += 0.01;

        // Orbital motion for the whole group
        const angle = time * category.rotation_speed;
        groupRef.current.position.x = Math.cos(angle) * category.orbit_radius;
        groupRef.current.position.z = Math.sin(angle) * category.orbit_radius;
    });

    return (
        <group ref={groupRef}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Sphere
                    ref={meshRef}
                    args={[1.2, 64, 64]}
                    onClick={() => setActivePlanetId(category.id)}
                >
                    <MeshDistortMaterial
                        color={category.color}
                        speed={2}
                        distort={0.3}
                        roughness={0}
                        metalness={0.8}
                        emissive={category.color}
                        emissiveIntensity={0.5}
                    />
                </Sphere>

                <Text
                    position={[0, 2, 0]}
                    fontSize={0.5}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/Geist-Bold.ttf" // Placeholder or systemic font
                >
                    {category.name}
                </Text>
            </Float>

            {/* Orbit path visualization */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <ringGeometry args={[category.orbit_radius - 0.02, category.orbit_radius + 0.02, 64]} />
                <meshBasicMaterial color="white" transparent opacity={0.1} side={THREE.DoubleSide} />
            </mesh>

            {/* Orbiting Tasks */}
            {categoryTasks.map((task, index) => (
                <OrbitingTask
                    key={task.id}
                    task={task}
                    index={index}
                    total={categoryTasks.length}
                />
            ))}
        </group>
    );
};
