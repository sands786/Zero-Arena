'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [glitch, setGlitch] = useState(false);
  const isActive = (path) => pathname === path;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Rajdhani:wght@500;600;700&display=swap');
        .nav-link:hover { color: #ff6b00 !important; }
      `}</style>
      <nav style={{background:'rgba(7,7,8,0.97)',borderBottom:'1px solid rgba(255,50,0,0.2)',backdropFilter:'blur(20px)',position:'sticky',top:0,zIndex:1000}}>
        <div style={{maxWidth:1400,margin:'0 auto',padding:'0 32px',display:'flex',alignItems:'center',justifyContent:'space-between',height:64}}>
          
          <Link href="/" onClick={()=>{setGlitch(true);setTimeout(()=>setGlitch(false),300)}} style={{textDecoration:'none',display:'flex',alignItems:'center',gap:14}}>
            <div style={{width:38,height:38,background:'linear-gradient(135deg,#ff3200,#ff6b00)',clipPath:'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,boxShadow:'0 0 20px rgba(255,50,0,0.5)'}}>⚡</div>
            <span style={{fontFamily:'"Barlow Condensed",sans-serif',fontSize:22,fontWeight:900,letterSpacing:3,color:glitch?'#ff3200':'#ffffff',textShadow:glitch?'2px 0 #0ff,-2px 0 #f0f':'none',textTransform:'uppercase',transition:'all 0.05s'}}>
              ZERO<span style={{color:'#ff3200'}}>_</span>ARENA
            </span>
          </Link>

          <div style={{display:'flex',gap:4,alignItems:'center'}}>
            {[{href:'/builder',label:'⚔ ARENA'},{href:'/lessons',label:'◈ CODEX'}].map(({href,label})=>(
              <Link key={href} href={href} className="nav-link" style={{
                padding:'8px 24px',
                fontFamily:'"Barlow Condensed",sans-serif',
                fontSize:14,fontWeight:700,letterSpacing:3,
                textDecoration:'none',
                textTransform:'uppercase',
                color:isActive(href)?'#ff6b00':'rgba(255,255,255,0.45)',
                borderBottom:isActive(href)?'2px solid #ff3200':'2px solid transparent',
                transition:'all 0.2s',
              }}>{label}</Link>
            ))}
            <div style={{marginLeft:20,padding:'7px 16px',background:'rgba(255,50,0,0.08)',border:'1px solid rgba(255,50,0,0.3)',fontSize:11,fontFamily:'"Rajdhani",sans-serif',color:'#ff6b00',fontWeight:700,letterSpacing:2,clipPath:'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)'}}>
              ◉ 0G LIVE
            </div>
          </div>
        </div>
        <div style={{height:1,background:'linear-gradient(90deg,transparent,rgba(255,50,0,0.4),transparent)'}}/>
      </nav>
    </>
  );
}
