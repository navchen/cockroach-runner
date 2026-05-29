import React, { useState, useEffect } from 'react';
import { Gamepad2, Award, Zap, Shield, Info, Play, X, User } from 'lucide-react';

export default function GamingHub() {
  const [highScore, setHighScore] = useState(0);
  const [bulbsCount, setBulbsCount] = useState(0);
  const [activeSkin, setActiveSkin] = useState('default');
  const [hasShield, setHasShield] = useState(false);
  const [hasMagnet, setHasMagnet] = useState(false);
  const [isPlayingGame, setIsPlayingGame] = useState(false);

  // Sync retro game statistics from LocalStorage
  const loadGameStats = () => {
    try {
      const savedHighScore = localStorage.getItem('cr_high_score');
      const savedBulbs = localStorage.getItem('cr_bulbs');
      const equippedSkin = localStorage.getItem('cr_equipped_skin');
      const upgradeShield = localStorage.getItem('cr_upgrade_shield');
      const upgradeMagnet = localStorage.getItem('cr_upgrade_magnet');

      if (savedHighScore) setHighScore(parseInt(savedHighScore, 10));
      if (savedBulbs) setBulbsCount(parseInt(savedBulbs, 10));
      if (equippedSkin) setActiveSkin(equippedSkin);
      if (upgradeShield === 'true') setHasShield(true);
      if (upgradeMagnet === 'true') setHasMagnet(true);
    } catch (e) {
      console.warn('LocalStorage reads bypassed or blocked.', e);
    }
  };

  useEffect(() => {
    loadGameStats();
    const interval = setInterval(loadGameStats, 3000);

    const handleMessage = (e) => {
      if (e.data && e.data.type === 'close_game_modal') {
        setIsPlayingGame(false);
        loadGameStats();
      }
    };
    window.addEventListener('message', handleMessage);

    return () => {
      clearInterval(interval);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const mockLeaderboard = [
    { rank: 1, name: 'ByteSizedBeast', score: 8520, date: 'May 24, 2026' },
    { rank: 2, name: 'RoachRampage', score: 6240, date: 'May 28, 2026' },
    { rank: 3, name: 'GNA_RoachMaster', score: 4890, date: 'May 20, 2026' },
    { rank: 4, name: 'YOU (Personal Best)', score: highScore, isUser: true, date: 'Live Sync' },
    { rank: 5, name: 'MasalaChaiRunner', score: 2950, date: 'May 22, 2026' },
    { rank: 6, name: 'CyberBugDodge', score: 1840, date: 'May 27, 2026' }
  ].sort((a, b) => b.score - a.score);

  // Recompute visual rank coordinates after sorting
  let rankCounter = 1;
  const sortedLeaderboard = mockLeaderboard.map((player) => {
    const item = { ...player, displayRank: rankCounter };
    rankCounter++;
    return item;
  });

  const getSkinName = (skin) => {
    switch (skin) {
      case 'vip': return 'Beacon Roach 🚨';
      case 'politician': return 'Megaphone Roach 📣';
      case 'golden': return 'Neon Gold DJ 👑';
      default: return 'Casual Roach 🪳';
    }
  };

  return (
    <div className="tab-panel">
      {/* SECTION 1: Arcade Banner */}
      <div className="hub-section-header">
        <h2 className="hub-section-title">🎮 Retro Simulation Arena</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
          Test your cognitive reflexes. Track scores, gather bulbs, and unlock cosmetics directly in the game sub-app.
        </p>
      </div>

      <div className="gaming-main-card">
        {/* WIDGET A: Game Card */}
        <div className="card-glass" style={styles.featuredPlayCard}>
          <div className="gaming-hero-banner" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop')` }}>
            <div className="gaming-banner-content">
              <span className="insight-tag" style={{ border: 'none', backgroundColor: 'var(--color-gold)', color: 'white', fontSize: '0.65rem' }}>
                COGNITIVE DEXTERITY SIMULATOR
              </span>
              <h3 style={styles.gameTitle}>Cockroach Runner: Retro City Escape</h3>
              <p style={styles.gameDesc}>
                Take control of a resilient roach escaping a neon grid. Dodge shouts, evade signs, and collect energy bulbs.
              </p>
              
              <button className="btn btn-primary" onClick={() => setIsPlayingGame(true)} style={styles.playNowBtn}>
                <Play size={16} fill="white" />
                <span>LAUNCH SIMULATION</span>
              </button>
            </div>
          </div>

          {/* User Stats Tiles */}
          <div className="gaming-stats-container">
            <div style={styles.statMiniCard}>
              <Award size={18} style={{ color: 'var(--color-gold)' }} />
              <div>
                <span style={styles.statMiniLbl}>PERSONAL HIGHEST</span>
                <span style={styles.statMiniVal}>{highScore} PTS</span>
              </div>
            </div>

            <div style={styles.statMiniCard}>
              <Zap size={18} style={{ color: 'var(--color-teal)' }} />
              <div>
                <span style={styles.statMiniLbl}>EARNED BULBS</span>
                <span style={styles.statMiniVal}>💡 {bulbsCount}</span>
              </div>
            </div>

            <div style={styles.statMiniCard}>
              <Gamepad2 size={18} style={{ color: 'var(--color-navy)' }} />
              <div>
                <span style={styles.statMiniLbl}>ACTIVE SKIN</span>
                <span style={styles.statMiniVal}>{getSkinName(activeSkin)}</span>
              </div>
            </div>
          </div>

          {/* Perks Inventory */}
          <div style={styles.inventoryContainer}>
            <span style={styles.inventoryTitle}>EQUIPPED PERKS INVENTORY</span>
            <div className="gaming-perks-list">
              <div style={{ ...styles.perkBadge, opacity: hasShield ? 1 : 0.4, borderColor: hasShield ? 'var(--color-green)' : 'var(--border-light)' }}>
                <Shield size={14} style={{ color: hasShield ? 'var(--color-green)' : 'var(--text-muted)' }} />
                <span>Energy Shield: {hasShield ? 'ACTIVE 🛡️' : 'NOT EQUIPPED'}</span>
              </div>
              <div style={{ ...styles.perkBadge, opacity: hasMagnet ? 1 : 0.4, borderColor: hasMagnet ? 'var(--color-teal)' : 'var(--border-light)' }}>
                <Zap size={14} style={{ color: hasMagnet ? 'var(--color-teal)' : 'var(--text-muted)' }} />
                <span>Bulb Magnet: {hasMagnet ? 'ACTIVE 🧲' : 'NOT EQUIPPED'}</span>
              </div>
            </div>
            <p style={styles.perkNotice}>
              <Info size={12} style={{ display: 'inline', marginRight: '0.25rem', verticalAlign: 'middle' }} />
              Play in-game sessions to gather bulbs, unlock luxury skins, and acquire shield boosters in the arcade shop.
            </p>
          </div>
        </div>

        {/* WIDGET B: Clean Leaderboard Table */}
        <div className="card-glass" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
            <Award size={20} style={{ color: 'var(--color-navy)' }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--color-navy)' }}>Global Leaderboard</h3>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Scores are ranked dynamically based on overall reflex duration and multiplier bonuses.
          </p>

          <div style={{ overflowX: 'auto' }}>
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Username</th>
                  <th>Record</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {sortedLeaderboard.map((player) => (
                  <tr 
                    key={player.displayRank}
                    style={player.isUser ? { backgroundColor: 'var(--color-teal-glow)', fontWeight: '700' } : {}}
                  >
                    <td>
                      <span style={{ 
                        fontWeight: '800', 
                        color: player.displayRank === 1 ? 'var(--color-gold)' : player.displayRank === 2 ? '#475569' : player.displayRank === 3 ? '#b45309' : 'var(--text-muted)'
                      }}>
                        {player.displayRank === 1 ? '🥇' : player.displayRank === 2 ? '🥈' : player.displayRank === 3 ? '🥉' : `#${player.displayRank}`}
                      </span>
                    </td>
                    <td>
                      <span style={player.isUser ? { color: 'var(--color-teal)' } : {}}>{player.name}</span>
                    </td>
                    <td><span className="monospace" style={{ fontWeight: '700' }}>{player.score}</span></td>
                    <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{player.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* GAMEPLAY OVERLAY IFRAME MODAL */}
      {isPlayingGame && (
        <div className="game-overlay-modal">
          <div className="game-modal-container">
            <div style={styles.gameModalHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Gamepad2 size={18} style={{ color: 'var(--color-teal)' }} />
                <h3 style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--color-navy)' }}>Cockroach Runner: Reflex Simulator</h3>
              </div>
              <button style={styles.closeOverlayBtn} onClick={() => {
                setIsPlayingGame(false);
                loadGameStats(); // reload stats when returning
              }}>
                <X size={20} />
              </button>
            </div>
            
            <div style={styles.iframeWrapper}>
              <iframe
                src="/game.html"
                title="Cockroach Runner Game"
                style={styles.gameIframe}
                allow="autoplay; fullscreen"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  featuredPlayCard: {
    display: 'flex',
    flexDirection: 'column',
  },
  gameTitle: {
    fontSize: '1.4rem',
    fontWeight: '800',
    color: 'white',
    margin: '0.5rem 0',
  },
  gameDesc: {
    fontSize: '0.85rem',
    color: '#cbd5e1',
    maxWidth: '550px',
    margin: '0 auto 1.5rem',
    lineHeight: '1.45',
  },
  playNowBtn: {
    padding: '0.75rem 1.75rem',
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
    margin: '1.5rem 0',
  },
  statMiniCard: {
    background: '#f8fafc',
    border: '1px solid var(--border-light)',
    borderRadius: '8px',
    padding: '0.65rem 0.85rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.65rem',
  },
  statMiniLbl: {
    display: 'block',
    fontSize: '0.55rem',
    fontWeight: '800',
    color: 'var(--text-secondary)',
    letterSpacing: '0.5px',
  },
  statMiniVal: {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: '800',
    color: 'var(--color-navy)',
  },
  inventoryContainer: {
    borderTop: '1px solid var(--border-light)',
    paddingTop: '1.25rem',
    marginTop: 'auto',
  },
  inventoryTitle: {
    fontSize: '0.65rem',
    fontWeight: '800',
    color: 'var(--color-navy)',
    letterSpacing: '0.5px',
    display: 'block',
    marginBottom: '0.75rem',
  },
  perksList: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '0.75rem',
  },
  perkBadge: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0.75rem',
    borderRadius: '6px',
    background: '#f8fafc',
    border: '1px solid',
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'var(--text-secondary)',
  },
  perkNotice: {
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
    lineHeight: '1.45',
  },
  gameOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(15, 23, 42, 0.75)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  gameModal: {
    width: '100%',
    maxWidth: '1000px',
    background: '#ffffff',
    border: '1px solid var(--border-light)',
    borderRadius: '12px',
    boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  gameModalHeader: {
    padding: '0.75rem 1.25rem',
    borderBottom: '1px solid var(--border-light)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#f8fafc',
  },
  closeOverlayBtn: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    transition: 'color 0.2s',
    outline: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iframeWrapper: {
    width: '100%',
    aspectRatio: '2/1', // matching game canvas bounds
    background: '#000',
  },
  gameIframe: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
};
