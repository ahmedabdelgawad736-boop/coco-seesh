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
            SUSTAINED <span className="hero-highlight-metric">7,600+ KCAL/KG</span> CALORIC
            <br />
            POWER.
            <br />
            WHITE ASH. ZERO ODOR.
          </h1>

          {/* Supporting description */}
          <p className="hero-subtitle anim anim-subtitle">
            Engineered ultra-dense coconut shell charcoal briquettes directly manufactured for
            global lounge distributors and premium brands. Exceeding{' '}
            <span className="hero-subtitle-highlight">70+ tons monthly continuous output</span>{' '}
            with verified ocean carriage certifications to North America and EMEA.
          </p>

          {/* CTAs */}
          <div className="hero-cta-group anim anim-cta">
            <a href="#form-section" className="btn btn-primary hero-btn-primary">
              <span>Order Now</span>
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
