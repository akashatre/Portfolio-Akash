import { motion } from 'framer-motion';
import { ExternalLink, Github, BarChart2, Database, Globe } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import './Projects.css';

const projects = [
    {
        title: "HR Analytics Dashboard",
        desc: "Interactive Power BI dashboard to track employee performance, attrition risk, and productivity scores. Built with Python for data cleaning and SQL for data modeling.",
        tech: ["Power BI", "Python", "SQL", "Pandas"],
        link: "https://github.com/akashatre",
        github: "https://github.com/akashatre",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        icon: <BarChart2 size={48} color="white" />
    },
    {
        title: "E-commerce Sales Analytics",
        desc: "Comprehensive analytics solution for measuring KPIs like revenue, AOV, and customer retention. Utilized SQL for segmentation and Python for automation.",
        tech: ["Power BI", "SQL", "Python", "DAX"],
        link: "https://github.com/akashatre",
        github: "https://github.com/akashatre",
        gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
        icon: <Globe size={48} color="white" />
    },
    {
        title: "News Sentiment Analysis",
        desc: "Automated AWS workflow to analyze news sentiment using Lambda, Step Functions, and Comprehend. Stored results in S3 and SQL database.",
        tech: ["AWS", "Lambda", "Comprehend", "SQL"],
        link: "https://github.com/akashatre/News-Sentiment-Analysis",
        github: "https://github.com/akashatre/News-Sentiment-Analysis",
        gradient: "linear-gradient(135deg, #0ba360 0%, #3cba92 100%)",
        icon: <Database size={48} color="white" />
    },
    {
        title: "Config-based Data Pipeline",
        desc: "Dynamic data ingestion pipeline allowing configuration-based transformations and validation for scalable data processing.",
        tech: ["Python", "ETL", "JSON", "Cloud"],
        link: "https://github.com/akashatre/Configrarion-based-data-pipline",
        github: "https://github.com/akashatre/Configrarion-based-data-pipline",
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        icon: <Database size={48} color="white" />
    }
];

const Projects = () => {
    return (
        <section id="projects">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                Featured Projects
            </motion.h2>

            <div className="projects-grid">
                {projects.map((project, index) => (
                    <Tilt key={index} tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2500}>
                        <motion.div
                            className="project-card interactive"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="project-image" style={{ background: project.gradient }}>
                                {project.icon}
                            </div>
                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <div className="project-tech">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="tech-tag">{t}</span>
                                    ))}
                                </div>
                                <p className="project-desc">{project.desc}</p>
                                <div className="project-links">
                                    {project.link && (
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="link-btn">
                                            <ExternalLink size={18} /> Demo
                                        </a>
                                    )}
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="link-btn">
                                        <Github size={18} /> Code
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </Tilt>
                ))}
            </div>
        </section>
    );
};

export default Projects;
