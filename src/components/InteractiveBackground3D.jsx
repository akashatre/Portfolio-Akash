import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// 3D Snow-capped Mountain Terrain using Flat-Shaded Low-Poly Mesh
const AlpineTerrain = ({ scrollProgress }) => {
    const meshRef = useRef();

    // Generate terrain heights and vertex-colors (Snow, Rock, Pine Forest)
    const { geometry, material } = useMemo(() => {
        const size = 32;
        const segments = 45;
        const geom = new THREE.PlaneGeometry(size, size, segments, segments);
        geom.rotateX(-Math.PI / 2); // Lay flat

        const pos = geom.attributes.position;
        const colors = [];

        // Apply height map functions based on Perlin-like wave patterns
        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const z = pos.getZ(i);

            // Layered height waves
            let y = Math.sin(x * 0.15) * Math.cos(z * 0.15) * 1.8; // Broad hills
            y += Math.sin(x * 0.4) * Math.sin(z * 0.4) * 0.7;     // Mountain ridges
            y += Math.cos(x * 0.8) * 0.25;                         // Rocky peaks

            // Flatten valley area around center for aesthetics
            const distFromCenter = Math.sqrt(x*x + z*z);
            if (distFromCenter < 6) {
                const factor = distFromCenter / 6;
                y = THREE.MathUtils.lerp(-0.5, y, factor);
            }

            pos.setY(i, y);

            // Vertex Coloring based on height
            if (y > 1.2) {
                // Snow-Cap White (#FFFFFF)
                colors.push(1.0, 1.0, 1.0);
            } else if (y > 0.3) {
                // Rocky Mountain Slate Gray (#64748B)
                colors.push(0.39, 0.45, 0.54);
            } else if (y > -0.3) {
                // Pine Forest Green (#064E3B)
                colors.push(0.02, 0.3, 0.23);
            } else {
                // Shore Sand (#D97706)
                colors.push(0.85, 0.7, 0.4);
            }
        }

        geom.computeVertexNormals();
        geom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        const mat = new THREE.MeshStandardMaterial({
            vertexColors: true,
            flatShading: true,
            roughness: 0.9,
            metalness: 0.05
        });

        return { geometry: geom, material: mat };
    }, []);

    useFrame((state) => {
        if (meshRef.current) {
            // Gentle wind sway in hills
            meshRef.current.position.y = -0.5 + Math.sin(state.clock.getElapsedTime() * 0.3) * 0.02;
        }
    });

    return <mesh ref={meshRef} geometry={geometry} material={material} position={[0, -0.5, 0]} />;
};

// Reflective glacier water plane
const GlacierLake = () => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            // Lake wave undulation
            meshRef.current.position.y = -0.45 + Math.sin(state.clock.getElapsedTime() * 0.6) * 0.03;
        }
    });

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.45, 0]}>
            <planeGeometry args={[40, 40]} />
            <meshStandardMaterial 
                color="#0D3559" // Deep Glacier Lake Blue
                transparent 
                opacity={0.65} 
                roughness={0.15} 
                metalness={0.1}
            />
        </mesh>
    );
};

// Gentle Rising Sun in the mountains
const SunSphere = () => {
    return (
        <mesh position={[0, 1.8, -12]}>
            <sphereGeometry args={[1.6, 32, 32]} />
            <meshBasicMaterial color="#FFB03A" />
        </mesh>
    );
};

// Custom snowfall particle system drifting downwards
const DriftingSnow = () => {
    const pointsRef = useRef();
    const count = 350;

    const [positions, speeds] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const spd = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 16;
            pos[i * 3 + 1] = Math.random() * 8 - 2;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
            spd[i] = Math.random() * 0.015 + 0.005;
        }
        return [pos, spd];
    }, []);

    useFrame(() => {
        if (!pointsRef.current) return;
        const pos = pointsRef.current.geometry.attributes.position.array;
        for (let i = 0; i < count; i++) {
            pos[i * 3 + 1] -= speeds[i]; // Fall down
            // Swell slightly sideways
            pos[i * 3] += Math.sin(pos[i * 3 + 1] * 0.5 + i) * 0.003;

            // Reset when reaching bottom
            if (pos[i * 3 + 1] < -3) {
                pos[i * 3 + 1] = 5.0;
                pos[i * 3] = (Math.random() - 0.5) * 16;
            }
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute 
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial 
                color="#FFFFFF"
                size={0.05}
                transparent
                opacity={0.8}
                sizeAttenuation
            />
        </points>
    );
};

// Controls the camera positions dynamically based on scroll
const CameraScroller = ({ scrollProgress }) => {
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame((state) => {
        const progress = scrollProgress.current;

        // Camera path positions:
        // Scroll 0.0 (Hero): High angle looking down valley
        // Scroll 0.25 (About): Close water level angle
        // Scroll 0.5 (Skills): Close side profile
        // Scroll 0.75 (Projects): Wide high angle
        // Scroll 1.0 (Contact): Serene horizon view
        let targetPos = new THREE.Vector3(0, 1.8, 5.0);
        let targetLookAt = new THREE.Vector3(0, 0.4, 0);

        if (progress < 0.25) {
            const t = progress / 0.25;
            targetPos.set(0, THREE.MathUtils.lerp(1.8, 0.6, t), THREE.MathUtils.lerp(5.0, 4.2, t));
            targetLookAt.set(0, THREE.MathUtils.lerp(0.4, -0.2, t), 0);
        } else if (progress < 0.5) {
            const t = (progress - 0.25) / 0.25;
            targetPos.set(THREE.MathUtils.lerp(0, 2.5, t), THREE.MathUtils.lerp(0.6, 1.2, t), THREE.MathUtils.lerp(4.2, 4.8, t));
            targetLookAt.set(0, THREE.MathUtils.lerp(-0.2, 0.3, t), 0);
        } else if (progress < 0.75) {
            const t = (progress - 0.5) / 0.25;
            targetPos.set(THREE.MathUtils.lerp(2.5, -2.2, t), THREE.MathUtils.lerp(1.2, 2.0, t), THREE.MathUtils.lerp(4.8, 5.2, t));
            targetLookAt.set(0, THREE.MathUtils.lerp(0.3, 0.5, t), 0);
        } else {
            const t = (progress - 0.75) / 0.25;
            targetPos.set(THREE.MathUtils.lerp(-2.2, 0, t), THREE.MathUtils.lerp(2.0, 1.4, t), THREE.MathUtils.lerp(5.2, 4.6, t));
            targetLookAt.set(0, THREE.MathUtils.lerp(0.5, 0.2, t), 0);
        }

        // Add subtle mouse parallax to target positions
        targetPos.x += mouseRef.current.x * 0.35;
        targetPos.y += mouseRef.current.y * 0.25;

        // Smooth camera positions
        state.camera.position.lerp(targetPos, 0.05);
        
        // Update LookAt focus smoothly
        const currentLookAt = new THREE.Vector3(0, 0, -1).applyQuaternion(state.camera.quaternion).add(state.camera.position);
        currentLookAt.lerp(targetLookAt, 0.05);
        state.camera.lookAt(currentLookAt);
    });

    return null;
};

const InteractiveBackground3D = () => {
    const scrollRef = useRef(0);

    // Track scroll events
    useEffect(() => {
        const handleScroll = () => {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight <= 0) return;
            scrollRef.current = window.scrollY / docHeight;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1,
            pointerEvents: 'none',
            background: 'linear-gradient(to bottom, #071322 0%, #0d2235 45%, #0a1f16 100%)', // Alpine twilight gradient
            overflow: 'hidden'
        }}>
            <Canvas
                camera={{ position: [0, 1.8, 5.0], fov: 45 }}
                gl={{ alpha: false, antialias: true, powerPreference: 'high-performance' }}
                dpr={[1, 1.5]}
            >
                <ambientLight intensity={0.45} />
                <directionalLight position={[5, 10, 5]} intensity={1.8} color="#FFFFFF" castShadow />
                <pointLight position={[0, 2, -12]} intensity={2.0} color="#FF9030" /> {/* Sunset orange glow */}
                
                <SunSphere />
                <AlpineTerrain scrollProgress={scrollRef} />
                <GlacierLake />
                <DriftingSnow />
                <CameraScroller scrollProgress={scrollRef} />
            </Canvas>
        </div>
    );
};

export default InteractiveBackground3D;
