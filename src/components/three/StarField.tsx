import { useMemo } from 'react';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

export const StarField = () => {
    const sphere = useMemo(() => random.inSphere(new Float32Array(5000), { radius: 100 }), []);

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};
