import React from 'react';

const YoutubeIcon = ({ size = 16, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'home', label: 'DASHBOARD', icon: (size, color) => <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, color: 'var(--color-navy)' },
    { id: 'ai', label: 'AI MADE EASY', icon: (size, color) => <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v12"/><path d="M8 10h8"/></svg>, color: 'var(--color-teal)' },
    { id: 'yt', label: 'YT CREATORS', icon: (size, color) => <YoutubeIcon size={size} style={{ color }} />, color: 'var(--color-gold)' },
    { id: 'gaming', label: 'RETRO SIMULATOR', icon: (size, color) => <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 12h.01"/><path d="M16 12h.01"/><path d="M6 12h4"/><path d="M8 10v4"/></svg>, color: 'var(--color-navy)' },
  ];

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Sleek Professional Brand Logo */}
        <div className="navbar-logo-box" onClick={() => setActiveTab('home')}>
          <h1 className="navbar-logo-text">GNA ARENA</h1>
          <span className="badge">PORTAL PRO</span>
        </div>

        {/* Clean Academic Navigation Tabs */}
        <nav className="navbar-links">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`navbar-btn ${isActive ? 'active' : ''}`}
                style={isActive ? { borderBottomColor: item.color } : {}}
              >
                {item.icon(15, isActive ? item.color : 'var(--text-muted)')}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
