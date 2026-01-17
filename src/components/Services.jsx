import { motion } from 'framer-motion';
import { Database, BarChart, Server, CheckCircle2 } from 'lucide-react';
import './Services.css';

const services = [
    {
        icon: <Database size={32} />,
        title: "Data Engineering",
        desc: "Building robust, scalable pipelines to collect, clean, and store your data efficiently.",
        features: ["ETL Pipeline Automation", "Data Warehousing (AWS Redshift)", "API Integration", "SQL Optimization"]
    },
    {
        icon: <BarChart size={32} />,
        title: "Data Analysis & BI",
        desc: "Transforming raw numbers into visual stories that drive strategic business decisions.",
        features: ["Interactive Dashboards (Power BI)", "Trend Forecasting", "KPI Tracking", "Ad-hoc Reporting"]
    },
    {
        icon: <Server size={32} />,
        title: "Backend Development",
        desc: "Developing secure and performant APIs to power your data-driven applications.",
        features: ["Python/Django/FastAPI", "RESTful API Design", "Database Management", "Cloud Deployment"]
    }
];

const Services = () => {
    return (
        <section id="services" style={{ background: '#F9FAFB' }}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">How I Can Help</h2>
                    <p className="section-subtitle">Bridging the gap between raw data and business value.</p>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="service-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className="service-icon-wrapper">
                                {service.icon}
                            </div>
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-desc">{service.desc}</p>

                            <ul className="service-list">
                                {service.features.map((feature, i) => (
                                    <li key={i}>
                                        <CheckCircle2 size={18} className="check-icon" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
