import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Database, Cloud, BarChart2, Briefcase, FileSpreadsheet, Workflow, Shield, LineChart, PieChart, GitBranch, Table } from 'lucide-react';
import './Skills.css';

const skillsData = [
    { 
        category: "Programming & Data",
        icon: <Code size={20} />,
        skills: ["Python", "SQL", "Pandas", "NumPy", "PostgreSQL", "Data Structs"]
    },
    { 
        category: "Data Visualization",
        icon: <BarChart2 size={20} />,
        skills: ["Power BI", "Excel", "Matplotlib", "Seaborn", "Dashboard UI", "DAX Formulas"]
    },
    { 
        category: "Cloud & DevOps",
        icon: <Cloud size={20} />,
        skills: ["AWS Lambda", "AWS S3", "AWS Step Functions", "Git & GitHub", "CloudWatch", "FastAPI"]
    },
    { 
        category: "Analysis & Reporting",
        icon: <Briefcase size={20} />,
        skills: ["KPI Reporting", "EDA", "Data Cleaning", "Business Analytics", "Trend Forecasting", "Stakeholder Demos"]
    }
];

const Skills = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <section id="skills" className="skills-section" ref={ref}>
            <div className="container">
                <motion.div 
                    className="section-header" 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5 }} 
                    viewport={{ once: true }}
                >
                    <span className="section-eyebrow">ABILITIES</span>
                    <h2 className="section-title">Technical Expertise</h2>
                    <p className="section-subtitle">A curated set of technologies, tools, and methodologies I work with daily.</p>
                </motion.div>

                <div className="skills-grid">
                    {skillsData.map((cat, i) => (
                        <motion.div 
                            key={i} 
                            className="skill-category-card"
                            initial={{ opacity: 0, y: 20 }} 
                            whileInView={{ opacity: 1, y: 0 }} 
                            transition={{ duration: 0.5, delay: i * 0.1 }} 
                            viewport={{ once: true, margin: '-40px' }}
                        >
                            <div className="skill-category-header">
                                <div className="skill-cat-icon">{cat.icon}</div>
                                <h3 className="skill-category-title">{cat.category}</h3>
                            </div>
                            
                            <div className="skill-tags-container">
                                {cat.skills.map((skill, j) => (
                                    <span key={j} className="skill-badge">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
