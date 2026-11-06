'use client';

// Adapted from Vengeance UI Animated Button (MIT, Ashutoshx7).
// Upstream snapshot: vendor/vengeance-ui/animated-button.json.
// Preserve native link/button semantics; run the shine on interaction only.
import type {AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode} from 'react';
import {cn} from '@/lib/utils';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {as?:'button';children:ReactNode};
type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {as:'a';children:ReactNode};
export type AnimatedButtonProps=ButtonProps|LinkProps;

export default function AnimatedButton(props:AnimatedButtonProps){
  const content=<><span className="vui-button-content">{props.children}</span><span className="vui-button-shine" aria-hidden="true"/><span className="vui-button-border" aria-hidden="true"/></>;
  if(props.as==='a'){
    const {as:element,children,className,...rest}=props;
    return <a {...rest} className={cn('button vui-button',className)} data-vui="animated-button">{content}</a>;
  }
  const {as:element,children,className,type='button',...rest}=props;
  return <button {...rest} type={type} className={cn('button vui-button',className)} data-vui="animated-button">{content}</button>;
}
