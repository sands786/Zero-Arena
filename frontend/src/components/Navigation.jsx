'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [glitch, setGlitch] = useState(false);
  const isActive = (path) => pathname === path;

  return (
    <nav style={{background:'rgba(5,0,20,0.95)',borderBottom:'1px solid rgba(124,58,237,0.4)',backdropFilter:'blur(20px)',position:'sticky',top:0,zIndex:1000}}>
      <div style={{maxWidth:1400,margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:64}}>
        <Link href="/" style={{textDecoration:'none',display:'flex',alignItems:'center',gap:12}} onClick={()=>{setGlitch(true);setTimeout(()=>setGlitch(false),400)}}>
          <div style={{width:36,height:36,background:'linear-gradient(135deg,#7c3aed,#4f46e5)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,boxShadow:'0 0 20px rgba(124,58,237,0.5)'}}>⚡</div>
          <span style={{fontFamily:'"JetBrains Mono",monospace',fontSize:20,fontWeight:900,color:glitch?'#ff4444':'#fff',letterSpacing:2,textShadow:glitch?'2px 0 #0ff,-2px 0 #f0f':'0 0 20px rgba(124,58,237,0.8)'}}>ZERO<span style={{color:'#7c3aed'}}>_</span>ARENA</span>
        </Link>
        <div style={{display:'flex',gap:4,alignItems:'center'}}>
          {[{href:'/builder',label:'⚔️ Arena'},{href:'/lessons',label:'📖 Codex'}].map(({href,label})=>(
            <Link key={href} href={href} style={{padding:'8px 20px',borderRadius:8,fontFamily:'"JetBrains Mono",monospace',fontSize:13,fontWeight:700,letterSpacing:1,textDecoration:'none',color:isActive(href)?'#fff':'rgba(255,255,255,0.5)',background:isActive(href)?'linear-gradient(135deg,rgba(124,58,237,0.3),rgba(79,70,229,0.3))':'transparent',border:isActive(href)?'1px solid rgba(124,58,237,0.6)':'1px solid transparent'}}>{label}</Link>
          ))}
          <div style={{marginLeft:16,padding:'6px 14px',background:'linear-gradient(135deg,rgba(16,185,129,0.15),rgba(5,150,105,0.15))',border:'1px solid rgba(16,185,129,0.4)',borderRadius:20,fontSize:11,fontFamily:'"JetBrains Mono",monospace',color:'#10b981',fontWeight:700,letterSpacing:1}}>🔗 0G LIVE</div>
        </div>
      </div>
    </nav>
  );
}
