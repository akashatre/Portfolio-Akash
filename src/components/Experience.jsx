import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Building2, Calendar } from 'lucide-react';
import './Experience.css';

const workData = [
    {
        role: "Data Analyst",
        company: "Thakral One",
        period: "Nov 2024 - Present",
        desc: [
            "Designed and developed scalable data workflows for processing and transforming large datasets using Python and SQL.",
            "Created and maintained interactive dashboards and visualizations using Power BI to track performance metrics and KPIs.",
            "Optimized data reporting processes to improve decision-making speed and accuracy."
        ],
        stack: ["Python", "SQL", "Power BI", "ETL"]
    }
];

const eduData = [
    {
        degree: "Master of Computer Applications",
        school: "Jawaharlal Nehru Engineering College",
        year: "2022 - 2024",
        grade: "First Class"
    },
    {
        degree: "Bachelor of Science (CS)",
        school: "Shivchhatrapati College",
        year: "2019 - 2022",
        grade: "First Class"
    }
];

const Experience = () => {
    return (
        <section id="experience" style={{ background: '#F9FAFB' }}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Career Path</h2>
                    <p className="section-subtitle">My professional and academic milestones.</p>
                </div>

                <div className="experience-section-container">

                    {/* LEFT COLUMN: WORK EXPERIENCE */}
                    <div className="work-column">
                        <motion.div
                            className="column-header"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="column-icon-box">
                                <Briefcase size={24} />
                            </div>
                            <h3 className="column-title">Work Experience</h3>
                        </motion.div>

                        <div className="work-list">
                            {workData.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="work-card"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="work-header">
                                        <div>
                                            <h4 className="work-role">{item.role}</h4>
                                            <span className="work-company">
                                                <Building2 size={16} /> {item.company}
                                            </span>
                                        </div>
                                        <span className="work-period">{item.period}</span>
                                    </div>

                                    <ul className="work-desc">
                                        {item.desc.map((d, i) => (
                                            <li key={i}>{d}</li>
                                        ))}
                                    </ul>

                                    <div className="work-tech-stack">
                                        {item.stack.map((t, i) => (
                                            <span key={i} className="work-tag">{t}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: EDUCATION */}
                    <div className="edu-column">
                        <motion.div
                            className="column-header"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="column-icon-box" style={{ background: 'var(--surface-color)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}>
                                <GraduationCap size={24} />
                            </div>
                            <h3 className="column-title">Education</h3>
                        </motion.div>

                        <div className="edu-list">
                            {eduData.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="edu-item"
                                    initial={{ opacity: 0, x: 10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + (index * 0.1) }}
                                    viewport={{ once: true }}
                                >
                                    <div className="edu-dot"></div>
                                    <div className="edu-card">
                                        <h4 className="edu-degree">{item.degree}</h4>
                                        <div className="edu-school">{item.school}</div>
                                        <div className="edu-meta">
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                <Calendar size={14} /> {item.year}
                                            </span>
                                            <span className="edu-grade">{item.grade}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Experience;
