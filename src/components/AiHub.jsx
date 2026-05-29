import React, { useState } from 'react';
import { Brain, Video, BookOpen, Calendar, PlusCircle, Check, CreditCard, Shield, ExternalLink } from 'lucide-react';

const CURATED_AI_RESOURCES = [
  {
    id: 'ai1',
    title: 'AI for Everyone: Core Foundations',
    desc: 'Master what AI is, its capabilities, limitations, and how it is transforming modern industries. Demystify Machine Learning, Deep Learning, and data strategies.',
    duration: '45 mins',
    tag: 'Introductory',
    videoUrl: 'https://www.youtube.com',
    thumb: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'ai2',
    title: 'Machine Learning Simplified',
    desc: 'Understand regression, classifications, cost functions, gradient descent, and training splits without complex mathematical hurdles.',
    duration: '1 hr 15 mins',
    tag: 'ML Core',
    videoUrl: 'https://www.youtube.com',
    thumb: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'ai3',
    title: 'Generative AI & LLM Foundations',
    desc: 'Deep dive into Large Language Models (LLMs), attention mechanisms, tokenization, embeddings, fine-tuning, and prompt engineering protocols.',
    duration: '1 hr 45 mins',
    tag: 'Generative AI',
    videoUrl: 'https://www.youtube.com',
    thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'ai4',
    title: 'Python for AI & Data Science',
    desc: 'The complete starting roadmap. Learn basic syntax, data structures, NumPy matrices, Pandas dataframes, and Jupyter environment setups.',
    duration: '2 hrs 5 mins',
    tag: 'Language Core',
    videoUrl: 'https://www.youtube.com',
    thumb: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop'
  }
];

const GENERAL_POSTS = [
  {
    id: 'p1',
    title: 'Supervised vs. Unsupervised Learning: Core Differences',
    author: 'Editorial Desk',
    date: 'May 28, 2026',
    readTime: '4 min read',
    category: 'Foundations',
    desc: 'Supervised learning works on labeled inputs to map inputs to outputs, while unsupervised learning uncovers hidden associations and clusterings in unlabeled data.'
  },
  {
    id: 'p2',
    title: 'Top 5 Practical Prompt Engineering Blueprints for Developers',
    author: 'Editorial Desk',
    date: 'May 22, 2026',
    readTime: '6 min read',
    category: 'Prompting',
    desc: 'Unlock elite outputs using Chain-of-Thought (CoT), structural JSON specifications, custom system roles, and Few-Shot training prompts.'
  }
];

export default function AiHub() {
  const [posts, setPosts] = useState(GENERAL_POSTS);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState('Tutorial');
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState(false);

  const handleAddPost = (e) => {
    e.preventDefault();
    if (!newTitle || !newDesc) return;
    const newPost = {
      id: `p_${Date.now()}`,
      title: newTitle,
      author: 'Portal Admin',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: '3 min read',
      category: newCategory,
      desc: newDesc
    };
    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewDesc('');
    setShowForm(false);
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <div className="tab-panel">
      {/* CHANNEL LOGO & HEADER */}
      <div className="card-glass channel-header-card">
        <div className="channel-avatar">
          <Brain size={40} style={{ color: 'white' }} />
        </div>
        <div>
          <span className="insight-tag" style={{ margin: 0, backgroundColor: 'var(--color-navy-glow)', color: 'var(--color-navy)' }}>
            OFFICIAL LEARNING CORE
          </span>
          <h2 className="channel-name">AI Made Easy Hub</h2>
          <p className="channel-sub">Master machine learning, deep neural nets, and prompt structures through professional, visual pathways.</p>
        </div>
      </div>

      <div style={styles.contentLayout}>
        {/* Left Side: Curated Foundational video resources */}
        <div>
          <div className="hub-section-header">
            <h3 className="hub-section-title">📚 Foundational Blueprints</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Select a visual roadmap syllabus below to master core AI foundations. Perfect for technical transition.
            </p>
          </div>

          <div className="resources-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {CURATED_AI_RESOURCES.map((res) => (
              <article className="resource-card" key={res.id}>
                <div className="resource-banner" style={{ backgroundImage: `url(${res.thumb})` }}>
                  <a href={res.videoUrl} target="_blank" rel="noopener noreferrer" className="play-badge">
                    <Video size={20} fill="white" />
                  </a>
                </div>
                <div className="resource-details">
                  <span className="resource-tag">{res.tag}</span>
                  <h4 className="resource-title">{res.title}</h4>
                  <p className="resource-desc">{res.desc}</p>
                  <div className="resource-footer">
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>⏱️ {res.duration}</span>
                    <a href={res.videoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>
                      <span>ACCESS</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Right Side: Paid Courses Coming Soon Card */}
        <div>
          <div className="card-glass" style={styles.premiumCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <CreditCard size={22} style={{ color: 'var(--color-teal)' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-navy)' }}>💎 Premium Paid Courses</h3>
            </div>
            
            <div style={styles.alertBox}>
              <Shield size={16} style={{ color: 'var(--color-teal)', flexShrink: 0 }} />
              <p style={{ fontSize: '0.8rem', color: 'var(--color-teal)', fontWeight: '600', lineHeight: '1.4' }}>
                Secure Razorpay Payment Gateway integration is currently in staging. Premium certifications will open shortly!
              </p>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              Gain enterprise-level credentials with our deep-dive custom bootcamps. Pre-register to lock in early supporter discounts.
            </p>

            <div style={styles.premiumList}>
              <div style={styles.premiumItem}>
                <div style={styles.premiumMeta}>
                  <span style={styles.premiumTitle}>Full-Stack AI Developer Pro</span>
                  <span style={styles.premiumCost}>Coming Soon</span>
                </div>
                <p style={styles.premiumDesc}>Includes private cohort mentorship, 1-on-1 resume feedback, and API token credits.</p>
              </div>

              <div style={styles.premiumItem}>
                <div style={styles.premiumMeta}>
                  <span style={styles.premiumTitle}>Advanced LLM & RAG Engineer</span>
                  <span style={styles.premiumCost}>Coming Soon</span>
                </div>
                <p style={styles.premiumDesc}>Includes GPU cluster run hours, fine-tuning methodologies, and enterprise vector indexes.</p>
              </div>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled>
              <span>PRE-REGISTER ACTIVE (SOON)</span>
            </button>
          </div>
        </div>
      </div>

      {/* RECENT POSTS SECTION */}
      <div style={{ marginTop: '5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={20} style={{ color: 'var(--color-navy)' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-navy)' }}>📖 Learn More: AI Lessons & Updates</h3>
          </div>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)} style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
            <PlusCircle size={14} />
            <span>{showForm ? 'CLOSE WRITER' : 'POST UPDATE'}</span>
          </button>
        </div>

        {/* Dynamic post writing form */}
        {showForm && (
          <form onSubmit={handleAddPost} className="card-glass" style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontWeight: '700', color: 'var(--color-navy)' }}>Publish New AI Content Update</h4>
            
            <div className="input-row">
              <div className="form-group">
                <label className="form-label">Update Title</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)} 
                  placeholder="e.g., Understanding Activation Functions"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Category Tag</label>
                <select className="form-select" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                  <option value="Tutorial">💡 Practical Tutorial</option>
                  <option value="Research">🔬 AI Research</option>
                  <option value="Career">💼 Career Guidance</option>
                  <option value="Announcement">📣 Announcement</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Summary / Description</label>
              <textarea 
                className="form-textarea" 
                rows="4" 
                value={newDesc} 
                onChange={(e) => setNewDesc(e.target.value)} 
                placeholder="Draft technical summaries, learning resources, or core announcements..."
                required
              />
            </div>

            <button type="submit" className="btn btn-teal" style={{ alignSelf: 'flex-start' }}>
              <span>PUBLISH POST</span>
            </button>
          </form>
        )}

        {/* Posts Timeline List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {posts.map((post) => (
            <div className="card-glass" key={post.id} style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="insight-tag" style={{ margin: 0, fontSize: '0.65rem' }}>{post.category}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>{post.readTime}</span>
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>{post.title}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem' }}>{post.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderTop: '1px solid var(--border-light)', paddingTop: '0.75rem' }}>
                <Calendar size={14} style={{ color: 'var(--text-muted)' }} />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>Posted on {post.date} by {post.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {toast && (
        <div className="toast-overlay">
          <Check size={16} />
          <span>Content posted successfully to GNA Arena AI Hub!</span>
        </div>
      )}
    </div>
  );
}

const styles = {
  contentLayout: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: '2.5rem',
  },
  premiumCard: {
    borderTop: '4px solid var(--color-teal)',
    padding: '2rem',
  },
  alertBox: {
    backgroundColor: '#f0fdfa',
    border: '1px solid #ccfbf1',
    borderRadius: '8px',
    padding: '0.85rem 1rem',
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'flex-start',
    marginBottom: '1.25rem',
  },
  premiumList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  premiumItem: {
    borderBottom: '1px solid var(--border-light)',
    paddingBottom: '0.75rem',
  },
  premiumMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.25rem',
  },
  premiumTitle: {
    fontSize: '0.85rem',
    fontWeight: '800',
    color: 'var(--color-navy)',
  },
  premiumCost: {
    fontSize: '0.7rem',
    fontWeight: '800',
    color: 'var(--color-teal)',
    backgroundColor: '#f0fdfa',
    padding: '0.15rem 0.4rem',
    borderRadius: '4px',
    textTransform: 'uppercase',
  },
  premiumDesc: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.4',
  },
};
