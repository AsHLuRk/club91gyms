'use client';
import {useEffect,useState} from 'react';

/** A single light pass, followed by the red outline warming up. Text stays readable before hydration. */
export default function HeroTitle(){
  const [ready,setReady]=useState(false);
  useEffect(()=>{let cancelled=false;document.fonts.ready.then(()=>{if(!cancelled)setReady(true);});return()=>{cancelled=true;};},[]);
  return <h1 className="hero-title" data-ready={ready}>
    <span className="hero-line hero-sweep"><span>WHERE LIMITS</span><span className="hero-light" aria-hidden="true">WHERE LIMITS</span></span>
    <span className="hero-line hero-outline hero-ignite"><span>DON’T EXIST.</span></span>
  </h1>;
}
