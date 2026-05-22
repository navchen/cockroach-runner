/**
 * COCKROACH RUNNER - SURVIVAL OF THE FITTEST
 * Comprehensive Game Engine matching the visual mock layout exactly
 */

// ============================================================================
// 1. Audio Synthesizer Class (Web Audio API Retro Sounds & Live Music)
// ============================================================================
class RetroAudioSynth {
  constructor() {
    this.ctx = null;
    this.sfxEnabled = true;
    this.musicEnabled = true;
    
    // Music Sequencer Variables
    this.musicInterval = null;
    this.musicTempo = 125; // BPM
    this.musicStep = 0;
    
    // Audio volume nodes
    this.sfxVolumeNode = null;
    this.musicVolumeNode = null;
  }

  init() {
    try {
      if (this.ctx) return;
      
      // Create Audio Context
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      this.ctx = new AudioContextClass();
      
      // Setup Volume Nodes
      this.sfxVolumeNode = this.ctx.createGain();
      this.sfxVolumeNode.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.sfxVolumeNode.connect(this.ctx.destination);
      
      this.musicVolumeNode = this.ctx.createGain();
      this.musicVolumeNode.gain.setValueAtTime(0.12, this.ctx.currentTime);
      this.musicVolumeNode.connect(this.ctx.destination);
      
      // Start music loop if active
      if (this.musicEnabled) {
        this.startMusic();
      }
    } catch (e) {
      console.warn("AudioContext initialization bypassed or blocked by browser policy.", e);
    }
  }

  resumeContext() {
    try {
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    } catch (e) {
      console.warn("Could not resume AudioContext.", e);
    }
  }

  toggleSFX(forceState = null) {
    this.sfxEnabled = forceState !== null ? forceState : !this.sfxEnabled;
    return this.sfxEnabled;
  }

  toggleMusic(forceState = null) {
    try {
      this.musicEnabled = forceState !== null ? forceState : !this.musicEnabled;
      this.init();
      this.resumeContext();

      if (this.musicEnabled) {
        this.startMusic();
      } else {
        this.stopMusic();
      }
    } catch (e) {
      console.warn("Error toggling music.", e);
    }
    return this.musicEnabled;
  }

  // --- Sound Effects Synthesizers ---
  
  playJump() {
    if (!this.sfxEnabled) return;
    try {
      this.init();
      this.resumeContext();
      if (!this.ctx || !this.sfxVolumeNode) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.15);
      
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
      
      osc.connect(gain);
      gain.connect(this.sfxVolumeNode);
      
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {
      console.warn("playJump synth failed silently.", e);
    }
  }

  playDuck() {
    if (!this.sfxEnabled) return;
    try {
      this.init();
      this.resumeContext();
      if (!this.ctx || !this.sfxVolumeNode) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.12);
      
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.12);
      
      osc.connect(gain);
      gain.connect(this.sfxVolumeNode);
      
      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {
      console.warn("playDuck synth failed silently.", e);
    }
  }

  playCoin() {
    if (!this.sfxEnabled) return;
    try {
      this.init();
      this.resumeContext();
      if (!this.ctx || !this.sfxVolumeNode) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(987.77, now); // B5
      osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6
      
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.22);
      
      osc.connect(gain);
      gain.connect(this.sfxVolumeNode);
      
      osc.start(now);
      osc.stop(now + 0.22);
    } catch (e) {
      console.warn("playCoin synth failed silently.", e);
    }
  }

  playPowerup() {
    if (!this.sfxEnabled) return;
    try {
      this.init();
      this.resumeContext();
      if (!this.ctx || !this.sfxVolumeNode) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(261.63, now); // C4
      osc.frequency.setValueAtTime(329.63, now + 0.06); // E4
      osc.frequency.setValueAtTime(392.00, now + 0.12); // G4
      osc.frequency.setValueAtTime(523.25, now + 0.18); // C5
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.35);
      
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.35);
      
      osc.connect(gain);
      gain.connect(this.sfxVolumeNode);
      
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {
      console.warn("playPowerup synth failed silently.", e);
    }
  }

  playGameOver() {
    if (!this.sfxEnabled) return;
    try {
      this.init();
      this.resumeContext();
      if (!this.ctx || !this.sfxVolumeNode) return;

      const now = this.ctx.currentTime;
      
      // Low rumble noise
      const bufferSize = this.ctx.sampleRate * 1.0;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.exponentialRampToValueAtTime(30, now + 0.8);
      
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
      
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxVolumeNode);
      
      // Sub-bass crash osc
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'sawtooth';
      sub.frequency.setValueAtTime(160, now);
      sub.frequency.exponentialRampToValueAtTime(40, now + 0.5);
      
      subGain.gain.setValueAtTime(0.35, now);
      subGain.gain.linearRampToValueAtTime(0.01, now + 0.5);
      
      sub.connect(subGain);
      subGain.connect(this.sfxVolumeNode);
      
      noise.start(now);
      sub.start(now);
      noise.stop(now + 1.0);
      sub.stop(now + 0.5);
    } catch (e) {
      console.warn("playGameOver synth failed silently.", e);
    }
  }

  playButtonClick() {
    if (!this.sfxEnabled) return;
    try {
      this.init();
      this.resumeContext();
      if (!this.ctx || !this.sfxVolumeNode) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(550, now);
      osc.frequency.setValueAtTime(280, now + 0.02);
      
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.04);
      
      osc.connect(gain);
      gain.connect(this.sfxVolumeNode);
      
      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {
      console.warn("playButtonClick synth failed silently.", e);
    }
  }

  // --- Background loops ---
  startMusic() {
    try {
      this.stopMusic();
      const stepTime = 60 / this.musicTempo / 2;
      
      this.musicInterval = setInterval(() => {
        try {
          if (this.ctx && this.musicEnabled && this.ctx.state !== 'suspended') {
            this.playMusicStep();
          }
        } catch (e) {
          console.warn("Music step ticker failed.", e);
        }
      }, stepTime * 1000);
    } catch (e) {
      console.warn("startMusic failed.", e);
    }
  }

  stopMusic() {
    try {
      if (this.musicInterval) {
        clearInterval(this.musicInterval);
        this.musicInterval = null;
      }
    } catch (e) {
      console.warn("stopMusic failed.", e);
    }
  }

  playMusicStep() {
    try {
      if (!this.ctx || !this.musicVolumeNode) return;
      const now = this.ctx.currentTime;
      const bassNotes = [110.00, 110.00, 130.81, 110.00, 146.83, 146.83, 98.00, 82.41]; // A2 bass arps
      const currentBassFreq = bassNotes[this.musicStep % 8];
      
      // Bass Oscillator
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      bassOsc.type = 'triangle';
      bassOsc.frequency.setValueAtTime(currentBassFreq, now);
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, now);
      
      bassGain.gain.setValueAtTime(0.28, now);
      bassGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      
      bassOsc.connect(filter);
      filter.connect(bassGain);
      bassGain.connect(this.musicVolumeNode);
      
      bassOsc.start(now);
      bassOsc.stop(now + 0.22);
      
      // Simple Kick Synth
      if (this.musicStep % 4 === 0) {
        const kick = this.ctx.createOscillator();
        const kickGain = this.ctx.createGain();
        kick.type = 'sine';
        kick.frequency.setValueAtTime(110, now);
        kick.frequency.exponentialRampToValueAtTime(45, now + 0.08);
        
        kickGain.gain.setValueAtTime(0.7, now);
        kickGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        
        kick.connect(kickGain);
        kickGain.connect(this.musicVolumeNode);
        
        kick.start(now);
        kick.stop(now + 0.12);
      }
      
      // Simple Snare Noise
      if (this.musicStep % 4 === 2) {
        const bufferSize = this.ctx.sampleRate * 0.07;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        
        const snare = this.ctx.createBufferSource();
        snare.buffer = buffer;
        
        const snareFilter = this.ctx.createBiquadFilter();
        snareFilter.type = 'bandpass';
        snareFilter.frequency.setValueAtTime(900, now);
        
        const snareGain = this.ctx.createGain();
        snareGain.gain.setValueAtTime(0.1, now);
        snareGain.gain.linearRampToValueAtTime(0.01, now + 0.07);
        
        snare.connect(snareFilter);
        snareFilter.connect(snareGain);
        snareGain.connect(this.musicVolumeNode);
        
        snare.start(now);
        snare.stop(now + 0.07);
      }
      
      this.musicStep++;
    } catch (e) {
      console.warn("playMusicStep failed silently.", e);
    }
  }
}

const sfx = new RetroAudioSynth();


// ============================================================================
// 2. Parallax Background Layers Manager (Visual Mock Daylight cyan cityscape)
// ============================================================================
class ParallaxBackground {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    // Parallax scrolling x offsets
    this.skyX = 0;
    this.farCityX = 0;
    this.nearCityX = 0;
    this.groundGridX = 0;
    this.binaryOffset = 0;
    
    // Skyscrapers geometric registers
    this.farSkyscrapers = [];
    this.nearSkyscrapers = [];
    this.floatingStamps = [];
    
    // Drifting clouds for wispy sky elements
    this.clouds = [
      { x: 100, y: 50, scale: 0.8, speed: 0.05 },
      { x: 400, y: 80, scale: 1.2, speed: 0.08 },
      { x: 800, y: 40, scale: 0.6, speed: 0.03 },
      { x: 1100, y: 90, scale: 1.0, speed: 0.06 }
    ];
    
    this.initSkyline();
  }

  initSkyline() {
    // Generate far buildings (light cyan shapes)
    let fx = 0;
    while (fx < this.canvas.width * 2) {
      const w = Math.random() * 100 + 120;
      const h = Math.random() * 220 + 140;
      this.farSkyscrapers.push({ x: fx, width: w, height: h });
      fx += w - 20; // slightly overlap
    }
    
    // Generate near buildings (richer blue skyline with angled tops/spires like image)
    let nx = 0;
    while (nx < this.canvas.width * 2) {
      const w = Math.random() * 80 + 90;
      const h = Math.random() * 160 + 150;
      this.nearSkyscrapers.push({
        x: nx,
        width: w,
        height: h,
        angled: Math.random() > 0.4,
        spire: Math.random() > 0.6,
        windows: Math.floor(Math.random() * 4) + 2
      });
      nx += w - 10;
    }
    
    // Ground matrix floating circular stamp tokens
    for (let i = 0; i < 5; i++) {
      this.floatingStamps.push({
        x: Math.random() * this.canvas.width,
        y: 415 + Math.random() * 50,
        radius: 18,
        angle: Math.random() * Math.PI * 2,
        rotSpeed: Math.random() * 0.02 - 0.01,
        speedX: -(Math.random() * 0.5 + 0.3)
      });
    }
  }

  update(gameSpeed) {
    // Update parallax offsets
    this.farCityX = (this.farCityX - gameSpeed * 0.25);
    this.nearCityX = (this.nearCityX - gameSpeed * 0.55);
    this.groundGridX = (this.groundGridX - gameSpeed);
    this.binaryOffset = (this.binaryOffset - gameSpeed * 1.15) % 15;
    
    const farTotal = this.farSkyscrapers.reduce((acc, b) => acc + b.width - 20, 0);
    if (this.farCityX < -farTotal / 2) this.farCityX += farTotal / 2;
    
    const nearTotal = this.nearSkyscrapers.reduce((acc, b) => acc + b.width - 10, 0);
    if (this.nearCityX < -nearTotal / 2) this.nearCityX += nearTotal / 2;
    
    // Floating ground stamp coordinates loops
    this.floatingStamps.forEach(stamp => {
      stamp.x += stamp.speedX;
      stamp.angle += stamp.rotSpeed;
      if (stamp.x < -40) {
        stamp.x = this.canvas.width + 40;
        stamp.y = 415 + Math.random() * 50;
      }
    });

    // Update drifting clouds
    this.clouds.forEach(cloud => {
      cloud.x -= gameSpeed * cloud.speed;
      if (cloud.x < -150) {
        cloud.x = this.canvas.width + 150;
        cloud.y = Math.random() * 100 + 30;
      }
    });
  }

  draw() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    
    // -------------------------------------------------------------
    // LAYER 1: Vivid Sky Blue Gradient (Daylight Bright mock)
    // -------------------------------------------------------------
    const skyGrad = ctx.createLinearGradient(0, 0, 0, 370);
    skyGrad.addColorStop(0, '#2eaaff'); // Radiant vivid blue
    skyGrad.addColorStop(0.6, '#56c6ff'); // Medium cyan blue
    skyGrad.addColorStop(1, '#aae5ff'); // Soft pastel light sky
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, 370);
    
    // Sun rays glow behind skyscrapers
    const sunGrad = ctx.createRadialGradient(250, 200, 10, 250, 200, 300);
    sunGrad.addColorStop(0, 'rgba(255,255,255,0.4)');
    sunGrad.addColorStop(0.5, 'rgba(255,255,255,0.1)');
    sunGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = sunGrad;
    ctx.fillRect(0, 0, w, 370);

    // Sweeping sunbeams/light rays from top-left/center for highly dynamic skies
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    const rayCount = 8;
    const timeSec = Date.now() * 0.0003;
    for (let r = 0; r < rayCount; r++) {
      const startAngle = (r * (Math.PI * 2) / rayCount) + Math.sin(timeSec + r * 1.5) * 0.2;
      const widthAngle = 0.25;
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.beginPath();
      ctx.moveTo(250, 200); // rays origin matching sun radial gradient
      ctx.arc(250, 200, 600, startAngle, startAngle + widthAngle);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // Draw drifting wispy clouds with subtle gradient puffiness
    this.clouds.forEach(cloud => {
      ctx.save();
      ctx.translate(cloud.x, cloud.y);
      ctx.scale(cloud.scale, cloud.scale);
      
      const cloudGrad = ctx.createLinearGradient(0, -15, 0, 15);
      cloudGrad.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
      cloudGrad.addColorStop(1, 'rgba(210, 240, 255, 0.4)');
      ctx.fillStyle = cloudGrad;
      
      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, Math.PI * 2);
      ctx.arc(14, -8, 22, 0, Math.PI * 2);
      ctx.arc(32, -4, 18, 0, Math.PI * 2);
      ctx.arc(42, 4, 14, 0, Math.PI * 2);
      ctx.arc(24, 8, 16, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });
    
    // -------------------------------------------------------------
    // LAYER 2: Far City Skyscrapers (Very light semi-transparent cyans)
    // -------------------------------------------------------------
    ctx.fillStyle = 'rgba(141, 213, 255, 0.55)';
    this.farSkyscrapers.forEach(b => {
      const rx = (this.farCityX + b.x);
      ctx.fillRect(rx, 370 - b.height, b.width, b.height);
      
      // Simple window panels on far buildings
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.fillRect(rx + 15, 370 - b.height + 30, b.width - 30, 4);
      ctx.fillRect(rx + 15, 370 - b.height + 50, b.width - 30, 4);
      ctx.fillStyle = 'rgba(141, 213, 255, 0.55)'; // restore
    });

    // -------------------------------------------------------------
    // LAYER 3: Near City Skyscrapers (Sleek bright vector cyan/blue)
    // -------------------------------------------------------------
    this.nearSkyscrapers.forEach(b => {
      const rx = (this.nearCityX + b.x);
      
      // Gradient from beautiful sky-blue down to cyan
      const bGrad = ctx.createLinearGradient(rx, 370 - b.height, rx, 370);
      bGrad.addColorStop(0, '#3b82f6'); // Solid modern electric blue
      bGrad.addColorStop(1, '#0891b2'); // Teal/cyan bottom
      
      ctx.fillStyle = bGrad;
      ctx.beginPath();
      ctx.moveTo(rx, 370);
      
      // Angled rooftops exactly like attached image buildings
      if (b.angled) {
        ctx.lineTo(rx, 370 - b.height + 25);
        ctx.lineTo(rx + b.width * 0.7, 370 - b.height);
        ctx.lineTo(rx + b.width, 370 - b.height + 15);
      } else {
        ctx.lineTo(rx, 370 - b.height);
        ctx.lineTo(rx + b.width, 370 - b.height);
      }
      
      ctx.lineTo(rx + b.width, 370);
      ctx.closePath();
      ctx.fill();
      
      // Draw optional neon spires with warning lights on top
      if (b.spire) {
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(rx + b.width/2, 370 - b.height);
        ctx.lineTo(rx + b.width/2, 370 - b.height - 40);
        ctx.stroke();
        
        // Glowing flashing red/pink beacon at the spire tip
        ctx.save();
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#ff007f';
        ctx.fillStyle = '#ff007f';
        const blink = Math.sin(Date.now() * 0.007 + b.x) > 0;
        if (blink) {
          ctx.beginPath();
          ctx.arc(rx + b.width/2, 370 - b.height - 40, 4.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      
      // Rich gold/neon skyscraper grids of glowing window lights
      ctx.save();
      ctx.shadowBlur = 8;
      const lightColors = ['#ffd700', '#00f0ff', '#ff007f', '#a855f7'];
      // Assign a consistent neon glow color per skyscraper
      const buildColor = lightColors[Math.floor(b.x) % lightColors.length];
      ctx.shadowColor = buildColor;
      ctx.fillStyle = buildColor;
      
      const rows = Math.floor(b.height / 22) - 2;
      const cols = b.windows;
      const startY = 370 - b.height + 35;
      const startX = rx + 8;
      const gridW = b.width - 16;
      
      if (rows > 0 && cols > 0) {
        const cellW = gridW / cols;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            // Randomly turn off 15% of the window lights for realism
            if ((r * 3 + c * 7 + Math.floor(b.x)) % 6 !== 0) {
              const wx = startX + c * cellW + cellW * 0.15;
              const wy = startY + r * 18;
              const ww = cellW * 0.7;
              const wh = 8;
              ctx.fillRect(wx, wy, ww, wh);
            }
          }
        }
      }
      ctx.restore();
    });

    // -------------------------------------------------------------
    // LAYER 4: The Concrete Platform Road & Cracks
    // -------------------------------------------------------------
    const roadY = 370;
    const roadH = 30; // 30px solid concrete depth block
    
    // Solid concrete slab
    ctx.fillStyle = '#b1b9c9'; // Light concrete grey
    ctx.fillRect(0, roadY, w, roadH);
    
    // Draw crack textures on the platform
    ctx.strokeStyle = '#858d9e';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    // Repeating crack patterns scrolled
    const offset = Math.abs(this.nearCityX * 1.8) % 180;
    for (let cx = -180; cx < w + 180; cx += 180) {
      const rx = cx + offset;
      // Joint line
      ctx.moveTo(rx, roadY);
      ctx.lineTo(rx - 15, roadY + roadH);
      
      // Small branch crack
      ctx.moveTo(rx - 7, roadY + 12);
      ctx.lineTo(rx - 2, roadY + 18);
    }
    ctx.stroke();

    // Top Platform edge neon highlighting (Vibrant red/pink line)
    ctx.strokeStyle = '#ff007f';
    ctx.lineWidth = 3.5;
    ctx.shadowColor = '#ff007f';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(0, roadY);
    ctx.lineTo(w, roadY);
    ctx.stroke();
    ctx.shadowBlur = 0; // Reset

    // -------------------------------------------------------------
    // LAYER 5: Beneath Road digital security Matrix (Binary + Stamps)
    // -------------------------------------------------------------
    const matrixY = roadY + roadH;
    const matrixH = h - matrixY;
    
    // Dark matrix background
    ctx.fillStyle = '#0b162a';
    ctx.fillRect(0, matrixY, w, matrixH);
    
    // Draw moving binary columns text code grid scroll
    ctx.fillStyle = 'rgba(0, 153, 255, 0.14)'; // Soft glowing neon blue binary
    ctx.font = 'bold 11px monospace';
    
    const binaryWidth = 15;
    const colCount = Math.floor(w / 120);
    
    for (let c = 0; c < colCount + 2; c++) {
      const colX = c * 110 + this.nearCityX % 110;
      
      // Columns strings
      const code1 = "01110110110";
      const code2 = "10101100110";
      const code3 = "11110101011";
      
      ctx.fillText(code1, colX, matrixY + 25);
      ctx.fillText(code2, colX + 45, matrixY + 50);
      ctx.fillText(code3, colX - 25, matrixY + 75);
    }
    
    // Floating security stamps (Tilted red/pink circular stamps with glowing border and bold CR text)
    this.floatingStamps.forEach(stamp => {
      ctx.save();
      ctx.translate(stamp.x, stamp.y);
      ctx.rotate(stamp.angle);
      
      // Gorgeous neon pink outline glow
      ctx.shadowColor = '#ff007f';
      ctx.shadowBlur = 12;
      
      // Stamp circle fill (Vibrant red/pink)
      ctx.fillStyle = 'rgba(239, 68, 68, 0.9)';
      ctx.beginPath();
      ctx.arc(0, 0, stamp.radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Glowing pink/white outer stamp border ring
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.arc(0, 0, stamp.radius - 1, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.strokeStyle = '#ff007f';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, stamp.radius + 1, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.shadowBlur = 0; // Turn off text shadow for crisp reading
      
      // Bold white "CR" lettering inside
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px "Press Start 2P", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText("CR", 0, 0.5);
      
      ctx.restore();
    });
  }
}


// ============================================================================
// 3. Dynamic Particle Engine
// ============================================================================
class ParticleEngine {
  constructor() {
    this.particles = [];
  }

  spawnDust(x, y) {
    this.particles.push({
      type: 'dust',
      x: x,
      y: y,
      vx: -(Math.random() * 2 + 1.2),
      vy: -(Math.random() * 0.4 + 0.1),
      size: Math.random() * 3 + 2,
      alpha: 0.5,
      decay: 0.02,
      color: 'rgba(255,255,255,0.45)'
    });
  }

  spawnSparkles(x, y, color = '#ffd700') {
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2.5 + 1.5;
      this.particles.push({
        type: 'sparkle',
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 1,
        alpha: 1.0,
        decay: 0.025,
        color: color
      });
    }
  }

  spawnInvincibleStars(x, y) {
    const rainbow = ['#0099ff', '#ff007f', '#ffd700', '#22c55e', '#ffffff'];
    const randColor = rainbow[Math.floor(Math.random() * rainbow.length)];
    this.particles.push({
      type: 'star',
      x: x + (Math.random() * 20 - 10),
      y: y + (Math.random() * 20 - 10),
      vx: -(Math.random() * 1.5 + 0.5),
      vy: -(Math.random() * 1.2 + 0.2),
      size: Math.random() * 4 + 1.5,
      alpha: 0.9,
      decay: 0.018,
      color: randColor
    });
  }

  spawnSteam(x, y) {
    this.particles.push({
      type: 'steam',
      x: x,
      y: y,
      vx: -(Math.random() * 0.4 + 0.1),
      vy: -(Math.random() * 0.8 + 0.3),
      size: Math.random() * 3 + 1,
      alpha: 0.4,
      decay: 0.012,
      color: 'rgba(255,255,255,0.28)'
    });
  }

  spawnPaperSheet(x, y) {
    this.particles.push({
      type: 'paper',
      x: x,
      y: y,
      vx: -(Math.random() * 2 + 4),
      vy: Math.random() * 1.5 - 0.5,
      size: Math.random() * 3 + 4,
      height: Math.random() * 3 + 5,
      angle: Math.random() * Math.PI,
      spinSpeed: Math.random() * 0.08 - 0.04,
      alpha: 0.8,
      decay: 0.006,
      color: 'rgba(255, 100, 150, 0.95)' // Pink exam sheets
    });
  }

  spawnExplosion(x, y) {
    const explodeColors = ['#ff007f', '#0099ff', '#b1b9c9', '#ffd700', '#ffffff'];
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4.5 + 1.5;
      this.particles.push({
        type: 'fragment',
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        size: Math.random() * 5 + 3,
        alpha: 1.0,
        decay: 0.02,
        color: explodeColors[Math.floor(Math.random() * explodeColors.length)]
      });
    }
  }

  update(dt = 1) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.alpha -= p.decay * dt;
      
      if (p.type === 'paper') {
        p.angle += p.spinSpeed * dt;
        p.vy += 0.02 * dt; // light breeze fall
      } else if (p.type === 'fragment') {
        p.vy += 0.12 * dt; // heavy gravity shards
      }
      
      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  draw(ctx) {
    this.particles.forEach(p => {
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      
      if (p.type === 'paper') {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillRect(-p.size/2, -p.height/2, p.size, p.height);
        
        ctx.strokeStyle = 'rgba(255,255,255,0.6)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(-p.size/2 + 1, -p.height/2 + 2);
        ctx.lineTo(p.size/2 - 1, -p.height/2 + 2);
        ctx.stroke();
        ctx.restore();
      } else if (p.type === 'fragment') {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.size, p.y + p.size/2);
        ctx.lineTo(p.x + p.size/2, p.y + p.size);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    ctx.globalAlpha = 1.0;
  }
}


// ============================================================================
// 4. Cockroach Player Class (Cute running vectors with scarf & VOTE ballot)
// ============================================================================
class CockroachPlayer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    // Mechanics coordinates
    this.groundY = 370;
    this.x = 130;
    this.y = this.groundY - 55;
    this.width = 50;
    this.height = 55;
    
    this.vy = 0;
    this.gravity = 0.65;
    this.jumpForce = -11.5;
    this.maxJumps = 2;
    this.jumpsLeft = 2;
    
    this.isDucking = false;
    this.isGrounded = true;
    this.animTime = 0;
    
    // Skins & status
    this.activeSkin = 'default';
    this.hasShield = false;
    this.shieldActive = false;
    this.hasMagnet = false;
    
    this.isInvincible = false;
    this.invincibilityTimer = 0;
  }

  reset() {
    this.y = this.groundY - this.height;
    this.vy = 0;
    this.isDucking = false;
    this.isGrounded = true;
    this.jumpsLeft = this.maxJumps;
    this.invincibilityTimer = 0;
    this.isInvincible = false;
    this.shieldActive = this.hasShield;
  }

  jump() {
    if (this.isDucking) return;
    
    if (this.jumpsLeft > 0) {
      this.vy = this.jumpForce;
      this.jumpsLeft--;
      this.isGrounded = false;
      sfx.playJump();
      return true;
    }
    return false;
  }

  duck(state) {
    if (state && !this.isDucking && this.isGrounded) {
      this.isDucking = true;
      this.width = 65;
      this.height = 25;
      this.y = this.groundY - this.height;
      sfx.playDuck();
    } else if (!state && this.isDucking) {
      this.isDucking = false;
      this.width = 50;
      this.height = 55;
      this.y = this.groundY - this.height;
    }
  }

  update(particles, dt = 1) {
    if (!this.isGrounded) {
      this.vy += this.gravity * dt;
      this.y += this.vy * dt;
      
      if (this.y < 20) {
        this.y = 20;
        this.vy = 0;
      }
      
      if (this.y + this.height >= this.groundY) {
        this.y = this.groundY - this.height;
        this.vy = 0;
        this.isGrounded = true;
        this.jumpsLeft = this.maxJumps;
      }
    }
    
    this.animTime += 0.28 * dt;
    
    // Foot dust trail
    if (this.isGrounded && Math.random() > 0.4) {
      particles.spawnDust(this.x + 5, this.groundY);
    }
    
    // Invincible Chai time decreases
    if (this.isInvincible) {
      this.invincibilityTimer -= dt;
      if (this.invincibilityTimer <= 0) {
        this.isInvincible = false;
      }
      if (Math.random() > 0.4) {
        particles.spawnInvincibleStars(this.x + this.width/2, this.y + this.height/2);
        particles.spawnDust(this.x, this.groundY - 10); // Speed dust trails!
      }
    }
  }

  draw() {
    const ctx = this.ctx;
    ctx.save();
    
    const px = this.x;
    const py = this.y;
    const pW = this.width;
    const pH = this.height;
    
    let baseColor = '#92400e'; // Rich reddish cockroach brown
    let secondaryColor = '#451a03'; // Chocolate dark brown for wings/legs
    let highlightColor = '#d97706'; // Warm caramel highlight
    
    if (this.activeSkin === 'golden') {
      baseColor = '#fbbf24';
      secondaryColor = '#92400e';
      highlightColor = '#fef08a';
    } else if (this.activeSkin === 'vip') {
      baseColor = '#b45309';
      secondaryColor = '#451a03';
      highlightColor = '#f59e0b';
    } else if (this.activeSkin === 'politician') {
      baseColor = '#d96118';
      secondaryColor = '#602004';
      highlightColor = '#ff9f68';
    }
    
    // Flashing invincibility colors
    if (this.isInvincible) {
      const cycle = Math.floor(this.animTime * 1.8) % 3;
      if (cycle === 0) { baseColor = '#00f0ff'; secondaryColor = '#0066aa'; highlightColor = '#e0f7ff'; }
      else if (cycle === 1) { baseColor = '#ff007f'; secondaryColor = '#990044'; highlightColor = '#ffe4f0'; }
      else { baseColor = '#fbbf24'; secondaryColor = '#b45309'; highlightColor = '#fef08a'; }
    }

    // 🛡️ Legal Shield Aura
    if (this.shieldActive) {
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 15;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.85)';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.arc(px + pW/2, py + pH/2, pW * 0.75, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    const cx = px + pW/2;
    const cy = py + pH/2;
    
    let angle = 0;
    if (!this.isGrounded) {
      angle = this.vy * 0.028;
    } else {
      angle = Math.sin(this.animTime) * 0.04;
    }
    
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    
    // -------------------------------------------------------------
    // 1. RUNNING LEGS (Six cute jointed insect legs in 3D-like scurry)
    // -------------------------------------------------------------
    const legXOffsets = this.isDucking ? [-16, 0, 16] : [-12, 0, 12];
    
    if (this.isDucking) {
      // Ducking/sliding legs: Tucked in comically tight to slide smoothly!
      ctx.strokeStyle = secondaryColor;
      ctx.lineWidth = 2.0;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      legXOffsets.forEach((lx) => {
        ctx.beginPath();
        ctx.moveTo(lx, 4);
        ctx.lineTo(lx - 4, 7);
        ctx.lineTo(lx - 12, 6);
        ctx.stroke();
      });
    } else {
      // Parallax leg scurry: Background legs (opposite phase and darker/semi-transparent)
      ctx.strokeStyle = 'rgba(69, 26, 3, 0.35)'; // translucent dark chocolate
      ctx.lineWidth = 2.0;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      legXOffsets.forEach((lx, idx) => {
        const phase = this.animTime * 2.6 + idx * (Math.PI * 2 / 3) + Math.PI;
        const kneeX = lx - 2 + Math.cos(phase) * 5;
        const kneeY = 8 + Math.sin(phase) * 3;
        const footX = lx - 4 + Math.cos(phase) * 9;
        const footY = 16 + Math.sin(phase) * 5;
        
        ctx.beginPath();
        ctx.moveTo(lx, 2);
        ctx.lineTo(kneeX, kneeY);
        ctx.lineTo(footX, footY);
        ctx.stroke();
      });
      
      // Foreground legs (fully opaque, slightly lower)
      ctx.strokeStyle = secondaryColor;
      ctx.lineWidth = 2.5;
      legXOffsets.forEach((lx, idx) => {
        const phase = this.animTime * 2.6 + idx * (Math.PI * 2 / 3);
        const kneeX = lx - 5 + Math.cos(phase) * 6;
        const kneeY = 10 + Math.sin(phase) * 4;
        const footX = lx - 8 + Math.cos(phase) * 10;
        const footY = 20 + Math.sin(phase) * 6;
        
        ctx.beginPath();
        ctx.moveTo(lx, 4);
        ctx.lineTo(kneeX, kneeY);
        ctx.lineTo(footX, footY);
        ctx.stroke();
      });
    }

    // -------------------------------------------------------------
    // 2. ANTENNAE SWAY (Long, elegant curved lines - primary insect signature!)
    // -------------------------------------------------------------
    ctx.strokeStyle = secondaryColor;
    ctx.lineWidth = 1.4;
    ctx.lineCap = 'round';
    
    const sway1 = Math.sin(this.animTime * 1.5) * 5;
    const sway2 = Math.cos(this.animTime * 1.5) * 5;
    
    if (this.isDucking) {
      // Flatter feelers when sliding
      ctx.beginPath();
      ctx.moveTo(22, -3);
      ctx.quadraticCurveTo(35, -12 + sway1, 50, -8 + sway1);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(23, -1);
      ctx.quadraticCurveTo(36, -2 - sway2, 48, 1 - sway2);
      ctx.stroke();
    } else {
      // Long beautiful sweeping feelers
      ctx.beginPath();
      ctx.moveTo(17, -8);
      ctx.quadraticCurveTo(28, -25 + sway1, 50, -18 + sway1);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(19, -5);
      ctx.quadraticCurveTo(30, -7 - sway2, 48, 0 - sway2);
      ctx.stroke();
    }

    // -------------------------------------------------------------
    // 3. ABDOMEN & SEGMENTED SHELL (Beautiful, high-contrast insect texture!)
    // -------------------------------------------------------------
    ctx.fillStyle = baseColor;
    ctx.beginPath();
    if (this.isDucking) {
      ctx.ellipse(-4, 2, 25, 8, 0, 0, Math.PI * 2);
    } else {
      ctx.ellipse(-4, 0, 20, 14, 0, 0, Math.PI * 2);
    }
    ctx.fill();
    
    // Abdomen Segments (essential cockroach striped pattern!)
    ctx.strokeStyle = secondaryColor;
    ctx.lineWidth = 2.0;
    const segStart = this.isDucking ? -16 : -12;
    const segEnd = this.isDucking ? 8 : 6;
    const segStep = this.isDucking ? 6 : 5;
    
    for (let lx = segStart; lx <= segEnd; lx += segStep) {
      ctx.beginPath();
      if (this.isDucking) {
        ctx.arc(lx - 3, 2, 7, -Math.PI/2, Math.PI/2);
      } else {
        ctx.arc(lx - 4, 0, 12, -Math.PI/2, Math.PI/2);
      }
      ctx.stroke();
    }

    // -------------------------------------------------------------
    // 4. OVERLAPPING WINGS (Glossy, curved chocolate plates)
    // -------------------------------------------------------------
    ctx.fillStyle = secondaryColor;
    ctx.beginPath();
    
    // Jumps raise the wings slightly (delightful vector micro-animation!)
    const wingLift = (!this.isGrounded && this.vy < 0) ? -0.15 : 0;
    
    if (this.isDucking) {
      ctx.ellipse(-5, 0, 23, 6, -0.02 + wingLift, 0, Math.PI * 2);
    } else {
      ctx.ellipse(-6, -2, 19, 10, -0.05 + wingLift, 0, Math.PI * 2);
    }
    ctx.fill();
    
    // Soft Shiny Wing Specular Highlight (Flat-cartoon gloss)
    ctx.fillStyle = highlightColor;
    ctx.beginPath();
    if (this.isDucking) {
      ctx.ellipse(-5, -2, 12, 1.8, -0.02 + wingLift, 0, Math.PI * 2);
    } else {
      ctx.ellipse(-6, -5, 10, 2.5, -0.05 + wingLift, 0, Math.PI * 2);
    }
    ctx.fill();

    // -------------------------------------------------------------
    // 5. CUTE PROFILE HEAD
    // -------------------------------------------------------------
    ctx.fillStyle = baseColor;
    ctx.beginPath();
    if (this.isDucking) {
      ctx.ellipse(20, 1, 7, 6, 0, 0, Math.PI * 2);
    } else {
      ctx.ellipse(15, -2, 8, 8, 0, 0, Math.PI * 2);
    }
    ctx.fill();

    // -------------------------------------------------------------
    // 6. ADORABLE GOOFY EYES (Overlapping side-profile cartoon eyes)
    // -------------------------------------------------------------
    const eyeX = this.isDucking ? 20 : 15;
    const eyeY = this.isDucking ? -2 : -6;
    const eyeR = this.isDucking ? 4.0 : 5.0;
    
    if (this.isInvincible) {
      // Cool golden-white shades for power-up
      let glassGrad = ctx.createLinearGradient(eyeX - 3, eyeY - 3, eyeX + 4, eyeY + 4);
      glassGrad.addColorStop(0, '#333333');
      glassGrad.addColorStop(0.5, '#111111');
      glassGrad.addColorStop(1, '#ffd700');
      
      ctx.fillStyle = glassGrad;
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 1.2;
      
      ctx.beginPath();
      ctx.arc(eyeX - 1.5, eyeY, eyeR - 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(eyeX + 1.5, eyeY + 0.5, eyeR - 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else if (this.activeSkin === 'golden') {
      // Golden skin gets cool black futuristic shades!
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.ellipse(eyeX - 1, eyeY, eyeR * 0.9, eyeR * 0.7, 0.1, 0, Math.PI * 2);
      ctx.ellipse(eyeX + 3, eyeY + 0.5, eyeR * 0.9, eyeR * 0.7, -0.1, 0, Math.PI * 2);
      ctx.fill();
      
      // Highlights on sunglasses
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(eyeX - 2, eyeY - 2, 2, 0.8);
      ctx.fillRect(eyeX + 2, eyeY - 1.5, 2, 0.8);
    } else {
      // Standard large cartoon white eyeballs (overlapping)
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = secondaryColor;
      ctx.lineWidth = 1.0;
      
      // Left eye
      ctx.beginPath();
      ctx.arc(eyeX - 1.5, eyeY, eyeR, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Right eye (overlapping)
      ctx.beginPath();
      ctx.arc(eyeX + 1.8, eyeY + 0.5, eyeR, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Playful black pupils
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(eyeX - 0.8, eyeY, eyeR * 0.5, 0, Math.PI * 2);
      ctx.arc(eyeX + 2.5, eyeY + 0.5, eyeR * 0.5, 0, Math.PI * 2);
      ctx.fill();
      
      // Specular highlight dots (Sparkles!)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(eyeX - 0.1, eyeY - 0.8, eyeR * 0.18, 0, Math.PI * 2);
      ctx.arc(eyeX + 3.2, eyeY - 0.3, eyeR * 0.18, 0, Math.PI * 2);
      ctx.fill();
    }

    // Goofy wide smile
    ctx.strokeStyle = secondaryColor;
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    if (this.isDucking) {
      ctx.arc(eyeX + 3, eyeY + 5, 2.0, 0, Math.PI);
    } else {
      ctx.arc(eyeX + 3, eyeY + 6, 2.5, 0, Math.PI);
    }
    ctx.stroke();

    // -------------------------------------------------------------
    // 7. THEMATIC ACCESSORIES PER SKIN (Subtle, clean, and comically cute!)
    // -------------------------------------------------------------
    
    // A. DEFAULT SKIN: "Unemployed Graduate"
    if (this.activeSkin === 'default') {
      // Comically tilted tiny black graduation cap (mortarboard)
      ctx.save();
      if (this.isDucking) {
        ctx.translate(16, -6);
      } else {
        ctx.translate(11, -14);
      }
      ctx.rotate(-0.25);
      
      // Cap cylinder base
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(-2.5, 0, 5, 2);
      
      // Cap flat board rhombus
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.moveTo(0, -2.5);
      ctx.lineTo(5.5, -1.2);
      ctx.lineTo(0, 0.2);
      ctx.lineTo(-5.5, -1.2);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 0.5;
      ctx.stroke();
      
      // Tassel
      ctx.strokeStyle = '#fbbf24'; // Gold tassel
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(0, -1.2);
      ctx.lineTo(-4, 0.8);
      ctx.lineTo(-4, 3.5);
      ctx.stroke();
      
      ctx.restore();

      // Tiny degree scroll held in front arm (doesn't block head or body!)
      if (!this.isDucking) {
        ctx.strokeStyle = baseColor;
        ctx.lineWidth = 2.8;
        ctx.beginPath();
        ctx.moveTo(10, 4);
        ctx.lineTo(16, 7);
        ctx.stroke();
        
        ctx.save();
        ctx.translate(17, 7);
        ctx.rotate(0.35);
        
        // Rolled degree scroll
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 0.5;
        ctx.fillRect(-2, -5, 4, 10);
        ctx.strokeRect(-2, -5, 4, 10);
        
        // Tiny red ribbon
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(-2.5, -1, 5, 2);
        ctx.restore();
      }
    }
    
    // B. VIP SKIN: "Sarkari Job Aspirant"
    else if (this.activeSkin === 'vip') {
      // Tiny red flashing VIP beacon (lal batti) hat comically perched on its head
      ctx.save();
      if (this.isDucking) {
        ctx.translate(16, -6);
      } else {
        ctx.translate(11, -14);
      }
      ctx.rotate(-0.15);
      
      // Base
      ctx.fillStyle = '#334155';
      ctx.fillRect(-2.5, 0, 5, 1.5);
      
      // Flashing Red Dome
      const strob = Math.sin(this.animTime * 3.5) * 0.5 + 0.5;
      ctx.fillStyle = `rgba(239, 68, 68, ${0.4 + strob * 0.6})`;
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = this.shieldActive ? 0 : 8 * strob;
      ctx.beginPath();
      ctx.arc(0, 0, 2.5, Math.PI, 0);
      ctx.fill();
      ctx.shadowBlur = 0;
      
      ctx.restore();

      // Tiny neat stack of UPSC study books strapped to its back like a school backpack!
      ctx.save();
      if (this.isDucking) {
        ctx.translate(-15, 2);
      } else {
        ctx.translate(-14, -2);
      }
      ctx.rotate(-0.08);
      
      // Orange Book
      ctx.fillStyle = '#ea580c';
      ctx.fillRect(-5, -4, 10, 3);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(3.8, -4, 1, 3);
      
      // Blue Book on top
      ctx.fillStyle = '#2563eb';
      ctx.fillRect(-4, -6.5, 8, 2.5);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(2.8, -6.5, 1, 2.5);
      
      // Strap around body (drawn simple)
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(4, -1, 3.5, -Math.PI/2, Math.PI/2);
      ctx.stroke();
      
      ctx.restore();
    }
    
    // C. POLITICIAN SKIN: "Rebellious Protester"
    else if (this.activeSkin === 'politician') {
      // Red protest headband tied around head
      ctx.save();
      const hx = this.isDucking ? 20 : 15;
      const hy = this.isDucking ? -2 : -6;
      
      ctx.strokeStyle = '#ef4444'; // Bright Red
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.moveTo(hx - 3.5, hy);
      ctx.lineTo(hx + 3.5, hy + 0.8);
      ctx.stroke();
      
      // Waving ribbons at back
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.0;
      const wave = Math.sin(this.animTime * 1.5) * 1.8;
      ctx.beginPath();
      ctx.moveTo(hx - 3.5, hy);
      ctx.quadraticCurveTo(hx - 7, hy - 2 + wave, hx - 10, hy + wave);
      ctx.moveTo(hx - 3.5, hy);
      ctx.quadraticCurveTo(hx - 6, hy - 4 - wave, hx - 9, hy - 3 - wave);
      ctx.stroke();
      ctx.restore();

      // Tiny neat protest placard ("JOBS NOW!") in front hand
      if (!this.isDucking) {
        ctx.strokeStyle = baseColor;
        ctx.lineWidth = 2.8;
        ctx.beginPath();
        ctx.moveTo(10, 4);
        ctx.lineTo(17, 6);
        ctx.stroke();
        
        ctx.save();
        ctx.translate(17, 6);
        ctx.rotate(0.08);
        
        // Stick
        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 9);
        ctx.stroke();
        
        // Yellow Board
        ctx.fillStyle = '#fef08a';
        ctx.strokeStyle = '#b45309';
        ctx.lineWidth = 0.6;
        ctx.fillRect(-6, -9, 12, 9);
        ctx.strokeRect(-6, -9, 12, 9);
        
        // Red Bold slogan "JOBS NOW!"
        ctx.fillStyle = '#b91c1c';
        ctx.font = 'bold 3.2px "Outfit", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText("JOBS", 0, -5.5);
        ctx.fillText("NOW!", 0, -2);
        ctx.restore();
      }
    }
    
    // D. GOLDEN SKIN: "Viral Influencer"
    else if (this.activeSkin === 'golden') {
      // Cool golden headphones over the head!
      ctx.save();
      const hx = this.isDucking ? 20 : 15;
      const hy = this.isDucking ? -2 : -6;
      ctx.translate(hx, hy);
      ctx.rotate(-0.1);
      
      // Headband
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(0, 0, 4.8, Math.PI, 0);
      ctx.stroke();
      
      // Ear cups
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(-5.5, -1.5, 2.0, 4);
      ctx.fillRect(3.5, -1.5, 2.0, 4);
      ctx.restore();
    }
    
    ctx.restore();
  }
}


// ============================================================================
// 5. Satirical Caricature Obstacles Spawner (Exactly as shown in Image)
// ============================================================================
class Obstacle {
  constructor(canvas, type, speed) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    this.type = type; // 'leader_shouting', 'leader_cash', 'leader_bureaucrat', 'leak', 'redtape'
    this.speed = speed;
    this.groundY = 370;
    
    this.animTime = Math.random() * 10;
    
    // Select a comical speech phrase that matches the politician type
    if (this.type === 'leader_shouting') {
      const phrases = ["GET A JOB!", "NO VACANCIES!", "GO TO STAGE!", "TAX THE YOUTH!", "RE-EXAM IN 2027!"];
      this.phrase = phrases[Math.floor(Math.random() * phrases.length)];
      this.width = 75;
      this.height = 75;
    } else if (this.type === 'leader_cash') {
      const phrases = ["BRIBE ME FIRST!", "SWISS VAULT!", "LEAKED PAPER?", "CASH FOR NOC!"];
      this.phrase = phrases[Math.floor(Math.random() * phrases.length)];
      this.width = 80;
      this.height = 80;
    } else if (this.type === 'leader_bureaucrat') {
      const phrases = ["FILE DENIED!", "NOC MANDATORY!", "COME TOMORROW!", "UNDER TABLE?"];
      this.phrase = phrases[Math.floor(Math.random() * phrases.length)];
      this.width = 75;
      this.height = 75;
    } else if (this.type === 'leak') {
      this.width = 65;
      this.height = 48;
    } else { // 'redtape'
      this.width = 45;
      this.height = 35;
    }
    
    this.y = this.groundY - this.height;
    this.x = canvas.width + 100;
  }

  update(gameSpeed, particles, dt = 1) {
    this.x -= gameSpeed * dt;
    this.animTime += 0.18 * dt;
    
    // Leaking papers fall randomly from leak stack
    if (this.type === 'leak' && Math.random() > 0.82) {
      particles.spawnPaperSheet(this.x + this.width / 2, this.y + 10);
    }
  }

  draw() {
    const ctx = this.ctx;
    const cx = this.x + this.width / 2;
    const cy = this.y + this.height / 2;
    
    ctx.save();
    
    if (this.type === 'leader_shouting') {
      // -------------------------------------------------------------
      // 1. SHOUTING MEGA-POLITICIAN
      // -------------------------------------------------------------
      // Body (Kurta and Sash)
      ctx.fillStyle = '#f8fafc'; // White Kurta chest
      ctx.beginPath();
      ctx.moveTo(cx - 20, cy + 25);
      ctx.quadraticCurveTo(cx - 15, cy + 5, cx - 10, cy + 5);
      ctx.lineTo(cx + 10, cy + 5);
      ctx.quadraticCurveTo(cx + 15, cy + 5, cx + 20, cy + 25);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      // Simple neutral dark grey scarf (no party symbols / colors)
      ctx.save();
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(cx - 10, cy + 6);
      ctx.lineTo(cx + 10, cy + 24);
      ctx.stroke();
      ctx.restore();
      
      // Caricature Face
      ctx.fillStyle = '#fbcfe8'; // Pink skin
      ctx.strokeStyle = '#881337';
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.arc(cx, cy - 8, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Shouting Mouth (huge open ellipse)
      ctx.fillStyle = '#4c0519'; // dark mouth interior
      ctx.beginPath();
      ctx.ellipse(cx - 4, cy - 6, 8, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Teeth and Tongue
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx - 8, cy - 10, 8, 2); // top teeth
      ctx.fillStyle = '#f43f5e'; // pink tongue
      ctx.beginPath();
      ctx.arc(cx - 4, cy - 2, 3, 0, Math.PI, true);
      ctx.fill();
      
      // Angry Frowny Eye
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(cx + 4, cy - 11, 2.5, 0, Math.PI * 2);
      ctx.fill();
      
      // Frowny eyebrow
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.moveTo(cx + 1, cy - 15);
      ctx.lineTo(cx + 8, cy - 13);
      ctx.stroke();
      
      // Hair (Classic wavy grey hair)
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.arc(cx - 10, cy - 14, 5, 0, Math.PI * 2);
      ctx.arc(cx + 10, cy - 14, 5, 0, Math.PI * 2);
      ctx.arc(cx, cy - 20, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      // Grey Megaphone pointing left
      ctx.fillStyle = '#475569';
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1.8;
      
      // Horn cone
      ctx.beginPath();
      ctx.moveTo(cx - 6, cy - 6);
      ctx.lineTo(cx - 24, cy - 18);
      ctx.lineTo(cx - 20, cy + 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Megaphone grip & body
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(cx - 10, cy - 4, 6, 8);
      ctx.strokeRect(cx - 10, cy - 4, 6, 8);
      
      // Shouting Megaphone glow ring
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 10;
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.ellipse(cx - 22, cy - 8, 3, 10, 0.1, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      // Glowing Speech Bubble with static text
      ctx.save();
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 12;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)'; // Sleek glassmorphism dark bubble
      ctx.strokeStyle = '#fbbf24'; // Neon Gold border
      ctx.lineWidth = 2.0;
      
      // Bubble box
      const bx = cx - 35;
      const by = cy - 54;
      const bw = 80;
      const bh = 18;
      
      ctx.beginPath();
      ctx.roundRect(bx, by, bw, bh, 5);
      ctx.fill();
      ctx.stroke();
      
      // Bubble pointer pointing down to megaphone
      ctx.beginPath();
      ctx.moveTo(cx - 12, by + bh);
      ctx.lineTo(cx - 18, by + bh + 6);
      ctx.lineTo(cx - 6, by + bh);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      // Text inside bubble
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 8px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.phrase, bx + bw / 2, by + bh / 2 + 0.5);
      ctx.restore();
    }
    else if (this.type === 'leader_cash') {
      // -------------------------------------------------------------
      // 2. CORRUPT CASH HOARDER
      // -------------------------------------------------------------
      // Money sack at bottom left/right
      ctx.fillStyle = '#16a34a'; // Green canvas
      ctx.strokeStyle = '#14532d';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(cx - 15, cy + 18, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Tie rope on sack
      ctx.fillStyle = '#eab308';
      ctx.fillRect(cx - 19, cy + 6, 8, 3);
      
      // Rupee symbol "₹" on money bag
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText("₹", cx - 15, cy + 22);
      
      // Fat Caricature Body (suited chest)
      ctx.fillStyle = '#e2e8f0'; // light grey designer vest
      ctx.beginPath();
      ctx.ellipse(cx + 8, cy + 16, 16, 20, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Fat Face
      ctx.fillStyle = '#fed7aa'; // light warm peach skin tone
      ctx.strokeStyle = '#7c2d12';
      ctx.lineWidth = 2.0;
      
      // Face circle
      ctx.beginPath();
      ctx.arc(cx + 8, cy - 4, 13, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Double chin
      ctx.beginPath();
      ctx.arc(cx + 8, cy + 4, 8, 0, Math.PI);
      ctx.stroke();
      
      // Slicked-back dark grey hair
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.ellipse(cx + 6, cy - 15, 11, 6, 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      
      // Black Retro Sunglasses (cool corrupt vibe)
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.ellipse(cx + 3, cy - 6, 4.5, 3.2, 0.1, 0, Math.PI * 2);
      ctx.ellipse(cx + 11, cy - 5, 4.5, 3.2, -0.1, 0, Math.PI * 2);
      ctx.fill();
      
      // White glass highlights on sunglasses
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx + 2, cy - 7, 2, 1.2);
      ctx.fillRect(cx + 10, cy - 6, 2, 1.2);
      
      // Frowning happy mouth (smug smile)
      ctx.strokeStyle = '#7c2d12';
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.arc(cx + 7, cy + 1, 4, 0.1, Math.PI - 0.1);
      ctx.stroke();
      
      // Briefcase spilling cash (held in right side)
      ctx.fillStyle = '#78350f'; // brown leather briefcase
      ctx.strokeStyle = '#451a03';
      ctx.lineWidth = 1.5;
      ctx.fillRect(cx + 18, cy + 4, 16, 12);
      ctx.strokeRect(cx + 18, cy + 4, 16, 12);
      // handle
      ctx.strokeStyle = '#d97706';
      ctx.beginPath();
      ctx.arc(cx + 26, cy + 4, 3, Math.PI, 0);
      ctx.stroke();
      
      // Spilling cash bills (green rectangles)
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(cx + 20, cy + 14, 6, 3);
      ctx.fillRect(cx + 26, cy + 12, 5, 3);
      
      // Glowing speech bubble with static text
      ctx.save();
      ctx.shadowColor = '#a855f7';
      ctx.shadowBlur = 12;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)'; // glassmorphism dark bubble
      ctx.strokeStyle = '#a855f7'; // Neon Purple border
      ctx.lineWidth = 2.0;
      
      // Bubble box
      const bx2 = cx - 35;
      const by2 = cy - 48;
      const bw2 = 80;
      const bh2 = 18;
      
      ctx.beginPath();
      ctx.roundRect(bx2, by2, bw2, bh2, 5);
      ctx.fill();
      ctx.stroke();
      
      // bubble pointer
      ctx.beginPath();
      ctx.moveTo(cx + 8, by2 + bh2);
      ctx.lineTo(cx + 4, by2 + bh2 + 6);
      ctx.lineTo(cx + 12, by2 + bh2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      // Text inside bubble
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 7.5px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.phrase, bx2 + bw2 / 2, by2 + bh2 / 2 + 0.5);
      ctx.restore();
    }
    else if (this.type === 'leader_bureaucrat') {
      // -------------------------------------------------------------
      // 3. ANGRY BUREAUCRAT
      // -------------------------------------------------------------
      // Body (Blue suit chest, red tie)
      ctx.fillStyle = '#1e3a8a'; // Dark blue suit jacket
      ctx.beginPath();
      ctx.moveTo(cx - 18, cy + 25);
      ctx.lineTo(cx - 14, cy + 6);
      ctx.lineTo(cx + 14, cy + 6);
      ctx.lineTo(cx + 18, cy + 25);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#172554';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      // White collar
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(cx - 6, cy + 6);
      ctx.lineTo(cx, cy + 12);
      ctx.lineTo(cx + 6, cy + 6);
      ctx.closePath();
      ctx.fill();
      
      // Red tie
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(cx - 2, cy + 12);
      ctx.lineTo(cx + 2, cy + 12);
      ctx.lineTo(cx + 4, cy + 24);
      ctx.lineTo(cx, cy + 26);
      ctx.lineTo(cx - 4, cy + 24);
      ctx.closePath();
      ctx.fill();
      
      // Head (pink, balding)
      ctx.fillStyle = '#fecdd3'; // rosy skin
      ctx.strokeStyle = '#9f1239';
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.arc(cx, cy - 8, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // White side-hair blocks (balding caricature)
      ctx.fillStyle = '#f1f5f9';
      ctx.beginPath();
      ctx.ellipse(cx - 10, cy - 6, 4, 6, 0.1, 0, Math.PI * 2);
      ctx.ellipse(cx + 10, cy - 6, 4, 6, -0.1, 0, Math.PI * 2);
      ctx.fill();
      
      // Glasses (Round frames)
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(cx - 4, cy - 9, 3.5, 0, Math.PI * 2);
      ctx.arc(cx + 4, cy - 9, 3.5, 0, Math.PI * 2);
      ctx.stroke();
      
      // Glasses bridge line
      ctx.beginPath();
      ctx.moveTo(cx - 1, cy - 9);
      ctx.lineTo(cx + 1, cy - 9);
      ctx.stroke();
      
      // Frowning eyebrows (angry!)
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(cx - 8, cy - 14);
      ctx.lineTo(cx - 2, cy - 12);
      ctx.moveTo(cx + 8, cy - 14);
      ctx.lineTo(cx + 2, cy - 12);
      ctx.stroke();
      
      // Angry straight frown mouth
      ctx.strokeStyle = '#9f1239';
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.moveTo(cx - 5, cy - 2);
      ctx.lineTo(cx + 5, cy - 3);
      ctx.stroke();
      
      // Holding a red tape scroll in his hand
      // Scroll drawing
      ctx.fillStyle = '#fef08a'; // Cream papyrus scroll
      ctx.strokeStyle = '#ef4444'; // Red outline and ribbons
      ctx.lineWidth = 2.0;
      ctx.save();
      ctx.translate(cx - 16, cy + 8);
      ctx.rotate(-0.25);
      ctx.fillRect(-6, -15, 12, 30);
      ctx.strokeRect(-6, -15, 12, 30);
      // Red ribbons wrapping
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(-6, -6); ctx.lineTo(6, -6);
      ctx.moveTo(-6, 6); ctx.lineTo(6, 6);
      ctx.stroke();
      // Bold "DENIED!" text
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 5px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText("NOC", 0, -10);
      ctx.fillText("DENY", 0, 12);
      ctx.restore();
      
      // Glowing speech bubble with static text
      ctx.save();
      ctx.shadowColor = '#f43f5e';
      ctx.shadowBlur = 12;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)'; // glassmorphism dark bubble
      ctx.strokeStyle = '#f43f5e'; // Neon Red/Pink border
      ctx.lineWidth = 2.0;
      
      // Bubble box
      const bx3 = cx - 35;
      const by3 = cy - 48;
      const bw3 = 80;
      const bh3 = 18;
      
      ctx.beginPath();
      ctx.roundRect(bx3, by3, bw3, bh3, 5);
      ctx.fill();
      ctx.stroke();
      
      // bubble pointer
      ctx.beginPath();
      ctx.moveTo(cx, by3 + bh3);
      ctx.lineTo(cx - 4, by3 + bh3 + 6);
      ctx.lineTo(cx + 4, by3 + bh3);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      // Text inside bubble
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 7px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.phrase, bx3 + bw3 / 2, by3 + bh3 / 2 + 0.5);
      ctx.restore();
    }
    else if (this.type === 'leak') {
      // -------------------------------------------------------------
      // 4. EXAM LEAK PAPER PILE
      // -------------------------------------------------------------
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 18;
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.5;
      
      const sheets = [
        { rx: -12, ry: 5, rot: -0.15 },
        { rx: 12, ry: 10, rot: 0.18 },
        { rx: -2, ry: -5, rot: 0.05 }
      ];
      
      sheets.forEach((sheet) => {
        ctx.save();
        ctx.translate(cx + sheet.rx, cy + sheet.ry);
        ctx.rotate(sheet.rot);
        
        ctx.fillStyle = '#ffe4e6';
        ctx.fillRect(-15, -20, 30, 36);
        ctx.strokeRect(-15, -20, 30, 36);
        
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
        ctx.lineWidth = 1.0;
        for (let l = -12; l <= 12; l += 5) {
          ctx.beginPath();
          ctx.moveTo(-10, l);
          ctx.lineTo(10, l);
          ctx.stroke();
        }
        
        ctx.fillStyle = '#e11d48';
        ctx.font = 'bold 5px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.fillText("EXAM", 0, -8);
        ctx.fillText("LEAK", 0, -2);
        
        ctx.restore();
      });
      ctx.shadowBlur = 0;
    }
    else {
      // -------------------------------------------------------------
      // 5. RED TAPE FILES
      // -------------------------------------------------------------
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 18;
      ctx.fillStyle = '#ef4444';
      ctx.strokeStyle = '#7f1d1d';
      ctx.lineWidth = 1.8;
      
      ctx.fillRect(this.x, this.y + 8, 38, 22);
      ctx.strokeRect(this.x, this.y + 8, 38, 22);
      
      ctx.fillStyle = '#f43f5e';
      ctx.fillRect(this.x + 3, this.y, 32, 8);
      ctx.strokeRect(this.x + 3, this.y, 32, 8);
      
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.moveTo(this.x + 10, this.y);
      ctx.lineTo(this.x + 10, this.y + 30);
      ctx.moveTo(this.x + 28, this.y);
      ctx.lineTo(this.x + 28, this.y + 30);
      ctx.stroke();
    }
    
    ctx.restore();
  }

  getCollisionRect() {
    if (this.type === 'leak') {
      return { x: this.x + 8, y: this.y + 10, width: this.width - 16, height: this.height - 10 };
    } else if (this.type === 'redtape') {
      return { x: this.x + 4, y: this.y + 4, width: this.width - 8, height: this.height - 4 };
    } else if (this.type === 'leader_shouting') {
      return { x: this.x + 12, y: this.y + 8, width: this.width - 24, height: this.height - 8 };
    } else if (this.type === 'leader_cash') {
      return { x: this.x + 10, y: this.y + 10, width: this.width - 20, height: this.height - 10 };
    } else if (this.type === 'leader_bureaucrat') {
      return { x: this.x + 12, y: this.y + 8, width: this.width - 24, height: this.height - 8 };
    } else {
      return { x: this.x + 5, y: this.y + 5, width: this.width - 10, height: this.height - 5 };
    }
  }
}


// ============================================================================
// 6. Collectible Items Class (💡 Resilience Coins & Chai Cups labeled)
// ============================================================================
class Collectible {
  constructor(canvas, type, x, y) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    this.type = type; // 'bulb' or 'chai'
    this.x = x;
    this.y = y;
    
    this.width = type === 'bulb' ? 24 : 32;
    this.height = type === 'bulb' ? 24 : 32;
    
    this.animTime = Math.random() * 10;
    
    this.vx = 0;
    this.vy = 0;
  }

  update(gameSpeed, player, particles, dt = 1) {
    if (this.vx === 0 && this.vy === 0) {
      this.x -= gameSpeed * dt;
    } else {
      this.x += this.vx * dt;
      this.y += this.vy * dt;
    }
    
    this.animTime += 0.15 * dt;
    
    if (this.type === 'chai' && Math.random() > 0.7) {
      particles.spawnSteam(this.x + this.width / 2 + Math.sin(this.animTime) * 3, this.y + 4);
    }
    
    // Magnet pull physics
    const magnetDistance = player.hasMagnet ? 220 : 100;
    const dx = (player.x + player.width / 2) - (this.x + this.width / 2);
    const dy = (player.y + player.height / 2) - (this.y + this.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < magnetDistance) {
      const pull = 8.5;
      this.vx = (dx / distance) * pull;
      this.vy = (dy / distance) * pull;
    }
  }

  draw() {
    const ctx = this.ctx;
    const bounce = Math.sin(this.animTime) * 3;
    const cx = this.x + this.width / 2;
    const cy = this.y + this.height / 2 + bounce;
    
    ctx.save();
    
    // -------------------------------------------------------------
    // COLLECTIBLE 1: RESILIENCE COIN (Bulb + text label exactly as image!)
    // -------------------------------------------------------------
    if (this.type === 'bulb') {
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.arc(cx, cy - 3, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(cx - 3, cy + 3, 6, 3);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(cx - 1.5, cy + 6, 3, 1.5);
      
      // Filament
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(cx - 2, cy - 1);
      ctx.lineTo(cx - 0.5, cy - 4);
      ctx.lineTo(cx + 0.5, cy - 4);
      ctx.lineTo(cx + 2, cy - 1);
      ctx.stroke();
      
      // Draw label "RESILIENCE COINS" below bulb matching image
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 7.5px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.shadowColor = '#000000';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.fillText("RESILIENCE", cx, cy + 16);
      ctx.fillText("COINS", cx, cy + 22);
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }
    
    // -------------------------------------------------------------
    // COLLECTIBLE 2: CHAI CUP (Coffee mug + text label exactly as image!)
    // -------------------------------------------------------------
    else if (this.type === 'chai') {
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 10;
      
      // Draw brown paper cup with sleeve and lid
      ctx.fillStyle = '#b45309'; // Cup brown
      ctx.beginPath();
      ctx.moveTo(cx - 6, cy - 8);
      ctx.lineTo(cx + 6, cy - 8);
      ctx.lineTo(cx + 4, cy + 8);
      ctx.lineTo(cx - 4, cy + 8);
      ctx.closePath();
      ctx.fill();
      
      // Sleeve band
      ctx.fillStyle = '#d97706'; // Sleeve gold brown
      ctx.fillRect(cx - 5.2, cy - 2, 10.4, 6);
      
      // White plastic lid
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx - 7, cy - 11, 14, 3);
      
      ctx.shadowBlur = 0;
      
      // Draw label "CHAI CUP" below cup matching image
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 7.5px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.shadowColor = '#000000';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      ctx.fillText("CHAI", cx, cy + 16);
      ctx.fillText("CUP", cx, cy + 22);
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }
    
    ctx.restore();
  }

  getCollisionRect() {
    return { x: this.x, y: this.y, width: this.width, height: this.height };
  }
}


// ============================================================================
// 7. Master Game Engine Core (Orchestrating UI HUDs & canvas loops)
// ============================================================================
class GameEngine {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    
    this.baseWidth = 1000;
    this.baseHeight = 500;
    
    this.gameState = 'START';
    this.score = 0;
    this.highScore = 0;
    this.bulbsCount = 0;
    this.campaignBulbs = 0;
    
    this.level = 1;
    this.levelScoreThreshold = 800; // score needed for Level 2
    
    this.baseSpeed = 5.2;
    this.gameSpeed = 5.2;
    this.currentSpeedMultiplier = 1.0;
    this.acceleration = 0.00065;
    
    this.obstacleTimer = 0;
    this.collectibleTimer = 0;
    this.obstacleSpawnInterval = 130;
    
    this.background = new ParallaxBackground(this.canvas);
    this.particles = new ParticleEngine();
    this.player = new CockroachPlayer(this.canvas);
    
    this.obstacles = [];
    this.collectibles = [];
    
    this.unlockedSkins = ['default'];
    this.equippedSkin = 'default';
    this.upgradeShield = false;
    this.upgradeMagnet = false;
    
    this.loadPersistenceData();
    
    // Detect Touch Device
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouch) {
      document.body.classList.add('is-touch-device');
    }
    
    this.bindEvents();
    this.resizeCanvas();
    
    this.lastFrameTime = 0;
  }

  // --- Persistence data ---
  loadPersistenceData() {
    try {
      this.highScore = parseInt(localStorage.getItem('cr_high_score')) || 0;
      this.bulbsCount = parseInt(localStorage.getItem('cr_bulbs')) || 0;
      
      const savedSkins = localStorage.getItem('cr_unlocked_skins');
      if (savedSkins) this.unlockedSkins = JSON.parse(savedSkins);
      
      this.equippedSkin = localStorage.getItem('cr_equipped_skin') || 'default';
      this.upgradeShield = localStorage.getItem('cr_upgrade_shield') === 'true';
      this.upgradeMagnet = localStorage.getItem('cr_upgrade_magnet') === 'true';
      
      this.player.activeSkin = this.equippedSkin;
      this.player.hasShield = this.upgradeShield;
      this.player.hasMagnet = this.upgradeMagnet;
      
      this.updateHUDValues();
      this.refreshShopUI();
    } catch (e) {
      console.warn("Local storage sandbox restrictions active.", e);
    }
  }

  savePersistenceData() {
    try {
      localStorage.setItem('cr_high_score', this.highScore.toString());
      localStorage.setItem('cr_bulbs', this.bulbsCount.toString());
      localStorage.setItem('cr_unlocked_skins', JSON.stringify(this.unlockedSkins));
      localStorage.setItem('cr_equipped_skin', this.equippedSkin);
      localStorage.setItem('cr_upgrade_shield', this.upgradeShield.toString());
      localStorage.setItem('cr_upgrade_magnet', this.upgradeMagnet.toString());
    } catch (e) {
      console.warn("Could not save to LocalStorage.", e);
    }
  }

  updateHUDValues() {
    document.getElementById('score-val').innerText = Math.floor(this.score);
    document.getElementById('high-val').innerText = this.highScore;
    document.getElementById('level-val').innerText = this.level;
    document.getElementById('shop-balance-val').innerText = this.bulbsCount;
  }

  resizeCanvas() {
    // Keep canvas drawing bounds locked at 1000x500 coordinates
    this.canvas.width = this.baseWidth;
    this.canvas.height = this.baseHeight;
  }

  showScreen(screenId) {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('pause-screen').classList.add('hidden');
    document.getElementById('game-over-screen').classList.add('hidden');
    document.getElementById('shop-screen').classList.add('hidden');
    document.getElementById('bonds-screen').classList.add('hidden');
    
    if (screenId) {
      document.getElementById(screenId).classList.remove('hidden');
    }
  }

  startGame() {
    sfx.init();
    sfx.resumeContext();
    sfx.playButtonClick();
    
    this.gameState = 'PLAYING';
    this.score = 0;
    this.level = 1;
    this.campaignBulbs = 0;
    this.gameSpeed = this.baseSpeed;
    this.currentSpeedMultiplier = 1.0;
    
    this.obstacles = [];
    this.collectibles = [];
    this.particles.particles = [];
    
    this.player.reset();
    this.player.isInvincible = false;
    this.player.invincibilityTimer = 0;
    this.player.shieldActive = this.player.hasShield;
    console.log(`Game started. State initialized - isInvincible: ${this.player.isInvincible}, shieldActive: ${this.player.shieldActive}`);
    
    this.obstacleTimer = 0;
    this.collectibleTimer = 0;
    this.obstacleSpawnInterval = 130;
    
    this.showScreen(null);
    
    // Sleek general progress capsule shown
    document.getElementById('power-up-bar-container').classList.remove('hidden');
    this.updateHUDValues();
  }

  pauseGame() {
    if (this.gameState !== 'PLAYING') return;
    sfx.playButtonClick();
    this.gameState = 'PAUSED';
    this.showScreen('pause-screen');
  }

  resumeGame() {
    if (this.gameState !== 'PAUSED') return;
    sfx.playButtonClick();
    this.gameState = 'PLAYING';
    this.showScreen(null);
  }

  triggerGameOver() {
    this.gameState = 'GAMEOVER';
    sfx.playGameOver();
    
    this.particles.spawnExplosion(this.player.x + this.player.width/2, this.player.y + this.player.height/2);
    
    const finalScore = Math.floor(this.score);
    if (finalScore > this.highScore) this.highScore = finalScore;
    
    this.bulbsCount += this.campaignBulbs;
    this.savePersistenceData();
    this.updateHUDValues();
    
    document.getElementById('go-score').innerText = finalScore;
    document.getElementById('go-bulbs').innerText = this.campaignBulbs;
    
    const rankObj = this.evaluateSatiricalRank(finalScore);
    document.getElementById('go-rank').innerText = rankObj.rank;
    document.getElementById('go-rank-desc').innerText = rankObj.desc;
    
    this.showScreen('game-over-screen');
    document.getElementById('power-up-bar-container').classList.add('hidden');
  }

  evaluateSatiricalRank(score) {
    if (score < 400) {
      return {
        rank: "COUCH POTATO GRAD 🛋️",
        desc: `"Rejected at 20 interviews. Back to scrolling endless social reels..."`
      };
    } else if (score < 1200) {
      return {
        rank: "SYSTEM STRUGGLER 📑",
        desc: `"Dodged shouting politicians but got tripped by red tape. Re-applying next year..."`
      };
    } else if (score < 2500) {
      return {
        rank: "ACTIVIST GRADUATE 📣",
        desc: `"Leaped over corrupt briefcases and exam leaks. The system is shaking!"`
      };
    } else {
      return {
        rank: "SYSTEM SURVIVOR HERO 👑",
        desc: `"Invincible graduate! Dodged tax scams, file deniers, and corrupt briefcases. Complete legend status!"`
      };
    }
  }

  // --- Spawner ---
  spawnProceduralEntities(dt = 1) {
    this.obstacleTimer += dt;
    this.collectibleTimer += dt;
    
    // Spacing check bounds
    if (this.obstacleTimer >= this.obstacleSpawnInterval) {
      this.obstacleTimer = 0;
      this.obstacleSpawnInterval = Math.max(70, 130 - Math.floor(this.gameSpeed * 4.5));
      
      // Caricature political leaders represent 75% of spawns immediately from Level 1!
      const types = [
        'leader_shouting', 'leader_shouting',
        'leader_cash', 'leader_cash',
        'leader_bureaucrat', 'leader_bureaucrat',
        'leak',
        'redtape'
      ];
      const chosen = types[Math.floor(Math.random() * types.length)];
      
      let okToSpawn = true;
      if (this.obstacles.length > 0) {
        const last = this.obstacles[this.obstacles.length - 1];
        if (this.canvas.width - last.x < 240) okToSpawn = false;
      }
      
      if (okToSpawn) {
        this.obstacles.push(new Obstacle(this.canvas, chosen, this.gameSpeed));
      }
    }
    
    // Spawns items
    if (this.collectibleTimer >= 85) {
      this.collectibleTimer = 0;
      
      const isChai = Math.random() > 0.88;
      const type = isChai ? 'chai' : 'bulb';
      const coinHeight = Math.random() > 0.5 ? 240 : 320;
      
      let okToSpawn = true;
      if (this.collectibles.length > 0) {
        const lastCol = this.collectibles[this.collectibles.length - 1];
        if (this.canvas.width - lastCol.x < 160) okToSpawn = false;
      }
      
      if (okToSpawn) {
        this.collectibles.push(new Collectible(this.canvas, type, this.canvas.width + 50, coinHeight));
      }
    }
  }

  // --- Collisions ---
  checkCollisions() {
    const playerRect = {
      x: this.player.x + 8,
      y: this.player.y + 4,
      width: this.player.width - 16,
      height: this.player.height - 6
    };
    
    // Item collisions
    for (let i = this.collectibles.length - 1; i >= 0; i--) {
      const c = this.collectibles[i];
      const colRect = c.getCollisionRect();
      
      if (this.hasRectOverlap(playerRect, colRect)) {
        if (c.type === 'bulb') {
          sfx.playCoin();
          this.campaignBulbs++;
          this.bulbsCount++;
          this.particles.spawnSparkles(c.x + c.width/2, c.y + c.height/2, '#ffd700');
        } else if (c.type === 'chai') {
          sfx.playPowerup();
          this.player.isInvincible = true;
          this.player.invincibilityTimer = 480; // 8s
          this.particles.spawnSparkles(c.x + c.width/2, c.y + c.height/2, '#0099ff');
        }
        this.updateHUDValues();
        this.collectibles.splice(i, 1);
      }
    }
    
    // Obstacles check
    if (this.player.isInvincible) return;
    
    for (let i = 0; i < this.obstacles.length; i++) {
      const o = this.obstacles[i];
      const obsRect = o.getCollisionRect();
      
      if (this.hasRectOverlap(playerRect, obsRect)) {
        if (this.player.shieldActive) {
          sfx.playPowerup();
          this.player.shieldActive = false; // shatter shield
          this.particles.spawnExplosion(o.x + o.width/2, o.y + o.height/2);
          this.obstacles.splice(i, 1);
          break;
        } else {
          this.triggerGameOver();
          break;
        }
      }
    }
  }

  hasRectOverlap(r1, r2) {
    return r1.x < r2.x + r2.width &&
           r1.x + r1.width > r2.x &&
           r1.y < r2.y + r2.height &&
           r1.y + r1.height > r2.y;
  }

  // --- Upgrades Store ---
  refreshShopUI() {
    document.getElementById('shop-balance-val').innerText = this.bulbsCount;
    
    const skinCards = document.querySelectorAll('#shop-tab-skins .shop-card');
    skinCards.forEach(card => {
      const skinName = card.dataset.skin;
      const buyBtn = card.querySelector('[data-skin-action="buy"]');
      const equipBtn = card.querySelector('[data-skin-action="equip"]');
      
      if (this.unlockedSkins.includes(skinName)) {
        card.classList.add('purchased');
        if (buyBtn) buyBtn.style.display = 'none';
        
        if (!equipBtn) {
          const newEquip = document.createElement('button');
          newEquip.className = 'btn btn-shop btn-equip';
          newEquip.dataset.skinAction = 'equip';
          newEquip.dataset.skinName = skinName;
          newEquip.innerText = 'EQUIP SKIN';
          card.appendChild(newEquip);
          newEquip.addEventListener('click', () => this.equipSkin(skinName));
        }
        
        const currentEquip = card.querySelector('[data-skin-action="equip"]');
        if (currentEquip) {
          if (this.equippedSkin === skinName) {
            currentEquip.innerText = 'EQUIPPED';
            currentEquip.classList.add('active');
          } else {
            currentEquip.innerText = 'EQUIP SKIN';
            currentEquip.classList.remove('active');
          }
        }
      }
    });
    
    const shieldBtn = document.getElementById('btn-buy-shield');
    if (this.upgradeShield) {
      shieldBtn.innerText = 'ACQUIRED ✔';
      shieldBtn.classList.add('active');
      shieldBtn.disabled = true;
    } else {
      shieldBtn.innerText = 'ACQUIRE BOND';
      shieldBtn.classList.remove('active');
      shieldBtn.disabled = false;
    }
    
    const magnetBtn = document.getElementById('btn-buy-magnet');
    if (this.upgradeMagnet) {
      magnetBtn.innerText = 'ACQUIRED ✔';
      magnetBtn.classList.add('active');
      magnetBtn.disabled = true;
    } else {
      magnetBtn.innerText = 'ACQUIRE MAGNET';
      magnetBtn.classList.remove('active');
      magnetBtn.disabled = false;
    }
  }

  buySkin(skinName, cost) {
    if (this.unlockedSkins.includes(skinName)) return;
    if (this.bulbsCount >= cost) {
      this.bulbsCount -= cost;
      this.unlockedSkins.push(skinName);
      this.equippedSkin = skinName;
      this.player.activeSkin = skinName;
      sfx.playPowerup();
      this.savePersistenceData();
      this.updateHUDValues();
      this.refreshShopUI();
    } else {
      alert("⚠️ INSUFFICIENT CAMPAIGN BUDGET! Bribe some anonymous Electoral Bonds to load funds instantly!");
    }
  }

  equipSkin(skinName) {
    if (!this.unlockedSkins.includes(skinName)) return;
    this.equippedSkin = skinName;
    this.player.activeSkin = skinName;
    sfx.playButtonClick();
    this.savePersistenceData();
    this.refreshShopUI();
  }

  buyUpgrade(upgradeName, cost) {
    if (upgradeName === 'shield' && this.upgradeShield) return;
    if (upgradeName === 'magnet' && this.upgradeMagnet) return;
    
    if (this.bulbsCount >= cost) {
      this.bulbsCount -= cost;
      if (upgradeName === 'shield') {
        this.upgradeShield = true;
        this.player.hasShield = true;
        this.player.shieldActive = true;
      } else if (upgradeName === 'magnet') {
        this.upgradeMagnet = true;
        this.player.hasMagnet = true;
      }
      sfx.playPowerup();
      this.savePersistenceData();
      this.updateHUDValues();
      this.refreshShopUI();
    } else {
      alert("⚠️ BUDGET LIMIT REACHED! Bypassed using mock Electoral Bonds.");
    }
  }

  // --- Engine Loops ---
  update(dt = 1) {
    if (this.gameState !== 'PLAYING') return;
    
    // Scale levels dynamically based on score
    // Level 1: 0 - 800, Level 2: 800 - 2000, Level 3: 2000+
    const lastLevel = this.level;
    if (this.score >= 2000) {
      this.level = 3;
    } else if (this.score >= 800) {
      this.level = 2;
    } else {
      this.level = 1;
    }
    
    if (this.level !== lastLevel) {
      // Trigger level-up sound arps!
      sfx.playPowerup();
    }
    
    // Scale gameSpeed dynamically: level speedups + gradual progression
    let targetSpeedMultiplier = 1.0;
    if (this.level === 2) targetSpeedMultiplier = 1.25;
    if (this.level === 3) targetSpeedMultiplier = 1.5;
    
    if (this.player.isInvincible) {
      targetSpeedMultiplier *= 1.4; // Boost speed significantly during power-up!
    }
    
    // Smoothly interpolate currentSpeedMultiplier towards targetSpeedMultiplier
    if (!this.currentSpeedMultiplier) this.currentSpeedMultiplier = 1.0;
    const lerpFactor = 0.04 * dt;
    this.currentSpeedMultiplier += (targetSpeedMultiplier - this.currentSpeedMultiplier) * Math.min(1, lerpFactor);
    
    this.gameSpeed = (this.baseSpeed + (this.score * 0.00035)) * this.currentSpeedMultiplier;
    
    const scoreAdd = (this.gameSpeed * 0.04);
    this.score += (this.player.isInvincible ? scoreAdd * 2.0 : scoreAdd) * dt;
    
    this.background.update(this.gameSpeed * dt);
    this.player.update(this.particles, dt);
    this.spawnProceduralEntities(dt);
    
    // Obstacles
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const o = this.obstacles[i];
      o.update(this.gameSpeed, this.particles, dt);
      if (o.x + o.width < -120) this.obstacles.splice(i, 1);
    }
    
    // Items
    for (let i = this.collectibles.length - 1; i >= 0; i--) {
      const c = this.collectibles[i];
      c.update(this.gameSpeed, this.player, this.particles, dt);
      if (c.x + c.width < -50) this.collectibles.splice(i, 1);
    }
    
    this.particles.update(dt);
    this.checkCollisions();
    
    // Capsules progress bar fill
    if (this.player.isInvincible) {
      // Show remaining invincibility
      const percent = (this.player.invincibilityTimer / 480) * 100;
      document.getElementById('power-up-progress').style.width = `${percent}%`;
      document.getElementById('power-up-progress').style.backgroundColor = '#ffd700'; // Gold Chai
    } else {
      // Show general progress toward next Level threshold
      let percent = 0;
      if (this.level === 1) {
        percent = (this.score / 800) * 100;
      } else if (this.level === 2) {
        percent = ((this.score - 800) / 1200) * 100;
      } else {
        percent = 100; // Maxed out level
      }
      document.getElementById('power-up-progress').style.width = `${Math.min(100, percent)}%`;
      document.getElementById('power-up-progress').style.backgroundColor = '#ffffff'; // White general progress
    }
    
    this.updateHUDValues();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw background layers
    this.background.draw();
    
    // Draw warp speed lines during invincibility speed boost
    if (this.player.isInvincible) {
      this.drawWarpSpeedLines();
    }
    
    // Draw Items
    this.collectibles.forEach(c => c.draw());
    
    // Draw Obstacles
    this.obstacles.forEach(o => o.draw());
    
    // Draw Particles
    this.particles.draw(this.ctx);
    
    // Draw Cute Cockroach
    this.player.draw();
  }

  drawWarpSpeedLines() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1.5;
    
    // Draw 6 random horizontal lines flying from right to left
    const lineCount = 6;
    for (let i = 0; i < lineCount; i++) {
      const y = 60 + (i * 45) + Math.sin(Date.now() * 0.008 + i) * 15;
      const length = 120 + Math.random() * 150;
      const speed = 35 + Math.random() * 15;
      const x = (w - ((Date.now() * speed * 0.08 + i * 250) % (w + length)));
      
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + length, y);
      ctx.stroke();
    }
    ctx.restore();
  }

  run(timestamp) {
    if (!this.lastFrameTime) this.lastFrameTime = timestamp;
    let elapsed = timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;
    
    // Clamp elapsed to prevent physics anomalies after background pause
    if (elapsed > 100) elapsed = 16.666;
    
    const dt = elapsed / 16.666;
    
    this.update(dt);
    this.draw();
    
    requestAnimationFrame((t) => this.run(t));
  }

  // --- Keyboard & Touch binders ---
  bindEvents() {
    window.addEventListener('keydown', (e) => {
      if (this.gameState !== 'PLAYING') return;
      if (e.code === 'Space' || e.code === 'KeyW' || e.code === 'ArrowUp') {
        this.player.jump();
        e.preventDefault();
      }
      if (e.code === 'KeyS' || e.code === 'ArrowDown') {
        this.player.duck(true);
        e.preventDefault();
      }
      if (e.code === 'KeyP') {
        this.pauseGame();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (this.gameState !== 'PLAYING') return;
      if (e.code === 'KeyS' || e.code === 'ArrowDown') {
        this.player.duck(false);
      }
    });

    // Touch-Anywhere-to-Jump (triggers a jump on touch devices, excluding interactive items)
    const viewport = document.getElementById('viewport-wrapper');
    if (viewport) {
      viewport.addEventListener('touchstart', (e) => {
        if (this.gameState !== 'PLAYING') return;
        
        // Ignore jumps if tapping interactive items
        if (e.target.closest('button') || 
            e.target.closest('a') || 
            e.target.closest('.hud-icon-btn') || 
            e.target.closest('.overlay') || 
            e.target.closest('#mobile-duck-overlay')) {
          return;
        }
        
        this.player.jump();
        e.preventDefault();
      }, { passive: false });
    }
    
    // Floating JUMP button click binder (exactly matches layout)
    document.getElementById('btn-floating-jump').addEventListener('mousedown', () => {
      if (this.gameState === 'PLAYING') {
        this.player.jump();
      }
    });
    document.getElementById('btn-floating-jump').addEventListener('touchstart', (e) => {
      if (this.gameState === 'PLAYING') {
        this.player.jump();
      }
      e.preventDefault();
    });

    // Mobile slide trigger button
    const duckBtn = document.getElementById('btn-mobile-duck');
    if (duckBtn) {
      duckBtn.addEventListener('touchstart', (e) => {
        if (this.gameState === 'PLAYING') this.player.duck(true);
        e.preventDefault();
      });
      duckBtn.addEventListener('touchend', (e) => {
        if (this.gameState === 'PLAYING') this.player.duck(false);
        e.preventDefault();
      });
    }

    // UI screen controls
    document.getElementById('btn-start').addEventListener('click', () => this.startGame());
    document.getElementById('btn-resume').addEventListener('click', () => this.resumeGame());
    document.getElementById('btn-restart').addEventListener('click', () => this.startGame());
    document.getElementById('btn-settings').addEventListener('click', () => this.pauseGame());
    
    // SFX BGM triggers
    const audioBtn = document.getElementById('btn-audio-toggle');
    audioBtn.addEventListener('click', () => {
      const state = sfx.toggleSFX();
      audioBtn.innerText = state ? "ON" : "OFF";
      audioBtn.classList.toggle('active', state);
      sfx.playButtonClick();
    });
    
    const musicBtn = document.getElementById('btn-music-toggle');
    musicBtn.addEventListener('click', () => {
      const state = sfx.toggleMusic();
      musicBtn.innerText = state ? "ON" : "OFF";
      musicBtn.classList.toggle('active', state);
      sfx.playButtonClick();
    });

    // Upgrades Store Panel drawer
    const openStoreStart = document.getElementById('btn-open-store-start');
    const openStoreGO = document.getElementById('btn-open-store-go');
    const closeStore = document.getElementById('btn-close-shop');
    
    [openStoreStart, openStoreGO].forEach(btn => {
      if (btn) {
        btn.addEventListener('click', () => {
          sfx.playButtonClick();
          this.refreshShopUI();
          document.getElementById('shop-screen').classList.remove('hidden');
        });
      }
    });
    
    if (closeStore) {
      closeStore.addEventListener('click', () => {
        sfx.playButtonClick();
        document.getElementById('shop-screen').classList.add('hidden');
      });
    }

    // Electoral Bonds dialog
    const openBondsStart = document.getElementById('btn-open-bonds-start');
    const openBondsGO = document.getElementById('btn-open-bonds-go');
    const closeBonds = document.getElementById('btn-close-bonds');
    
    [openBondsStart, openBondsGO].forEach(btn => {
      if (btn) {
        btn.addEventListener('click', () => {
          sfx.playButtonClick();
          document.getElementById('bonds-screen').classList.remove('hidden');
        });
      }
    });
    
    if (closeBonds) {
      closeBonds.addEventListener('click', () => {
        sfx.playButtonClick();
        document.getElementById('bonds-screen').classList.add('hidden');
      });
    }

    // Secure anonymous bribery
    document.getElementById('btn-buy-bond-mock').addEventListener('click', () => {
      sfx.playPowerup();
      this.bulbsCount += 10000;
      this.savePersistenceData();
      this.updateHUDValues();
      this.refreshShopUI();
      
      // splash gold stars particles
      for (let i = 0; i < 20; i++) {
        this.particles.spawnSparkles(
          this.canvas.width / 2 + Math.random() * 200 - 100, 
          this.canvas.height / 2 + Math.random() * 200 - 100, 
          '#ffd700'
        );
      }
      
      alert("💸 ELECTORAL BONDS CREDITED! Swiss Account loaded. +10,000 💡 Bulbs added in complete political secrecy. Upgrades unlocked!");
      document.getElementById('bonds-screen').classList.add('hidden');
    });

    // Tab selectors in store
    const tabs = document.querySelectorAll('.shop-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        sfx.playButtonClick();
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const target = tab.dataset.tab;
        if (target === 'skins') {
          document.getElementById('shop-tab-skins').classList.remove('hidden');
          document.getElementById('shop-tab-upgrades').classList.add('hidden');
        } else {
          document.getElementById('shop-tab-skins').classList.add('hidden');
          document.getElementById('shop-tab-upgrades').classList.remove('hidden');
        }
      });
    });

    // Upgrades
    document.getElementById('btn-buy-shield').addEventListener('click', () => {
      this.buyUpgrade('shield', 150);
    });
    document.getElementById('btn-buy-magnet').addEventListener('click', () => {
      this.buyUpgrade('magnet', 200);
    });
  }

  bindStoreButtons() {
    const buyButtons = document.querySelectorAll('[data-skin-action="buy"]');
    buyButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const skinName = btn.dataset.skinName;
        const cost = parseInt(btn.dataset.cost);
        this.buySkin(skinName, cost);
      });
    });
  }
}

// Bootstrap
window.addEventListener('load', () => {
  const game = new GameEngine();
  game.bindStoreButtons();
  requestAnimationFrame((t) => game.run(t));
});
