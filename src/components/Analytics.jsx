import { motion } from 'framer-motion';
import { Coffee, Code2, GitCommit, Cpu, Activity, Zap } from 'lucide-react';
import './Analytics.css';

// Mock Data for the Bar Chart (Last 7 Days Activity)
const WEEKLY_DATA = [
    { day: 'Mon', value: 85, label: 'High' },
    { day: 'Tue', value: 60, label: 'Med' },
    { day: 'Wed', value: 95, label: 'Peak' },
    { day: 'Thu', value: 75, label: 'High' },
    { day: 'Fri', value: 90, label: 'High' },
    { day: 'Sat', value: 40, label: 'Low' },
    { day: 'Sun', value: 30, label: 'Rest' }
];

const Analytics = () => {
    return (
        <section id="analytics" style={{ background: '#F9FAFB' }}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Live Metrics</h2>
                    <p className="section-subtitle">Real-time insights into my development workflow.</p>
                </div>

                <motion.div
                    className="analytics-dashboard"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    {/* LEFT SIDEBAR STATS */}
                    <div className="analytics-sidebar">
                        <div className="metric-card">
                            <div className="metric-icon-box">
                                <Code2 size={20} />
                            </div>
                            <div className="metric-info">
                                <h4>Lines of Code</h4>
                                <motion.div
                                    className="metric-value"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                >
                                    125k+
                                </motion.div>
                            </div>
                        </div>

                        <div className="metric-card">
                            <div className="metric-icon-box">
                                <GitCommit size={20} />
                            </div>
                            <div className="metric-info">
                                <h4>Commits (2024)</h4>
                                <div className="metric-value">842</div>
                            </div>
                        </div>

                        <div className="metric-card">
                            <div className="metric-icon-box">
                                <Coffee size={20} />
                            </div>
                            <div className="metric-info">
                                <h4>Caffeine Level</h4>
                                <div className="metric-value">92%</div>
                            </div>
                        </div>
                    </div>

                    {/* MAIN CHART AREA */}
                    <div className="analytics-main">
                        <div className="chart-header">
                            <h3 className="chart-title">Weekly Coding Intensity</h3>
                            <div className="live-badge">
                                <div className="pulsing-dot"></div>
                                LIVE SYSTEM
                            </div>
                        </div>

                        {/* Custom CSS Bar Chart */}
                        <div className="bar-chart-container">
                            {WEEKLY_DATA.map((item, index) => (
                                <div key={index} className="chart-bar-wrapper">
                                    <div className="bar-tooltip">{item.label}: {item.value}%</div>
                                    <motion.div
                                        className="chart-bar"
                                        initial={{ height: '0%' }}
                                        whileInView={{ height: `${item.value}%` }}
                                        transition={{ duration: 1, delay: index * 0.1, ease: 'backOut' }}
                                    />
                                    <span className="bar-label">{item.day}</span>
                                </div>
                            ))}
                        </div>

                        {/* BOTTOM ROW: Simulated "System Status" Activity Grid */}
                        <div style={{ marginTop: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '600' }}>
                                <Activity size={16} /> Data Pipeline Status
                            </div>
                            <div className="activity-grid-container">
                                {Array.from({ length: 50 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="activity-box"
                                        initial={{ opacity: 0.3 }}
                                        animate={{
                                            opacity: [0.3, 1, 0.3],
                                            backgroundColor: Math.random() > 0.8 ? '#10B981' : (Math.random() > 0.6 ? '#F59E0B' : 'var(--surface-highlight)')
                                        }}
                                        transition={{
                                            duration: 2 + Math.random() * 3,
                                            repeat: Infinity,
                                            delay: Math.random() * 2
                                        }}
                                    />
                                ))}
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', marginTop: '0.5rem', color: 'var(--text-tertiary)' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div className="activity-box" style={{ background: '#10B981' }}></div> Active</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div className="activity-box" style={{ background: '#F59E0B' }}></div> Processing</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div className="activity-box" style={{ background: 'var(--surface-highlight)' }}></div> Idle</span>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Analytics;
