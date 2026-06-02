import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Experience.css';

const experienceData = [
    {
        period: "Nov 2024 — Present",
        role: "Data Analyst",
        organization: "Thakral One",
        location: "Bengaluru, India",
        description: "Build interactive Power BI dashboards, write complex SQL queries, and automate workflows using Python (Pandas, NumPy). Improved data pipeline accuracy and reduced manual reporting efforts.",
        skills: ["Power BI", "SQL", "Python", "ETL Automation"]
    },
    {
        period: "Jan 2024 — Nov 2024",
        role: "Intern – Data Analyst",
        organization: "Kalavati Technologies",
        location: "Chh. Sambhajinagar, India",
        description: "Assisted in data cleansing operations, schema mapping, and reports compiling using Excel, Python, and SQL to support business intelligence functions.",
        skills: ["SQL", "Python", "Excel", "Data Cleaning"]
    }
];

const educationData = [
    {
        period: "2022 — 2024",
        degree: "Master of Computer Applications (MCA)",
        institution: "Jawaharlal Nehru Engineering College",
        details: "MGM University · First Class Grade",
        description: "Focused on database management systems, cloud infrastructure architectures, and data structure algorithms."
    },
    {
        period: "2019 — 2022",
        degree: "Bachelor of Science (Computer Science)",
        institution: "Shivchhatrapati College",
        details: "Dr. BAMU University · First Class Grade",
        description: "Learned foundational programming principles, relational database management systems, and mathematics."
    }
];

const ExperienceRow = ({ period, title, subtitle, details, description, skills, delay }) => {
    return (
        <motion.div 
            className="experience-table-row"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
        >
            <div className="exp-col-period">{period}</div>
            <div className="exp-col-role">
                <h3 className="exp-role-title">{title}</h3>
                <span className="exp-role-sub">{subtitle} {details && `· ${details}`}</span>
            </div>
            <div className="exp-col-desc">
                <p className="exp-desc-text">{description}</p>
                {skills && (
                    <div className="exp-skills">
                        {skills.map((s, i) => (
                            <span key={i} className="exp-skill-tag">{s}</span>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

const Experience = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <section id="experience" className="experience-section" ref={ref}>
            <div className="container">
                <motion.div 
                    className="section-header" 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5 }} 
                    viewport={{ once: true }}
                >
                    <span className="section-eyebrow">RESUME</span>
                    <h2 className="section-title">Education &amp; Experience</h2>
                    <p className="section-subtitle">A chronological summary of my academic history and professional career.</p>
                </motion.div>

                <div className="experience-tables-container">
                    
                    {/* SECTION: Work */}
                    <div className="exp-table-group">
                        <h3 className="exp-table-group-title">Work Experience</h3>
                        <div className="experience-table">
                            {experienceData.map((exp, i) => (
                                <ExperienceRow 
                                    key={i}
                                    period={exp.period}
                                    title={exp.role}
                                    subtitle={exp.organization}
                                    details={exp.location}
                                    description={exp.description}
                                    skills={exp.skills}
                                    delay={i * 0.1}
                                />
                            ))}
                        </div>
                    </div>

                    {/* SECTION: Education */}
                    <div className="exp-table-group">
                        <h3 className="exp-table-group-title">Education</h3>
                        <div className="experience-table">
                            {educationData.map((edu, i) => (
                                <ExperienceRow 
                                    key={i}
                                    period={edu.period}
                                    title={edu.degree}
                                    subtitle={edu.institution}
                                    details={edu.details}
                                    description={edu.description}
                                    delay={i * 0.1}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Experience;
