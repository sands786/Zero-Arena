'use client'

import { useMemo, useCallback } from 'react';

export default function NeetCodeRoadmap({ components, lessons, progress, onComponentSelect, onStarredClick, starredCount = 0 }) {
  const organizedComponents = useMemo(() => {
    const rows = [];
    for (let i = 0; i < components.length; i += 2) {
      rows.push(components.slice(i, i + 2));
    }
    return rows;
  }, [components]);

  const getComponentProgress = useCallback((component) => {
    const componentLessons = lessons.filter(l => component.lessonIds.includes(l.id));
    if (componentLessons.length === 0) return 0;
    const completed = componentLessons.filter(l => progress[l.id] === 'completed').length;
    return (completed / componentLessons.length) * 100;
  }, [lessons, progress]);

  return (
    <div style={{ width:'100%', height:'100%', background:'#070708', padding:'32px', overflowY:'auto', fontFamily:'"Barlow Condensed", "Rajdhani", sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Rajdhani:wght@500;600;700&display=swap');
        .codex-card { transition: all 0.2s ease; cursor: pointer; }
        .codex-card:hover { transform: translateY(-4px) !important; border-color: rgba(255,50,0,0.6) !important; background: rgba(255,30,0,0.06) !important; box-shadow: 0 8px 32px rgba(255,50,0,0.15) !important; }
        .star-btn:hover { border-color: rgba(255,180,0,0.6) !important; background: rgba(255,180,0,0.08) !important; }
      `}</style>

      <div style={{ maxWidth: 960, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 40, borderBottom: '1px solid rgba(255,50,0,0.2)', paddingBottom: 24 }}>
          <div style={{ fontSize: 11, color: '#ff3200', letterSpacing: 4, marginBottom: 8, fontWeight: 700 }}>ZERO ARENA</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1 style={{ fontSize: 48, fontWeight: 900, color: '#fff', letterSpacing: 2, margin: 0 }}>
              AGENT <span style={{ color: '#ff6b00' }}>CODEX</span>
            </h1>
            {onStarredClick && (
              <button className="star-btn" onClick={onStarredClick} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 20px',
                background: 'rgba(255,180,0,0.06)',
                border: '1px solid rgba(255,180,0,0.3)',
                color: '#fbbf24',
                fontFamily: '"Barlow Condensed", sans-serif',
                fontSize: 14, fontWeight: 700, letterSpacing: 2,
                cursor: 'pointer',
                clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
              }}>
                ★ STARRED {starredCount > 0 && `(${starredCount})`}
              </button>
            )}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14, marginTop: 8, letterSpacing: 1 }}>
            MASTER AI AGENT ARCHITECTURE — MISSION BY MISSION
          </p>
        </div>

        {/* Cards Grid */}
        {organizedComponents.map((row, rowIdx) => (
          <div key={rowIdx} style={{ display: 'flex', gap: 16, marginBottom: 16, justifyContent: 'center' }}>
            {row.map((component, colIdx) => {
              const progressPercent = Math.round(getComponentProgress(component));
              const isComplete = progressPercent === 100;
              const missionNum = rowIdx * 2 + colIdx + 1;

              return (
                <button key={component.id} className="codex-card" onClick={() => onComponentSelect(component)}
                  style={{
                    flex: 1, maxWidth: 460,
                    padding: '28px 32px',
                    background: 'rgba(255,255,255,0.02)',
                    border: `1px solid ${isComplete ? 'rgba(74,222,128,0.4)' : 'rgba(255,255,255,0.08)'}`,
                    position: 'relative', overflow: 'hidden',
                    textAlign: 'left', cursor: 'pointer',
                    clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
                  }}>

                  {/* Corner accent */}
                  <div style={{ position: 'absolute', top: 0, right: 0, width: 12, height: 12, background: isComplete ? '#4ade80' : '#ff3200', opacity: 0.6 }} />

                  {/* Mission number */}
                  <div style={{ position: 'absolute', top: 16, right: 20, fontSize: 48, fontWeight: 900, color: 'rgba(255,50,0,0.06)', lineHeight: 1, fontFamily: '"Barlow Condensed", sans-serif' }}>
                    {String(missionNum).padStart(2, '0')}
                  </div>

                  {/* Status badge */}
                  <div style={{ marginBottom: 12 }}>
                    {isComplete ? (
                      <span style={{ fontSize: 10, letterSpacing: 3, color: '#4ade80', fontWeight: 700 }}>✓ COMPLETE</span>
                    ) : progressPercent > 0 ? (
                      <span style={{ fontSize: 10, letterSpacing: 3, color: '#ff6b00', fontWeight: 700 }}>▶ IN PROGRESS</span>
                    ) : (
                      <span style={{ fontSize: 10, letterSpacing: 3, color: 'rgba(255,255,255,0.2)', fontWeight: 700 }}>◈ LOCKED</span>
                    )}
                  </div>

                  {/* Title */}
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: 1, marginBottom: 20, lineHeight: 1.2, fontFamily: '"Barlow Condensed", sans-serif', textTransform: 'uppercase' }}>
                    {component.name}
                  </div>

                  {/* Progress bar */}
                  <div style={{ width: '100%', height: 3, background: 'rgba(255,255,255,0.06)', position: 'relative' }}>
                    <div style={{
                      height: '100%',
                      width: `${progressPercent}%`,
                      background: isComplete ? 'linear-gradient(90deg, #4ade80, #22c55e)' : 'linear-gradient(90deg, #ff3200, #ff6b00)',
                      transition: 'width 500ms ease',
                      boxShadow: isComplete ? '0 0 8px rgba(74,222,128,0.5)' : '0 0 8px rgba(255,50,0,0.5)',
                    }} />
                  </div>

                  {/* Progress text */}
                  <div style={{ marginTop: 8, fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <span>{component.lessonIds.length} MISSIONS</span>
                    <span style={{ color: isComplete ? '#4ade80' : progressPercent > 0 ? '#ff6b00' : 'rgba(255,255,255,0.2)' }}>{progressPercent}%</span>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
