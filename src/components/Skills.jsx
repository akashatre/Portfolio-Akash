import { motion } from 'framer-motion';
import {
    Code, Database, Cloud, BarChart2, Briefcase,
    FileSpreadsheet, GitGraph, Trello, Terminal,
    Workflow, Shield, LineChart, PieChart, Layers
} from 'lucide-react';
import './Skills.css';

// Component for SimpleIcons (External SVG)
const SkillIcon = ({ name, color, slug }) => (
    <div className="skill-icon-img">
        <img
            src={`https://cdn.simpleicons.org/${slug}/${color.replace('#', '')}`}
            alt={name}
            width={20}
            height={20}
            onError={(e) => { e.target.style.display = 'none'; }} // Hide if broken
        />
    </div>
);

const skillsData = [
    {
        category: "Programming & Databases",
        icon: <Code size={28} color="var(--primary-color)" />,
        items: [
            { name: "Python", icon: <SkillIcon name="Python" slug="python" color="#3776AB" /> },
            { name: "SQL", icon: <Database size={20} color="#4479A1" /> }, // Switched to Lucide for reliability
            { name: "Pandas", icon: <SkillIcon name="Pandas" slug="pandas" color="#150458" /> },
            { name: "NumPy", icon: <SkillIcon name="NumPy" slug="numpy" color="#013243" /> }
        ]
    },
    {
        category: "Cloud (AWS)",
        icon: <Cloud size={28} color="var(--primary-color)" />,
        items: [
            { name: "Lambda", icon: <SkillIcon name="Lambda" slug="awslambda" color="#FF9900" /> },
            { name: "Step Functions", icon: <Workflow size={20} color="#FF9900" /> }, // Lucide Workflow
            { name: "S3", icon: <SkillIcon name="S3" slug="amazons3" color="#569A31" /> },
            { name: "IAM", icon: <Shield size={20} color="#232F3E" /> } // Lucide Shield
        ]
    },
    {
        category: "Data Visualization",
        icon: <BarChart2 size={28} color="var(--primary-color)" />,
        items: [
            { name: "Power BI", icon: <SkillIcon name="Power BI" slug="powerbi" color="#F2C811" /> },
            { name: "Matplotlib", icon: <LineChart size={20} color="#11557c" /> }, // Lucide LineChart
            { name: "Seaborn", icon: <PieChart size={20} color="#11557c" /> } // Lucide PieChart
        ]
    },
    {
        category: "Tools & Others",
        icon: <Briefcase size={28} color="var(--primary-color)" />,
        items: [
            { name: "Excel", icon: <FileSpreadsheet size={20} color="#217346" /> }, // Lucide FileSpreadsheet
            { name: "Git", icon: <SkillIcon name="Git" slug="git" color="#F05032" /> },
            { name: "Jira", icon: <Trello size={20} color="#0052CC" /> }, // Lucide Trello (similar to Jira)
            { name: "VS Code", icon: <SkillIcon name="VS Code" slug="visualstudiocode" color="#007ACC" /> }
        ]
    }
];

const Skills = () => {
    return (
        <section id="skills" style={{ background: '#F9FAFB' }}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Technical Expertise</h2>
                    <p className="section-subtitle">A robust arsenal of tools for data engineering and analysis.</p>
                </div>

                <div className="skills-grid">
                    {skillsData.map((category, index) => (
                        <motion.div
                            key={index}
                            className="skill-category-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="skill-category-header">
                                {category.icon}
                                <h3 className="skill-category-title">{category.category}</h3>
                            </div>

                            <div className="skill-items">
                                {category.items.map((skill, idx) => (
                                    <div key={idx} className="skill-tag">
                                        {skill.icon}
                                        <span>{skill.name}</span>
                                    </div>
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
