'use client';

// Adapted from Vengeance UI Glow Border Card (MIT, Ashutoshx7).
// Keeps the upstream conic-gradient / CSS-variable mechanism; uses a narrow,
// interaction-only red/silver border with no perpetual blur animation.
import {forwardRef,type CSSProperties,type HTMLAttributes} from 'react';
import {cn} from '@/lib/utils';

export interface GlowBorderCardProps extends HTMLAttributes<HTMLDivElement>{
  enabled?:boolean;
  animationDuration?:number;
  gradientColors?:string[];
  paused?:boolean;
}
export const GlowBorderCard=forwardRef<HTMLDivElement,GlowBorderCardProps>(function GlowBorderCard({children,className,enabled=true,animationDuration=5,gradientColors=['#e31937','#e3193733','#c0c0c0','#e3193733','#e31937'],paused=false,style,...props},ref){
  const colors=gradientColors.length?gradientColors:['#e31937'];
  const vars:Record<string,string>={'--glow-animation-duration':`${animationDuration}s`};
  for(let i=0;i<10;i++)vars[`--glow-color-${i+1}`]=colors[i%colors.length];
  return <div ref={ref} {...props} className={cn(enabled&&'vui-glow-card',className)} style={{...vars,...style} as CSSProperties} data-vui={enabled?'glow-border-card':undefined} data-paused={paused||undefined}>
    {enabled&&<span className="vui-glow-border" aria-hidden="true"/>}
    {children}
  </div>;
});
