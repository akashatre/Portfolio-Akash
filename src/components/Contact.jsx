import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [status, setStatus] = useState("idle"); // idle, submitting, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("submitting");

        const form = e.target;
        const data = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/mzdddqav", {
                method: "POST",
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setStatus("success");
                form.reset();
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <section id="contact">
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="section-header">
                    <h2 className="section-title">Let's Connect</h2>
                    <p className="section-subtitle">Have a project in mind? I'd love to hear from you.</p>
                </div>

                {status === "success" ? (
                    <motion.div
                        className="contact-success-message"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            maxWidth: '600px',
                            margin: '0 auto',
                            padding: '3rem',
                            background: 'white',
                            borderRadius: 'var(--radius-lg)',
                            boxShadow: 'var(--shadow-md)',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1rem',
                            border: '1px solid var(--border-color)'
                        }}
                    >
                        <div style={{
                            width: '60px', height: '60px',
                            background: 'var(--surface-highlight)',
                            borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#10B981', marginBottom: '0.5rem'
                        }}>
                            <CheckCircle size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontFamily: 'Playfair Display', margin: 0 }}>Message Sent!</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Thank you for reaching out. I'll get back to you as soon as possible!</p>

                        <button
                            onClick={() => setStatus("idle")}
                            style={{
                                marginTop: '1rem',
                                color: 'var(--primary-color)',
                                fontWeight: '700',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }}
                        >
                            Send another message
                        </button>
                    </motion.div>
                ) : (
                    <form
                        className="contact-simple-grid"
                        onSubmit={handleSubmit}
                    >
                        <div className="contact-input-group">
                            <input type="text" name="name" className="contact-input" placeholder=" " id="name" required disabled={status === "submitting"} />
                            <label htmlFor="name" className="contact-label">Name</label>
                        </div>

                        <div className="contact-input-group">
                            <input type="email" name="email" className="contact-input" placeholder=" " id="email" required disabled={status === "submitting"} />
                            <label htmlFor="email" className="contact-label">Email</label>
                        </div>

                        <div className="contact-input-group">
                            <textarea name="message" className="contact-textarea" placeholder=" " id="message" required disabled={status === "submitting"}></textarea>
                            <label htmlFor="message" className="contact-label">Message</label>
                        </div>

                        <button type="submit" className="contact-submit-btn" disabled={status === "submitting"}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {status === "submitting" ? "Sending..." : "Send Message"} <Send size={18} />
                            </span>
                        </button>

                        {status === "error" && (
                            <p style={{ color: '#ef4444', marginTop: '1rem', textAlign: 'center' }}>
                                Oops! There was a problem sending your message. Please try again.
                            </p>
                        )}
                    </form>
                )}
            </div>
        </section>
    );
};

export default Contact;
