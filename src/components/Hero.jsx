import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import './Hero.css';

const useCounter = (end, dur = 2000, start = false) => {
    const [n, setN] = useState(0);
    useEffect(() => {
        if (!start) return;
        const step = end / (dur / 16);
        let cur = 0;
        const id = setInterval(() => {
            cur = Math.min(cur + step, end);
            setN(Math.floor(cur));
            if (cur >= end) clearInterval(id);
        }, 16);
        return () => clearInterval(id);
    }, [end, dur, start]);
    return n;
};

const Hero = () => {
    const [started, setStarted] = useState(false);
    const [resumeLink] = useState(() => {
        return localStorage.getItem('portfolio_resume_link') || "https://drive.google.com/file/d/14ahVsI7Z_BAmQBa1Y6vOIFHQAYhRFojo/view?usp=sharing";
    });
    const statsRef = useRef(null);
    const y1 = useCounter(2, 1800, started);
    const y2 = useCounter(100, 2000, started);
    const y3 = useCounter(24, 1600, started);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.3 });
        if (statsRef.current) obs.observe(statsRef.current);
        return () => obs.disconnect();
    }, []);

    return (
        <section id="home" className="bruno-hero">
            {/* ── MAIN SPLIT ── */}
            <div className="bruno-split">

                {/* LEFT */}
                <div className="bruno-left">
                    <motion.span className="bruno-eyebrow"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}>
                        INTRODUCTION
                    </motion.span>

                    <motion.h1 className="bruno-name"
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.05 }}>
                        Hello, I'm Akash Atre — a Data Analyst & Engineer based in Bengaluru.
                    </motion.h1>

                    <motion.div className="bruno-role-loc"
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}>
                        <span>Data Analyst</span>
                        <span className="bruno-sep">·</span>
                        <span>Prompt Engineer</span>
                        <span className="bruno-sep">·</span>
                        <span>Thakral One</span>
                    </motion.div>

                    {/* Three-column info block */}
                    <motion.div className="bruno-info-grid"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.25 }}>

                        <div className="bruno-info-col">
                            <span className="bruno-info-label">BIO</span>
                            <p className="bruno-info-text">
                                Detail-oriented specialist turning raw data into clear insights. Exp in Python, SQL, AWS, and Power BI.
                            </p>
                        </div>

                        <div className="bruno-info-col">
                            <span className="bruno-info-label">CONTACT</span>
                            <p className="bruno-info-text">
                                Bengaluru, India<br />
                                akashatre0241@gmail.com<br />
                                +91 9112146583
                            </p>
                        </div>

                        <div className="bruno-info-col">
                            <span className="bruno-info-label">SERVICES</span>
                            <p className="bruno-info-text">
                                Data Analytics<br />
                                Dashboard Dev<br />
                                Data Pipelines & AI
                            </p>
                        </div>
                    </motion.div>

                    {/* CTA row */}
                    <motion.div className="bruno-cta-row"
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.35 }}>
                        <a href="#contact" className="bruno-btn-fill">Get in Touch</a>
                        <a href={resumeLink}
                            target="_blank" rel="noopener noreferrer" className="bruno-btn-outline">
                            <Download size={15} /> Resume
                        </a>
                    </motion.div>
                </div>

                {/* RIGHT: photo */}
                <motion.div className="bruno-photo-col"
                    initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
                    <div className="bruno-photo-wrap">
                        <img src="/profile.png" alt="Akash Atre" className="bruno-photo" />
                        <div className="bruno-photo-overlay" />
                        <motion.div className="bruno-avail-pill"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                            <span className="bruno-avail-dot" />
                            Available for work
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* ── STATS ROW ── */}
            <motion.div ref={statsRef} className="bruno-stats"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}>
                <div className="bruno-stat">
                    <div className="bruno-stat-num">{y1}+</div>
                    <div className="bruno-stat-lbl">Years of<br />Experience</div>
                </div>
                <div className="bruno-stat-divider" />
                <div className="bruno-stat">
                    <div className="bruno-stat-num">{y2}%</div>
                    <div className="bruno-stat-lbl">Satisfaction<br />Rate</div>
                </div>
                <div className="bruno-stat-divider" />
                <div className="bruno-stat">
                    <div className="bruno-stat-num">{y3}+</div>
                    <div className="bruno-stat-lbl">Projects<br />Done</div>
                </div>
            </motion.div>

            {/* Scroll hint */}
            <motion.div className="bruno-scroll"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
                <ArrowDown size={16} />
                <span>Scroll Down</span>
            </motion.div>
        </section>
    );
};

export default Hero;
