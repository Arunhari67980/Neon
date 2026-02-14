import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';

export const StarField = () => {
    const sphereRef = useRef<THREE.Points>(null!);
    const sphere = useMemo(() => random.inSphere(new Float32Array(8000), { radius: 150 }), []);

    useFrame(() => {
        if (sphereRef.current) {
            sphereRef.current.rotation.x += 0.00005;
            sphereRef.current.rotation.y += 0.00008;
        }
    });

    return (
        <group>
            {/* Main Star Field */}
            <Points ref={sphereRef} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.003}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>

            {/* Colored nebula stars for atmosphere */}
            <Points
                positions={random.inSphere(new Float32Array(2000), { radius: 120 })}
                stride={3}
                frustumCulled={false}
            >
                <PointMaterial
                    transparent
                    color="#8b5cf6"
                    size={0.0015}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.4}
                />
            </Points>

            {/* Cyan nebula dust */}
            <Points
                positions={random.inSphere(new Float32Array(1500), { radius: 130 })}
                stride={3}
                frustumCulled={false}
            >
                <PointMaterial
                    transparent
                    color="#0ea5e9"
                    size={0.0012}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.3}
                />
            </Points>
        </group>
    );
};
