import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ExplosionProps {
    position?: [number, number, number];
    color?: string;
}

export const Explosion = ({ position = [0, 0, 0], color = '#4ade80' }: ExplosionProps = {}) => {
    const count = 80;
    const meshRef = useRef<THREE.Points>(null!);
    const startTimeRef = useRef(Date.now());

    const [positions, velocities] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const vel = new Float32Array(count * 3);
        
        for (let i = 0; i < count; i++) {
            // Random spherical distribution
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            const speed = 0.1 + Math.random() * 0.2;

            vel[i * 3] = Math.sin(phi) * Math.cos(theta) * speed;
            vel[i * 3 + 1] = Math.cos(phi) * speed;
            vel[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * speed;
        }
        return [pos, vel];
    }, []);

    useFrame(() => {
        if (!meshRef.current) return;

        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        
        // Fade out after 1 second
        if (elapsed > 1) {
            meshRef.current.visible = false;
            return;
        }

        const array = meshRef.current.geometry.attributes.position.array as Float32Array;
        
        for (let i = 0; i < count; i++) {
            // Update positions with velocity
            array[i * 3] += velocities[i * 3];
            array[i * 3 + 1] += velocities[i * 3 + 1];
            array[i * 3 + 2] += velocities[i * 3 + 2];

            // Apply gravity-like effect
            velocities[i * 3 + 1] -= 0.005;
        }

        meshRef.current.geometry.attributes.position.needsUpdate = true;

        // Fade out the material
        const material = meshRef.current.material as THREE.PointsMaterial;
        material.opacity = Math.max(0, 1 - elapsed);
    });

    const posArray = position as [number, number, number];

    return (
        <points ref={meshRef} position={posArray}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={positions}
                    count={count}
                    itemSize={3}
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                color={color}
                transparent
                opacity={1}
                sizeAttenuation={true}
            />
        </points>
    );
};
