'use client';
import {useEffect,useRef} from 'react';
const paths={
  circuit:'M2 52H62L94 20H160L192 52H258',
  lanes:'M0 60H60L110 10H260 M0 72H66L116 22H260 M0 84H72L122 34H260',
  pulse:'M0 45H66L82 24L102 65L125 12L149 45H260',
  arc:'M8 78V52C8 0 100 0 100 52V78 M26 78V52C26 23 82 23 82 52V78 M112 78H260',
};
/** Decorative current: starts when it enters view and can replay on hover/focus. */
export default function SectionLight({variant='circuit',className=''}:{variant?:keyof typeof paths;className?:string}){
 const ref=useRef<HTMLSpanElement>(null);
 useEffect(()=>{
  const el=ref.current;if(!el||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const observer=new IntersectionObserver(([entry])=>{el.classList.toggle('light-active',entry.isIntersecting);},{threshold:.3});
  observer.observe(el);return()=>observer.disconnect();
 },[]);
 return <span ref={ref} className={`section-light ${className}`} aria-hidden="true"><svg viewBox="0 0 260 90" fill="none"><path className="light-track" d={paths[variant]}/><path className="light-current" pathLength="1" d={paths[variant]}/><circle className="light-terminal" cx="253" cy={variant==='pulse'?45:variant==='arc'?78:variant==='lanes'?22:52} r="3"/></svg></span>;
}
