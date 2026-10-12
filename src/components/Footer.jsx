import React from 'react';
import { ChevronRight, Phone, Mail, MapPin } from 'lucide-react';
import logo from '../assets/images/coco sheesh logo.jpg';
import { useLanguage } from '../translations/LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const quickLinks = [
    { label: t('footer.quick.manufacturing'), href: '#manufacturing' },
    { label: t('footer.quick.products'), href: '#products' },
    { label: t('footer.quick.sizes'), href: '#sizes' },
  ];

  const businessLinks = [
    { label: t('footer.business.privateLabel'), href: '#private-label' },
    { label: t('footer.business.packaging'), href: '#packaging' },
    { label: t('footer.business.location'), href: '#shipping' },
  ];

  return (
    <footer className="footer-wrapper">
      <div className="container">
        {/* Main Footer Grid */}
        <div className="footer-grid">

          {/* Brand Column */}
          <div className="footer-col footer-col-brand">
            <div className="footer-brand">
              <div className="footer-icon-box">
                <img src={logo} alt="Coco Sheesh Logo" className="footer-logo-img" />
              </div>
              <div className="footer-brand-title">
                <span className="footer-name">Coco Sheesh</span>
                <span className="footer-subtext">{t('nav.brandSub')}</span>
              </div>
            </div>
            <p className="footer-brand-desc">
              {t('footer.brandDesc')}
            </p>
            <div className="footer-brand-tags">
              <span className="footer-tag">{t('footer.est')}</span>
              <span className="footer-tag">{t('footer.tons')}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">{t('footer.quickLinks')}</h4>
            <ul className="footer-links-list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>
                    <ChevronRight size={14} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Services */}
          <div className="footer-col">
            <h4 className="footer-col-title">{t('footer.b2b')}</h4>
            <ul className="footer-links-list">
              {businessLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>
                    <ChevronRight size={14} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="footer-col">
            <h4 className="footer-col-title">{t('footer.contact')}</h4>

            <div className="footer-contact-list">
              <a
                href="tel:+201157777567"
                className="footer-contact-link"
                aria-label="Call Coco Sheesh"
              >
                <div className="footer-contact-icon-box">
                  <Phone size={15} />
                </div>
                <span className="phone-number" dir="ltr">+20 115 777 7567</span>
              </a>

              <a
                href="mailto:cocosheeshh@gmail.com"
                className="footer-contact-link"
                aria-label="Email Coco Sheesh"
              >
                <div className="footer-contact-icon-box">
                  <Mail size={15} />
                </div>
                <span>cocosheeshh@gmail.com</span>
              </a>

              <a
                href="https://maps.app.goo.gl/PGwVupLPtmuu2Lk79"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-link"
                aria-label="Coco Sheesh Factory Location"
              >
                <div className="footer-contact-icon-box">
                  <MapPin size={15} />
                </div>
                <span>{t('form.address')}</span>
              </a>
            </div>

            {/* Social Media Icons */}
            <div className="footer-socials">
              <a
                href="https://www.facebook.com/share/1Dth94PHVd/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn footer-social-fb"
                aria-label="Coco Sheesh on Facebook"
              >
                {/* Facebook SVG */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/coco.sheeshh?stkn=b3Iwb3B3cXhzY2wz&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn footer-social-ig"
                aria-label="Coco Sheesh on Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <defs>
                    <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
                      <stop offset="0%" stopColor="#fdf497" />
                      <stop offset="5%" stopColor="#fdf497" />
                      <stop offset="45%" stopColor="#fd5949" />
                      <stop offset="60%" stopColor="#d6249f" />
                      <stop offset="90%" stopColor="#285AEB" />
                    </radialGradient>
                  </defs>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#ig-grad)" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="url(#ig-grad)" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="url(#ig-grad)" strokeWidth="2.5" />
                </svg>
              </a>

              <a
                href="https://wa.me/201157777567"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn footer-social-wa"
                aria-label="WhatsApp Coco Sheesh"
              >
                {/* WhatsApp SVG */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright-text">
            &copy; {currentYear} <span className="text-white font-bold">Coco Sheesh</span> — {t('footer.copyright')}
          </p>
          <div className="footer-bottom-badges">
            <span className="bottom-badge">{t('footer.natural')}</span>
            <span className="bottom-badge">{t('footer.egypt')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
