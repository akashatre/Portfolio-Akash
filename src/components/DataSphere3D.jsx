import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// Floating particles that form a sphere
const SphereParticles = () => {
    const groupRef = useRef();
    const particleCount = 1200;

    const { positions, colors, sizes } = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        const col = new Float32Array(particleCount * 3);
        const sz = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            // Distribute on sphere surface using Fibonacci lattice
            const phi = Math.acos(1 - 2 * (i + 0.5) / particleCount);
            const theta = Math.PI * (1 + Math.sqrt(5)) * i;
            const r = 2 + (Math.random() - 0.5) * 0.3; // slight variation

            pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);

            // Gold to white color variation
            const t = Math.random();
            col[i * 3]     = 0.99 * t + 0.99 * (1 - t); // R
            col[i * 3 + 1] = 0.77 * t + 1.0  * (1 - t); // G
            col[i * 3 + 2] = 0.21 * t + 1.0  * (1 - t); // B

            sz[i] = Math.random() * 1.5 + 0.5;
        }
        return { positions: pos, colors: col, sizes: sz };
    }, []);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            const t = clock.getElapsedTime();
            groupRef.current.rotation.y = t * 0.07;
            groupRef.current.rotation.x = Math.sin(t * 0.04) * 0.18;
        }
    });

    return (
        <group ref={groupRef}>
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={particleCount}
                        array={positions}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        count={particleCount}
                        array={colors}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-size"
                        count={particleCount}
                        array={sizes}
                        itemSize={1}
                    />
                </bufferGeometry>
                <pointsMaterial
                    vertexColors
                    size={0.04}
                    transparent
                    opacity={0.85}
                    sizeAttenuation
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>
        </group>
    );
};

// Thin wireframe rings around the sphere
const SphereRings = () => {
    const ring1Ref = useRef();
    const ring2Ref = useRef();
    const ring3Ref = useRef();

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.1;
        if (ring2Ref.current) ring2Ref.current.rotation.x = t * 0.08;
        if (ring3Ref.current) ring3Ref.current.rotation.y = t * 0.06;
    });

    const ringMat = new THREE.LineBasicMaterial({
        color: '#FDC435',
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
    });

    const makeRing = (radius, segments = 128) => {
        const pts = [];
        for (let i = 0; i <= segments; i++) {
            const a = (i / segments) * Math.PI * 2;
            pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));
        }
        return new THREE.BufferGeometry().setFromPoints(pts);
    };

    return (
        <>
            <line ref={ring1Ref} geometry={makeRing(2.35)} material={ringMat} />
            <line ref={ring2Ref} geometry={makeRing(2.5)} material={ringMat} />
            <line ref={ring3Ref} geometry={makeRing(2.65)} material={ringMat} />
        </>
    );
};

// Inner glowing core
const Core = () => {
    const meshRef = useRef();

    useFrame(({ clock }) => {
        if (meshRef.current) {
            const s = 1 + Math.sin(clock.getElapsedTime() * 1.2) * 0.04;
            meshRef.current.scale.set(s, s, s);
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshBasicMaterial
                color="#FDC435"
                transparent
                opacity={0.06}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
};

const DataSphere3D = ({ size = '100%' }) => {
    return (
        <div style={{ width: size, height: size, position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <Canvas
                camera={{ position: [0, 0, 5.5], fov: 42 }}
                gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
                dpr={[1, 1.5]}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.3} />
                    <pointLight position={[4, 4, 4]} intensity={1} color="#FDC435" />
                    <Stars radius={100} depth={60} count={800} factor={3} saturation={0} fade speed={0.3} />
                    <Core />
                    <SphereParticles />
                    <SphereRings />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default DataSphere3D;
