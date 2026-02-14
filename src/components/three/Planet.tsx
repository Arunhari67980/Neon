import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { type Category, useStore } from '../../store/useStore';
import { OrbitingTask } from './OrbitingTask.tsx';

interface PlanetProps {
    category: Category;
}

export const Planet = ({ category }: PlanetProps) => {
    const meshRef = useRef<THREE.Mesh>(null!);
    const atmosphereRef = useRef<THREE.Mesh>(null!);
    const groupRef = useRef<THREE.Group>(null!);
    const ringsRef = useRef<THREE.Mesh>(null!);
    const { tasks, setActivePlanetId } = useStore();

    const categoryTasks = tasks.filter(t => t.category_id === category.id);
    const completedTasks = categoryTasks.filter(t => t.completed).length;
    const progressPercent = categoryTasks.length > 0 ? (completedTasks / categoryTasks.length) * 100 : 0;

    // Planet-specific details
    const planetDetails = useMemo(() => {
        const details: Record<string, any> = {
            '1': { hasRings: true, moonCount: 2, distortion: 0.3 },
            '2': { hasRings: false, moonCount: 1, distortion: 0.2 },
            '3': { hasRings: true, moonCount: 3, distortion: 0.25 },
            '4': { hasRings: false, moonCount: 0, distortion: 0.35 },
            '5': { hasRings: true, moonCount: 1, distortion: 0.15 },
            '6': { hasRings: false, moonCount: 2, distortion: 0.28 },
        };
        return details[category.id] || { hasRings: false, moonCount: 0, distortion: 0.25 };
    }, [category.id]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Rotate the planet itself with slight wobble
        meshRef.current.rotation.y += 0.009;
        meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;

        // Rotate atmosphere faster
        if (atmosphereRef.current) {
            atmosphereRef.current.rotation.y -= 0.005;
        }

        // Rotate rings
        if (ringsRef.current && planetDetails.hasRings) {
            ringsRef.current.rotation.z = Math.sin(time * 0.5) * 0.3;
        }

        // Orbital motion for the whole group
        const angle = time * category.rotation_speed;
        groupRef.current.position.x = Math.cos(angle) * category.orbit_radius;
        groupRef.current.position.z = Math.sin(angle) * category.orbit_radius;
    });

    return (
        <group ref={groupRef}>
            <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
                {/* Main Planet */}
                <Sphere
                    ref={meshRef}
                    args={[1.2, 128, 128]}
                    onClick={() => setActivePlanetId(category.id)}
                >
                    <MeshDistortMaterial
                        color={category.color}
                        speed={2}
                        distort={planetDetails.distortion}
                        roughness={0.3}
                        metalness={0.6}
                        emissive={category.color}
                        emissiveIntensity={0.6}
                    />
                </Sphere>

                {/* Atmosphere Glow */}
                <Sphere ref={atmosphereRef} args={[1.3, 64, 64]}>
                    <meshBasicMaterial
                        color={category.color}
                        transparent
                        opacity={0.1}
                        fog={false}
                    />
                </Sphere>

                {/* Planetary Rings */}
                {planetDetails.hasRings && (
                    <mesh ref={ringsRef} rotation={[0.4, 0, 0]}>
                        <ringGeometry args={[1.6, 2.2, 64]} />
                        <meshBasicMaterial
                            color={category.color}
                            transparent
                            opacity={0.4}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                )}

                {/* Moons */}
                {Array.from({ length: planetDetails.moonCount }).map((_, i) => (
                    <Moon
                        key={`moon-${i}`}
                        index={i}
                        total={planetDetails.moonCount}
                        color={category.color}
                    />
                ))}

                {/* Label */}
                <Text
                    position={[0, 2.2, 0]}
                    fontSize={0.4}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    {category.name}
                </Text>

                {/* Progress Bar (subtle) */}
                <mesh position={[0, -1.8, 0]}>
                    <planeGeometry args={[2.4, 0.1]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
                </mesh>
                <mesh position={[-1.2 + (progressPercent / 100) * 2.4, -1.8, 0.01]}>
                    <planeGeometry args={[(progressPercent / 100) * 2.4, 0.1]} />
                    <meshBasicMaterial color={category.color} transparent opacity={0.6} />
                </mesh>
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

const Moon = ({ index, total, color }: { index: number; total: number; color: string }) => {
    const moonRef = useRef<THREE.Mesh>(null!);
    const moonOrbitRadius = 2;

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const angleOffset = (index / total) * Math.PI * 2;
        const angle = time * (0.5 + index * 0.1) + angleOffset;

        moonRef.current.position.x = Math.cos(angle) * moonOrbitRadius;
        moonRef.current.position.y = Math.sin(angle * 0.3) * 0.3;
        moonRef.current.position.z = Math.sin(angle) * moonOrbitRadius;
        moonRef.current.rotation.y += 0.03;
    });

    return (
        <Sphere ref={moonRef} args={[0.15, 32, 32]}>
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.3}
                roughness={0.5}
            />
        </Sphere>
    );
};
