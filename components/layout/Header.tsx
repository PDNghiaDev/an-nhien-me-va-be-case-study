"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { NavItem, SiteContent } from "@/lib/types";

const toId = (value: string) => `nav-${value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;

function NavGroup({item,expandLabel,onNavigate}:{item:NavItem;expandLabel:string;onNavigate:()=>void}) {
  const [open,setOpen]=useState(false);
  const panelId=toId(item.label);
  return <li
    className="navItem navItem--hasMenu"
    data-open={open ? "true" : "false"}
    onMouseEnter={()=>setOpen(true)}
    onMouseLeave={()=>setOpen(false)}
    onFocus={()=>setOpen(true)}
    onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node|null))setOpen(false)}}
    onKeyDown={event=>{if(event.key==="Escape")setOpen(false)}}
  >
    <Link className="navLink" href={item.href} onClick={onNavigate}>{item.label}</Link>
    <button className="navDisclosure" type="button" aria-expanded={open} aria-controls={panelId} onClick={()=>setOpen(value=>!value)}>
      <ChevronDown aria-hidden="true" size={16} strokeWidth={2}/><span className="srOnly">{`${expandLabel}: ${item.label}`}</span>
    </button>
    <ul className="navDropdown" id={panelId}>
      {item.children?.map(child=><li key={child.label}><Link href={child.href} onClick={()=>{setOpen(false);onNavigate()}}>{child.label}</Link></li>)}
    </ul>
  </li>;
}

export function Header({site}:{site:SiteContent}) {
  const [open,setOpen]=useState(false);
  useEffect(()=>{const close=(event:KeyboardEvent)=>{if(event.key==="Escape")setOpen(false)};document.addEventListener("keydown",close);return()=>document.removeEventListener("keydown",close)},[]);
  return <header className="siteHeader">
    <a className="skipLink" href="#main-content">{site.ui.skipToContent}</a>
    <Container className="headerInner">
      <Link className="brandLockup" href={site.routes.home} aria-label={site.ui.homeLinkLabel} onClick={()=>setOpen(false)}>
        <Image className="brandLogo" src={site.logo.src} alt={site.logo.alt} width={site.logo.width} height={site.logo.height} priority/>
      </Link>
      <button className="menuToggle" type="button" aria-expanded={open} aria-controls="site-navigation" onClick={()=>setOpen(value=>!value)}>
        {open ? <X aria-hidden="true" size={23}/> : <Menu aria-hidden="true" size={23}/>}<span className="srOnly">{open ? site.ui.closeMenu : site.ui.openMenu}</span>
      </button>
      <nav id="site-navigation" className={`siteNav ${open ? "siteNav--open" : ""}`} aria-label={site.ui.primaryNavigation}>
        <ul className="navList">
          {site.navigation.map(item=>item.children?.length
            ? <NavGroup key={item.label} item={item} expandLabel={site.ui.expandSubmenu} onNavigate={()=>setOpen(false)}/>
            : <li className="navItem" key={item.label}><Link className="navLink" href={item.href} onClick={()=>setOpen(false)}>{item.label}</Link></li>)}
        </ul>
        <Button href={site.headerCta.href} showArrow={false} onClick={()=>setOpen(false)}>{site.headerCta.label}</Button>
      </nav>
    </Container>
  </header>;
}
