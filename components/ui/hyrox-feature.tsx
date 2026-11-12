'use client';
import {useState} from 'react';
import Image from 'next/image';
import {ArrowUpRight} from 'lucide-react';
import AnimatedButton from './animated-button';
import SectionLight from './section-light';
const disciplines=[
 {name:'Functional fitness',title:'MOVE WITH PURPOSE.',copy:'Explore functional fitness training built around movement and your goals.'},
 {name:'Endurance & strength',title:'BUILD BOTH SIDES.',copy:'Bring endurance and strength together. Ask the team how to make them part of your routine.'},
 {name:'Sport specific training',title:'TRAIN FOR YOUR GOAL.',copy:'Talk to the team about sport specific training and the demands you want to prepare for.'},
 {name:'HYROX race preparation',title:'FIND YOUR FINISH LINE.',copy:'Get details on the announced HYROX programme, sessions and race preparation.'},
];
export default function HyroxFeature({onEnquire}:{onEnquire:()=>void}){
 const [active,setActive]=useState(0);
 return <section className="hyrox-section section" id="hyrox"><div className="container hyrox-layout"><div className="hyrox-copy"><p className="eyebrow">THE NEXT LEVEL / HYROX TRAINING</p><h2>BUILT FOR<br/><span>HYROX.</span></h2><SectionLight variant="lanes" className="hyrox-light"/><p>Functional fitness meets endurance and strength. Discover another way to train at Club 91.</p><div className="hyrox-disciplines" role="group" aria-label="Explore HYROX training">{disciplines.map((d,i)=><button key={d.name} aria-pressed={active===i} onClick={()=>setActive(i)}><span>0{i+1}</span>{d.name}<ArrowUpRight size={16}/></button>)}</div></div><div className="hyrox-visual"><Image src="/images/training.webp" alt="Functional training inspiration" fill sizes="(max-width: 767px) 100vw, 50vw"/><div className="hyrox-lanes" aria-hidden="true">{disciplines.map((d,i)=><span key={d.name} className={active===i?'active':''}><b>0{i+1}</b><i/></span>)}</div><div className="hyrox-caption"><span className="eyebrow">TRAIN / TRANSFORM / BELONG</span><div aria-live="polite"><h3>{disciplines[active].title}</h3><p>{disciplines[active].copy}</p></div><AnimatedButton onClick={onEnquire}>ASK ABOUT HYROX <ArrowUpRight size={17}/></AnimatedButton><small>Training inspiration · Opening soon at the new location</small></div></div></div></section>;
}
