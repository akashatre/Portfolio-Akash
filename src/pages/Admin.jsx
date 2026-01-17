import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
import { useWebsites } from '../context/WebsiteContext';
import { motion } from 'framer-motion';
import { Plus, Trash2, LogOut, Save, X, Briefcase, Globe } from 'lucide-react';
import '../SpaceTheme.css';

// Predefined gradients for user selection
const GRADIENTS = [
    { label: "Blue / Purple", value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
    { label: "Pink / Rose", value: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)" },
    { label: "Green / Teal", value: "linear-gradient(135deg, #0ba360 0%, #3cba92 100%)" },
    { label: "Blue / Cyan", value: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
    { label: "Orange / Red", value: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
    { label: "Dark / Gold", value: "linear-gradient(135deg, #434343 0%, black 100%)" }
];

const ICONS = ["BarChart2", "Globe", "Database", "Code", "Smartphone", "Layout", "ShoppingCart"];

const Admin = () => {
    const navigate = useNavigate();
    const { projects, addProject, deleteProject } = useProjects();
    const { websites, addWebsite, deleteWebsite } = useWebsites();

    const [activeTab, setActiveTab] = useState('projects'); // 'projects' or 'websites'
    const [showForm, setShowForm] = useState(false);

    // Form State (Shared Model)
    const [newItem, setNewItem] = useState({
        title: '',
        desc: '',
        tech: '',
        link: '',
        github: '',
        gradient: GRADIENTS[0].value,
        iconName: 'Code'
    });

    useEffect(() => {
        const isAuth = localStorage.getItem('isAuthenticated');
        if (!isAuth) {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const techArray = newItem.tech.split(',').map(t => t.trim());
        const itemData = { ...newItem, tech: techArray };

        if (activeTab === 'projects') {
            addProject(itemData);
        } else {
            addWebsite(itemData);
        }

        setShowForm(false);
        setNewItem({
            title: '',
            desc: '',
            tech: '',
            link: '',
            github: '',
            gradient: GRADIENTS[0].value,
            iconName: 'Code'
        });
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-color)', padding: '2rem' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1>Admin Dashboard</h1>
                    <button onClick={handleLogout} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '8px' }}>
                        <LogOut size={18} /> Logout
                    </button>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                    <button
                        className={`btn ${activeTab === 'projects' ? '' : 'btn-outline'}`}
                        onClick={() => setActiveTab('projects')}
                        style={{ padding: '0.8rem 1.5rem', background: activeTab === 'projects' ? 'var(--primary-color)' : 'transparent' }}
                    >
                        <Briefcase size={18} style={{ marginRight: '8px' }} /> Projects
                    </button>
                    <button
                        className={`btn ${activeTab === 'websites' ? '' : 'btn-outline'}`}
                        onClick={() => setActiveTab('websites')}
                        style={{ padding: '0.8rem 1.5rem', background: activeTab === 'websites' ? 'var(--primary-color)' : 'transparent' }}
                    >
                        <Globe size={18} style={{ marginRight: '8px' }} /> Websites
                    </button>
                </div>

                {/* Add Button */}
                {!showForm && (
                    <motion.button
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="btn"
                        onClick={() => setShowForm(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}
                    >
                        <Plus size={20} /> Add New {activeTab === 'projects' ? 'Project' : 'Website'}
                    </motion.button>
                )}

                {/* Add Form */}
                {showForm && (
                    <motion.div
                        className="glass-panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        style={{ padding: '2rem', marginBottom: '2rem', overflow: 'hidden' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <h3>Add New {activeTab === 'projects' ? 'Project' : 'Website'}</h3>
                            <button onClick={() => setShowForm(false)} style={{ background: 'none', color: 'white' }}><X /></button>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <input
                                    required
                                    placeholder="Title"
                                    value={newItem.title}
                                    onChange={e => setNewItem({ ...newItem, title: e.target.value })}
                                    className="admin-input"
                                />
                                <select
                                    value={newItem.iconName}
                                    onChange={e => setNewItem({ ...newItem, iconName: e.target.value })}
                                    className="admin-input"
                                >
                                    {ICONS.map(icon => <option key={icon} value={icon}>{icon} Icon</option>)}
                                </select>
                            </div>

                            <textarea
                                required
                                placeholder="Description"
                                rows="3"
                                value={newItem.desc}
                                onChange={e => setNewItem({ ...newItem, desc: e.target.value })}
                                className="admin-input"
                            />

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <input
                                    placeholder="Live Link"
                                    value={newItem.link}
                                    onChange={e => setNewItem({ ...newItem, link: e.target.value })}
                                    className="admin-input"
                                />
                                {activeTab === 'projects' && (
                                    <input
                                        placeholder="GitHub Link"
                                        value={newItem.github}
                                        onChange={e => setNewItem({ ...newItem, github: e.target.value })}
                                        className="admin-input"
                                    />
                                )}
                            </div>

                            <input
                                placeholder="Tech Stack (comma separated)"
                                value={newItem.tech}
                                onChange={e => setNewItem({ ...newItem, tech: e.target.value })}
                                className="admin-input"
                            />

                            {/* Color Theme only for Projects, or both? Let's leave for both for simplicity */}
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Color Theme</label>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {GRADIENTS.map((g, i) => (
                                        <div
                                            key={i}
                                            onClick={() => setNewItem({ ...newItem, gradient: g.value })}
                                            style={{
                                                width: '40px', height: '40px', borderRadius: '50%',
                                                background: g.value, cursor: 'pointer',
                                                border: newItem.gradient === g.value ? '3px solid white' : 'none'
                                            }}
                                            title={g.label}
                                        />
                                    ))}
                                </div>
                            </div>

                            <button type="submit" className="btn" style={{ marginTop: '1rem' }}>
                                <Save size={18} style={{ marginRight: '8px' }} /> Save
                            </button>
                        </form>
                    </motion.div>
                )}

                {/* List */}
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {(activeTab === 'projects' ? projects : websites).map(item => (
                        <div key={item.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '50px', height: '50px', borderRadius: '8px', background: item.gradient || '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{item.title ? item.title[0] : '?'}</span>
                                </div>
                                <div>
                                    <h4 style={{ margin: 0 }}>{item.title}</h4>
                                    <p className="text-muted" style={{ fontSize: '0.9rem', margin: 0 }}>{item.desc ? item.desc.substring(0, 60) : ''}...</p>
                                </div>
                            </div>
                            <button
                                onClick={() => activeTab === 'projects' ? deleteProject(item.id) : deleteWebsite(item.id)}
                                className="btn-outline"
                                style={{ borderColor: '#ef4444', color: '#ef4444', padding: '0.5rem' }}
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                    {(activeTab === 'websites' && websites.length === 0) && (
                        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
                            No websites added yet. This section will be hidden on the home page.
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .admin-input {
                    width: 100%;
                    padding: 0.8rem;
                    background: rgba(15, 23, 42, 0.6);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 8px;
                    color: white;
                    font-size: 1rem;
                }
                .admin-input:focus {
                    outline: none;
                    border-color: var(--primary-color);
                }
            `}</style>
        </div>
    );
};

export default Admin;
