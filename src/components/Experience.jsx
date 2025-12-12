import { motion } from 'framer-motion';
import { Briefcase, Calendar, GraduationCap } from 'lucide-react';
import './Experience.css';

const experiences = [
    {
        type: 'work',
        role: "Data Analyst",
        company: "Thakral One, Bengaluru",
        period: "Nov 2024 - Present",
        desc: [
            "Designed and developed scalable data workflows for processing and transforming large datasets using Python and SQL.",
            "Created and maintained interactive dashboards and visualizations using Power BI to track performance metrics and KPIs.",
            "Optimized data reporting processes to improve decision-making speed and accuracy."
        ]
    },
    {
        type: 'edu',
        role: "Master of Computer Applications",
        company: "Jawaharlal Nehru Engineering College",
        period: "2022 - 2024",
        desc: ["Grade: First Class"]
    },
    {
        type: 'edu',
        role: "Bachelor of Science",
        company: "Shivchhatrapati College",
        period: "2019 - 2022",
        desc: ["Grade: First Class"]
    }
];

const Experience = () => {
    return (
        <section id="experience">
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                Experience & Education
            </motion.h2>

            <div className="timeline">
                {experiences.map((item, index) => (
                    <motion.div
                        key={index}
                        className="timeline-item"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="timeline-dot" style={{ borderColor: item.type === 'work' ? 'var(--primary-color)' : 'var(--secondary-color)' }}></div>
                        <div className="timeline-content">
                            <span className="timeline-date">
                                <Calendar size={16} /> {item.period}
                            </span>
                            <h3 className="timeline-role flex items-center gap-2">
                                {item.type === 'work' ? <Briefcase size={20} /> : <GraduationCap size={20} />}
                                {item.role}
                            </h3>
                            <h4 className="timeline-company">{item.company}</h4>
                            <div className="timeline-desc">
                                <ul>
                                    {item.desc.map((d, i) => (
                                        <li key={i}>{d}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
