import React from 'react';
import { Home, Brain, Gamepad2 } from 'lucide-react';

const YoutubeIcon = ({ size = 20, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'home', label: 'DASHBOARD', icon: Home, color: 'var(--color-navy)' },
    { id: 'ai', label: 'AI MADE EASY', icon: Brain, color: 'var(--color-teal)' },
    { id: 'yt', label: 'YT CREATORS', icon: YoutubeIcon, color: 'var(--color-gold)' },
    { id: 'gaming', label: 'RETRO SIMULATOR', icon: Gamepad2, color: 'var(--color-navy)' },
  ];

  return (
    <header style={styles.header}>
      <div style={styles.navContainer}>
        {/* Sleek Professional Brand Logo */}
        <div style={styles.logoBox} onClick={() => setActiveTab('home')}>
          <h1 style={styles.logoText}>GNA ARENA</h1>
          <span style={styles.badge}>PORTAL PRO</span>
        </div>

        {/* Clean Academic Navigation Tabs */}
        <nav style={styles.navLinks}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  ...styles.navBtn,
                  color: isActive ? 'var(--color-navy)' : 'var(--text-secondary)',
                  borderBottom: isActive ? `3px solid ${item.color}` : '3px solid transparent',
                  background: isActive ? '#f1f5f9' : 'transparent',
                  fontWeight: isActive ? '800' : '600',
                }}
              >
                <Icon size={16} style={{ color: isActive ? item.color : 'var(--text-muted)', transition: 'color 0.15s' }} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

const styles = {
  header: {
    padding: '0.85rem 1.5rem',
    background: 'var(--bg-secondary)',
    borderBottom: '1px solid var(--border-light)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 4px rgba(15, 23, 42, 0.02)',
  },
  navContainer: {
    maxWidth: '1300px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1.5rem',
    flexWrap: 'wrap',
  },
  logoBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.65rem',
    cursor: 'pointer',
  },
  logoText: {
    fontSize: '1.2rem',
    fontWeight: '900',
    color: 'var(--color-navy)',
    letterSpacing: '-0.5px',
  },
  badge: {
    fontSize: '0.6rem',
    fontWeight: '800',
    color: 'var(--color-teal)',
    border: '1px solid rgba(0, 128, 128, 0.2)',
    borderRadius: '4px',
    padding: '0.1rem 0.35rem',
    letterSpacing: '0.5px',
    background: '#f0fdfa',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  },
  navBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.45rem',
    padding: '0.75rem 1rem',
    borderRadius: '6px 6px 0 0',
    fontFamily: 'inherit',
    fontSize: '0.8rem',
    letterSpacing: '0.5px',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s ease-in-out',
    outline: 'none',
  },
};
