'use client';

// Adapted from Vengeance UI Expandable Bento Grid (MIT, Ashutoshx7).
// Upstream active-item/card structure is retained, with Club 91 photography,
// native modal focus management, touch targets and an actual enquiry action.
import {useEffect,useId,useRef,useState,type ReactNode} from 'react';
import Image from 'next/image';
import {m,useReducedMotion} from 'framer-motion';
import {ArrowUpRight,Plus,X} from 'lucide-react';
import {cn} from '@/lib/utils';
import AnimatedButton from './animated-button';

export interface BentoItem {
  id:string;
  title:string;
  subtitle:string;
  description:string;
  content:ReactNode;
  image:string;
  icon:ReactNode;
  className?:string;
  availability:string;
  actionLabel:string;
  onAction:()=>void;
}
export default function ExpandableBentoGrid({items}:{items:BentoItem[]}){
  const [active,setActive]=useState<BentoItem|null>(null);
  const dialog=useRef<HTMLDialogElement>(null);
  const opener=useRef<HTMLButtonElement|null>(null);
  const closeButton=useRef<HTMLButtonElement>(null);
  const id=useId();
  const reduced=useReducedMotion();
  useEffect(()=>{
    if(!active)return;
    const previousOverflow=document.body.style.overflow;
    dialog.current?.showModal();document.body.style.overflow='hidden';closeButton.current?.focus();
    return()=>{dialog.current?.close();document.body.style.overflow=previousOverflow;opener.current?.focus({preventScroll:true});};
  },[active]);
  const close=()=>setActive(null);
  return <>
    <div className="facility-grid" data-vui="expandable-bento-grid">
      {items.map(item=><button type="button" key={item.id} className={cn('facility-card vui-bento-trigger',item.className)} onClick={event=>{opener.current=event.currentTarget;setActive(item);}} aria-haspopup="dialog" aria-controls={`${id}-dialog`} aria-expanded={active?.id===item.id} aria-label={`Explore ${item.title}`}>
        <Image src={item.image} alt="" fill sizes="(max-width:767px) 100vw, 800px"/>
        <span className="facility-shade"/>
        <span className="facility-top"><span>{item.subtitle}</span>{item.icon}</span>
        <span className="facility-bottom"><span className="vui-facility-title">{item.title}</span><span className="vui-facility-description">{item.description}</span><span className="vui-facility-explore">EXPLORE THE EXPERIENCE <Plus size={13}/></span></span>
        <ArrowUpRight className="facility-arrow" size={22}/>
      </button>)}
    </div>
    <dialog id={`${id}-dialog`} ref={dialog} className="vui-bento-dialog" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`} onCancel={close} onKeyDown={event=>{
      if(event.key!=='Tab')return;
      const controls=event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]');
      const first=controls[0],last=controls[controls.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
    }} onClick={event=>{if(event.target===event.currentTarget)close();}}>
      {active&&<m.div className="vui-bento-expanded" initial={reduced?false:{opacity:.75,scale:.97,y:12}} animate={{opacity:1,scale:1,y:0}} transition={{duration:.24}}>
        <button type="button" ref={closeButton} className="close-button" onClick={close} aria-label="Close facility details"><X size={20}/></button>
        <div className="vui-bento-image"><Image src={active.image} alt={`${active.title} — visual inspiration`} fill sizes="(max-width:767px) 100vw, 440px"/><span className="photo-note">VISUAL INSPIRATION</span><span className="vui-bento-image-icon">{active.icon}</span></div>
        <div className="vui-bento-copy"><p className="eyebrow">{active.subtitle}</p><h3 id={`${id}-title`}>{active.title}</h3><p id={`${id}-description`}>{active.description}</p><div className="vui-bento-content">{active.content}</div><p className="vui-availability">{active.availability}</p><AnimatedButton onClick={()=>{const action=active.onAction;close();requestAnimationFrame(action);}}>{active.actionLabel}<ArrowUpRight size={18}/></AnimatedButton></div>
      </m.div>}
    </dialog>
  </>;
}
