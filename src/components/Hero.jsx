import React from 'react';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import coalHero from '../assets/images/coal hero.jpg';

const heroTrustItems = [
  '100% Natural Materials',
  'Turkish Food-Grade Starch',
  '70+ Tons Export Capacity',
];

export default function Hero() {
  return (
    <section className="hero-section" id="hero">
      {/* Atmosphere layers: coal plate + scrim */}
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-coal-layer">
          <img src={coalHero} alt="" className="atmospheric-coal-img" decoding="async" />
        </div>
        <div className="hero-overlay-gradient"></div>
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          {/* Main Headline */}
          <h1 className="hero-title anim anim-title">
            Power &amp; expertise
            <br />
            in <span className="text-gradient-fire">compressed charcoal</span>
          </h1>

          {/* Supporting description */}
          <p className="hero-subtitle anim anim-subtitle">
            Premium <strong>compressed coconut charcoal</strong>, engineered with Turkish
            technology.
          </p>

          {/* CTAs */}
          <div className="hero-cta-group anim anim-cta">
            <a href="#contact" className="btn btn-primary hero-btn-primary">
              <span>Contact Us</span>
              <ArrowRight size={18} />
            </a>
            <a href="#products" className="btn btn-secondary hero-btn-secondary">
              <span>Explore Our Products</span>
            </a>
          </div>

          {/* B2B Trust Indicators */}
          <ul className="hero-trust-row anim anim-trust">
            {heroTrustItems.map((item) => (
              <li className="hero-trust-item" key={item}>
                <BadgeCheck size={17} strokeWidth={2} aria-hidden="true" focusable="false" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
