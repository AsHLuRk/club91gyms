'use client';
// Adapted from Vengeance UI Image Reveal List (MIT); see vendor/vengeance-ui.
// Native article buttons, keyboard previews and permanently visible mobile thumbnails.
import {useState} from 'react';
import Image from 'next/image';
import {ArrowUpRight} from 'lucide-react';
export interface JournalItem {title:string;category:string;image:string}
export default function ImageRevealList({items,onOpen}:{items:JournalItem[];onOpen:(index:number)=>void}){
  const [active,setActive]=useState(0);
  return <div className="journal-reveal" data-vui="image-reveal-list">
    <div className="journal-preview" aria-hidden="true">
      {items.map((item,index)=><Image key={item.image} src={`/images/${item.image}.webp`} alt="" fill sizes="50vw" className={active===index?'is-active':''}/>)}
      <span className="journal-preview-caption">FIELD NOTES / CLUB 91 <b>0{active+1}</b></span>
    </div>
    <div className="journal-list">{items.map((item,index)=><button key={item.title} className={`journal-row ${active===index?'is-active':''}`} onMouseEnter={()=>setActive(index)} onFocus={()=>setActive(index)} onClick={()=>onOpen(index)}>
      <span className="journal-row-number">0{index+1}</span>
      <span className="journal-mobile-image"><Image src={`/images/${item.image}.webp`} alt="" fill sizes="(max-width: 767px) 100vw, 1px"/></span>
      <span className="journal-row-copy"><span className="journal-meta"><span>{item.category}</span><span>NOV 2026</span></span><h3>{item.title}</h3><span className="journal-read">READ THE STORY <ArrowUpRight size={16}/></span></span>
      <ArrowUpRight className="journal-row-arrow" size={28}/>
    </button>)}</div>
  </div>;
}
