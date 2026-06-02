import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import './Projects.css';

const NUMS = ['01','02','03','04','05'];

const ProjectRow = ({ project, index }) => (
    <motion.div
        className="proj-row"
        initial={{ opacity:0, y:20 }}
        whileInView={{ opacity:1, y:0 }}
        transition={{ duration:0.5, delay:index*0.08, ease:[0.16,1,0.3,1] }}
        viewport={{ once:true, margin:'-40px' }}
    >
        <span className="proj-num">{NUMS[index] || `0${index+1}`}</span>

        <div className="proj-main">
            <h3 className="proj-title">{project.title}</h3>
            <p className="proj-desc">{project.desc}</p>
        </div>

        <div className="proj-tags">
            {project.tech.slice(0,3).map((t,i) => (
                <span key={i} className="proj-tag">{t}</span>
            ))}
        </div>

        <div className="proj-links">
            {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="proj-link" title="GitHub">
                    <Github size={16} />
                </a>
            )}
            {project.link && project.link !== project.github && (
                <a href={project.link} target="_blank" rel="noopener noreferrer"
                    className="proj-link" title="Live">
                    <ArrowUpRight size={16} />
                </a>
            )}
        </div>
    </motion.div>
);

const Projects = () => {
    const { projects } = useProjects();
    const visibleProjects = projects.filter(p => p.visible !== false);
    return (
        <section id="projects" className="projects-section">
            <div className="container">
                <motion.div className="section-header"
                    initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                    transition={{ duration:0.5 }} viewport={{ once:true }}>
                    <span className="section-eyebrow">PORTFOLIO</span>
                    <h2 className="section-title">Latest Projects</h2>
                    <p className="section-subtitle">A collection of data analytics software, pipelines, and tools.</p>
                </motion.div>

                <div className="proj-list">
                    {visibleProjects.map((p, i) => <ProjectRow key={p.id||i} project={p} index={i} />)}
                </div>
            </div>
        </section>
    );
};

export default Projects;
