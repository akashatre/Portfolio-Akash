import { motion } from 'framer-motion';
import { Code, Database, Cloud, BarChart2, Briefcase } from 'lucide-react';
import './Skills.css';

const skillsData = [
    {
        category: "Programming & Db",
        icon: <Code size={24} className="text-secondary" color="var(--secondary-color)" />,
        skills: ["Python", "SQL", "Pandas", "NumPy"]
    },
    {
        category: "Cloud (AWS)",
        icon: <Cloud size={24} className="text-primary" color="var(--primary-color)" />,
        skills: ["Lambda", "Step Functions", "S3", "IAM", "CloudWatch", "SNS"]
    },
    {
        category: "Data Visualization",
        icon: <BarChart2 size={24} className="text-accent" color="var(--accent-color)" />,
        skills: ["Power BI", "Matplotlib", "Seaborn"]
    },
    {
        category: "Tools & Others",
        icon: <Briefcase size={24} className="text-muted" color="var(--text-muted)" />,
        skills: ["Excel", "Git", "Jira", "VS Code", "Data Cleaning"]
    }
];

const Skills = () => {
    return (
        <section id="skills">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                Technical Foundation
            </motion.h2>

            <div className="skills-grid">
                {skillsData.map((category, index) => (
                    <motion.div
                        key={index}
                        className="skill-category"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <h3>{category.icon} {category.category}</h3>
                        <div className="skill-items">
                            {category.skills.map((skill, idx) => (
                                <span key={idx} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
