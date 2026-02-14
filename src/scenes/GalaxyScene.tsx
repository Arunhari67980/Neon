import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { StarField } from '../components/three/StarField';
import { Planet } from '../components/three/Planet';
import { CometField } from '../components/three/CometField';
import { Nebula } from '../components/three/Nebula';
import { useStore } from '../store/useStore';

export const GalaxyScene = () => {
    const { categories } = useStore();

    return (
        <div className="w-full h-screen bg-cosmic-black">
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 25, 40]} fov={50} />
                <OrbitControls
                    enablePan={false}
                    maxDistance={120}
                    minDistance={20}
                    makeDefault
                    autoRotate={false}
                />

                {/* Lighting Setup */}
                <ambientLight intensity={0.3} color="#ffffff" />
                <pointLight position={[15, 15, 15]} intensity={2} castShadow color="#c084fc" />
                <pointLight position={[-15, 10, -15]} intensity={1.5} castShadow color="#60a5fa" />
                <pointLight position={[0, -10, 20]} intensity={1} color="#4ade80" />
                <spotLight position={[-20, 30, 10]} angle={0.2} penumbra={1} intensity={1.5} castShadow />

                {/* Background and Effects */}
                <StarField />
                <Nebula />
                <CometField />

                <Suspense fallback={<mesh><sphereGeometry args={[1]} /><meshBasicMaterial color="blue" wireframe /></mesh>}>
                    {categories.map((category) => (
                        <Planet key={category.id} category={category} />
                    ))}
                    <Environment preset="night" />
                </Suspense>

                <ContactShadows
                    position={[0, -15, 0]}
                    opacity={0.3}
                    scale={50}
                    blur={2}
                    far={50}
                />
            </Canvas>
        </div>
    );
};
