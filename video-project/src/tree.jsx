import React from "react";
import {registerRoot} from "remotion";
import {Composition, AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring} from "remotion";

const scenes = [
  {title:"एक छोटे बीज की बड़ी शुरुआत",sub:"हर विशाल पेड़ की शुरुआत एक छोटे बीज से होती है।",tag:"बीज मिट्टी में",kind:"seed",fact:"बीज के अंदर एक छोटा भ्रूणीय पौधा मौजूद होता है।"},
  {title:"पानी मिलते ही जागता है बीज",sub:"बीज पानी सोखता है, फूलता है और बीजावरण नरम होकर फटने लगता है।",tag:"अंकुरण शुरू",kind:"water",fact:"अंकुरण के लिए पानी, ऑक्सीजन और सही तापमान जरूरी हैं।"},
  {title:"सबसे पहले निकलती है जड़",sub:"नन्ही प्राथमिक जड़ नीचे की ओर बढ़ती है और पानी व खनिज लेने लगती है।",tag:"जड़ नीचे बढ़ती है",kind:"root",fact:"पहली निकलने वाली जड़ को रेडिकल कहते हैं।"},
  {title:"तना ऊपर, पत्तियाँ बाहर",sub:"अंकुर मिट्टी से ऊपर आता है। तना बढ़ता है और पहली पत्तियाँ खुलती हैं।",tag:"नन्हा पौधा",kind:"sprout",fact:"ऊपर बढ़ने वाले भ्रूणीय भाग को प्लूम्यूल कहते हैं।"},
  {title:"पत्तियाँ बनाती हैं भोजन",sub:"हरी पत्तियाँ सूर्य के प्रकाश, पानी और कार्बन डाइऑक्साइड से भोजन बनाती हैं।",tag:"प्रकाश संश्लेषण",kind:"young",fact:"इस प्रक्रिया को प्रकाश संश्लेषण कहते हैं और ऑक्सीजन भी निकलती है।"},
  {title:"बीज से बना विशाल पेड़",sub:"समय के साथ तना मोटा होता है, शाखाएँ फैलती हैं और कई पेड़ों में फूल व फल बनते हैं।",tag:"पूरा पेड़",kind:"tree",fact:"फल के अंदर नए बीज बन सकते हैं—और जीवन चक्र फिर शुरू होता है।"}
];

const Soil=()=> <><rect x="0" y="1030" width="1080" height="890" fill="#68452f"/><path d="M0 1030 Q180 1000 360 1030 T720 1030 T1080 1030" fill="none" stroke="#9b7653" strokeWidth="22"/>{Array.from({length:35},(_,i)=><circle key={i} cx={(i*97)%1080} cy={1100+(i*131)%760} r={5+(i%5)*2} fill="#a9825e" opacity=".55"/>)}</>;

const TreeArt=({stage,frame})=>{
 const grow=interpolate(frame,[0,85],[0,1],{extrapolateRight:"clamp"});
 const rootGrow=interpolate(frame,[10,110],[0,1],{extrapolateRight:"clamp"});
 const leavesGrow=interpolate(frame,[55,150],[0,1],{extrapolateRight:"clamp"});
 const trunkHeight=stage==="seed"?0:stage==="water"?10:stage==="root"?22:stage==="sprout"?230:stage==="young"?430:590;
 const crown=stage==="tree"?1:stage==="young"?.65:stage==="sprout"?.25:0;
 return <svg viewBox="0 0 1080 1920" width="100%" height="100%" style={{position:"absolute",inset:0}}>
  <defs><radialGradient id="sun"><stop stopColor="#fff7ae"/><stop offset="1" stopColor="#fbbf24" stopOpacity="0"/></radialGradient></defs>
  <circle cx="865" cy="330" r="210" fill="url(#sun)" opacity=".65"/>
  <Soil/>
  {stage!=="seed"&&stage!=="water"&&<g stroke="#d7b18a" strokeWidth="13" fill="none" strokeLinecap="round" opacity=".95">
   <path d={`M540 1040 Q${540-45*rootGrow} ${1040+100*rootGrow} ${510-70*rootGrow} ${1170+230*rootGrow}`} />
   <path d={`M540 1040 Q${540+40*rootGrow} ${1080+90*rootGrow} ${590+100*rootGrow} ${1170+220*rootGrow}`} />
   {stage!=="root"&&<><path d="M540 1040 Q500 1130 430 1260"/><path d="M540 1040 Q600 1140 670 1260"/></>}
  </g>}
  {stage==="seed"||stage==="water"?<g transform="translate(540 1010)"><ellipse rx="52" ry="70" fill="#9a5b24" stroke="#5d3518" strokeWidth="9"/><path d="M0 -50 Q-20 0 0 50" stroke="#d69a4b" strokeWidth="7" fill="none"/>{stage==="water"&&Array.from({length:8},(_,i)=><path key={i} d={`M${-100+i*28} -150 q-16 24 0 42 q16-18 0-42`} fill="#60c9ff" opacity=".8"/>)}</g>:null}
  {trunkHeight>0&&<g>
   <path d={`M540 1040 Q535 900 540 ${1040-trunkHeight}`} stroke="#8b552f" strokeWidth={stage==="tree"?72:stage==="young"?42:22} fill="none" strokeLinecap="round"/>
   {stage==="young"||stage==="tree"?<g stroke="#8b552f" strokeWidth={stage==="tree"?34:19} fill="none" strokeLinecap="round">
    <path d={`M540 ${1040-trunkHeight*.62} Q450 ${850-trunkHeight*.5} 360 ${690-trunkHeight*.4}`}/>
    <path d={`M540 ${1040-trunkHeight*.72} Q650 ${820-trunkHeight*.6} 740 ${650-trunkHeight*.45}`}/>
    <path d={`M540 ${1040-trunkHeight*.85} Q500 ${600-trunkHeight*.4} 480 ${470-trunkHeight*.35}`}/>
   </g>:null}
   {stage==="sprout"&&<g fill="#55a84f"><ellipse cx="475" cy="820" rx="68" ry="34" transform="rotate(25 475 820)"/><ellipse cx="605" cy="820" rx="68" ry="34" transform="rotate(-25 605 820)"/></g>}
   {crown>0&&<g opacity={leavesGrow}>
    {Array.from({length:stage==="tree"?15:7},(_,i)=>{const x=540+Math.sin(i*2.4)*(stage==="tree"?270:150);const y=360+Math.cos(i*1.7)*(stage==="tree"?190:100);const r=(stage==="tree"?110:72)+(i%3)*12;return <g key={i}><circle cx={x} cy={y} r={r} fill={["#277a3d","#318b45","#3e9b50","#206b37"][i%4]} stroke="#15552c" strokeWidth="5"/><path d={`M${x-r*.6} ${y} q${r*.6} -${r*.6} ${r*1.2} 0`} fill="none" stroke="#75c96a" strokeWidth="6"/></g>})}
    {stage==="tree"&&Array.from({length:8},(_,i)=><circle key={"fruit"+i} cx={390+(i*83)%300} cy={350+(i*47)%190} r="15" fill="#f97316"/>)}
   </g>}
  </g>}
 </svg>;
};

const Scene=({scene,index})=>{
 const f=useCurrentFrame();
 const enter=spring({frame:f,fps:25,config:{damping:16}});
 const word=scene.sub.split(" ");
 const active=Math.min(word.length-1,Math.floor(f/Math.max(1,250/word.length)));
 return <AbsoluteFill style={{background:"#dff3ff",fontFamily:"Noto Sans Devanagari, sans-serif",color:"#123047",overflow:"hidden"}}>
  <div style={{position:"absolute",top:0,left:0,right:0,height:1050,background:"linear-gradient(180deg,#8bd5f5 0%,#dff3ff 75%)"}}/>
  <TreeArt stage={scene.kind} frame={f}/>
  <div style={{position:"absolute",top:75,left:45,right:45,textAlign:"center",fontSize:54,fontWeight:900,lineHeight:1.25,textShadow:"0 2px 0 #fff"}}>{scene.title}</div>
  <div style={{position:"absolute",top:250,left:70,right:70,textAlign:"center",fontSize:33,fontWeight:700,lineHeight:1.55,background:"#ffffffdf",padding:"20px 24px",borderRadius:28,boxShadow:"0 10px 35px #164e6330",opacity:enter}}>
   {word.map((w,i)=><span key={i} style={{color:i===active?"#0e9f6e":"#123047",background:i===active?"#d1fae5":"transparent",borderRadius:7,marginRight:8}}>{w}</span>)}
  </div>
  <div style={{position:"absolute",bottom:260,left:70,right:70,textAlign:"center",background:"#0f5132",color:"white",padding:"18px 22px",borderRadius:22,fontSize:31,fontWeight:900}}>🌱 {scene.tag}</div>
  <div style={{position:"absolute",bottom:100,left:65,right:65,textAlign:"center",fontSize:26,fontWeight:700,color:"#173f35",background:"#fff9",padding:18,borderRadius:18}}>जानिए: {scene.fact}</div>
  <div style={{position:"absolute",bottom:30,left:35,right:35,display:"flex",justifyContent:"space-between",fontSize:20,fontWeight:800,color:"#17435b"}}><span>बीज से पेड़ तक</span><span>{index+1} / 6</span></div>
 </AbsoluteFill>;
};

const Video=()=> <AbsoluteFill style={{background:"#dff3ff"}}>
 {scenes.map((scene,i)=><Sequence key={scene.kind} from={i*250} durationInFrames={250}><Scene scene={scene} index={i}/></Sequence>)}
</AbsoluteFill>;

const Root=()=> <Composition id="TreeGrowth" component={Video} durationInFrames={1500} fps={25} width={1080} height={1920}/>;
registerRoot(Root);
