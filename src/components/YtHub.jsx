import React from 'react';
import { Video, BookOpen, ExternalLink, Play, CreditCard, Shield } from 'lucide-react';

const YoutubeIcon = ({ size = 40, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const CURATED_CREATOR_RESOURCES = [
  {
    id: 'yt1',
    title: 'YouTube Algorithm Decoded',
    desc: 'Unlock how the search and discovery system recommends videos. Learn to optimize Click-Through Rate (CTR), Average View Duration (AVD), and retention dynamics.',
    duration: '50 mins',
    tag: 'Algorithm Mastery',
    videoUrl: 'https://www.youtube.com',
    thumb: 'https://images.unsplash.com/photo-1547658719-da2b81169d42?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'yt2',
    title: 'Retention-Focused Video Editing Bootcamp',
    desc: 'Master the technical workflows of Premiere Pro & DaVinci Resolve. Learn fast-pacing, visual anchors, overlays, sound design, and retention hacks.',
    duration: '1 hr 35 mins',
    tag: 'Video Production',
    videoUrl: 'https://www.youtube.com',
    thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'yt3',
    title: 'High-Retention Scriptwriting & Storytelling',
    desc: 'Write scripts that hook viewers in the first 10 seconds. Implement the Hook-Body-Payoff structure, tension loops, and satisfying conclusions.',
    duration: '1 hr 10 mins',
    tag: 'Creative Writing',
    videoUrl: 'https://www.youtube.com',
    thumb: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'yt4',
    title: 'Thumbnail Visual Design & Click SEO secrets',
    desc: 'Create thumbnails that stand out in crowded feeds. Master visual contrast, emotional triggers, rule-of-thirds framing, and titles optimization.',
    duration: '45 mins',
    tag: 'Visual Identity',
    videoUrl: 'https://www.youtube.com',
    thumb: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop'
  }
];

export default function YtHub() {
  return (
    <div className="tab-panel">
      {/* CHANNEL LOGO & HEADER */}
      <div className="card-glass channel-header-card">
        <div className="channel-avatar" style={{ backgroundColor: 'var(--color-gold)' }}>
          <YoutubeIcon size={40} style={{ color: 'white' }} />
        </div>
        <div>
          <span className="insight-tag" style={{ margin: 0, backgroundColor: 'var(--color-gold-glow)', color: 'var(--color-gold)' }}>
            CREATOR ACADEMY CORE
          </span>
          <h2 className="channel-name">YT Creators Hub</h2>
          <p className="channel-sub">Access premium resources on how to learn, edit, write scripts, and grow rapidly on YouTube.</p>
        </div>
      </div>

      <div className="hub-split-layout">
        {/* Left Side: Vikas Telugu Tech Playlist grid */}
        <div>
          <div className="hub-section-header">
            <h3 className="hub-section-title">📺 Masterclass Syllabus</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Study how to compile retention-based video assets, design triggers, and scale organic channels.
            </p>
          </div>

          <div className="resources-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {CURATED_CREATOR_RESOURCES.map((res) => (
              <article className="resource-card" key={res.id}>
                <div className="resource-banner" style={{ backgroundImage: `url(${res.thumb})` }}>
                  <a href={res.videoUrl} target="_blank" rel="noopener noreferrer" className="play-badge" style={{ backgroundColor: 'var(--color-gold)' }}>
                    <Play size={20} fill="white" />
                  </a>
                </div>
                <div className="resource-details">
                  <span className="resource-tag" style={{ color: 'var(--color-gold)' }}>{res.tag}</span>
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

        {/* Right Side: Paid Masterclasses Placeholder */}
        <div>
          <div className="card-glass" style={styles.premiumCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <CreditCard size={22} style={{ color: 'var(--color-gold)' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-navy)' }}>💎 Premium Creator Courses</h3>
            </div>
            
            <div style={styles.alertBox}>
              <Shield size={16} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
              <p style={{ fontSize: '0.8rem', color: 'var(--color-gold)', fontWeight: '600', lineHeight: '1.4' }}>
                Secure Razorpay Payment Gateway integration is currently in staging. Premium mastermind slots will open shortly!
              </p>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              Accelerate your growth path with professional analytics, cohort thumbnail audits, and editing reviews.
            </p>

            <div style={styles.premiumList}>
              <div style={styles.premiumItem}>
                <div style={styles.premiumMeta}>
                  <span style={styles.premiumTitle}>YouTube Scriptwriting & Editing Academy</span>
                  <span style={styles.premiumCost}>Coming Soon</span>
                </div>
                <p style={styles.premiumDesc}>Includes full-pacing sound packs, project assets, and structured hook reviews.</p>
              </div>

              <div style={styles.premiumItem}>
                <div style={styles.premiumMeta}>
                  <span style={styles.premiumTitle}>YouTube Niche Scaling & Strategy</span>
                  <span style={styles.premiumCost}>Coming Soon</span>
                </div>
                <p style={styles.premiumDesc}>Includes competitor analysis algorithms, thumbnail visual audits, and monetization secrets.</p>
              </div>
            </div>

            <button className="btn btn-gold" style={{ width: '100%', marginTop: '1rem' }} disabled>
              <span>PRE-REGISTER ACTIVE (SOON)</span>
            </button>
          </div>
        </div>
      </div>
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
    borderTop: '4px solid var(--color-gold)',
    padding: '2rem',
  },
  alertBox: {
    backgroundColor: '#fffbeb',
    border: '1px solid #fef3c7',
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
    color: 'var(--color-gold)',
    backgroundColor: '#fffbeb',
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
