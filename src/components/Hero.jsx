import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import DataVisual from './DataVisual';
import './Hero.css';

const Hero = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    const texts = ["Data Analyst", "Data Engineer", "Visualizer"];

    useEffect(() => {
        const handleType = () => {
            const i = loopNum % texts.length;
            const fullText = texts[i];

            setText(isDeleting
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1)
            );

            setTypingSpeed(isDeleting ? 30 : 150);

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, typingSpeed]);

    return (
        <section id="home" className="hero-section">
            <div className="hero-background" />

            <div className="hero-container">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="greeting">Hello, I'm</span>
                    <h1 className="title">
                        Akash Atre <br />
                        <span className="text-gradient" style={{ minHeight: '1.2em', display: 'inline-block' }}>
                            {text}<span className="cursor">|</span>
                        </span>
                    </h1>
                    <h3 className="subtitle">Turning Raw Data into Insights</h3>
                    <p className="description">
                        Specializing in Python, SQL, Power BI, and Big Data technologies.
                        I help businesses make data-driven decisions through predictive modeling and interactive dashboards.
                    </p>

                    <div className="hero-buttons">
                        <a href="#projects" className="btn interactive">
                            View Projects
                        </a>
                        <a href="#contact" className="btn btn-outline interactive">
                            Contact Me
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    className="hero-visual"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="visual-wrapper" style={{ position: 'relative', width: '320px', height: '320px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {/* Replaced blob with 3D Data Visual */}
                        <DataVisual />
                    </div>
                </motion.div>
            </div>
            <style>{`
        .cursor {
          display: inline-block;
          margin-left: 2px;
          animation: blink 1s infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
        </section>
    );
};

export default Hero;
