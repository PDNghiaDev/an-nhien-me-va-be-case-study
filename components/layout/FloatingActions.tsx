"use client";
import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import type { FloatingActions as FloatingActionsConfig } from "@/lib/types";

export function FloatingActions({config}:{config:FloatingActionsConfig}) {
  const {zalo,backToTop}=config;
  const [visible,setVisible]=useState(false);
  const [nearForm,setNearForm]=useState(false);
  useEffect(()=>{
    const panels=[...document.querySelectorAll('form,[data-contact-panel]')];
    const intersecting=new Set<Element>();
    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries) {
        if(entry.isIntersecting) intersecting.add(entry.target);
        else intersecting.delete(entry.target);
      }
      setNearForm(intersecting.size>0);
    });
    panels.forEach(panel=>observer.observe(panel));
    return ()=>observer.disconnect();
  },[]);
  useEffect(()=>{
    if(!backToTop.enabled) return;
    const update=()=>setVisible(window.scrollY>backToTop.showAfter);
    update();
    window.addEventListener("scroll",update,{passive:true});
    return ()=>window.removeEventListener("scroll",update);
  },[backToTop.enabled,backToTop.showAfter]);
  if(!zalo.enabled && !backToTop.enabled) return null;
  return <div className="floatingActions" data-near-form={nearForm}>
    {zalo.enabled ? <a className="floatingZalo" href={zalo.href} target="_blank" rel="noreferrer" aria-label={zalo.ariaLabel}>
      <MessageCircle aria-hidden="true" size={24} strokeWidth={1.7}/>
      <span className="floatingZaloLabel">{zalo.label}</span>
      <span className="floatingBadge">{zalo.badge}</span>
    </a> : null}
    {backToTop.enabled ? <button className="floatingTop" type="button" hidden={!visible} onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>
      <ArrowUp aria-hidden="true" size={20} strokeWidth={2}/><span className="srOnly">{backToTop.label}</span>
    </button> : null}
  </div>;
}
