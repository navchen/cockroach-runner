import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AiHub from './components/AiHub';
import YtHub from './components/YtHub';
import GamingHub from './components/GamingHub';
import { Sparkles, Brain, Gamepad2, Award, Lightbulb, BookOpen } from 'lucide-react';

const YoutubeIcon = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [highScore, setHighScore] = useState(0);
  const [bulbsCount, setBulbsCount] = useState(0);

  // Sync game statistics for home dashboard widgets
  const syncDashboardStats = () => {
    try {
      const savedHighScore = localStorage.getItem('cr_high_score');
      const savedBulbs = localStorage.getItem('cr_bulbs');
      if (savedHighScore) setHighScore(parseInt(savedHighScore, 10));
      if (savedBulbs) setBulbsCount(parseInt(savedBulbs, 10));
    } catch (e) {
      console.warn('Dashboard stats sync bypassed.', e);
    }
  };

  useEffect(() => {
    syncDashboardStats();
    const interval = setInterval(syncDashboardStats, 3000);
    return () => clearInterval(interval);
  }, []);

  const dailyInsights = [
    {
      title: "What is Backpropagation?",
      text: "It is the mathematical backbone of training deep neural networks. By recursively applying the calculus Chain Rule backwards from the loss function output, we calculate the exact weight adjustments needed for each synapse."
    },
    {
      title: "Understanding Overfitting",
      text: "Overfitting happens when a model learns noise and specific details of training datasets rather than general patterns. Using L2 Regularization (Weight Decay) penalizes large weights, keeping model parameters small and robust."
    },
    {
      title: "The Power of Prompt blueprinting",
      text: "Few-shot prompting (providing example inputs and outputs) and Chain of Thought (forcing the model to think step-by-step) significantly improve AI output accuracy on logical and mathematical reasoning tasks."
    }
  ];

  // Pick an insight based on the current day
  const dailyInsight = dailyInsights[new Date().getDate() % dailyInsights.length];

  return (
    <div className="app-container">
      {/* Sticky Global Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Core View Area */}
      <main className="main-content">
        
        {/* TAB 1: Hub Dashboard (HOME) */}
        {activeTab === 'home' && (
          <div className="tab-panel">
            {/* Widget A: Hero Banner Welcome */}
            <div className="welcome-hero" style={styles.welcomeHero}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <Sparkles size={18} style={{ color: 'var(--color-gold)' }} />
                <span style={{ fontSize: '0.7rem', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--color-gold)' }}>
                  CENTRAL INFOTAINMENT PLATFORM
                </span>
              </div>
              <h2 style={styles.welcomeTitle}>GNA ARENA PORTAL</h2>
              <p style={styles.welcomeDesc}>
                Welcome to the official education and entertainment portal for <span style={{ color: 'white', fontWeight: '800' }}>gnaarena.in</span>. 
                Explore simplified artificial intelligence courses in our <span style={{ color: '#38bdf8', fontWeight: '700' }}>AI Made Easy</span> zone, study video creation and audience scaling inside the <span style={{ color: '#fbbf24', fontWeight: '700' }}>YT Creators</span> hub, and play the Cockroach Runner reflex simulator.
              </p>
            </div>

            {/* Hub Quick Launch Grid */}
            <div style={{ marginTop: '3rem' }}>
              <h3 style={styles.sectionHeaderTitle}>EXPLORE OUR CENTRAL CORES</h3>
              <div className="launch-grid">
                
                {/* Launcher 1: AI */}
                <div className="launch-card ai-theme" onClick={() => setActiveTab('ai')}>
                  <div className="launch-icon-box">
                    <Brain size={22} />
                  </div>
                  <h4 className="launch-title">AI Made Easy Hub</h4>
                  <p className="launch-desc">Master Machine Learning foundations, Generative AI models, and Python simplified.</p>
                  <span className="launch-action">ACCESS PATHWAYS ➔</span>
                </div>

                {/* Launcher 2: YouTube Creators */}
                <div className="launch-card yt-theme" onClick={() => setActiveTab('yt')}>
                  <div className="launch-icon-box">
                    <YoutubeIcon size={22} />
                  </div>
                  <h4 className="launch-title">YT Creators Hub</h4>
                  <p className="launch-desc">Access professional video production tutorials, scripting roadmaps, and editing secrets.</p>
                  <span className="launch-action">ACCESS CREATOR GUIDES ➔</span>
                </div>

                {/* Launcher 3: Retro Simulator */}
                <div className="launch-card game-theme" onClick={() => setActiveTab('gaming')}>
                  <div className="launch-icon-box">
                    <Gamepad2 size={22} />
                  </div>
                  <h4 className="launch-title">Reflex Arcade Center</h4>
                  <p className="launch-desc">Launch the Cockroach Runner simulator and track high scores in real-time.</p>
                  <span className="launch-action">LAUNCH SYSTEM ➔</span>
                </div>

              </div>
            </div>

            {/* Split Grid: Widgets Row */}
            <div className="dashboard-grid" style={{ marginTop: '3.5rem' }}>
              
              {/* Left Widget: Stats Summary */}
              <div className="widget-large card-glass">
                <h3 style={styles.widgetTitle}>Core Statistics Summary</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Aggregated statistics mapped out from your local game achievements and studying progress.
                </p>

                <div className="stats-widget-grid">
                  <div className="stat-box">
                    <div className="stat-icon-wrapper cyan">
                      <Brain size={18} />
                    </div>
                    <div>
                      <div className="stat-number">92%</div>
                      <div className="stat-label">Cognitive Score</div>
                    </div>
                  </div>

                  <div className="stat-box">
                    <div className="stat-icon-wrapper gold">
                      <Award size={18} />
                    </div>
                    <div>
                      <div className="stat-number">{highScore} PTS</div>
                      <div className="stat-label">Arcade Record</div>
                    </div>
                  </div>

                  <div className="stat-box">
                    <div className="stat-icon-wrapper pink">
                      <Lightbulb size={18} />
                    </div>
                    <div>
                      <div className="stat-number">💡 {bulbsCount}</div>
                      <div className="stat-label">Energy Bulbs</div>
                    </div>
                  </div>

                  <div className="stat-box">
                    <div className="stat-icon-wrapper purple">
                      <BookOpen size={18} />
                    </div>
                    <div>
                      <div className="stat-number">ACTIVE</div>
                      <div className="stat-label">Academic Portal</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Widget: Daily Insights */}
              <div className="widget-small card-glass insights-card" style={styles.insightBox}>
                <span className="insight-tag">💡 AI FOCUS LESSON</span>
                <h4 className="insight-title">{dailyInsight.title}</h4>
                <p className="insight-text">{dailyInsight.text}</p>
                <div style={styles.insightFooter}>
                  <BookOpen size={12} style={{ color: 'var(--color-teal)', marginRight: '0.25rem' }} />
                  <span>Curated for gnaarena.in learners</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: AI LEARNING PATHWAYS */}
        {activeTab === 'ai' && <AiHub />}

        {/* TAB 3: YT RESOURCES & GIVEAWAYS */}
        {activeTab === 'yt' && <YtHub />}

        {/* TAB 4: RETRO ARCADE CENTER */}
        {activeTab === 'gaming' && <GamingHub />}

      </main>

      {/* Global Portal Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <p style={{ fontWeight: '700', color: 'var(--color-navy)', fontSize: '0.95rem' }}>GNA ARENA PORTAL</p>
          <p style={{ fontSize: '0.8rem', marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
            Official Central Infotainment Platform hosted at <a href="https://gnaarena.in" style={{ color: 'var(--color-teal)', textDecoration: 'none', fontWeight: '600' }}>gnaarena.in</a>. Rebuilt with deeplearning.ai visual standards.
          </p>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  welcomeHero: {
    padding: '3.5rem 3rem',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, var(--color-navy) 0%, #1e293b 100%)',
    color: 'white',
  },
  welcomeTitle: {
    fontSize: '2rem',
    fontWeight: '900',
    letterSpacing: '-0.5px',
    color: 'white',
    margin: '0.25rem 0',
  },
  welcomeDesc: {
    color: '#cbd5e1',
    fontSize: '1rem',
    lineHeight: '1.65',
    maxWidth: '850px',
    marginTop: '0.5rem',
  },
  sectionHeaderTitle: {
    fontSize: '0.8rem',
    fontWeight: '800',
    letterSpacing: '1px',
    color: 'var(--color-navy)',
    marginBottom: '1rem',
  },
  widgetTitle: {
    fontSize: '1.2rem',
    fontWeight: '800',
    color: 'var(--color-navy)',
    marginBottom: '0.25rem',
  },
  insightBox: {
    display: 'flex',
    flexDirection: 'column',
  },
  insightFooter: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
    marginTop: 'auto',
    borderTop: '1px solid var(--border-light)',
    paddingTop: '0.75rem',
  },
  footer: {
    padding: '3rem 1.5rem',
    background: 'var(--bg-secondary)',
    borderTop: '1px solid var(--border-light)',
    marginTop: 'auto',
    textAlign: 'center',
  },
  footerContainer: {
    maxWidth: '1300px',
    margin: '0 auto',
  },
};
