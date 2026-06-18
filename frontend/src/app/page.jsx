'use client'
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const g = setInterval(() => {
      if (Math.random() > 0.85) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 150 + Math.random() * 200);
      }
    }, 2000);

    // Particle canvas
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.3,
      a: Math.random() * 0.5 + 0.1,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 80, 30, ${p.a})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { clearInterval(g); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#070708', color: '#fff', overflow: 'hidden', fontFamily: '"Rajdhani", "Barlow Condensed", "Arial Narrow", Arial, sans-serif' }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Barlow+Condensed:wght@400;600;700;800;900&display=swap');
        @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
        @keyframes flicker { 0%,100%{opacity:1} 92%{opacity:1} 93%{opacity:0.8} 94%{opacity:1} 96%{opacity:0.9} 97%{opacity:1} }
        @keyframes pulse-red { 0%,100%{box-shadow:0 0 20px rgba(255,50,0,0.4)} 50%{box-shadow:0 0 40px rgba(255,50,0,0.8),0 0 80px rgba(255,50,0,0.3)} }
        @keyframes slide-up { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes rotate-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .enter-btn:hover { transform: skewX(-4deg) scale(1.03) !important; box-shadow: 0 0 60px rgba(255,50,0,0.7), inset 0 0 30px rgba(255,80,0,0.2) !important; }
        .enter-btn { transition: all 0.2s ease !important; }
        .feature-card:hover { border-color: rgba(255,50,0,0.5) !important; transform: translateY(-4px) !important; background: rgba(255,50,0,0.05) !important; }
        .feature-card { transition: all 0.3s ease !important; }
      `}</style>

      {/* Particle canvas */}
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />

      {/* Scanline overlay */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)' }} />

      {/* Moving scanline */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, rgba(255,50,0,0.3), transparent)', zIndex: 2, animation: 'scanline 8s linear infinite', pointerEvents: 'none' }} />

      {/* Background texture */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(255,40,0,0.08) 0%, transparent 60%), radial-gradient(ellipse at 0% 100%, rgba(255,80,0,0.05) 0%, transparent 50%)' }} />

      {/* Diagonal accent lines */}
      <div style={{ position: 'fixed', top: 0, right: 0, width: 600, height: 600, zIndex: 0, opacity: 0.04, background: 'repeating-linear-gradient(45deg, #ff3200 0px, #ff3200 1px, transparent 1px, transparent 40px)' }} />

      <div style={{ position: 'relative', zIndex: 10 }}>

        {/* ===== HERO ===== */}
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 24px 40px', animation: mounted ? 'slide-up 0.8s ease forwards' : 'none' }}>

          {/* Top badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 40 }}>
            <div style={{ width: 6, height: 6, background: '#ff3200', borderRadius: '50%', boxShadow: '0 0 8px #ff3200', animation: 'flicker 3s infinite' }} />
            <span style={{ fontSize: 11, letterSpacing: 4, color: '#ff3200', fontWeight: 700, fontFamily: '"Rajdhani", sans-serif' }}>SEASON 01 — LIVE NOW</span>
            <div style={{ width: 6, height: 6, background: '#ff3200', borderRadius: '50%', boxShadow: '0 0 8px #ff3200', animation: 'flicker 3s infinite' }} />
          </div>

          {/* Main title */}
          <div style={{ position: 'relative', marginBottom: 8 }}>
            <h1 style={{
              fontSize: 'clamp(72px, 18vw, 200px)',
              fontWeight: 900,
              lineHeight: 0.85,
              letterSpacing: -4,
              fontFamily: '"Barlow Condensed", "Rajdhani", sans-serif',
              textTransform: 'uppercase',
              color: glitch ? 'transparent' : '#ffffff',
              textShadow: glitch ? 'none' : '0 0 80px rgba(255,255,255,0.08)',
              WebkitTextStroke: glitch ? '2px #ff3200' : '0px transparent',
              filter: glitch ? 'hue-rotate(90deg)' : 'none',
              transition: 'all 0.05s',
            }}>
              ZERO
            </h1>
            {/* Red underline slash */}
            <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: '60%', height: 4, background: 'linear-gradient(90deg, transparent, #ff3200, transparent)' }} />
          </div>

          <h1 style={{
            fontSize: 'clamp(72px, 18vw, 200px)',
            fontWeight: 900,
            lineHeight: 0.85,
            letterSpacing: -4,
            fontFamily: '"Barlow Condensed", "Rajdhani", sans-serif',
            textTransform: 'uppercase',
            background: 'linear-gradient(135deg, #ff3200 0%, #ff6b00 50%, #ffaa00 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: 40,
            filter: glitch ? 'hue-rotate(180deg) saturate(2)' : 'none',
            transition: 'all 0.05s',
          }}>
            ARENA
          </h1>

          {/* Subtitle */}
          <p style={{ fontSize: 'clamp(16px, 2.5vw, 22px)', color: 'rgba(255,255,255,0.45)', maxWidth: 520, lineHeight: 1.6, marginBottom: 16, fontFamily: '"Rajdhani", sans-serif', fontWeight: 500, letterSpacing: 1 }}>
            Design your AI fighter. Deploy it into battle.<br />
            <span style={{ color: 'rgba(255,100,0,0.8)' }}>Every move stored on 0G blockchain.</span>
          </p>

          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', letterSpacing: 3, marginBottom: 56, fontFamily: '"Rajdhani", sans-serif' }}>
            NO CODE REQUIRED · AI-NATIVE · DECENTRALIZED
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 80 }}>
            <Link href="/builder" className="enter-btn" style={{
              padding: '18px 56px',
              background: 'linear-gradient(135deg, #ff3200, #ff6b00)',
              color: '#fff',
              textDecoration: 'none',
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: 3,
              textTransform: 'uppercase',
              fontFamily: '"Barlow Condensed", sans-serif',
              clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
              boxShadow: '0 0 40px rgba(255,50,0,0.5)',
              display: 'inline-block',
            }}>
              ⚔ ENTER ARENA
            </Link>

            <Link href="/lessons" style={{
              padding: '18px 48px',
              background: 'transparent',
              color: 'rgba(255,255,255,0.6)',
              textDecoration: 'none',
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: 'uppercase',
              fontFamily: '"Barlow Condensed", sans-serif',
              border: '1px solid rgba(255,255,255,0.15)',
              clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)',
              display: 'inline-block',
            }}>
              LEARN
            </Link>
          </div>

          {/* Stats bar */}
          <div style={{ display: 'flex', gap: 0, border: '1px solid rgba(255,50,0,0.2)', background: 'rgba(255,30,0,0.04)', backdropFilter: 'blur(10px)' }}>
            {[
              { v: '2,847', l: 'AGENTS' },
              { v: '14K+', l: 'BATTLES' },
              { v: '8,571', l: '0G TXS' },
              { v: '1,204', l: 'PLAYERS' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '16px 32px', borderRight: i < 3 ? '1px solid rgba(255,50,0,0.15)' : 'none', textAlign: 'center', minWidth: 100 }}>
                <div style={{ fontSize: 24, fontWeight: 900, color: '#ff6b00', fontFamily: '"Barlow Condensed", sans-serif', letterSpacing: 2 }}>{s.v}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: 3, marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== DIVIDER ===== */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '0 48px', marginBottom: 60 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,50,0,0.2)' }} />
          <span style={{ fontSize: 11, letterSpacing: 4, color: 'rgba(255,50,0,0.6)', fontFamily: '"Rajdhani", sans-serif' }}>HOW IT WORKS</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,50,0,0.2)' }} />
        </div>

        {/* ===== FEATURES ===== */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2, padding: '0 48px', marginBottom: 2 }}>
          {[
            { num: '01', icon: '🧠', title: 'BUILD AGENT DNA', sub: 'DESIGN PHASE', desc: 'Drag logic blocks to program your AI fighter. Set personality, strategy, and behavior. No code — pure tactics.' },
            { num: '02', icon: '⚔️', title: 'BATTLE IN ARENA', sub: 'COMBAT PHASE', desc: 'Deploy into a live multiplayer arena. Your agent thinks autonomously using Llama AI — attack, collect, survive.' },
            { num: '03', icon: '🔗', title: 'STORED ON 0G', sub: 'CHAIN PHASE', desc: 'Agent configs and battle results write to 0G decentralized storage. Permanent. Verifiable. On-chain forever.' },
          ].map((f, i) => (
            <div key={i} className="feature-card" style={{ padding: '48px 36px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 20, right: 24, fontSize: 64, fontWeight: 900, color: 'rgba(255,50,0,0.06)', fontFamily: '"Barlow Condensed", sans-serif', lineHeight: 1 }}>{f.num}</div>
              <div style={{ fontSize: 36, marginBottom: 20 }}>{f.icon}</div>
              <div style={{ fontSize: 10, color: '#ff3200', letterSpacing: 3, fontFamily: '"Rajdhani", sans-serif', marginBottom: 8, fontWeight: 700 }}>{f.sub}</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 16, fontFamily: '"Barlow Condensed", sans-serif', letterSpacing: 2 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, fontFamily: '"Rajdhani", sans-serif' }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* ===== 0G PROOF ===== */}
        <div style={{ margin: '2px 48px 80px', padding: '48px', background: 'rgba(255,50,0,0.03)', border: '1px solid rgba(255,50,0,0.15)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, #ff3200, transparent)' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, color: '#ff3200', letterSpacing: 4, marginBottom: 16, fontFamily: '"Rajdhani", sans-serif', fontWeight: 700 }}>VERIFIED ON-CHAIN</div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, fontFamily: '"Barlow Condensed", sans-serif', letterSpacing: 1, marginBottom: 16, lineHeight: 1 }}>REAL 0G<br /><span style={{ color: '#ff6b00' }}>INTEGRATION</span></h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, fontFamily: '"Rajdhani", sans-serif', fontSize: 15, marginBottom: 24 }}>
                Every agent and battle is stored on 0G decentralized storage — not on any server we control. Verifiable by anyone, forever.
              </p>
              <Link href="/builder" style={{ display: 'inline-block', padding: '12px 32px', background: 'rgba(255,50,0,0.15)', border: '1px solid rgba(255,50,0,0.4)', color: '#ff6b00', textDecoration: 'none', fontSize: 13, fontWeight: 700, letterSpacing: 2, fontFamily: '"Rajdhani", sans-serif' }}>
                DEPLOY YOUR AGENT →
              </Link>
            </div>
            <div style={{ fontFamily: '"Courier New", monospace', fontSize: 12, background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,50,0,0.2)', padding: 24 }}>
              <div style={{ color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>// Latest 0G Transaction</div>
              <div style={{ color: '#ff6b00', marginBottom: 4 }}>STATUS: <span style={{ color: '#4ade80' }}>CONFIRMED ✓</span></div>
              <div style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>CHAIN: <span style={{ color: '#fff' }}>0G Newton Testnet</span></div>
              <div style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>TX: <span style={{ color: '#a78bfa', wordBreak: 'break-all' }}>0xd2a20963bbfdecbf33a97b6f...</span></div>
              <div style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 12 }}>STORAGE: <span style={{ color: '#fff' }}>0G Decentralized</span></div>
              <a href="https://storagescan-newton.0g.ai" target="_blank" rel="noreferrer" style={{ color: '#ff3200', fontSize: 11, letterSpacing: 1 }}>VIEW ON EXPLORER →</a>
            </div>
          </div>
        </div>

        {/* ===== FINAL CTA ===== */}
        <div style={{ textAlign: 'center', padding: '60px 24px 100px', position: 'relative' }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: 'rgba(255,50,0,0.6)', marginBottom: 24, fontFamily: '"Rajdhani", sans-serif' }}>ARE YOU READY?</div>
          <h2 style={{ fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 900, fontFamily: '"Barlow Condensed", sans-serif', letterSpacing: -1, marginBottom: 40, lineHeight: 1 }}>
            YOUR AGENT<br /><span style={{ color: '#ff6b00' }}>AWAITS.</span>
          </h2>
          <Link href="/builder" className="enter-btn" style={{
            padding: '22px 80px',
            background: 'linear-gradient(135deg, #ff3200, #ff6b00)',
            color: '#fff',
            textDecoration: 'none',
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: 4,
            textTransform: 'uppercase',
            fontFamily: '"Barlow Condensed", sans-serif',
            clipPath: 'polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%)',
            boxShadow: '0 0 60px rgba(255,50,0,0.5)',
            display: 'inline-block',
            animation: 'pulse-red 2s ease infinite',
          }}>
            ⚡ FIGHT NOW
          </Link>
        </div>

      </div>
    </div>
  );
}
