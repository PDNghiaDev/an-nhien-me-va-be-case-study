import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FooterNewsletter } from "@/components/layout/FooterNewsletter";
import { Container } from "@/components/ui/Container";
import type { SiteContent } from "@/lib/types";

// Slice 3B — footer theo bản gốc: logo + tagline, 2 cột liên kết, khối liên hệ, newsletter demo, copyright.
export function Footer({ site }: { site: SiteContent }) {
  const footer = site.footer;
  return <footer className="siteFooter">
    <Container className="footerGrid">
      <div className="footerBrand">
        <Link className="footerLogo" href={site.routes.home} aria-label={site.ui.homeLinkLabel}>
          <Image src={site.logo.src} alt={site.logo.alt} width={site.logo.width} height={site.logo.height}/>
        </Link>
        <p className="footerTagline">{footer.tagline}</p>
      </div>

      {footer.columns.map(column => <nav key={column.title} className="footerColumn" aria-label={column.title}>
        <h2>{column.title}</h2>
        <ul>{column.links.map(link => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul>
      </nav>)}

      <div className="footerColumn footerContact">
        <h2>{footer.contactTitle}</h2>
        <ul>
          <li>
            <MapPin aria-hidden="true" size={16}/>
            <span>{site.contact.address.value}</span>
          </li>
          <li>
            <Phone aria-hidden="true" size={16}/>
            <span className="footerPhones">
              {site.contact.phoneLinks.map(phone => <a key={phone.href} href={phone.href}>{phone.value}</a>)}
            </span>
          </li>
          <li>
            <Mail aria-hidden="true" size={16}/>
            <a href={site.contact.emailLink.href}>{site.contact.emailLink.value}</a>
          </li>
        </ul>
      </div>

      <div className="footerColumn footerNewsletterColumn">
        <FooterNewsletter data={footer.newsletter}/>
      </div>

      <p className="copyright">{site.ui.copyright}</p>
    </Container>
  </footer>;
}
