import { motion } from 'framer-motion';
import { Award, BookOpen, Briefcase, Code, Linkedin, Github, Mail } from 'lucide-react';
import { CodeWindow } from './CodeWindow';
import './About.css';

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="about-header">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    About Me
                </motion.h2>
            </div>

            <div className="about-grid-modern">
                {/* Left Column: Sticky Profile Card */}
                <motion.div
                    className="profile-card-modern"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="profile-img-frame">
                        <img src="/profile.png" alt="Akash Atre" />
                    </div>
                    <h3 className="profile-name">Akash Atre</h3>
                    <span className="profile-tag">Data Analyst & Engineer</span>

                    <div className="social-links-row">
                        <a href="https://linkedin.com" className="social-icon-btn"><Linkedin size={20} /></a>
                        <a href="https://github.com" className="social-icon-btn"><Github size={20} /></a>
                        <a href="mailto:email@example.com" className="social-icon-btn"><Mail size={20} /></a>
                    </div>
                </motion.div>

                {/* Right Column: Bio & Content */}
                <div className="bio-wrapper">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <p className="bio-text-modern">
                            I am a skilled <span className="highlight">Data Analyst</span> and Engineer with expertise in building scalable data pipelines, ETL processes, and big data solutions.
                            With a strong foundation in <span className="highlight">Python</span>, <span className="highlight">SQL</span>, and <span className="highlight">AWS</span>,
                            I enjoy diving deep into data, building interactive dashboards, and uncovering patterns that support strategic goals.
                        </p>

                        {/* Stats Row */}
                        <div className="stats-grid-modern">
                            <div className="stat-box">
                                <span className="stat-val">1+</span>
                                <span className="stat-key">Years Exp.</span>
                            </div>
                            <div className="stat-box">
                                <span className="stat-val">5+</span>
                                <span className="stat-key">Projects</span>
                            </div>
                            <div className="stat-box">
                                <span className="stat-val">10+</span>
                                <span className="stat-key">Tech Stack</span>
                            </div>
                            <div className="stat-box">
                                <span className="stat-val">MCA</span>
                                <span className="stat-key">Master's</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Integrated Code Window */}
                    <motion.div
                        className="window-wrapper"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <CodeWindow />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
