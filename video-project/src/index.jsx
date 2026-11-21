import React from "react";
import {registerRoot} from "remotion";
import {Composition, AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, Audio, staticFile} from "remotion";

const scenes = [
  {title:"रात के 12 बजे…",line:"भूत: रुक जा इंसान! मैं तुझे खा जाऊँगा!",bg:"#111827",accent:"#8b5cf6",kind:"road"},
  {title:"पप्पू का जवाब",line:"पप्पू: भाई, EMI और बिजली का बिल भरता हूँ… तुझसे क्या डरूँ!",bg:"#172554",accent:"#38bdf8",kind:"reply"},
  {title:"भूत की मजबूरी",line:"भूत: 200 साल से नौकरी नहीं मिली…",bg:"#312e81",accent:"#c4b5fd",kind:"cry"},
  {title:"इंटरव्यू का कमाल",line:"इंटरव्यूअर: 200 साल का अनुभव? आप कल से जॉइन करो!",bg:"#164e63",accent:"#22d3ee",kind:"office"},
  {title:"आखिरी झटका!",line:"बॉस: 500 फाइलें आज ही खत्म करो!  भूत: इससे अच्छा डराता था!",bg:"#3f1d2e",accent:"#fb7185",kind:"files"}
];

const Ghost=({cry=false,small=false})=><svg width={small?150:230} height={small?170:250} viewBox="0 0 230 250">
  <path d="M30 220 V112 C30 48 66 14 115 14 C164 14 200 48 200 112 V220 L170 202 L145 224 L115 203 L85 224 L58 202 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="5"/>
  <ellipse cx="82" cy="108" rx="13" ry="20" fill="#0f172a"/><ellipse cx="148" cy="108" rx="13" ry="20" fill="#0f172a"/>
  {cry?<><path d="M82 132 Q115 158 148 132" fill="none" stroke="#0f172a" strokeWidth="7" strokeLinecap="round"/><path d="M70 132 Q58 155 72 170" stroke="#38bdf8" strokeWidth="7" fill="none"/></>:<path d="M82 145 Q115 178 148 145" fill="none" stroke="#0f172a" strokeWidth="7" strokeLinecap="round"/>}
</svg>;

const Pappu=()=> <svg width="220" height="260" viewBox="0 0 220 260">
 <circle cx="110" cy="58" r="48" fill="#b77945" stroke="#713f12" strokeWidth="5"/>
 <path d="M63 49 Q110 -5 157 49" fill="#1e293b"/><circle cx="94" cy="62" r="5" fill="#111827"/><circle cx="128" cy="62" r="5" fill="#111827"/>
 <path d="M94 86 Q110 99 128 86" fill="none" stroke="#7f1d1d" strokeWidth="5" strokeLinecap="round"/>
 <path d="M55 130 Q110 105 165 130 L180 242 L40 242 Z" fill="#f59e0b" stroke="#92400e" strokeWidth="5"/>
 <path d="M75 135 L110 180 L145 135" fill="none" stroke="#fff7ed" strokeWidth="7"/>
</svg>;

const Bubble=({children,top})=><div style={{position:"absolute",top:top??"13%",left:"50%",transform:"translateX(-50%)",maxWidth:"82%",background:"white",color:"#111827",padding:"18px 26px",borderRadius:24,fontSize:31,fontWeight:900,textAlign:"center",boxShadow:"0 8px 0 #0005",lineHeight:1.35}}>{children}</div>;

const CharacterScene=({scene,index})=>{
 const f=useCurrentFrame();
 const enter=spring({frame:f,fps:25,config:{damping:14}});
 const bob=Math.sin(f/9)*8;
 return <AbsoluteFill style={{background:scene.bg,color:"white",fontFamily:"Noto Sans Devanagari, sans-serif",overflow:"hidden"}}>
  <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 50% 45%, "+scene.accent+"55, transparent 58%)"}}/>
  {scene.kind==="road"&&<><div style={{position:"absolute",bottom:0,width:"100%",height:"30%",background:"#1f2937",clipPath:"polygon(35% 0,65% 0,100% 100%,0 100%)"}}/><div style={{position:"absolute",top:65,left:80,fontSize:45}}>🌙</div><div style={{position:"absolute",top:95,right:110,fontSize:42}}>🌲</div></>}
  {scene.kind==="office"&&<><div style={{position:"absolute",top:"22%",left:"8%",width:"84%",height:"40%",border:"8px solid #94a3b8",borderRadius:18,background:"#0f172a"}}/><div style={{position:"absolute",top:"27%",left:"12%",fontSize:34,fontWeight:900}}>HR INTERVIEW</div></>}
  {scene.kind==="files"&&<>{Array.from({length:12},(_,i)=><div key={i} style={{position:"absolute",left:(i%6)*15+5+"%",top:45+Math.floor(i/6)*80+"%",fontSize:48,transform:"rotate("+(i%2?12:-12)+"deg)"}}>📁</div>)}</>}
  <div style={{position:"absolute",top:30,left:0,right:0,textAlign:"center",fontSize:44,fontWeight:1000,textShadow:"0 4px 12px #0008"}}>{scene.title}</div>
  <div style={{position:"absolute",bottom:40,left:"8%",transform:"translateY("+(1-enter)*100+"px)",display:"flex",alignItems:"end",gap:40}}>
   <div style={{transform:"translateY("+bob+"px)"}}><Pappu/></div>
   <div style={{transform:"translateY("+(-bob)+"px) scale("+ (scene.kind==="road"?1.12:0.9)+")"}}><Ghost cry={scene.kind==="cry"||scene.kind==="files"}/></div>
  </div>
  <Bubble top="19%">{scene.line}</Bubble>
  <div style={{position:"absolute",bottom:16,right:25,fontSize:20,opacity:.8}}>CLIPFORGE AI • HINDI COMEDY</div>
 </AbsoluteFill>;
};

const Video=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:"#020617"}}>
  {scenes.map((scene,i)=><Sequence key={i} from={i*250} durationInFrames={250}><CharacterScene scene={scene} index={i}/></Sequence>)}
  <Audio src={staticFile("voice.wav")} volume={1}/>
  <Audio src={staticFile("music.wav")} volume={0.22}/>
  <div style={{position:"absolute",bottom:0,left:0,right:0,height:10,background:"#ffffff33"}}><div style={{height:"100%",width:(f/1250*100)+"%",background:"#facc15"}}/></div>
 </AbsoluteFill>;
};

const Root=()=> <Composition id="GhostJob" component={Video} durationInFrames={1250} fps={25} width={1080} height={1920}/>;
registerRoot(Root);
