import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Html } from '@react-three/drei';
import * as THREE from 'three';
import { type Task, useStore } from '../../store/useStore';

interface OrbitingTaskProps {
    task: Task;
    index: number;
    total: number;
}

export const OrbitingTask = ({ task, index, total }: OrbitingTaskProps) => {
    const meshRef = useRef<THREE.Mesh>(null!);
    const { updateTask } = useStore();

    // Tasks orbit their planet
    const taskOrbitRadius = 2.5;
    const taskOrbitSpeed = 0.8;

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const angleOffset = (index / total) * Math.PI * 2;
        const angle = time * taskOrbitSpeed + angleOffset;

        meshRef.current.position.x = Math.cos(angle) * taskOrbitRadius;
        meshRef.current.position.z = Math.sin(angle) * taskOrbitRadius;
        meshRef.current.position.y = Math.sin(time * 2 + index) * 0.2; // Bobbing

        meshRef.current.rotation.y += 0.02;
    });

    const handleComplete = (e: any) => {
        if (e.stopPropagation) e.stopPropagation();
        // Implementation for explosion animation would go here
        updateTask(task.id, { completed: !task.completed });
    };

    return (
        <group>
            <Sphere
                ref={meshRef}
                args={[0.2, 32, 32]}
                onClick={handleComplete}
            >
                <MeshDistortMaterial
                    color={task.completed ? "#4ade80" : "#ffffff"}
                    speed={4}
                    distort={0.4}
                    emissive={task.completed ? "#4ade80" : "#ffffff"}
                    emissiveIntensity={task.completed ? 1 : 0.2}
                />

                <Html distanceFactor={10}>
                    <div className={`
            pointer-events-none select-none px-2 py-1 rounded-lg text-[8px] whitespace-nowrap
            border transition-all duration-500
            ${task.completed ? 'bg-green-500/20 border-green-500 text-green-300' : 'bg-white/10 border-white/20 text-white'}
          `}>
                        {task.title}
                    </div>
                </Html>
            </Sphere>

            {/* Small mini-orbit path for the task */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[taskOrbitRadius - 0.01, taskOrbitRadius + 0.01, 64]} />
                <meshBasicMaterial color="white" transparent opacity={0.05} />
            </mesh>
        </group>
    );
};
