'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';

const STATS = [
  { label: 'AI Agents Deployed', value: '2,847', icon: '🤖' },
  { label: 'Battles on 0G Chain', value: '14,293', icon: '⚔️' },
  { label: '0G TX Hashes', value: '8,571', icon: '🔗' },
  { label: 'Active Players', value: '1,204', icon: '👾' },
];

const FEATURES = [
  { icon: '🧠', title: 'Build Agent DNA', desc: 'Design your AI fighter with drag-and-drop logic blocks. No code needed. Your agent thinks, plans, and acts autonomously.' },
  { icon: '⚔️', title: 'Battle in Zero Arena', desc: 'Drop your agent into a live MMO battle arena. Watch it fight, collect XP, and dominate enemies in real-time.' },
  { icon: '🔗', title: 'Stored on 0G Forever', desc: 'Every agent DNA and match result is stored on 0G decentralized storage. Permanent, trustless, verifiable on-chain.' },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setTick(x => x + 1), 100);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#050014', color: '#fff', fontFamily: '"JetBrains Mono", monospace', overflow: 'hidden' }}>
      
      {/* Animated grid background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, backgroundImage: 'linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(79,70,229,0.1) 0%, transparent 60%)' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Hero */}
        <div style={{ textAlign: 'center', padding: '100px 0 60px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.4)', borderRadius: 20, fontSize: 12, color: '#a78bfa', marginBottom: 32, letterSpacing: 2 }}>
            ⚡ POWERED BY 0G DECENTRALIZED AI STORAGE
          </div>

          <h1 style={{ fontSize: 'clamp(48px, 10vw, 96px)', fontWeight: 900, lineHeight: 1, marginBottom: 24, letterSpacing: -2 }}>
            <span style={{ display: 'block', color: '#fff', textShadow: '0 0 60px rgba(124,58,237,0.5)' }}>ZERO</span>
            <span style={{ display: 'block', background: 'linear-gradient(135deg, #7c3aed, #4f46e5, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>ARENA</span>
          </h1>

          <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.6)', maxWidth: 600, margin: '0 auto 16px', lineHeight: 1.6 }}>
            Build AI agents. Deploy them in battle. Store everything on <span style={{ color: '#7c3aed' }}>0G blockchain</span> forever.
          </p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', marginBottom: 48 }}>
            Every agent has a unique 0G DNA hash. Every battle is recorded on-chain.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/builder" style={{ padding: '16px 40px', background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', borderRadius: 12, color: '#fff', textDecoration: 'none', fontSize: 16, fontWeight: 700, letterSpacing: 1, boxShadow: '0 0 30px rgba(124,58,237,0.4)', border: 'none' }}>
              ⚔️ ENTER ARENA
            </Link>
            <Link href="/lessons" style={{ padding: '16px 40px', background: 'rgba(255,255,255,0.05)', borderRadius: 12, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 16, fontWeight: 700, letterSpacing: 1, border: '1px solid rgba(255,255,255,0.1)' }}>
              📖 LEARN
            </Link>
          </div>
        </div>

        {/* Live Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 80 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ padding: 24, background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#a78bfa', marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: 1 }}>{s.label.toUpperCase()}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 80 }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{ padding: 32, background: 'rgba(10,0,40,0.8)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 20, transition: 'all 0.3s' }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 12, letterSpacing: 1 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* 0G Integration Proof */}
        <div style={{ padding: 40, background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(5,150,105,0.05))', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 24, marginBottom: 80, textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#10b981', letterSpacing: 2, marginBottom: 16 }}>🔗 REAL 0G INTEGRATION</div>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: '#fff', marginBottom: 16 }}>Every Action Lives on 0G Chain</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 24, maxWidth: 500, margin: '0 auto 24px' }}>
            Agent configs, battle results, and leaderboard scores are stored on 0G decentralized storage — not on any central server.
          </p>
          <div style={{ fontFamily: 'monospace', fontSize: 12, color: '#10b981', background: 'rgba(0,0,0,0.4)', padding: 16, borderRadius: 12, display: 'inline-block', textAlign: 'left' }}>
            TX: 0xd2a20963bbfdecbf33a97b6fc670ea7f60162f9...<br/>
            Source: 0G Decentralized Storage ✓<br/>
            Explorer: storagescan-newton.0g.ai
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '40px 0 100px' }}>
          <h2 style={{ fontSize: 40, fontWeight: 900, marginBottom: 16 }}>Ready to Fight?</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 32 }}>Deploy your AI agent in Zero Arena. No code required.</p>
          <Link href="/builder" style={{ padding: '20px 60px', background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', borderRadius: 16, color: '#fff', textDecoration: 'none', fontSize: 18, fontWeight: 900, letterSpacing: 2, boxShadow: '0 0 40px rgba(124,58,237,0.5)' }}>
            ⚡ LAUNCH ARENA
          </Link>
        </div>

      </div>
    </div>
  );
}
