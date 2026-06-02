import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, BookOpen, Activity } from 'lucide-react';
import './GitHubStats.css';

const GITHUB_USER = 'akashatre';

const StatCard = ({ icon, value, label, delay }) => (
    <motion.div
        className="gh-stat-card glass-panel"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
    >
        <div className="gh-stat-icon">{icon}</div>
        <div className="gh-stat-value">{value ?? '—'}</div>
        <div className="gh-stat-label">{label}</div>
    </motion.div>
);

const RepoCard = ({ repo, delay }) => (
    <motion.a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="gh-repo-card glass-panel"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
        whileHover={{ y: -4 }}
    >
        <div className="gh-repo-header">
            <BookOpen size={16} className="gh-repo-icon" />
            <span className="gh-repo-name">{repo.name}</span>
        </div>
        {repo.description && (
            <p className="gh-repo-desc">{repo.description}</p>
        )}
        <div className="gh-repo-meta">
            {repo.language && (
                <span className="gh-repo-lang">
                    <span className="gh-lang-dot" />
                    {repo.language}
                </span>
            )}
            <span className="gh-repo-stars">
                <Star size={13} /> {repo.stargazers_count}
            </span>
            <span className="gh-repo-forks">
                <GitFork size={13} /> {repo.forks_count}
            </span>
        </div>
    </motion.a>
);

const GitHubStats = () => {
    const [userData, setUserData] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userRes, reposRes] = await Promise.all([
                    fetch(`https://api.github.com/users/${GITHUB_USER}`),
                    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=6`)
                ]);
                if (!userRes.ok) throw new Error();
                const user = await userRes.json();
                const repoList = await reposRes.json();
                setUserData(user);
                setRepos(Array.isArray(repoList) ? repoList : []);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

    if (error) return null; // Hide section silently if API fails

    return (
        <section id="github">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">GitHub Activity</h2>
                    <div className="section-title-underline" />
                    <p className="section-subtitle">Live data from my GitHub profile.</p>
                </div>

                {loading ? (
                    <div className="gh-loading">
                        <div className="gh-spinner" />
                        <span>Fetching GitHub data...</span>
                    </div>
                ) : (
                    <>
                        {/* Stats Row */}
                        <div className="gh-stats-row">
                            <StatCard
                                icon={<BookOpen size={24} />}
                                value={userData?.public_repos}
                                label="Public Repos"
                                delay={0}
                            />
                            <StatCard
                                icon={<Star size={24} />}
                                value={totalStars}
                                label="Total Stars"
                                delay={0.1}
                            />
                            <StatCard
                                icon={<Activity size={24} />}
                                value={userData?.followers}
                                label="Followers"
                                delay={0.2}
                            />
                            <StatCard
                                icon={<Github size={24} />}
                                value={repos.length}
                                label="Recent Repos"
                                delay={0.3}
                            />
                        </div>

                        {/* GitHub Contribution Chart */}
                        <motion.div
                            className="gh-contrib-wrapper glass-panel"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h3 style={{ marginBottom: '1rem', fontSize: '1rem', color: 'var(--text-secondary)' }}>
                                Contribution Graph
                            </h3>
                            <img
                                src={`https://ghchart.rshah.org/FDC435/${GITHUB_USER}`}
                                alt="GitHub Contribution Chart"
                                className="gh-contrib-img"
                                onError={e => { e.target.style.display = 'none'; }}
                            />
                        </motion.div>

                        {/* Recent Repos */}
                        {repos.length > 0 && (
                            <>
                                <h3 style={{ margin: '2.5rem 0 1.25rem', fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
                                    Recent Repositories
                                </h3>
                                <div className="gh-repos-grid">
                                    {repos.map((repo, i) => (
                                        <RepoCard key={repo.id} repo={repo} delay={i * 0.07} />
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default GitHubStats;
