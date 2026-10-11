import React from 'react';
import { ArrowRight } from 'lucide-react';
import coalHero from '../assets/images/coal hero.jpg';
import { useLanguage } from '../translations/LanguageContext';

export default function Hero() {
  const { t, isRTL } = useLanguage();
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
            {t('hero.title1a')}<span className="hero-highlight-metric">{t('hero.title1b')}</span>{t('hero.title1c')}
            <br />
            {t('hero.title2')}
          </h1>

          {/* Supporting description */}
          <p className="hero-subtitle anim anim-subtitle">
            {t('hero.subtitleA')}
            <span className="hero-subtitle-highlight">{t('hero.subtitleB')}</span>
            {t('hero.subtitleC')}
          </p>

          {/* CTAs */}
          <div className="hero-cta-group anim anim-cta">
            <a href="#form-section" className="btn btn-primary hero-btn-primary">
              <span>{t('hero.orderNow')}</span>
              <ArrowRight size={18} style={isRTL ? { transform: 'scaleX(-1)' } : undefined} />
            </a>
            <a href="#products" className="btn btn-secondary hero-btn-secondary">
              <span>{t('hero.explore')}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
