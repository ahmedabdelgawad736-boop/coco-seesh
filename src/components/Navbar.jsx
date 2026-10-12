import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/images/coco sheesh logo.jpg';
import { useLanguage } from '../translations/LanguageContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav.manufacturing'), href: '#manufacturing' },
    { label: t('nav.products'), href: '#products' },
    { label: t('nav.retail'), href: '#packaging' },
    { label: t('nav.sizes'), href: '#sizes' },
    { label: t('nav.privateLabel'), href: '#private-label' },
    { label: t('nav.location'), href: '#shipping' },
    { label: t('nav.orderForm'), href: '#form-section' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo (Left in LTR) - Display only, non-clickable */}
        <div className="navbar-brand">
          <div className="brand-icon-wrapper">
            <img src={logo} alt="Coco Sheesh Logo" className="brand-logo-img" />
          </div>
          <div className="brand-text-block">
            <span className="brand-name">Coco Sheesh</span>
            <span className="brand-subtext">{t('nav.brandSub')}</span>
          </div>
        </div>

        {/* Desktop Navigation (Center in LTR) */}
        <nav className="navbar-nav desktop-only" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.href} className="nav-item">
                <a href={link.href} className="nav-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right controls: Mobile menu button (inside) + Language toggle (outer edge) */}
        <div className="navbar-right">
          <button
            type="button"
            className="mobile-toggle-btn mobile-only"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? t('nav.closeNav') : t('nav.openNav')}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <button
            type="button"
            className="lang-toggle-btn"
            onClick={toggleLang}
            aria-label={lang === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
          >
            {lang === 'en' ? 'AR' : 'EN'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu-drawer ${mobileMenuOpen ? 'is-open' : ''}`}>
        <div className="mobile-menu-content">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.href} className="mobile-nav-item">
                <a
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={handleLinkClick}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="lang-toggle-btn lang-toggle-btn--drawer"
            onClick={toggleLang}
            aria-label={lang === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
          >
            {lang === 'en' ? 'AR' : 'EN'}
          </button>
        </div>
      </div>
    </header>
  );
}
