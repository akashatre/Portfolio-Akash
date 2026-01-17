import './TechMarquee.css';

const TECH_STACK = [
    "Python", "SQL", "Power BI", "AWS Lambda", "Pandas", "NumPy", "TensorFlow", "React", "Data Engineering", "ETL Pipelines", "Git", "Docker"
];

const TechMarquee = () => {
    // Duplicate list to create seamless loop
    const marqueeItems = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK];

    return (
        <div className="tech-marquee-section">
            <div className="marquee-container">
                {marqueeItems.map((item, index) => (
                    <div key={index} className="marquee-item">
                        {item} <div className="marquee-dot"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TechMarquee;
