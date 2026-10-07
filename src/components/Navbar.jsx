import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/images/coco sheesh logo.jpg';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Manufacturing', href: '#manufacturing' },
    { label: 'Products', href: '#products' },
    { label: 'Sizes & Shapes', href: '#sizes' },
    { label: 'Private Label', href: '#private-label' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Export', href: '#markets' },
    { label: 'Location', href: '#location' },
    { label: 'Order Form', href: '#form-section' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`} dir="ltr">
      <div className="container navbar-container">
        {/* Brand Logo (Left in LTR) */}
        <a href="#" className="navbar-brand" aria-label="Coco Sheesh Home">
          <div className="brand-icon-wrapper">
            <img src={logo} alt="Coco Sheesh Logo" className="brand-logo-img" />
          </div>
          <div className="brand-text-block">
            <span className="brand-name">Coco Sheesh</span>
            <span className="brand-subtext">CHARCOAL INDUSTRY</span>
          </div>
        </a>

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

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          className="mobile-toggle-btn mobile-only"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu-drawer ${mobileMenuOpen ? 'is-open' : ''}`} dir="ltr">
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
        </div>
      </div>
    </header>
  );
}
