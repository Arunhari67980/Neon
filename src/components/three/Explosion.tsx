import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Explosion = ({ position, color }: { position: [number, number, number], color: string }) => {
    const count = 50;
    const meshRef = useRef<THREE.Points>(null!);

    const [positions, velocities] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const vel = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            vel[i * 3] = (Math.random() - 0.5) * 0.1;
            vel[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
            vel[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
        }
        return [pos, vel];
    }, []);

    useFrame(() => {
        if (!meshRef.current) return;
        const array = meshRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < count; i++) {
            array[i * 3] += velocities[i * 3];
            array[i * 3 + 1] += velocities[i * 3 + 1];
            array[i * 3 + 2] += velocities[i * 3 + 2];
        }
        meshRef.current.geometry.attributes.position.needsUpdate = true;
        (meshRef.current.material as THREE.PointsMaterial).opacity *= 0.95;
    });

    return (
        <points ref={meshRef} position={position}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial size={0.05} color={color} transparent />
        </points>
    );
};
