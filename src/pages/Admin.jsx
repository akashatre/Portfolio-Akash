import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
import { useWebsites } from '../context/WebsiteContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Trash2, LogOut, Save, X, Briefcase, Globe,
    Edit2, Image, AlertTriangle, Check
} from 'lucide-react';

const GRADIENTS = [
    { label: "Blue / Purple", value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
    { label: "Pink / Rose", value: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)" },
    { label: "Green / Teal", value: "linear-gradient(135deg, #0ba360 0%, #3cba92 100%)" },
    { label: "Blue / Cyan", value: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
    { label: "Orange / Red", value: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
    { label: "Dark / Gold", value: "linear-gradient(135deg, #434343 0%, black 100%)" },
];

const ICONS = ["BarChart2", "Globe", "Database", "Code", "Smartphone", "Layout", "ShoppingCart"];

const EMPTY_FORM = {
    title: '', desc: '', tech: '', link: '', github: '',
    gradient: GRADIENTS[0].value, iconName: 'Code', image: '',
    visible: true
};

const Admin = () => {
    const navigate = useNavigate();
    const { projects, addProject, deleteProject, updateProject } = useProjects();
    const { websites, addWebsite, deleteWebsite, updateWebsite } = useWebsites();

    const [activeTab, setActiveTab] = useState('projects');
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [deleteConfirm, setDeleteConfirm] = useState(null); // id to confirm delete
    const [saved, setSaved] = useState(false);
    
    // Resume link settings state
    const [adminResumeLink, setAdminResumeLink] = useState(() => {
        return localStorage.getItem('portfolio_resume_link') || "https://drive.google.com/file/d/14ahVsI7Z_BAmQBa1Y6vOIFHQAYhRFojo/view?usp=sharing";
    });

    const fileRef = useRef(null);

    useEffect(() => {
        const isAuth = localStorage.getItem('isAuthenticated');
        if (!isAuth) navigate('/login');
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/');
    };

    const handleSaveResume = () => {
        localStorage.setItem('portfolio_resume_link', adminResumeLink);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const openAdd = () => {
        setEditingId(null);
        setForm(EMPTY_FORM);
        setShowForm(true);
    };

    const openEdit = (item) => {
        setEditingId(item.id);
        setForm({
            title: item.title || '',
            desc: item.desc || '',
            tech: Array.isArray(item.tech) ? item.tech.join(', ') : item.tech || '',
            link: item.link || '',
            github: item.github || '',
            gradient: item.gradient || GRADIENTS[0].value,
            iconName: item.iconName || 'Code',
            image: item.image || '',
            visible: item.visible !== false // default to true if undefined
        });
        setShowForm(true);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => setForm(f => ({ ...f, image: ev.target.result }));
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const techArray = form.tech.split(',').map(t => t.trim()).filter(Boolean);
        const data = { ...form, tech: techArray };

        if (editingId) {
            if (activeTab === 'projects') updateProject(editingId, data);
            else updateWebsite(editingId, data);
        } else {
            if (activeTab === 'projects') addProject(data);
            else addWebsite(data);
        }

        setShowForm(false);
        setEditingId(null);
        setForm(EMPTY_FORM);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const confirmDelete = (id) => setDeleteConfirm(id);

    const executeDelete = () => {
        if (activeTab === 'projects') deleteProject(deleteConfirm);
        else deleteWebsite(deleteConfirm);
        setDeleteConfirm(null);
    };

    const items = activeTab === 'projects' ? projects : websites;

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-color)', padding: '2rem', color: 'var(--text-primary)' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.25rem', fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>Admin Dashboard</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            Manage your portfolio content & settings
                        </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {saved && (
                            <motion.span
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                style={{ color: '#22c55e', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.9rem', fontWeight: 700 }}
                            >
                                <Check size={16} /> Saved!
                            </motion.span>
                        )}
                        <button
                            onClick={handleLogout}
                            className="btn-outline"
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '8px' }}
                        >
                            <LogOut size={18} /> Logout
                        </button>
                    </div>
                </div>

                {/* Resume Settings Card */}
                <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontFamily: "'Cormorant Garamond', serif', serif", fontWeight: 400, color: 'var(--primary-color)', margin: 0 }}>
                        Resume Link Configuration
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                        Paste your updated Google Drive, OneDrive, or Dropbox Resume link here. This will automatically update all "Resume" buttons across the entire website.
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                        <input
                            type="text"
                            placeholder="https://drive.google.com/..."
                            value={adminResumeLink}
                            onChange={(e) => setAdminResumeLink(e.target.value)}
                            className="admin-input"
                            style={{ flexGrow: 1, minWidth: '280px' }}
                        />
                        <button
                            onClick={handleSaveResume}
                            className="btn"
                            style={{ padding: '0.6rem 1.5rem', borderRadius: '8px', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                        >
                            <Save size={16} /> Save Link
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
                    {['projects', 'websites'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => { setActiveTab(tab); setShowForm(false); }}
                            style={{
                                padding: '0.7rem 1.5rem',
                                borderRadius: '8px',
                                fontWeight: 700,
                                fontSize: '0.95rem',
                                background: activeTab === tab ? 'var(--primary-color)' : 'var(--surface-color)',
                                color: activeTab === tab ? 'var(--bg-color)' : 'var(--text-secondary)',
                                border: '1px solid var(--border-color)',
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {tab === 'projects' ? <Briefcase size={16} /> : <Globe size={16} />}
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            <span style={{
                                background: activeTab === tab ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.05)',
                                borderRadius: '999px',
                                padding: '0 0.5rem',
                                fontSize: '0.8rem',
                                color: activeTab === tab ? 'var(--bg-color)' : 'var(--text-primary)'
                            }}>
                                {tab === 'projects' ? projects.length : websites.length}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Add Button */}
                {!showForm && (
                    <button
                        onClick={openAdd}
                        className="btn"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}
                    >
                        <Plus size={18} /> Add New {activeTab === 'projects' ? 'Project' : 'Website'}
                    </button>
                )}

                {/* Form */}
                <AnimatePresence>
                    {showForm && (
                        <motion.div
                            className="glass-panel"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            style={{ padding: '2rem', marginBottom: '2rem' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.4rem', fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, margin: 0, color: 'var(--text-primary)' }}>
                                    {editingId ? 'Edit' : 'Add New'} {activeTab === 'projects' ? 'Project' : 'Website'}
                                </h3>
                                <button
                                    onClick={() => { setShowForm(false); setEditingId(null); }}
                                    style={{ background: 'none', color: 'var(--text-secondary)', display: 'flex', cursor: 'pointer' }}
                                >
                                    <X size={22} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <input
                                        required
                                        placeholder="Title"
                                        value={form.title}
                                        onChange={e => setForm({ ...form, title: e.target.value })}
                                        className="admin-input"
                                    />
                                    <select
                                        value={form.iconName}
                                        onChange={e => setForm({ ...form, iconName: e.target.value })}
                                        className="admin-input"
                                        style={{ height: '100%' }}
                                    >
                                        {ICONS.map(icon => <option key={icon} value={icon}>{icon} Icon</option>)}
                                    </select>
                                </div>

                                <textarea
                                    required
                                    placeholder="Description"
                                    rows="3"
                                    value={form.desc}
                                    onChange={e => setForm({ ...form, desc: e.target.value })}
                                    className="admin-input"
                                />

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <input
                                        placeholder="Live Link"
                                        value={form.link}
                                        onChange={e => setForm({ ...form, link: e.target.value })}
                                        className="admin-input"
                                    />
                                    {activeTab === 'projects' && (
                                        <input
                                            placeholder="GitHub Link"
                                            value={form.github}
                                            onChange={e => setForm({ ...form, github: e.target.value })}
                                            className="admin-input"
                                        />
                                    )}
                                </div>

                                <input
                                    placeholder="Tech Stack (comma separated: Python, SQL, AWS)"
                                    value={form.tech}
                                    onChange={e => setForm({ ...form, tech: e.target.value })}
                                    className="admin-input"
                                />

                                {/* Image Upload */}
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>
                                        Project Image (optional — overrides icon)
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                                        <button
                                            type="button"
                                            onClick={() => fileRef.current?.click()}
                                            className="btn-outline"
                                            style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                                        >
                                            <Image size={16} /> Upload Image
                                        </button>
                                        <input
                                            ref={fileRef}
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={handleImageUpload}
                                        />
                                        {form.image && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <img
                                                    src={form.image}
                                                    alt="preview"
                                                    style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setForm(f => ({ ...f, image: '' }))}
                                                    style={{ background: 'none', color: '#ef4444', cursor: 'pointer' }}
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Color Theme */}
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>
                                        Banner Color Theme
                                    </label>
                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                        {GRADIENTS.map((g, i) => (
                                            <div
                                                key={i}
                                                onClick={() => setForm({ ...form, gradient: g.value })}
                                                title={g.label}
                                                style={{
                                                    width: '36px', height: '36px',
                                                    borderRadius: '50%',
                                                    background: g.value,
                                                    cursor: 'pointer',
                                                    border: form.gradient === g.value ? '3px solid var(--text-primary)' : '2px solid transparent',
                                                    transition: 'transform 0.15s ease',
                                                    transform: form.gradient === g.value ? 'scale(1.2)' : 'scale(1)'
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Visibility Toggle Option */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.25rem 0' }}>
                                    <input
                                        id="item-visible-checkbox"
                                        type="checkbox"
                                        checked={form.visible !== false}
                                        onChange={e => setForm({ ...form, visible: e.target.checked })}
                                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                    />
                                    <label
                                        htmlFor="item-visible-checkbox"
                                        style={{ color: 'var(--text-primary)', fontSize: '0.92rem', cursor: 'pointer', fontWeight: 500 }}
                                    >
                                        Visible on Portfolio (uncheck to hide this item from public view)
                                    </label>
                                </div>

                                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                                    <button type="submit" className="btn" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Save size={16} /> {editingId ? 'Update' : 'Save'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setShowForm(false); setEditingId(null); }}
                                        className="btn-outline"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Delete Confirm Modal */}
                <AnimatePresence>
                    {deleteConfirm && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
                            }}
                            onClick={() => setDeleteConfirm(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                onClick={e => e.stopPropagation()}
                                className="glass-panel"
                                style={{ padding: '2rem', maxWidth: '400px', width: '90%', textAlign: 'center' }}
                            >
                                <AlertTriangle size={40} color="#f59e0b" style={{ margin: '0 auto 1rem' }} />
                                <h3 style={{ marginBottom: '0.5rem' }}>Delete this item?</h3>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                                    This cannot be undone.
                                </p>
                                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                                    <button
                                        onClick={executeDelete}
                                        style={{
                                            padding: '0.6rem 1.5rem', borderRadius: '8px', fontWeight: 700,
                                            background: '#ef4444', color: 'white', border: 'none', cursor: 'pointer'
                                        }}
                                    >
                                        Delete
                                    </button>
                                    <button onClick={() => setDeleteConfirm(null)} className="btn-outline" style={{ padding: '0.6rem 1.5rem' }}>
                                        Cancel
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Item List */}
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {items.map(item => (
                        <motion.div
                            key={item.id}
                            className="glass-panel"
                            layout
                            style={{ 
                                padding: '1.25rem', 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center', 
                                gap: '1rem',
                                opacity: item.visible === false ? 0.55 : 1 // Mute hidden items visually
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: 0 }}>
                                <div style={{
                                    width: '48px', height: '48px', borderRadius: '10px',
                                    background: item.gradient || '#333', flexShrink: 0,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    overflow: 'hidden'
                                }}>
                                    {item.image ? (
                                        <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'white' }}>
                                            {item.title?.[0] || '?'}
                                        </span>
                                    )}
                                </div>
                                <div style={{ minWidth: 0 }}>
                                    <h4 style={{ margin: 0, fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {item.title}
                                        {item.visible === false && (
                                            <span style={{ fontSize: '0.68rem', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-secondary)', padding: '1px 5px', borderRadius: '3px', border: '1px dashed var(--border-color)', fontWeight: 500 }}>
                                                Hidden
                                            </span>
                                        )}
                                    </h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {item.desc?.substring(0, 70)}...
                                    </p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                                <button
                                    onClick={() => openEdit(item)}
                                    className="btn-outline"
                                    style={{ padding: '0.5rem', borderRadius: '8px', display: 'flex' }}
                                    title="Edit"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    onClick={() => confirmDelete(item.id)}
                                    style={{
                                        padding: '0.5rem', borderRadius: '8px',
                                        border: '1.5px solid #ef4444', color: '#ef4444',
                                        background: 'transparent', cursor: 'pointer', display: 'flex'
                                    }}
                                    title="Delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                    {items.length === 0 && (
                        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '3rem' }}>
                            No {activeTab} yet. Click "Add New" to get started.
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .admin-input {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    background: var(--surface-color);
                    border: 1.5px solid var(--border-color);
                    border-radius: 8px;
                    color: var(--text-primary);
                    font-size: 0.95rem;
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    transition: border-color 0.2s;
                }
                .admin-input:focus {
                    outline: none;
                    border-color: var(--primary-color);
                }
                textarea.admin-input { resize: vertical; }
            `}</style>
        </div>
    );
};

export default Admin;
