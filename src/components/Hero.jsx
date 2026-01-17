import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import './Hero.css';

const ROLES = ["Data Engineer", "Data Analyst", "Python Developer", "ETL Specialist"];

const Hero = () => {
    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }, 3000); // Change every 3 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="home" className="hero-section">
            <div className="container">
                <div className="hero-grid">
                    {/* LEFT CONTENT */}
                    <div className="hero-content">
                        <div className="hero-greeting-wrapper" style={{ height: '40px', overflow: 'hidden', marginBottom: '1rem' }}>
                            <AnimatePresence mode='wait'>
                                <motion.span
                                    key={roleIndex}
                                    className="hero-greeting"
                                    initial={{ y: 40, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -40, opacity: 0 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    style={{ display: 'block' }}
                                >
                                    {ROLES[roleIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </div>

                        <motion.h1
                            className="hero-title"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            Hello, my name <br />
                            is Akash Atre
                        </motion.h1>

                        <motion.p
                            className="hero-desc"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            I transform complex data into clear, actionable intelligence. Specializing in Python, SQL, and robust ETL pipelines to drive business growth.
                        </motion.p>

                        <motion.div
                            className="hero-actions"
                            style={{ display: 'flex', gap: '1rem' }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <a href="#projects" className="btn">
                                My Projects
                            </a>
                            <a href="#contact" className="btn-outline">
                                Contact Me
                            </a>
                        </motion.div>
                    </div>

                    {/* RIGHT VISUAL */}
                    <motion.div
                        className="hero-visual"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="hero-blob-bg"></div>
                        <div className="hero-img-clipper">
                            <img src="/profile.png" alt="Akash Atre" className="hero-img" />
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="scroll-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <span>Scroll</span>
                    <ArrowDown size={20} />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
