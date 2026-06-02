import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CalmThreeUniverse = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        let width = window.innerWidth;
        let height = window.innerHeight;

        // Scene
        const scene = new THREE.Scene();

        // Camera - slightly zoomed out to fit all orbits nicely
        const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
        camera.position.set(0, 18, 30);
        camera.lookAt(0, 0, 0);

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mount.appendChild(renderer.domElement);

        // --- Lights ---
        // Soft overall illumination
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.28);
        scene.add(ambientLight);

        // Point light at the center representing the Sun's radiance
        const sunLight = new THREE.PointLight(0xfff5e6, 3.5, 60, 0.5);
        scene.add(sunLight);

        // Camera light to ensure planets are beautifully lit from the user's perspective
        const cameraLight = new THREE.DirectionalLight(0xffffff, 1.2);
        cameraLight.position.set(0, 18, 30);
        scene.add(cameraLight);

        // --- Orbits Helper ---
        const createOrbitRing = (radius) => {
            const points = [];
            for (let i = 0; i <= 128; i++) {
                const theta = (i / 128) * Math.PI * 2;
                points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
            }
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({ 
                color: 0xffffff, 
                transparent: true, 
                opacity: 0.08 
            });
            return new THREE.Line(geometry, material);
        };

        // --- SUN (Center) ---
        const sunGeometry = new THREE.SphereGeometry(2.4, 32, 32);
        const sunMaterial = new THREE.MeshBasicMaterial({
            color: '#B46E53', // Terracotta warm sun core
            transparent: true,
            opacity: 0.95
        });
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        scene.add(sun);

        // Corona 1
        const coronaGeometry = new THREE.RingGeometry(2.5, 3.2, 32);
        const coronaMaterial = new THREE.MeshBasicMaterial({
            color: '#C6B099', // Muted beige corona
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.2
        });
        const corona = new THREE.Mesh(coronaGeometry, coronaMaterial);
        corona.rotation.x = Math.PI / 2;
        scene.add(corona);

        // Corona 2 (Tilted Shimmer)
        const corona2Geometry = new THREE.RingGeometry(2.55, 3.5, 32);
        const corona2Material = new THREE.MeshBasicMaterial({
            color: '#B46E53', // Terracotta outer flare
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.12
        });
        const corona2 = new THREE.Mesh(corona2Geometry, corona2Material);
        corona2.rotation.x = Math.PI / 2 + 0.15;
        corona2.rotation.y = 0.1;
        scene.add(corona2);


        // --- PLANET 1: MERCURY ---
        const mercuryGeometry = new THREE.SphereGeometry(0.3, 32, 32);
        const mercuryMaterial = new THREE.MeshStandardMaterial({
            color: '#8A8680', // Slate gray rock
            roughness: 0.9,
            metalness: 0.1
        });
        const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
        scene.add(mercury);
        scene.add(createOrbitRing(3.5));


        // --- PLANET 2: VENUS ---
        const venusGeometry = new THREE.SphereGeometry(0.58, 32, 32);
        const venusMaterial = new THREE.MeshStandardMaterial({
            color: '#E5D3B3', // Muted golden-cream
            roughness: 0.85
        });
        const venus = new THREE.Mesh(venusGeometry, venusMaterial);
        scene.add(venus);
        scene.add(createOrbitRing(5.2));


        // --- PLANET 3: EARTH & MOON ---
        const earthGroup = new THREE.Group();
        const earthGeometry = new THREE.SphereGeometry(0.65, 32, 32);
        const earthMaterial = new THREE.MeshStandardMaterial({
            color: '#64748B', // Slate blue Earth
            roughness: 0.7,
            metalness: 0.15
        });
        const earth = new THREE.Mesh(earthGeometry, earthMaterial);
        earthGroup.add(earth);

        // Earth Atmosphere Wireframe Grid (Tech-editorial look)
        const atmGeometry = new THREE.SphereGeometry(0.73, 16, 16);
        const atmMaterial = new THREE.MeshBasicMaterial({
            color: '#C6B099', // Beige wireframe
            wireframe: true,
            transparent: true,
            opacity: 0.12
        });
        const atm = new THREE.Mesh(atmGeometry, atmMaterial);
        earthGroup.add(atm);

        // Moon
        const moonGeometry = new THREE.SphereGeometry(0.16, 16, 16);
        const moonMaterial = new THREE.MeshStandardMaterial({
            color: '#FAFAFA', // Cream moon
            roughness: 0.9
        });
        const moon = new THREE.Mesh(moonGeometry, moonMaterial);
        moon.position.x = 1.25;
        earthGroup.add(moon);

        scene.add(earthGroup);
        scene.add(createOrbitRing(7.2));


        // --- PLANET 4: MARS ---
        const marsGeometry = new THREE.SphereGeometry(0.45, 32, 32);
        const marsMaterial = new THREE.MeshStandardMaterial({
            color: '#B46E53', // Red terracotta
            roughness: 0.8
        });
        const mars = new THREE.Mesh(marsGeometry, marsMaterial);
        scene.add(mars);
        scene.add(createOrbitRing(9.8));


        // --- PLANET 5: JUPITER ---
        const jupiterGeometry = new THREE.SphereGeometry(1.2, 32, 32);
        const jupiterMaterial = new THREE.MeshStandardMaterial({
            color: '#C6B099', // Sand beige stripes
            roughness: 0.65
        });
        const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
        scene.add(jupiter);
        scene.add(createOrbitRing(13.5));


        // --- PLANET 6: SATURN (With rings!) ---
        const saturnGroup = new THREE.Group();
        const saturnGeometry = new THREE.SphereGeometry(0.9, 32, 32);
        const saturnMaterial = new THREE.MeshStandardMaterial({
            color: '#D4C4A8', // Warm light-beige Saturn
            roughness: 0.7
        });
        const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
        saturnGroup.add(saturn);

        // Saturn Rings (double-sided flat disk)
        const saturnRingGeometry = new THREE.RingGeometry(1.3, 2.2, 64);
        const saturnRingMaterial = new THREE.MeshStandardMaterial({
            color: '#BDB095',
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.75,
            roughness: 0.8
        });
        const saturnRing = new THREE.Mesh(saturnRingGeometry, saturnRingMaterial);
        saturnRing.rotation.x = Math.PI / 2;
        saturnGroup.add(saturnRing);

        // Tilt the whole Saturn system slightly
        saturnGroup.rotation.z = 0.22; // ~12 degrees tilt

        scene.add(saturnGroup);
        scene.add(createOrbitRing(17.5));


        // --- BACKGROUND UNIVERSE STARFIELD ---
        const starsGeometry = new THREE.BufferGeometry();
        const starsCount = 2200;
        const starPositions = new Float32Array(starsCount * 3);
        const starColors = new Float32Array(starsCount * 3);

        const color1 = new THREE.Color('#C6B099'); // Beige
        const color2 = new THREE.Color('#FAFAFA'); // White/Cream

        for (let i = 0; i < starsCount; i++) {
            const i3 = i * 3;
            // Spread in a large sphere
            const radius = 35 + Math.random() * 25;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);

            starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            starPositions[i3 + 2] = radius * Math.cos(phi);

            // Mix colors
            const mixedColor = color1.clone().lerp(color2, Math.random());
            starColors[i3] = mixedColor.r;
            starColors[i3 + 1] = mixedColor.g;
            starColors[i3 + 2] = mixedColor.b;
        }

        starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        starsGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

        const starsMaterial = new THREE.PointsMaterial({
            size: 0.05,
            sizeAttenuation: true,
            depthWrite: false,
            vertexColors: true,
            transparent: true,
            opacity: 0.55
        });

        const stars = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(stars);


        // --- ANIMATION LOOP ---
        const clock = new THREE.Clock();
        let animationFrameId;

        const tick = () => {
            const elapsed = clock.getElapsedTime();

            // 1. Sun & Corona rotations
            sun.rotation.y = elapsed * 0.05;
            corona.rotation.z = elapsed * -0.015;
            corona2.rotation.z = elapsed * 0.025;

            // 2. Mercury
            const mercAngle = elapsed * 0.22;
            mercury.position.set(Math.cos(mercAngle) * 3.5, 0, Math.sin(mercAngle) * 3.5);
            mercury.rotation.y = elapsed * 0.08;

            // 3. Venus
            const venusAngle = elapsed * 0.16;
            venus.position.set(Math.cos(venusAngle) * 5.2, 0, Math.sin(venusAngle) * 5.2);
            venus.rotation.y = elapsed * 0.04;

            // 4. Earth, Atmosphere & Moon
            const earthAngle = elapsed * 0.11;
            earthGroup.position.set(Math.cos(earthAngle) * 7.2, 0, Math.sin(earthAngle) * 7.2);
            earth.rotation.y = elapsed * 0.4;
            atm.rotation.y = elapsed * -0.2;
            moon.position.set(Math.cos(elapsed * 1.1) * 1.25, 0, Math.sin(elapsed * 1.1) * 1.25);

            // 5. Mars
            const marsAngle = elapsed * 0.08;
            mars.position.set(Math.cos(marsAngle) * 9.8, 0, Math.sin(marsAngle) * 9.8);
            mars.rotation.y = elapsed * 0.35;

            // 6. Jupiter
            const jupAngle = elapsed * 0.045;
            jupiter.position.set(Math.cos(jupAngle) * 13.5, 0, Math.sin(jupAngle) * 13.5);
            jupiter.rotation.y = elapsed * 0.18;

            // 7. Saturn
            const saturnAngle = elapsed * 0.028;
            saturnGroup.position.set(Math.cos(saturnAngle) * 17.5, 0, Math.sin(saturnAngle) * 17.5);
            saturn.rotation.y = elapsed * 0.3;

            // 8. Universe slow spin
            stars.rotation.y = elapsed * 0.004;
            stars.rotation.x = Math.sin(elapsed * 0.002) * 0.04;

            // 9. Camera Slow Cinematic sway
            camera.position.x = Math.sin(elapsed * 0.03) * 2;
            camera.position.y = 18 + Math.cos(elapsed * 0.03) * 2;
            camera.position.z = 28 + Math.sin(elapsed * 0.03) * 3;
            camera.lookAt(0, 0, 0);

            // 10. Update Camera Light position to point from current camera position
            cameraLight.position.copy(camera.position);

            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(tick);
        };

        tick();

        // Resize handler
        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);

            // Dispose geometries and materials
            sunGeometry.dispose();
            sunMaterial.dispose();
            coronaGeometry.dispose();
            coronaMaterial.dispose();
            corona2Geometry.dispose();
            corona2Material.dispose();
            mercuryGeometry.dispose();
            mercuryMaterial.dispose();
            venusGeometry.dispose();
            venusMaterial.dispose();
            earthGeometry.dispose();
            earthMaterial.dispose();
            atmGeometry.dispose();
            atmMaterial.dispose();
            moonGeometry.dispose();
            moonMaterial.dispose();
            marsGeometry.dispose();
            marsMaterial.dispose();
            jupiterGeometry.dispose();
            jupiterMaterial.dispose();
            saturnGeometry.dispose();
            saturnMaterial.dispose();
            saturnRingGeometry.dispose();
            saturnRingMaterial.dispose();
            starsGeometry.dispose();
            starsMaterial.dispose();
            renderer.dispose();

            if (mount && renderer.domElement.parentNode) {
                mount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div 
            ref={mountRef} 
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0, // background layer below sections
                pointerEvents: 'none',
                opacity: 0.85, // clear and rich blend with dark theme
                transition: 'opacity 1.5s ease'
            }}
        />
    );
};

export default CalmThreeUniverse;
