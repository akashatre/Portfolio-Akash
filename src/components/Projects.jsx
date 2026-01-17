import { motion } from 'framer-motion';
import { ExternalLink, Database, BarChart2, Globe, Code, Smartphone, Layout } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import './Projects.css';

const ICON_MAP = {
    "BarChart2": <BarChart2 size={80} />,
    "Globe": <Globe size={80} />,
    "Database": <Database size={80} />,
    "Code": <Code size={80} />,
    "Smartphone": <Smartphone size={80} />,
    "Layout": <Layout size={80} />
};

const Projects = () => {
    const { projects } = useProjects();

    return (
        <section id="projects">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Projects</h2>
                    <div style={{ width: '60px', height: '4px', background: 'var(--primary-color)', margin: '0.5rem auto 1rem' }}></div>
                    <p className="section-subtitle">A selection of my recent work.</p>
                </div>

                <div className="projects-list">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id || index}
                            className="project-item"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {/* Visual Side */}
                            <div className="project-visual">
                                <div className="project-bg-shape"></div>
                                <div className="project-icon-large">
                                    {ICON_MAP[project.iconName] || <Code size={80} />}
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-desc">{project.desc}</p>

                                <div className="project-tags">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="tech-tag">{t}</span>
                                    ))}
                                </div>

                                {project.link && (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                                        View Project
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
