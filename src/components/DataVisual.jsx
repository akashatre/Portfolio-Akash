import { motion } from 'framer-motion';
import './DataVisual.css';

const DataVisual = () => {
    return (
        <div className="data-visual-container">
            <div className="bar-graph">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bar"></div>
                ))}
            </div>

            {/* Floating Insights */}
            <motion.div
                className="floating-stats"
                style={{ top: '20%', left: '-10%' }}
                animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
            >
                SQL Queries: Optimized
            </motion.div>
            <motion.div
                className="floating-stats"
                style={{ bottom: '20%', right: '-10%' }}
                animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            >
                Accuracy: 99.8%
            </motion.div>
            <motion.div
                className="floating-stats"
                style={{ top: '10%', right: '10%' }}
                animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
            >
                ETL Pipe: Active
            </motion.div>
        </div>
    );
};

export default DataVisual;
