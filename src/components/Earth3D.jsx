import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

const TechEarth = () => {
    const meshRef = useRef();

    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
            meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
        }
    });

    return (
        <group ref={meshRef}>
            {/* Core Sphere - Dark Blue */}
            <mesh>
                <sphereGeometry args={[2, 64, 64]} />
                <meshBasicMaterial color="#000510" opacity={0.9} transparent />
            </mesh>

            {/* Wireframe Grid - Cyan/Tech Look */}
            <mesh>
                <sphereGeometry args={[2.02, 32, 32]} />
                <meshBasicMaterial
                    color="#3b82f6"
                    wireframe
                    transparent
                    opacity={0.15}
                />
            </mesh>

            {/* Outer Glow / Atmosphere Points */}
            <points>
                <sphereGeometry args={[2.4, 64, 64]} />
                <pointsMaterial
                    color="#60a5fa"
                    size={0.015}
                    transparent
                    opacity={0.4}
                    sizeAttenuation
                />
            </points>

            {/* Data Rings */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2.8, 0.01, 16, 100]} />
                <meshBasicMaterial color="#8b5cf6" opacity={0.3} transparent />
            </mesh>
            <mesh rotation={[Math.PI / 1.5, 0, 0]}>
                <torusGeometry args={[3.2, 0.01, 16, 100]} />
                <meshBasicMaterial color="#06b6d4" opacity={0.2} transparent />
            </mesh>
        </group>
    );
};

const Earth3D = () => {
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
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
                <Stars radius={300} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />

                <TechEarth />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={true}
                    autoRotate={true}
                    autoRotateSpeed={0.8}
                />
            </Canvas>
        </div>
    );
};

export default Earth3D;
