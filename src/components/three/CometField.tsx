import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const CometField = () => {
    const groupRef = useRef<THREE.Group>(null!);

    // Create comet trails
    const comets = useMemo(() => {
        return Array.from({ length: 5 }).map(() => ({
            startX: (Math.random() - 0.5) * 150,
            startY: (Math.random() - 0.5) * 100,
            startZ: (Math.random() - 0.5) * 150,
            vx: (Math.random() - 0.5) * 30,
            vy: (Math.random() - 0.5) * 20,
            vz: (Math.random() - 0.5) * 30,
            size: Math.random() * 0.05 + 0.02,
        }));
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (groupRef.current && groupRef.current.children.length > 0) {
            groupRef.current.children.forEach((child, idx) => {
                if (child instanceof THREE.Points) {
                    const t = (time * 0.5) % 1;
                    const comet = comets[idx];
                    child.position.x = comet.startX + comet.vx * t * 10;
                    child.position.y = comet.startY + comet.vy * t * 10;
                    child.position.z = comet.startZ + comet.vz * t * 10;
                }
            });
        }
    });

    return (
        <group ref={groupRef}>
            {comets.map((comet, idx) => (
                <CometTrail key={idx} comet={comet} />
            ))}
        </group>
    );
};

const CometTrail = ({ comet }: { comet: any }) => {
    const positions = useMemo(() => {
        const count = 100;
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = Math.sin(i * 0.1) * 2;
            pos[i * 3 + 1] = Math.cos(i * 0.15) * 1;
            pos[i * 3 + 2] = -i * 0.2;
        }
        return pos;
    }, []);

    return (
        <Points positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#ffffff"
                size={comet.size}
                sizeAttenuation={true}
                depthWrite={false}
            />
        </Points>
    );
};
