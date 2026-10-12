import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import WorldMap from '../../components/WorldMap';

import Footer from '../../components/Footer';
import { useLanguage } from '../../translations/LanguageContext';
import smokeGif from '../../assets/gifs/smoke.gif';
import stepImg1 from '../../assets/manufacturing/step 1.jpeg';
import stepImg2 from '../../assets/manufacturing/step 2.jpeg';
import stepImg3 from '../../assets/manufacturing/step 3.jpeg';
import stepImg4 from '../../assets/manufacturing/step 4.jpeg';
import stepImg5 from '../../assets/manufacturing/step 5.jpeg';
import stepImg6 from '../../assets/manufacturing/step 6.jpeg';
import stepImg7 from '../../assets/manufacturing/step 7.jpeg';
import stepImg8 from '../../assets/manufacturing/step 8.jpeg';
import stepImg9 from '../../assets/manufacturing/step 9.jpeg';
import stepImg10 from '../../assets/manufacturing/step 10.jpeg';
import stepImg11 from '../../assets/manufacturing/step 11.jpeg';
import stepImg12 from '../../assets/manufacturing/step 12.jpg';
import stepImg13 from '../../assets/manufacturing/step 13.jpeg';
import stepImg14 from '../../assets/manufacturing/step 14.jpeg';
import productImg1 from '../../assets/product/product 1.jpg';
import productImg2 from '../../assets/product/product 2.jpeg';
import productImg3 from '../../assets/product/product 3.jpeg';
import productImg4 from '../../assets/product/product 4.jpeg';
import productImg5 from '../../assets/product/product 5.jpeg';
import {
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  Box,
  SlidersHorizontal,
  Leaf,
  Award,
  DollarSign,
  ShieldCheck,
  FlaskConical,
  Navigation,
  MapPin,
  Store,
  Compass,
  Clock,
  RotateCcw,
  Flame,
  Star,
  Anchor,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Phone,
  Mail,
  Lock
} from 'lucide-react';
import './Landing.css';

const pad2 = (n) => String(n).padStart(2, '0');

const MFG_IMAGES = [
  stepImg1, stepImg2, stepImg3, stepImg4, stepImg5, stepImg6, stepImg7,
  stepImg8, stepImg9, stepImg10, stepImg11, stepImg12, stepImg13, stepImg14,
];

/* ── Responsive helpers (mobile-only carousel layer) ───────────────────── */
function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

/* Slides one child at a time inside a track. On desktop the viewport is
   display:contents so nothing changes — see .carb-* rules in Landing.css. */
function useCarousel(enabled) {
  const [index, setIndex] = useState(0);
  const [height, setHeight] = useState(undefined);
  const [count, setCount] = useState(0);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const touchRef = useRef(null);

  useEffect(() => {
    if (!enabled) setIndex(0);
  }, [enabled]);

  /* Slide count is derived from the live DOM so it always matches the
     number of cards actually rendered (never a stale hardcoded number). */
  useEffect(() => {
    if (!enabled) {
      setCount(0);
      return undefined;
    }
    const track = trackRef.current;
    if (!track) return undefined;
    const sync = () => setCount(track.children.length);
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(track);
    return () => ro.disconnect();
  }, [enabled]);

  useLayoutEffect(() => {
    if (!enabled) {
      setHeight(undefined);
      return undefined;
    }
    const track = trackRef.current;
    if (!track) return undefined;
    const measure = () => {
      const slide = track.children[Math.min(index, track.children.length - 1)];
      if (slide) setHeight(slide.offsetHeight);
    };
    measure();
    const ro = new ResizeObserver(() => measure());
    Array.from(track.children).forEach((child) => ro.observe(child));
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [enabled, index]);

  const step = (dir) =>
    setIndex((i) => (count > 0 ? (i + dir + count) % count : 0));

  /* Keep off-screen slides out of the tab order (React 19 supports inert) */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const children = Array.from(track.children);
    if (!enabled) {
      children.forEach((child) => child.removeAttribute('inert'));
      return undefined;
    }
    children.forEach((child, i) => {
      if (i === index) child.removeAttribute('inert');
      else child.setAttribute('inert', '');
    });
    return () => children.forEach((child) => child.removeAttribute('inert'));
  }, [enabled, index]);

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e) => {
    const start = touchRef.current;
    touchRef.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.3) step(dx < 0 ? 1 : -1);
  };
  /* A vertical page scroll owns the gesture — never turn it into a slide change */
  const onTouchMove = (e) => {
    const start = touchRef.current;
    if (!start) return;
    const t = e.touches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) touchRef.current = null;
  };
  const onTouchCancel = () => {
    touchRef.current = null;
  };

  return {
    index,
    viewportRef,
    trackRef,
    viewportStyle: enabled ? { height: height ? `${height}px` : undefined } : undefined,
    trackStyle: enabled ? { transform: `translate3d(-${index * 100}%, 0, 0)` } : undefined,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onTouchCancel,
    prev: () => step(-1),
    next: () => step(1),
  };
}

function CarouselControls({ label, onPrev, onNext }) {
  return (
    <div className="carb-controls">
      <button type="button" className="carb-btn" onClick={onPrev} aria-label={`Previous ${label}`}>
        <ChevronLeft size={20} strokeWidth={2} aria-hidden="true" />
      </button>
      <button type="button" className="carb-btn" onClick={onNext} aria-label={`Next ${label}`}>
        <ChevronRight size={20} strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  );
}

function useTouchScroll({ count, isMobile }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollerRef = useRef(null);

  useEffect(() => {
    if (!isMobile) {
      setActiveIndex(0);
      return undefined;
    }
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    let rafId = null;

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const track = scroller.firstElementChild;
        if (!track) return;
        const items = Array.from(track.children);
        if (!items.length) return;

        const scrollLeft = scroller.scrollLeft;
        const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;

        if (maxScrollLeft > 0 && scrollLeft >= maxScrollLeft - 15) {
          setActiveIndex(items.length - 1);
          return;
        }

        let closestIndex = 0;
        let minDiff = Infinity;

        items.forEach((item, index) => {
          const itemLeft = item.offsetLeft - track.offsetLeft;
          const diff = Math.abs(itemLeft - scrollLeft);
          if (diff < minDiff) {
            minDiff = diff;
            closestIndex = index;
          }
        });

        setActiveIndex(closestIndex);
      });
    };

    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isMobile, count]);

  const scrollTo = (index) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const track = scroller.firstElementChild;
    if (!track) return;
    const items = Array.from(track.children);
    const target = items[index];
    if (target) {
      const targetLeft = target.offsetLeft - track.offsetLeft;
      scroller.scrollTo({
        left: targetLeft,
        behavior: 'smooth',
      });
    }
  };

  return { scrollerRef, activeIndex, scrollTo };
}

function TouchScrollDots({ count, activeIndex, onSelect, label }) {
  return (
    <div className="touch-scroll-dots" role="tablist" aria-label={`${label} navigation`}>
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          className={`touch-scroll-dot ${i === activeIndex ? 'is-active' : ''}`}
          onClick={() => onSelect(i)}
          aria-label={`Go to ${label} ${i + 1} of ${count}`}
          aria-selected={i === activeIndex}
          role="tab"
        />
      ))}
    </div>
  );
}

export default function Landing() {
  const { t, isRTL, lang } = useLanguage();
  const figures = t('figures');

  const mfgStepsRaw = t('mfg.steps');
  const mfgSteps = MFG_IMAGES.map((img, i) => {
    const s = Array.isArray(mfgStepsRaw) && mfgStepsRaw[i] ? mfgStepsRaw[i] : {};
    return {
      n: i + 1,
      img,
      title: s.title || '',
      desc: s.desc || '',
    };
  });

  /* ─── Integrated Google Form State ───────────────────────────────────── */
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    destinationPort: '',
    productTier: '',
    geometrySize: '',
    volumeReq: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState({ companyName: '', contactName: '' });
  const formRef = useRef(null);
  const iframeRef = useRef(null);
  // Guard ref: prevents completeSubmission() from firing more than once
  // per submission (covers both the iframe load event and the fallback timeout).
  const submissionFiredRef = useRef(false);

  /* ─── Manufacturing 14-step presentation state ──────────────────────── */
  const [mfgStep, setMfgStep] = useState(0);
  const mfgTouch = useRef(null);
  const goMfgNext = () => setMfgStep((s) => Math.min(s + 1, mfgSteps.length - 1));
  const goMfgPrev = () => setMfgStep((s) => Math.max(s - 1, 0));

  /* Compact-only carousels: disabled (original stacked layout) above 768px */
  const isCompact = useMediaQuery('(max-width: 768px)');
  const products = useCarousel(isCompact);
  const sizesScroll = useTouchScroll({ count: 4, isMobile: isCompact });
  const hubsScroll = useTouchScroll({ count: 8, isMobile: isCompact });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const fieldMap = {
      'entry.2008069070': 'companyName',
      'entry.1789600130': 'contactName',
      'entry.634112710': 'email',
      'entry.484345123': 'destinationPort',
      'entry.1498411154': 'productTier',
      'entry.1913184818': 'geometrySize',
      'entry.1807966321': 'volumeReq',
      'entry.106176646': 'notes',
    };
    const key = fieldMap[name];
    if (key) {
      setFormData((prev) => ({ ...prev, [key]: value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
    }
  };

  const handleFormSubmit = (e) => {
    let hasError = false;
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = t('form.errCompany');
      hasError = true;
    }

    if (!formData.contactName.trim()) {
      newErrors.contactName = t('form.errContact');
      hasError = true;
    }

    if (!formData.email.trim()) {
      newErrors.email = t('form.errEmail');
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = t('form.errEmailValid');
      hasError = true;
    }

    if (!formData.destinationPort.trim()) {
      newErrors.destinationPort = t('form.errPort');
      hasError = true;
    }

    if (hasError) {
      e.preventDefault();
      setErrors(newErrors);
      return false;
    }

    setIsSubmitting(true);
    submissionFiredRef.current = false; // reset for this new submission

    // Fallback: if the iframe never fires its load event, complete after 3.5 s.
    // The guard inside completeSubmission() ensures it only runs once even if
    // both the iframe and this timeout happen to fire.
    setTimeout(() => {
      completeSubmission();
    }, 3500);
  };

  const completeSubmission = () => {
    // Idempotent guard — whichever path (iframe or timeout) arrives first
    // wins; the second call is a no-op.
    if (submissionFiredRef.current) return;
    submissionFiredRef.current = true;
    setIsSubmitting(false);
    setIsSubmitted(true);
    setSubmittedData({
      companyName: formData.companyName.trim(),
      contactName: formData.contactName.trim(),
    });
  };

  const handleIframeLoad = () => {
    if (isSubmitting) {
      completeSubmission();
    }
  };

  const handleResetForm = () => {
    setFormData({
      companyName: '',
      contactName: '',
      email: '',
      destinationPort: '',
      productTier: '',
      geometrySize: '',
      volumeReq: '',
      notes: '',
    });
    setErrors({});
    setIsSubmitted(false);
    setIsSubmitting(false);
    submissionFiredRef.current = false; // allow a fresh submission
    if (formRef.current) formRef.current.reset();
  };

  return (
    <div className="landing-page-wrapper">
      <Navbar />

      <main id="main-content">
        {/* 1. Hero */}
        <Hero />

        {/* 2. Key Figures */}
        <section className="section figures-section" id="figures">
          <div className="container">
            <div className="figures-grid">
              {figures.map((figure) => (
                <div className="figure-card card-base" key={figure.label}>
                  <img
                    className="figure-card-smoke"
                    src={smokeGif}
                    alt=""
                    aria-hidden="true"
                  />
                  <div className="figure-card-body">
                    <span className="figure-card-label">{figure.label}</span>
                    <div className="figure-card-value">
                      {figure.value}
                      <span className="figure-card-unit">{figure.unit}</span>
                    </div>
                    <p className="figure-card-desc">{figure.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Manufacturing */}
        <section className="section manufacturing-section" id="manufacturing">
          <div className="container">
            <div className="mfg-header">
              <div className="mfg-header-main">
                <p className="mfg-eyebrow">
                  <span className="mfg-eyebrow-dot" aria-hidden="true"></span>
                  <span>{t('mfg.eyebrow')}</span>
                </p>
                <h2 className="mfg-heading">
                  {t('mfg.title')}
                </h2>
              </div>
              <p className="mfg-intro">
                {t('mfg.desc')}
              </p>
            </div>

            <div className="mfg-divider" aria-hidden="true"></div>

            <div className="mfg-presentation" style={{ '--step': String(mfgStep) }} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
              <div
                className="mfg-viewport"
                onTouchStart={(e) => {
                  const touch = e.touches[0];
                  mfgTouch.current = { x: touch.clientX, y: touch.clientY };
                }}
                onTouchEnd={(e) => {
                  const start = mfgTouch.current;
                  if (!start) return;
                  mfgTouch.current = null;
                  const touch = e.changedTouches[0];
                  const dx = touch.clientX - start.x;
                  const dy = touch.clientY - start.y;
                  if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.3) {
                    if (isRTL) {
                      if (dx > 0) goMfgNext();
                      else goMfgPrev();
                    } else {
                      if (dx < 0) goMfgNext();
                      else goMfgPrev();
                    }
                  }
                }}
              >
                {mfgSteps.map((s, i) => (
                  <article
                    key={s.n}
                    className={'mfg-slide' + (i === mfgStep ? ' is-active' : '')}
                    style={{ '--i': String(i) }}
                    aria-hidden={i === mfgStep ? undefined : true}
                  >
                    <div className="mfg-frame">
                      <img
                        className="mfg-frame-img"
                        src={s.img}
                        alt={`${t('mfg.stepAlt')} ${pad2(s.n)}: ${s.title}`}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        draggable={false}
                      />
                      <div className="mfg-frame-overlay">
                        <h3 className="mfg-slide-title">{s.title}</h3>
                        <p className="mfg-slide-desc">{s.desc}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mfg-indicator">
                <span className="mfg-ind-num" key={mfgStep}>
                  {pad2(mfgStep + 1)}
                </span>
                <span className="mfg-ind-rule" aria-hidden="true"></span>
                <span className="mfg-ind-total">{mfgSteps.length}</span>
              </div>

              <nav className="mfg-nav" aria-label={t('mfg.navAria')}>
                {mfgStep === mfgSteps.length - 1 ? (
                  <button
                    type="button"
                    className="mfg-nav-btn"
                    onClick={() => setMfgStep(0)}
                    aria-label={t('mfg.restartAria')}
                  >
                    <RotateCcw size={22} strokeWidth={1.8} />
                  </button>
                ) : (
                  <>
                    {mfgStep > 0 && (
                      <button
                        type="button"
                        className="mfg-nav-btn"
                        onClick={goMfgPrev}
                        aria-label={t('mfg.prevAria')}
                      >
                        <ArrowUp size={22} strokeWidth={1.8} />
                      </button>
                    )}
                    <button
                      type="button"
                      className="mfg-nav-btn"
                      onClick={goMfgNext}
                      aria-label={t('mfg.nextAria')}
                    >
                      <ArrowDown size={22} strokeWidth={1.8} />
                    </button>
                  </>
                )}
              </nav>
            </div>
          </div>
        </section>

        {/* 4. Our Products — Editorial Split-Tier Showcase */}
        <section className="section products-section" id="products">
          <div className="container">
            <header className="pse-header">
              <div className="pse-header-main">
                <p className="pse-eyebrow">{t('products.eyebrow')}</p>
                <h2 className="pse-title">{t('products.title')}</h2>
                <p className="pse-intro">
                  {t('products.intro')}
                </p>
              </div>
              <div className="pse-header-aside">
                <div className="pse-header-badges">
                  <span className="pse-head-pill pse-head-pill--green">
                    <span className="pill-dot dot-green"></span>
                    {t('products.badge1')}
                  </span>
                  <span className="pse-head-pill pse-head-pill--red">
                    <span className="pill-dot dot-red"></span>
                    {t('products.badge2')}
                  </span>
                </div>
              </div>
            </header>

            <CarouselControls label="product" onPrev={products.prev} onNext={products.next} />
            <div
              className="carb-viewport"
              ref={products.viewportRef}
              style={products.viewportStyle}
              onTouchStart={products.onTouchStart}
              onTouchMove={products.onTouchMove}
              onTouchEnd={products.onTouchEnd}
              onTouchCancel={products.onTouchCancel}
            >
              <div
                className="pse-list carb-track"
                ref={products.trackRef}
                style={products.trackStyle}
              >
              {/* Product 1: TIER 01 ULTRA-PREMIUM */}
              <article className="pse pse--left pse--tier1">
                <div className="pse-media">
                  <div className="pse-shot">
                    <img
                      src={productImg1}
                      alt="Coco Sheesh Ultra-Premium Coconut Charcoal"
                    />
                    <div className="pse-chips">
                      <span className="pse-chip pse-chip--tier">
                        <span className="pill-dot dot-peach"></span>
                        {t('products.p1.tier')}
                      </span>
                      <span className="pse-chip">
                        <Star size={12} className="pse-chip-icon" />
                        {t('products.p1.audience')}
                      </span>
                    </div>
                    <div className="pse-ash-swatch">
                      <div className="ash-swatch-box swatch-white"></div>
                      <div className="ash-swatch-info">
                        <span className="ash-swatch-title">{t('products.p1.ashLabel')}</span>
                        <span className="ash-swatch-desc">{t('products.p1.ashDesc')}</span>
                      </div>
                      <div className="ash-swatch-metric">{t('products.p1.ashVal')}</div>
                    </div>
                  </div>
                </div>

                <div className="pse-body">
                  <div className="pse-meta">
                    <span className="pse-meta-code">{t('products.p1.sku')}</span>
                    <span className="pse-meta-tag tag-green">
                      <Leaf size={13} />
                      <span>{t('products.p1.purity')}</span>
                    </span>
                  </div>

                  <h3 className="pse-name">{t('products.p1.name')}</h3>

                  <p className="pse-desc">
                    {t('products.p1.desc')}
                  </p>

                  <div className="pse-stats">
                    <div className="pse-stat pse-stat--clock">
                      <div className="pse-stat-head">
                        <Clock size={16} />
                        <span className="pse-stat-label">{t('products.p1.stat1Label')}</span>
                      </div>
                      <span className="pse-stat-value">{t('products.p1.stat1Val')}</span>
                    </div>
                    <div className="pse-stat pse-stat--calorific">
                      <div className="pse-stat-head">
                        <Flame size={16} className="text-fire" />
                        <span className="pse-stat-label">{t('products.p1.stat2Label')}</span>
                      </div>
                      <span className="pse-stat-value">{t('products.p1.stat2Val')}</span>
                    </div>
                    <div className="pse-stat pse-stat--purity">
                      <div className="pse-stat-head">
                        <Leaf size={16} className="text-green" />
                        <span className="pse-stat-label">{t('products.p1.stat3Label')}</span>
                      </div>
                      <span className="pse-stat-value text-green">{t('products.p1.stat3Val')}</span>
                    </div>
                  </div>


                </div>
              </article>

              {/* Product 2: TIER 02 COMMERCIAL WORKHORSE */}
              <article className="pse pse--right pse--tier2">
                <div className="pse-body">
                  <div className="pse-meta">
                    <span className="pse-meta-code">{t('products.p2.sku')}</span>
                    <span className="pse-meta-tag tag-margin">
                      <DollarSign size={13} />
                      <span>{t('products.p2.margin')}</span>
                    </span>
                  </div>

                  <h3 className="pse-name">{t('products.p2.name')}</h3>

                  <p className="pse-desc">
                    {t('products.p2.desc')}
                  </p>

                  <div className="pse-stats">
                    <div className="pse-stat pse-stat--clock">
                      <div className="pse-stat-head">
                        <Clock size={16} />
                        <span className="pse-stat-label">{t('products.p2.stat1Label')}</span>
                      </div>
                      <span className="pse-stat-value">{t('products.p2.stat1Val')}</span>
                    </div>
                    <div className="pse-stat pse-stat--calorific">
                      <div className="pse-stat-head">
                        <Flame size={16} className="text-fire" />
                        <span className="pse-stat-label">{t('products.p2.stat2Label')}</span>
                      </div>
                      <span className="pse-stat-value">{t('products.p2.stat2Val')}</span>
                    </div>
                    <div className="pse-stat pse-stat--pack">
                      <div className="pse-stat-head">
                        <Box size={16} className="text-fire" />
                        <span className="pse-stat-label">{t('products.p2.stat3Label')}</span>
                      </div>
                      <span className="pse-stat-value text-fire">{t('products.p2.stat3Val')}</span>
                    </div>
                  </div>

                  {/* Cost-per-session efficiency metric card */}
                  <div className="pse-metric-box">
                    <div className="pse-metric-box-head">
                      <div className="metric-head-left">
                        <BarChart3 size={15} />
                        <span>{t('products.p2.effLabel')}</span>
                      </div>
                      <span className="metric-head-badge">{t('products.p2.effVal')}</span>
                    </div>
                    <p className="pse-metric-box-desc">
                      {t('products.p2.effDesc')}
                    </p>
                  </div>


                </div>

                <div className="pse-media">
                  <div className="pse-shot">
                    <img
                      src={productImg2}
                      alt="Black Sheesh Commercial Bulk Charcoal Production"
                      loading="lazy"
                    />
                    <div className="pse-chips">
                      <span className="pse-chip pse-chip--tier">
                        <span className="pill-dot dot-peach"></span>
                        {t('products.p2.tier')}
                      </span>
                      <span className="pse-chip">
                        <Store size={12} className="pse-chip-icon" />
                        {t('products.p2.audience')}
                      </span>
                    </div>
                    <div className="pse-ash-swatch">
                      <div className="ash-swatch-box swatch-silver"></div>
                      <div className="ash-swatch-info">
                        <span className="ash-swatch-title">{t('products.p2.ashLabel')}</span>
                        <span className="ash-swatch-desc">{t('products.p2.ashDesc')}</span>
                      </div>
                      <div className="ash-swatch-metric">{t('products.p2.ashVal')}</div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Product 3: TIER 03 OEM CONTRACT MANUFACTURING */}
              <article className="pse pse--left pse--tier3">
                <div className="pse-media pse-media--duo">
                  <div className="pse-chips pse-chips--full">
                    <span className="pse-chip pse-chip--tier-red">
                      <span className="pill-dot dot-white"></span>
                      {t('products.p3.tier')}
                    </span>
                  </div>

                  <div className="pse-duo-shots">
                    <div className="pse-shot">
                      <img
                        src={productImg3}
                        alt="Stage 01: Blending Charcoal Extrusion"
                        loading="lazy"
                      />
                      <div className="pse-stage-tag">
                        <span className="stage-name">{t('products.p3.stage1')}</span>
                        <span className="stage-sub">{t('products.p3.stage1Desc')}</span>
                      </div>
                    </div>
                    <div className="pse-shot">
                      <img
                        src={productImg4}
                        alt="Stage 02: Die Extrusion Hydraulic Pressing"
                        loading="lazy"
                      />
                      <div className="pse-stage-tag pse-stage-tag--red">
                        <span className="stage-name stage-name--red">{t('products.p3.stage2')}</span>
                        <span className="stage-sub">{t('products.p3.stage2Desc')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pse-body">
                  <div className="pse-meta">
                    <span className="pse-meta-code">{t('products.p3.sku')}</span>
                    <span className="pse-meta-tag tag-oem">
                      <ShieldCheck size={13} />
                      <span>{t('products.p3.badge')}</span>
                    </span>
                  </div>

                  <h3 className="pse-name">{t('products.p3.title')}</h3>

                  <p className="pse-desc">
                    {t('products.p3.desc')}
                  </p>

                  <div className="pse-stats">
                    <div className="pse-stat pse-stat--shapes">
                      <div className="pse-stat-head">
                        <Compass size={16} className="text-fire" />
                        <span className="pse-stat-label">{t('products.p3.stat1Label')}</span>
                      </div>
                      <span className="pse-stat-value">{t('products.p3.stat1Val')}</span>
                    </div>
                    <div className="pse-stat pse-stat--carbon">
                      <div className="pse-stat-head">
                        <FlaskConical size={16} />
                        <span className="pse-stat-label">{t('products.p3.stat2Label')}</span>
                      </div>
                      <span className="pse-stat-value">{t('products.p3.stat2Val')}</span>
                    </div>
                    <div className="pse-stat pse-stat--minrun">
                      <div className="pse-stat-head">
                        <Box size={16} className="text-green" />
                        <span className="pse-stat-label">{t('products.p3.stat3Label')}</span>
                      </div>
                      <span className="pse-stat-value text-green">{t('products.p3.stat3Val')}</span>
                    </div>
                  </div>

                  {/* Tailored Chemical & Physical Composition Box */}
                  <div className="pse-comp-box">
                    <div className="pse-comp-head">
                      <SlidersHorizontal size={14} />
                      <span>{t('products.p3.compTitle')}</span>
                    </div>
                    <div className="pse-comp-grid">
                      <div className="comp-grid-item">
                        <span className="comp-label">{t('products.p3.fixedCarbon')}</span>
                        <strong className="comp-val">{t('products.p3.fixedCarbonVal')}</strong>
                      </div>
                      <div className="comp-grid-item">
                        <span className="comp-label">{t('products.p3.ash')}</span>
                        <strong className="comp-val">{t('products.p3.ashVal')}</strong>
                      </div>
                      <div className="comp-grid-item">
                        <span className="comp-label">{t('products.p3.moisture')}</span>
                        <strong className="comp-val">{t('products.p3.moistureVal')}</strong>
                      </div>
                      <div className="comp-grid-item">
                        <span className="comp-label">{t('products.p3.cuts')}</span>
                        <strong className="comp-val">{t('products.p3.cutsVal')}</strong>
                      </div>
                    </div>
                  </div>

                </div>
              </article>
              </div>
            </div>
          </div>
        </section>

        {/* Retail & Wholesale Packaging Specifications (Warehousing) */}
        <section className="section packaging-section" id="packaging">
          <div className="container">
            {/* Header */}
            <div className="pkg-header">
              <div className="pkg-header-left">
                <p className="pkg-eyebrow">{t('packaging.eyebrow')}</p>
                <h2 className="pkg-title">{t('packaging.title')}</h2>
              </div>
              <div className="pkg-header-right">
                <p className="pkg-header-desc">
                  {t('packaging.desc')}
                </p>
              </div>
            </div>

            {/* Main Showcase Card */}
            <div className="pkg-card">
              {/* Top Sub-Bar */}
              <div className="pkg-card-topbar">
                <div className="pkg-topbar-left">
                  <span className="pkg-tag-badge">{t('packaging.badge1')}</span>
                  <span className="pkg-sku-code">{t('packaging.badge2')}</span>
                  <span className="pkg-spec-origin">
                    <CheckCircle2 size={13} className="text-green" />
                    <span>{t('packaging.badge3')}</span>
                  </span>
                </div>
                <div className="pkg-topbar-right">
                  <span className="pkg-status-dot"></span>
                  <span className="pkg-status-text">{t('packaging.badge4')}</span>
                </div>
              </div>

              {/* Card Body (2 Columns) */}
              <div className="pkg-card-body">
                {/* Left Media Box */}
                <div className="pkg-media-col">
                  <div className="pkg-img-wrap">
                    <img
                      src={productImg5}
                      alt="Coco Sheesh 72 PCS Standard 1 KG Official Packaging Box"
                      className="pkg-box-img"
                      loading="lazy"
                    />
                    <div className="pkg-img-overlay">
                      <div className="pkg-overlay-left">
                        <Box size={14} />
                        <span>{t('packaging.imgOverlay1')}</span>
                      </div>
                      <div className="pkg-overlay-right">
                        <span>{t('packaging.imgOverlay2')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Specs Col */}
                <div className="pkg-info-col">
                  <span className="pkg-info-eyebrow">{t('packaging.unitLabel')}</span>
                  <h3 className="pkg-info-title">{t('packaging.unitTitle')}</h3>
                  <p className="pkg-info-desc">
                    {t('packaging.unitDesc')}
                  </p>

                  {/* 4 Metric Boxes */}
                  <div className="pkg-metrics-grid">
                    <div className="pkg-metric-item">
                      <span className="pkg-m-label">{t('packaging.m1Label')}</span>
                      <strong className="pkg-m-val">{t('packaging.m1Val')}</strong>
                      <span className="pkg-m-sub">{t('packaging.m1Sub')}</span>
                    </div>
                    <div className="pkg-metric-item">
                      <span className="pkg-m-label">{t('packaging.m2Label')}</span>
                      <strong className="pkg-m-val">{t('packaging.m2Val')}</strong>
                      <span className="pkg-m-sub">{t('packaging.m2Sub')}</span>
                    </div>
                    <div className="pkg-metric-item">
                      <span className="pkg-m-label">{t('packaging.m3Label')}</span>
                      <strong className="pkg-m-val">{t('packaging.m3Val')}</strong>
                      <span className="pkg-m-sub">{t('packaging.m3Sub')}</span>
                    </div>
                    <div className="pkg-metric-item">
                      <span className="pkg-m-label">{t('packaging.m4Label')}</span>
                      <strong className="pkg-m-val">{t('packaging.m4Val')}</strong>
                      <span className="pkg-m-sub">{t('packaging.m4Sub')}</span>
                    </div>
                  </div>

                  {/* 3 Checklist Specs */}
                  <div className="pkg-checklist">
                    <div className="pkg-check-row">
                      <div className="pkg-check-label">
                        <CheckCircle2 size={15} className="pkg-check-icon" />
                        <span>{t('packaging.c1Label')}</span>
                      </div>
                      <span className="pkg-check-val">{t('packaging.c1Val')}</span>
                    </div>
                    <div className="pkg-check-row">
                      <div className="pkg-check-label">
                        <CheckCircle2 size={15} className="pkg-check-icon" />
                        <span>{t('packaging.c2Label')}</span>
                      </div>
                      <span className="pkg-check-val">{t('packaging.c2Val')}</span>
                    </div>
                    <div className="pkg-check-row">
                      <div className="pkg-check-label">
                        <CheckCircle2 size={15} className="pkg-check-icon" />
                        <span>{t('packaging.c3Label')}</span>
                      </div>
                      <span className="pkg-check-val">{t('packaging.c3Val')}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pkg-actions">
                    <a href="#form-section" className="btn pkg-btn-primary">
                      <Box size={16} />
                      <span>{t('packaging.orderBtn')}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Sizes & Shapes */}
        <section className="section sizes-section" id="sizes">
          <div className="container">
            <div className="pcg-header">
              <div className="pcg-header-left">
                <p className="pcg-eyebrow">{t('sizes.eyebrow')}</p>
                <h2 className="pcg-title">{t('sizes.title')}</h2>
              </div>
              <div className="pcg-header-right">
                <p className="pcg-header-desc">
                  {t('sizes.desc')}
                </p>
              </div>
            </div>

            <div
              className="touch-scroll-viewport"
              ref={sizesScroll.scrollerRef}
            >
              <div className="pcg-grid touch-scroll-track">
              {t('sizes.cards').map((card, i) => (
                <div className={`pcg-card${i === 1 ? ' pcg-card--popular' : ''}${i === 3 ? ' pcg-card--hex' : ''}`} key={card.dim}>
                  <div className="pcg-card-top">
                    <h3 className="pcg-dim">
                      <span className={`pcg-dim-num${i === 3 ? ' pcg-dim-hex' : ''}`}>{card.dim}</span>
                      {i === 1 && <span className="pcg-popular-badge">{t('sizes.popular')}</span>}
                    </h3>
                    <div className="pcg-name">{card.name}</div>
                    <p className="pcg-desc">{card.desc}</p>
                  </div>
                  <div className="pcg-card-footer">
                    <span className="pcg-pack-label">{card.packLabel}</span>
                    <span className="pcg-pack-val">{card.packVal}</span>
                  </div>
                </div>
              ))}
              </div>
            </div>
            <TouchScrollDots
              count={4}
              activeIndex={sizesScroll.activeIndex}
              onSelect={sizesScroll.scrollTo}
              label="Size card"
            />
          </div>
        </section>

        {/* 7. Private Label */}
        <section className="section oem-section" id="private-label">
          <div className="container">
            <div className="oem-banner">
              <div className="oem-banner-left">
                <p className="oem-eyebrow">{t('privateLabel.eyebrow')}</p>
                <h2 className="oem-title">{t('privateLabel.title')}</h2>
                <p className="oem-body">
                  {t('privateLabel.desc')}
                </p>
              </div>
              <div className="oem-banner-right">
                <p className="oem-minimums-label">{t('privateLabel.minLabel')}</p>
                <div className="oem-fcl">
                  <span className="oem-fcl-value">{t('privateLabel.minVal')}</span>
                </div>
                <p className="oem-fcl-note">
                  {t('privateLabel.minNote')}
                </p>
                <a href="#form-section" className="btn oem-cta-btn">
                  {t('privateLabel.btn')}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Active Export Shipping Lanes & World Map (Figma Recreation) */}
        <section className="section shipping-section" id="shipping">
          <div className="container">
            {/* Header */}
            <div className="shipping-header">
              <div className="shipping-header-left">
                <p className="shipping-eyebrow">{t('shipping.eyebrow')}</p>
                <h2 className="shipping-title">{t('shipping.title')}</h2>
              </div>
              <div className="shipping-header-right">
                <div className="freight-modes-badge">
                  <span className="freight-label">{t('shipping.freightLabel')}</span>
                  <span className="freight-modes">{t('shipping.freightVal')}</span>
                </div>
                <p className="shipping-header-desc">
                  {t('shipping.desc')}
                </p>
              </div>
            </div>

            {/* 4 KPI Strip */}
            <div className="shipping-kpi-grid">
              <div className="shipping-kpi-card">
                <span className="kpi-label">{t('shipping.kpi1Label')}</span>
                <div className="kpi-value">{t('shipping.kpi1Val')}</div>
                <span className="kpi-desc">{t('shipping.kpi1Sub')}</span>
              </div>
              <div className="shipping-kpi-card">
                <span className="kpi-label">{t('shipping.kpi2Label')}</span>
                <div className="kpi-value">{t('shipping.kpi2Val')}</div>
                <span className="kpi-desc">{t('shipping.kpi2Sub')}</span>
              </div>
              <div className="shipping-kpi-card">
                <span className="kpi-label">{t('shipping.kpi3Label')}</span>
                <div className="kpi-value">{t('shipping.kpi3Val')}</div>
                <span className="kpi-desc">{t('shipping.kpi3Sub')}</span>
              </div>
              <div className="shipping-kpi-card">
                <span className="kpi-label">{t('shipping.kpi4Label')}</span>
                <div className="kpi-value">{t('shipping.kpi4Val')}</div>
                <span className="kpi-desc">{t('shipping.kpi4Sub')}</span>
              </div>
            </div>

            {/* World Map Display Card */}
            <div className="shipping-map-display">
              <div className="map-top-bar">
                <div className="map-top-title">
                  <span className="pill-dot dot-peach"></span>
                  <span>{t('shipping.mapTitle')}</span>
                </div>
                <div className="map-datum-pill">
                  {t('shipping.mapDatum')}
                </div>
              </div>

              <div className="map-legend-bar">
                <div className="legend-item">
                  <span className="legend-circle legend-circle--origin"></span>
                  <span>{t('shipping.legend1')}</span>
                </div>
                <div className="legend-item">
                  <span className="legend-circle legend-circle--dest"></span>
                  <span>{t('shipping.legend2')}</span>
                </div>
                <div className="legend-item">
                  <span className="legend-circle legend-circle--inactive"></span>
                  <span>{t('shipping.legend3')}</span>
                </div>
              </div>

              <div className="map-canvas-container">
                {/* Floating Dispatch Telemetry Box */}
                <div className="map-telemetry-box">
                  <div className="telemetry-title">{t('shipping.telemetryTitle')}</div>
                  <div className="telemetry-row">{t('shipping.telemetryLanes')}</div>
                  <div className="telemetry-row">{t('shipping.telemetrySafety')}</div>
                </div>

                {/* Dark world map (Middle East–centric) */}
                <WorldMap />

                {/* Bottom pill on map */}
                <div className="map-bottom-pill">
                  <span className="pill-dot dot-peach"></span>
                  <span>{t('shipping.pill')}</span>
                </div>
              </div>
            </div>

            {/* 8 Hub Cards Grid (Screenshot 5 Recreation) */}
            <div
              className="touch-scroll-viewport"
              ref={hubsScroll.scrollerRef}
            >
              <div className="shipping-hubs-grid touch-scroll-track">
              {t('shipping.hubs').map((hub, i) => (
                i === 7 ? (
                  <div className="hub-card hub-card--expedite" key={hub.title}>
                    <span className="expedite-eyebrow">{hub.region}</span>
                    <h4 className="hub-title">{hub.title}</h4>
                    <p className="hub-desc">
                      {hub.desc}
                    </p>
                  </div>
                ) : (
                  <div className={`hub-card${i === 0 ? ' hub-card--featured' : ''}`} key={hub.title}>
                    <div className="hub-card-header">
                      <span className="hub-region">{hub.region}</span>
                      <span className={`hub-badge${i === 1 ? ' hub-badge--origin' : ''}`}>{hub.badge}</span>
                    </div>
                    <h4 className="hub-title">{hub.title}</h4>
                    <p className="hub-desc">
                      {hub.desc}
                    </p>
                  </div>
                )
              ))}
              </div>
            </div>
            <TouchScrollDots
              count={8}
              activeIndex={hubsScroll.activeIndex}
              onSelect={hubsScroll.scrollTo}
              label="Hub location card"
            />

            {/* Bottom 3 Trust Badges */}
            <div className="shipping-trust-strip">
              <div className="shipping-trust-item">
                <div className="trust-icon-box">
                  <Award size={22} />
                </div>
                <div className="trust-content">
                  <h5 className="trust-title">{t('shipping.trust1Title')}</h5>
                  <p className="trust-desc">{t('shipping.trust1Desc')}</p>
                </div>
              </div>

              <div className="shipping-trust-item">
                <div className="trust-icon-box">
                  <ShieldCheck size={22} />
                </div>
                <div className="trust-content">
                  <h5 className="trust-title">{t('shipping.trust2Title')}</h5>
                  <p className="trust-desc">{t('shipping.trust2Desc')}</p>
                </div>
              </div>

              <div className="shipping-trust-item">
                <div className="trust-icon-box">
                  <Anchor size={22} />
                </div>
                <div className="trust-content">
                  <h5 className="trust-title">{t('shipping.trust3Title')}</h5>
                  <p className="trust-desc">{t('shipping.trust3Desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 12. Combined Location Hub & Order RFQ Form Section */}
        <section className="section order-rfq-section" id="form-section">
          <div className="container">
            <div className="order-rfq-grid">
              {/* Left Column: Headquarters & Logistics Hub Location */}
              <div className="order-loc-col">
                <div className="order-loc-header">
                  <span className="order-loc-tag">{t('form.locEyebrow')}</span>
                  <h2 className="order-loc-title">{t('form.locTitle')}</h2>
                  <p className="order-loc-desc">
                    {t('form.locDesc')}
                  </p>
                </div>

                <div className="order-loc-card">
                  <div className="order-loc-map-wrapper">
                    <div className="order-loc-badge">
                      <span className="badge-dot" aria-hidden="true" />
                      <span>{t('form.badge')}</span>
                    </div>
                    <iframe
                      src="https://maps.google.com/maps?q=30.2911614,31.812552&t=&z=16&ie=UTF8&iwloc=&output=embed"
                      className="order-loc-map-iframe"
                      title="Coco Sheesh Factory Location Map"
                      loading="lazy"
                      allowFullScreen
                    />
                  </div>

                  <div className="order-loc-card-body">
                    <div className="order-loc-card-top">
                      <h3 className="order-loc-company">{t('form.company')}</h3>
                      <a
                        href="https://maps.app.goo.gl/PGwVupLPtmuu2Lk79"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-open-directions"
                        id="btn-open-directions"
                      >
                        <Navigation size={14} />
                        <span>{t('form.directions')}</span>
                      </a>
                    </div>

                    <div className="order-loc-address">
                      <MapPin size={16} className="loc-accent-icon" />
                      <span>{t('form.address')}</span>
                    </div>

                    <div className="order-loc-contacts">
                      <div className="order-loc-contact-item">
                        <Phone size={14} className="loc-accent-icon" />
                        <a href="tel:+201157777567" className="phone-number" dir="ltr">+20 115 777 7567</a>
                      </div>
                      <div className="order-loc-contact-item">
                        <Mail size={14} className="loc-accent-icon" />
                        <a href="mailto:cocosheeshh@gmail.com">cocosheeshh@gmail.com</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="order-loc-dock-bar">
                  <Clock size={16} className="dock-icon" />
                  <span>{t('form.hoursLabel')}</span>
                </div>
              </div>

              {/* Right Column: Wholesale RFQ Order Form */}
              <div className="order-form-col">
                {isSubmitted ? (
                  <div id="form-success" className="form-success custom-card" role="status" aria-live="polite">
                    <div className="success-icon-wrap">
                      <svg className="success-checkmark" viewBox="0 0 52 52" aria-hidden="true">
                        <circle className="checkmark-circle" cx="26" cy="26" r="24" fill="none" />
                        <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                      </svg>
                    </div>
                    <h3>{t('form.successTitle')}</h3>
                    <p>{t('form.successDesc')}</p>
                    
                    <div className="submitted-summary">
                      <div className="summary-row">
                        <span>{t('form.successCompany')}</span>
                        <strong>{submittedData.companyName}</strong>
                      </div>
                      <div className="summary-row">
                        <span>{t('form.successContact')}</span>
                        <strong>{submittedData.contactName}</strong>
                      </div>
                    </div>

                    <button type="button" className="btn btn-secondary" onClick={handleResetForm}>
                      <RotateCcw size={16} />
                      <span>{t('form.successBtn')}</span>
                    </button>
                  </div>
                ) : (
                  <form
                    ref={formRef}
                    id="native-google-form"
                    action="https://docs.google.com/forms/d/e/1FAIpQLSf4LFq5q7Q4b2I7Qex59YQ_EblbInsGC5Gvdeq0vkHRlywpIw/formResponse"
                    method="POST"
                    target="hidden_iframe"
                    className="rfq-native-form"
                    onSubmit={handleFormSubmit}
                    noValidate
                  >
                    {/* Required Google Form System Fields for Email Collection & Session */}
                    <input type="hidden" name="emailAddress" value={formData.email} />
                    <input type="hidden" name="fvv" value="1" />
                    <input type="hidden" name="pageHistory" value="0" />

                    {/* Row 1: 2 columns */}
                    <div className="rfq-form-row two-cols">
                      <div className="rfq-form-group">
                        <label htmlFor="input-company">
                          <span>{t('form.labelCompany')}</span>
                          <span className="req-star" aria-hidden="true">*</span>
                        </label>
                        <div className={`rfq-input-wrap ${errors.companyName ? 'has-error' : ''}`}>
                          <input
                            type="text"
                            id="input-company"
                            name="entry.2008069070"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            placeholder={t('form.phCompany')}
                            required
                          />
                        </div>
                        {errors.companyName && <span className="rfq-field-error" aria-live="polite">{errors.companyName}</span>}
                      </div>

                      <div className="rfq-form-group">
                        <label htmlFor="input-contact">
                          <span>{t('form.labelContact')}</span>
                          <span className="req-star" aria-hidden="true">*</span>
                        </label>
                        <div className={`rfq-input-wrap ${errors.contactName ? 'has-error' : ''}`}>
                          <input
                            type="text"
                            id="input-contact"
                            name="entry.1789600130"
                            value={formData.contactName}
                            onChange={handleInputChange}
                            placeholder={t('form.phContact')}
                            required
                          />
                        </div>
                        {errors.contactName && <span className="rfq-field-error" aria-live="polite">{errors.contactName}</span>}
                      </div>
                    </div>

                    {/* Row 2: 2 columns */}
                    <div className="rfq-form-row two-cols">
                      <div className="rfq-form-group">
                        <label htmlFor="input-email">
                          <span>{t('form.labelEmail')}</span>
                          <span className="req-star" aria-hidden="true">*</span>
                        </label>
                        <div className={`rfq-input-wrap ${errors.email ? 'has-error' : ''}`}>
                          <input
                            type="email"
                            id="input-email"
                            name="entry.634112710"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder={t('form.phEmail')}
                            required
                            autoComplete="email"
                          />
                        </div>
                        {errors.email && <span className="rfq-field-error" aria-live="polite">{errors.email}</span>}
                      </div>

                      <div className="rfq-form-group">
                        <label htmlFor="input-port">
                          <span>{t('form.labelPort')}</span>
                          <span className="req-star" aria-hidden="true">*</span>
                        </label>
                        <div className={`rfq-input-wrap ${errors.destinationPort ? 'has-error' : ''}`}>
                          <input
                            type="text"
                            id="input-port"
                            name="entry.484345123"
                            value={formData.destinationPort}
                            onChange={handleInputChange}
                            placeholder={t('form.phPort')}
                            required
                          />
                        </div>
                        {errors.destinationPort && <span className="rfq-field-error" aria-live="polite">{errors.destinationPort}</span>}
                      </div>
                    </div>

                    {/* Row 3: 3 columns */}
                    <div className="rfq-form-row three-cols">
                      <div className="rfq-form-group">
                        <label htmlFor="input-tier">
                          <span>{t('form.labelTier')}</span>
                        </label>
                        <div className="rfq-input-wrap">
                          <input
                            type="text"
                            id="input-tier"
                            name="entry.1498411154"
                            value={formData.productTier}
                            onChange={handleInputChange}
                            placeholder={t('form.phTier')}
                          />
                        </div>
                      </div>

                      <div className="rfq-form-group">
                        <label htmlFor="input-geometry">
                          <span>{t('form.labelGeom')}</span>
                        </label>
                        <div className="rfq-input-wrap">
                          <input
                            type="text"
                            id="input-geometry"
                            name="entry.1913184818"
                            value={formData.geometrySize}
                            onChange={handleInputChange}
                            placeholder={t('form.phGeom')}
                          />
                        </div>
                      </div>

                      <div className="rfq-form-group">
                        <label htmlFor="input-volume">
                          <span>{t('form.labelVol')}</span>
                        </label>
                        <div className="rfq-input-wrap">
                          <input
                            type="text"
                            id="input-volume"
                            name="entry.1807966321"
                            value={formData.volumeReq}
                            onChange={handleInputChange}
                            placeholder={t('form.phVol')}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 4: full width textarea */}
                    <div className="rfq-form-group full-width">
                      <label htmlFor="input-notes">
                        <span>{t('form.labelNotes')}</span>
                      </label>
                      <div className="rfq-input-wrap textarea-wrap">
                        <textarea
                          id="input-notes"
                          name="entry.106176646"
                          value={formData.notes}
                          onChange={handleInputChange}
                          rows={3}
                          placeholder={t('form.phNotes')}
                        />
                      </div>
                    </div>

                    {/* Row 5: Action & NDA */}
                    <div className="rfq-form-footer">
                      <div className="rfq-nda-badge">
                        <Lock size={15} className="lock-icon" />
                        <span>{t('form.nda')}</span>
                      </div>

                      <button type="submit" id="btn-submit" className="btn-rfq-submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <span className="btn-spinner" aria-hidden="true" />
                            <span>{t('form.submitting')}</span>
                          </>
                        ) : (
                          <span>{t('form.submit')}</span>
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {/* Hidden Iframe to catch response silently without page reload */}
                <iframe
                  ref={iframeRef}
                  name="hidden_iframe"
                  id="hidden_iframe"
                  style={{ display: 'none' }}
                  title="Submission Target"
                  onLoad={handleIframeLoad}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 15. Footer */}
      <Footer />
    </div>
  );
}
