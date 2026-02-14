import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Nebula = () => {
    const meshRef = useRef<THREE.Mesh>(null!);
    const groupRef = useRef<THREE.Group>(null!);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.0001;
            meshRef.current.rotation.y += 0.0002;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Primary Nebula Cloud */}
            <mesh ref={meshRef} scale={[60, 60, 60]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial
                    color="#8b5cf6"
                    transparent
                    opacity={0.08}
                    fog={false}
                />
            </mesh>

            {/* Secondary Nebula Cloud */}
            <mesh position={[30, -20, -40]} scale={[50, 50, 50]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial
                    color="#0ea5e9"
                    transparent
                    opacity={0.06}
                    fog={false}
                />
            </mesh>

            {/* Tertiary Nebula Cloud */}
            <mesh position={[-40, 30, 20]} scale={[45, 45, 45]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial
                    color="#ec4899"
                    transparent
                    opacity={0.05}
                    fog={false}
                />
            </mesh>
        </group>
    );
};
