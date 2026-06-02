import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Eye } from 'lucide-react';
import CalmThreeUniverse from './CalmThreeUniverse';
import './CalmMode.css';

const CalmMode = () => {
    const [isActive, setIsActive] = useState(false);
    const [soundOn, setSoundOn] = useState(false);
    
    const canvasRef = useRef(null);
    const audioCtxRef = useRef(null);
    const windNodeRef = useRef(null);
    const rainNodeRef = useRef(null);
    const gainNodeRef = useRef(null);

    // Cleanup on unmount to prevent audio leaks and class leaks
    useEffect(() => {
        return () => {
            document.body.classList.remove('calm-mode-active');
            if (audioCtxRef.current) {
                try {
                    if (windNodeRef.current) windNodeRef.current.stop();
                    if (rainNodeRef.current) rainNodeRef.current.stop();
                    audioCtxRef.current.close();
                } catch (e) {}
            }
        };
    }, []);

    // Dynamic Snow/Dust particles
    useEffect(() => {
        if (!isActive) return;
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animId;
        
        let w = window.innerWidth;
        let h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;

        const particles = [];
        const maxParticles = 60;

        for (let i = 0; i < maxParticles; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 1.5 + 0.5,
                d: Math.random() * maxParticles,
                vy: Math.random() * 0.6 + 0.2, // slow fall
                vx: Math.random() * 0.4 - 0.2,
                a: Math.random() * 0.3 + 0.1 // low opacity
            });
        }

        const onResize = () => {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w;
            canvas.height = h;
        };
        window.addEventListener('resize', onResize);

        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = 'rgba(250, 250, 250, 0.4)';
            
            particles.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(250, 250, 250, ${p.a})`;
                ctx.fill();

                p.y += p.vy;
                p.x += p.vx + Math.sin(p.d) * 0.1;
                p.d += 0.005;

                // Reset at bottom or sides
                if (p.y > h || p.x > w || p.x < 0) {
                    p.x = Math.random() * w;
                    p.y = -10;
                }
            });

            animId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', onResize);
            cancelAnimationFrame(animId);
        };
    }, [isActive]);

    // Audio synthesis setup
    const startAudio = () => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();
            audioCtxRef.current = ctx;

            const mainGain = ctx.createGain();
            mainGain.gain.setValueAtTime(0.0, ctx.currentTime);
            mainGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1.5); // fade in
            mainGain.connect(ctx.destination);
            gainNodeRef.current = mainGain;

            // --- Synthesize Wind (Pink/Brown noise with low-pass LFO sweep) ---
            const bufferSize = ctx.sampleRate * 2;
            const windBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = windBuffer.getChannelData(0);
            
            // Generate white noise first, then filter below
            let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
            for (let i = 0; i < bufferSize; i++) {
                const white = Math.random() * 2 - 1;
                // Brown noise approximation
                b0 = 0.99886 * b0 + white * 0.0555179;
                b1 = 0.99332 * b1 + white * 0.0750759;
                b2 = 0.96900 * b2 + white * 0.1538520;
                b3 = 0.86650 * b3 + white * 0.3104856;
                b4 = 0.55000 * b4 + white * 0.5329522;
                b5 = -0.7616 * b5 - white * 0.0168980;
                data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
                data[i] *= 0.11; // normalise
                b6 = white * 0.115926;
            }

            const windSource = ctx.createBufferSource();
            windSource.buffer = windBuffer;
            windSource.loop = true;

            // Sweeping lowpass filter
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(350, ctx.currentTime);
            
            // Modulator (LFO) for wind gusts
            const lfo = ctx.createOscillator();
            lfo.frequency.value = 0.07; // very slow cycles
            
            const lfoGain = ctx.createGain();
            lfoGain.gain.value = 180; // range of cutoff sweep

            lfo.connect(lfoGain);
            lfoGain.connect(filter.frequency);
            
            windSource.connect(filter);
            filter.connect(mainGain);

            lfo.start();
            windSource.start();
            windNodeRef.current = windSource;

            // --- Synthesize Rain (Highpassed crackling white noise) ---
            const rainBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const rainData = rainBuffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                rainData[i] = Math.random() * 2 - 1;
            }

            const rainSource = ctx.createBufferSource();
            rainSource.buffer = rainBuffer;
            rainSource.loop = true;

            const rainFilter = ctx.createBiquadFilter();
            rainFilter.type = 'bandpass';
            rainFilter.frequency.setValueAtTime(1400, ctx.currentTime);
            rainFilter.Q.setValueAtTime(1.5, ctx.currentTime);

            const rainGain = ctx.createGain();
            rainGain.gain.value = 0.25;

            rainSource.connect(rainFilter);
            rainFilter.connect(rainGain);
            rainGain.connect(mainGain);

            rainSource.start();
            rainNodeRef.current = rainSource;

            setSoundOn(true);
        } catch (e) {
            console.error("Failed to start audio synthesis", e);
        }
    };

    const stopAudio = () => {
        if (gainNodeRef.current && audioCtxRef.current) {
            const ctx = audioCtxRef.current;
            gainNodeRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
            setTimeout(() => {
                try {
                    if (windNodeRef.current) windNodeRef.current.stop();
                    if (rainNodeRef.current) rainNodeRef.current.stop();
                    if (audioCtxRef.current) audioCtxRef.current.close();
                } catch {}
                audioCtxRef.current = null;
                setSoundOn(false);
            }, 900);
        }
    };

    const handleToggle = () => {
        const nextState = !isActive;
        setIsActive(nextState);
        
        if (nextState) {
            startAudio();
            document.body.classList.add('calm-mode-active');
        } else {
            stopAudio();
            document.body.classList.remove('calm-mode-active');
        }
    };

    const toggleSoundOnly = () => {
        if (soundOn) {
            stopAudio();
        } else {
            startAudio();
        }
    };

    return (
        <>
            {/* 3D Universe Galaxy in Background */}
            {isActive && <CalmThreeUniverse />}

            {/* Drifting snow/mist canvas */}
            {isActive && (
                <canvas 
                    ref={canvasRef} 
                    className="calm-snow-canvas"
                />
            )}

            {/* Floating Control Button */}
            <div className="calm-mode-controls">
                <button 
                    onClick={handleToggle}
                    className={`calm-toggle-btn ${isActive ? 'active' : ''}`}
                    title={isActive ? "Disable Peaceful Mode" : "Enable Scenic Calm Mode"}
                >
                    <span className="calm-btn-icon">❄</span>
                    <span className="calm-btn-text">
                        {isActive ? "Calm Active" : "Calm Mode"}
                    </span>
                </button>

                {isActive && (
                    <button 
                        onClick={toggleSoundOnly} 
                        className="calm-sound-btn"
                        title={soundOn ? "Mute sounds" : "Unmute nature sounds"}
                    >
                        {soundOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
                    </button>
                )}
            </div>
        </>
    );
};

export default CalmMode;
