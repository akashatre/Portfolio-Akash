import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

const ParticleEarth = () => {
    const pointsRef = useRef();

    // Generate points on a sphere surface to simulate Earth data points
    const particleCount = 2500;
    const positions = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            const phi = Math.acos(Math.random() * 2 - 1);
            const theta = Math.sqrt(particleCount * Math.PI) * phi;
            const r = 2; // Radius

            pos[i * 3] = r * Math.cos(theta) * Math.sin(phi);
            pos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
            pos[i * 3 + 2] = r * Math.cos(phi);
        }
        return pos;
    }, []);

    useFrame(({ clock }) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = clock.getElapsedTime() * 0.08;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#3b82f6"
                size={0.03}
                transparent
                opacity={0.8}
                sizeAttenuation
            />
        </points>
    );
};

const SafeEarth3D = () => {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            pointerEvents: 'auto'
        }}>
            <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} gl={{ alpha: true, antialias: true }}>
                <ambientLight intensity={0.5} />
                <Stars radius={300} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />

                {/* Core Sphere for depth */}
                <mesh>
                    <sphereGeometry args={[1.95, 32, 32]} />
                    <meshBasicMaterial color="#0f172a" transparent opacity={0.6} />
                </mesh>

                <ParticleEarth />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={true}
                    autoRotate={true}
                    autoRotateSpeed={1}
                />
            </Canvas>
        </div>
    );
};

export default SafeEarth3D;
