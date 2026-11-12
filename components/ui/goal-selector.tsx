'use client';
import {useState} from 'react';
import {ArrowUpRight} from 'lucide-react';
import AnimatedButton from './animated-button';
import SectionLight from './section-light';
const goals=[
 {label:'Build strength',title:'ONE REP. THEN ANOTHER.',copy:'Start with the foundations. Talk to the team about strength training and a routine that meets you where you are.',type:'Free trial'},
 {label:'Find my routine',title:'MAKE SHOWING UP A HABIT.',copy:'Your pace. Your starting point. Find a club and a training routine you can keep coming back to.',type:'Free trial'},
 {label:'Train with a coach',title:'A LITTLE GUIDANCE. A NEW GEAR.',copy:'Tell the team where you want to go. Ask about personal coaching at your chosen Club 91 branch.',type:'Personal training'}
];
export default function GoalSelector({onEnquire}:{onEnquire:(type:string,message:string)=>void}){
 const [active,setActive]=useState(0);const goal=goals[active];
 return <div className="container goal-layout"><div className="goal-intro"><p className="eyebrow">YOUR PROGRESS STARTS HERE</p><h2>YOUR NEXT<br/><span>CHAPTER.</span></h2><SectionLight variant="pulse" className="goal-light"/></div><div className="goal-choice"><p className="goal-label">WHAT ARE YOU HERE FOR?</p><div className="goal-options" role="group" aria-label="Your training goal">{goals.map((item,i)=><button key={item.label} aria-pressed={i===active} onClick={()=>setActive(i)}><span>0{i+1}</span>{item.label}</button>)}</div><div className="goal-description" aria-live="polite"><h3>{goal.title}</h3><p>{goal.copy}</p></div><AnimatedButton className="button button-outline" onClick={()=>onEnquire(goal.type,`My goal: ${goal.label.toLowerCase()}.`)}>START YOUR STORY <ArrowUpRight size={17}/></AnimatedButton></div></div>;
}
