import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { StarField } from '../components/three/StarField';
import { Planet } from '../components/three/Planet';
import { useStore } from '../store/useStore';

export const GalaxyScene = () => {
    const { categories } = useStore();

    return (
        <div className="w-full h-screen bg-cosmic-black">
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 20, 35]} fov={45} />
                <OrbitControls
                    enablePan={false}
                    maxDistance={100}
                    minDistance={10}
                    makeDefault
                />

                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
                <spotLight position={[-10, 20, 10]} angle={0.15} penumbra={1} intensity={2} />

                <StarField />
                <Suspense fallback={<mesh><sphereGeometry args={[1]} /><meshBasicMaterial color="blue" wireframe /></mesh>}>
                    {categories.map((category) => (
                        <Planet key={category.id} category={category} />
                    ))}
                    <Environment preset="city" />
                </Suspense>

                <ContactShadows
                    position={[0, -10, 0]}
                    opacity={0.4}
                    scale={40}
                    blur={1.5}
                    far={40}
                />
            </Canvas>
        </div>
    );
};
