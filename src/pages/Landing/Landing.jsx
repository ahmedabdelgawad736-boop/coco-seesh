import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';

import Footer from '../../components/Footer';
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
import {
  Sparkles,
  Globe2,
  CheckCircle2,
  Gauge,
  ArrowUp,
  ArrowDown,
  Check,
  ArrowLeft,
  Box,
  Hexagon,
  SlidersHorizontal,
  Leaf,
  Wheat,
  Tag,
  PackageCheck,
  FileText,
  Sliders,
  Handshake,
  Users2,
  CheckCircle,
  Award,
  DollarSign,
  Maximize2,
  Layers,
  Globe,
  Factory,
  ShieldCheck,
  FileCheck,
  FlaskConical,
  Trees,
  Info,
  Navigation,
  Ship,
  MapPin,
  UserCheck,
  Briefcase,
  Store,
  Compass,
  Clock,
  Building,
  RotateCcw,
  Send,
  Atom,
  Droplets,
  Droplet,
  Zap,
  Flame,
  Star,
  Anchor,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Phone,
  Mail,
  Lock
} from 'lucide-react';
import './Landing.css';

const FIGURES = [
  {
    label: 'PRODUCTION VELOCITY',
    value: '70+',
    unit: 'Tons',
    desc: 'Monthly continuous plant output from current expanded facility.',
  },
  {
    label: 'LINE HERITAGE',
    value: '2018',
    unit: 'Est.',
    desc: '6+ years of specialized high-pressure extrusion engineering.',
  },
  {
    label: 'RAW INTEGRITY',
    value: '100%',
    unit: 'Pure',
    desc: 'Zero tree deforestation; organic coconut shell & natural starch binder.',
  },
  {
    label: 'GLOBAL FCL LANES',
    value: '8+',
    unit: 'Markets',
    desc: 'Direct shipping lines across North America, Middle East, and Asia.',
  },
];

const pad2 = (n) => String(n).padStart(2, '0');

const MFG_STEPS = [
  { n: 1, img: stepImg1, title: 'في الطبيعة', desc: 'تبدأ رحلتنا من أشجار جوز الهند، حيث تمنحنا الطبيعة أفضل الموارد.' },
  { n: 2, img: stepImg2, title: 'جمع الثمار', desc: 'يتم جمع ثمار جوز الهند الناضجة بعناية من المزارع.' },
  { n: 3, img: stepImg3, title: 'فصل القشور', desc: 'بعد استخدام الثمار، يتم فصل قشور جوز الهند واختيار الأفضل منها.' },
  { n: 4, img: stepImg4, title: 'التجفيف الأولي', desc: 'تجفيف القشور تحت الشمس للحصول على أقل نسبة رطوبة.' },
  { n: 5, img: stepImg5, title: 'التفحيم', desc: 'تدخل القشور إلى أفران التفحيم لتحويلها إلى فحم عالي الجودة.' },
  { n: 6, img: stepImg6, title: 'الطحن', desc: 'يُطحن الفحم المتفحم حتى يصبح مسحوقًا ناعمًا ومتجانسًا.' },
  { n: 7, img: stepImg7, title: 'الخلط', desc: 'يتم خلط المكونات بدقة للحصول على القوام المثالي.' },
  { n: 8, img: stepImg8, title: 'الكبس والتشكيل', desc: 'يتم ضغط الخليط وتشكيله إلى مكعبات بنفس شكل منتجنا.' },
  { n: 9, img: stepImg9, title: 'التكييف النهائي', desc: 'تمر المكعبات بمرحلة التكييف النهائي لضمان القوة والصلابة.' },
  { n: 10, img: stepImg10, title: 'مراقبة الجودة', desc: 'كل منتج يخضع لاختبارات جودة صارمة لضمان أفضل تجربة.' },
  { n: 11, img: stepImg11, title: 'التعبئة والتغليف', desc: 'يتم تعبئة المنتج في عبوات أنيقة لحماية الجودة حتى وصولها إليك.' },
  { n: 12, img: stepImg12, title: 'المنتج النهائي', desc: 'يظهر المنتج في شكله النهائي بعد تعبئته وتغليفه، جاهزًا للتوزيع والوصول إلى عملائنا.' },
  { n: 13, img: stepImg13, title: 'الاشتعال', desc: 'يشتعل بسرعة ويمنح حرارة مستقرة تدوم طويلًا.' },
  { n: 14, img: stepImg14, title: 'على الشيشة', desc: 'جلسة شيشة أكثر متعة بدخان أقل وطعم أنقى.' },
];

const MFG_VALUES = [
  { icon: Atom, label: '100% NATURAL', title: 'Crafted from Pure Coconut Shells', desc: 'Zero wood fillers, chemical adulterants, or synthetic accelerants.' },
  { icon: Droplets, label: 'ODORLESS', title: 'Naturally Clean, Odorless', desc: 'Pure charcoal carbonization emits clean heat with zero harsh odors.' },
  { icon: Droplet, label: 'LONG BURNING TIME', title: '150-180 Min Heat', desc: 'Extended endurance with steady, sustained caloric output.' },
  { icon: Sparkles, label: 'LOW ASH CONTENT', title: '< 2.0% Bright White Ash', desc: 'Clean burn leaving fine powdery white ash without dark grit.' },
  { icon: Zap, label: 'QUICK IGNITION', title: 'Ignite with Ease', desc: 'Fast red-hot core ignition without sparking or odor release.' },
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

  /* ─── Manufacturing 14-step presentation state ──────────────────────── */
  const [mfgStep, setMfgStep] = useState(0);
  const mfgTouch = useRef(null);
  const goMfgNext = () => setMfgStep((s) => Math.min(s + 1, MFG_STEPS.length - 1));
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
      newErrors.companyName = 'Company / Business name is required.';
      hasError = true;
    }

    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Contact name & title is required.';
      hasError = true;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Corporate email address is required.';
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
      hasError = true;
    }

    if (!formData.destinationPort.trim()) {
      newErrors.destinationPort = 'Destination port / country is required.';
      hasError = true;
    }

    if (hasError) {
      e.preventDefault();
      setErrors(newErrors);
      return false;
    }

    setIsSubmitting(true);

    // Backup safety trigger in case iframe load event is delayed
    setTimeout(() => {
      if (!isSubmitted) {
        completeSubmission();
      }
    }, 3500);
  };

  const completeSubmission = () => {
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
              {FIGURES.map((figure) => (
                <div className="figure-card card-base card-ember-accent" key={figure.label}>
                  <img
                    className="figure-card-smoke"
                    src={smokeGif}
                    alt=""
                    aria-hidden="true"
                  />
                  <div className="figure-card-body">
                    <span className="figure-card-label">
                      <span className="figure-card-slash">//</span> {figure.label}
                    </span>
                    <div className="figure-card-value num-latin">
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
        <section className="section manufacturing-section" id="manufacturing" dir="rtl">
          <div className="container">
            <div className="mfg-header">
              <div className="mfg-header-main">
                <p className="mfg-eyebrow">
                  <span className="mfg-eyebrow-dot" aria-hidden="true"></span>
                  <span>// ADVANCED CARBON SCIENCE — METICULOUS PROCESS CONTROL</span>
                </p>
                <h2 className="mfg-heading" lang="en">
                  The Complete Manufacturing Journey
                </h2>
              </div>
              <p className="mfg-intro" lang="en">
                We manage fourteen stages of high-precision Turkish production with continuous
                laboratory control — a capacity of over 70 tons per month and a guaranteed density
                above 1.35 g/cm³.
              </p>
            </div>

            <div className="mfg-divider" aria-hidden="true"></div>

            <div className="mfg-presentation" style={{ '--step': String(mfgStep) }}>
              <div
                className="mfg-viewport"
                onTouchStart={(e) => {
                  const t = e.touches[0];
                  mfgTouch.current = { x: t.clientX, y: t.clientY };
                }}
                onTouchEnd={(e) => {
                  const start = mfgTouch.current;
                  if (!start) return;
                  mfgTouch.current = null;
                  const t = e.changedTouches[0];
                  const dx = t.clientX - start.x;
                  const dy = t.clientY - start.y;
                  if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.3) {
                    if (dx > 0) goMfgNext();
                    else goMfgPrev();
                  }
                }}
              >
                {MFG_STEPS.map((s, i) => (
                  <article
                    key={s.n}
                    className={'mfg-slide' + (i === mfgStep ? ' is-active' : '')}
                    style={{ '--i': String(i) }}
                    aria-hidden={i === mfgStep ? undefined : true}
                  >
                    <h3 className="mfg-slide-title">{s.title}</h3>
                    <div className="mfg-frame">
                      <img
                        className="mfg-frame-img"
                        src={s.img}
                        alt={`الخطوة ${pad2(s.n)}: ${s.title}`}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        draggable={false}
                      />
                    </div>
                    <p className="mfg-slide-desc">{s.desc}</p>
                  </article>
                ))}
              </div>

              <div className="mfg-indicator">
                <span className="mfg-ind-num" key={mfgStep}>
                  {pad2(mfgStep + 1)}
                </span>
                <span className="mfg-ind-rule" aria-hidden="true"></span>
                <span className="mfg-ind-total">{MFG_STEPS.length}</span>
              </div>

              <nav className="mfg-nav" aria-label="التنقل بين خطوات التصنيع">
                {mfgStep === MFG_STEPS.length - 1 ? (
                  <button
                    type="button"
                    className="mfg-nav-btn"
                    onClick={() => setMfgStep(0)}
                    aria-label="العودة إلى الخطوة الأولى"
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
                        aria-label="الخطوة السابقة"
                      >
                        <ArrowUp size={22} strokeWidth={1.8} />
                      </button>
                    )}
                    <button
                      type="button"
                      className="mfg-nav-btn"
                      onClick={goMfgNext}
                      aria-label="الخطوة التالية"
                    >
                      <ArrowDown size={22} strokeWidth={1.8} />
                    </button>
                  </>
                )}
              </nav>
            </div>

            <div className="mfg-values" dir="ltr">
              <div className="mfg-values-head">
                <span className="mfg-values-eyebrow">// CORE VALUE PROPOSITION — DIRECT BRAND SPECIFICATIONS</span>
                <span className="mfg-values-metric">VERIFIED COCONUT CARBON METRICS</span>
              </div>
              <div className="mfg-values-grid">
                {MFG_VALUES.map((v) => (
                  <div className="mfg-value-card" key={v.label}>
                    <v.icon className="mfg-value-icon" size={30} strokeWidth={1.6} aria-hidden="true" />
                    <span className="mfg-value-label">{v.label}</span>
                    <h4 className="mfg-value-title" lang="en">{v.title}</h4>
                    <p className="mfg-value-desc" lang="en">{v.desc}</p>
                    <span className="mfg-value-rule" aria-hidden="true"></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Our Products — Editorial Split-Tier Showcase */}
        <section className="section products-section" id="products">
          <div className="container">
            <header className="pse-header">
              <div className="pse-header-main">
                <p className="pse-eyebrow">
                  <span className="pse-eyebrow-slash">//</span> PRODUCT CLASSIFICATION &amp; VISUAL BURN COMPARISON
                </p>
                <h2 className="pse-title">EDITORIAL SPLIT-TIER SHOWCASE</h2>
                <p className="pse-intro">
                  Every tier is precision-calibrated for its exact thermal mission: from ultra-luxury shisha lounges requiring pure white ash and zero odor contamination, to high-throughput commercial venues optimizing hourly heat retention, and bespoke OEM client custom formulations.
                </p>
              </div>
              <div className="pse-header-aside">
                <div className="pse-header-badges">
                  <span className="pse-head-pill pse-head-pill--green">
                    <span className="pill-dot dot-green"></span>
                    ASTM AUDITED
                  </span>
                  <span className="pse-head-pill pse-head-pill--red">
                    <span className="pill-dot dot-red"></span>
                    DIRECT EXTRUSION
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
                        TIER 01: ULTRA-PREMIUM
                      </span>
                      <span className="pse-chip">
                        <Star size={12} className="pse-chip-icon" />
                        LUXURY SHISHA LOUNGES &amp; BLENDERS
                      </span>
                    </div>
                    <div className="pse-ash-swatch">
                      <div className="ash-swatch-box swatch-white"></div>
                      <div className="ash-swatch-info">
                        <span className="ash-swatch-title">VISUAL ASH SWATCH: SNOW-WHITE</span>
                        <span className="ash-swatch-desc">Residual gravimetric ash &lt; 2.0% • Zero carbon black residue</span>
                      </div>
                      <div className="ash-swatch-metric">&lt; 2.0% ASH</div>
                    </div>
                  </div>
                </div>

                <div className="pse-body">
                  <div className="pse-meta">
                    <span className="pse-meta-code">[SKU-CS-PRO • 100% VIRGIN COCONUT]</span>
                    <span className="pse-meta-tag tag-green">
                      <Leaf size={13} />
                      <span>100% TREE-FREE BIOMASS</span>
                    </span>
                  </div>

                  <h3 className="pse-name">COCO SHEESH ™ ULTRA-PREMIUM</h3>

                  <p className="pse-desc">
                    Engineered exclusively for premium shisha lounges, specialty retailers, and master blenders. Features micro-sifted coconut carbon providing prolonged thermal stability, zero flavor contamination, and snow-white residual ash.
                  </p>

                  <div className="pse-stats">
                    <div className="pse-stat pse-stat--clock">
                      <div className="pse-stat-head">
                        <Clock size={16} />
                        <span className="pse-stat-label">BURN CLOCK</span>
                      </div>
                      <span className="pse-stat-value">150–180m</span>
                    </div>
                    <div className="pse-stat pse-stat--calorific">
                      <div className="pse-stat-head">
                        <Flame size={16} className="text-fire" />
                        <span className="pse-stat-label">CALORIFIC</span>
                      </div>
                      <span className="pse-stat-value">&gt;7,600 kcal</span>
                    </div>
                    <div className="pse-stat pse-stat--purity">
                      <div className="pse-stat-head">
                        <Leaf size={16} className="text-green" />
                        <span className="pse-stat-label">PURITY</span>
                      </div>
                      <span className="pse-stat-value text-green">100% PURE</span>
                    </div>
                  </div>


                </div>
              </article>

              {/* Product 2: TIER 02 COMMERCIAL WORKHORSE */}
              <article className="pse pse--right pse--tier2">
                <div className="pse-body">
                  <div className="pse-meta">
                    <span className="pse-meta-code">[SKU-BS-72 • HIGH-EFFICIENCY COMMERCIAL]</span>
                    <span className="pse-meta-tag tag-margin">
                      <DollarSign size={13} />
                      <span>MAXIMUM MARGIN RATIO</span>
                    </span>
                  </div>

                  <h3 className="pse-name">BLACK SHEESH ™ COMMERCIAL</h3>

                  <p className="pse-desc">
                    Standard commercial workhorse supplied in standardized 72-piece carton units. Optimized for high-throughput shisha establishments and commercial wholesalers prioritizing cost-per-hour heat transfer.
                  </p>

                  <div className="pse-stats">
                    <div className="pse-stat pse-stat--clock">
                      <div className="pse-stat-head">
                        <Clock size={16} />
                        <span className="pse-stat-label">BURN CLOCK</span>
                      </div>
                      <span className="pse-stat-value">120–150m</span>
                    </div>
                    <div className="pse-stat pse-stat--calorific">
                      <div className="pse-stat-head">
                        <Flame size={16} className="text-fire" />
                        <span className="pse-stat-label">CALORIFIC</span>
                      </div>
                      <span className="pse-stat-value">7,200–7,400</span>
                    </div>
                    <div className="pse-stat pse-stat--pack">
                      <div className="pse-stat-head">
                        <Box size={16} className="text-fire" />
                        <span className="pse-stat-label">PACK UNIT</span>
                      </div>
                      <span className="pse-stat-value text-fire">72 PCS / 1KG</span>
                    </div>
                  </div>

                  {/* Cost-per-session efficiency metric card */}
                  <div className="pse-metric-box">
                    <div className="pse-metric-box-head">
                      <div className="metric-head-left">
                        <BarChart3 size={15} />
                        <span>COST-PER-SESSION EFFICIENCY METRIC</span>
                      </div>
                      <span className="metric-head-badge">34% SAVINGS / TABLE</span>
                    </div>
                    <p className="pse-metric-box-desc">
                      High density eliminates mid-session coal top-ups. A single 3-cube head delivers steady radiant heat across 2 full hours of operation without bowl cracking.
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
                        TIER 02: COMMERCIAL WORKHORSE
                      </span>
                      <span className="pse-chip">
                        <Store size={12} className="pse-chip-icon" />
                        WHOLESALE &amp; HIGH-TURNOVER VENUES
                      </span>
                    </div>
                    <div className="pse-ash-swatch">
                      <div className="ash-swatch-box swatch-silver"></div>
                      <div className="ash-swatch-info">
                        <span className="ash-swatch-title">VISUAL ASH SWATCH: LIGHT SILVER-GRAY</span>
                        <span className="ash-swatch-desc">Residual gravimetric ash ~2.2% - 2.5% • Cost-optimized thermal run</span>
                      </div>
                      <div className="ash-swatch-metric">2.2 - 2.5% ASH</div>
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
                      TIER 03: OEM CONTRACT MANUFACTURING
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
                        <span className="stage-name">STAGE 01: BLENDING</span>
                        <span className="stage-sub">Precision micro-mesh grading</span>
                      </div>
                    </div>
                    <div className="pse-shot">
                      <img
                        src={productImg4}
                        alt="Stage 02: Die Extrusion Hydraulic Pressing"
                        loading="lazy"
                      />
                      <div className="pse-stage-tag pse-stage-tag--red">
                        <span className="stage-name stage-name--red">STAGE 02: DIE EXTRUSION</span>
                        <span className="stage-sub">Custom geometric dies &amp; molds</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pse-body">
                  <div className="pse-meta">
                    <span className="pse-meta-code">[OEM-PRIVATE-LABEL • BESPOKE CHEMISTRY]</span>
                    <span className="pse-meta-tag tag-oem">
                      <ShieldCheck size={13} />
                      <span>FULL TURNKEY PRIVATE LABEL</span>
                    </span>
                  </div>

                  <h3 className="pse-name">TAILORED FORMULATION &amp; BESPOKE PACKAGING</h3>

                  <p className="pse-desc">
                    Full OEM precision customization. Calibrate chemical percentages and packaging formats to match your specific market regulations, humidity tolerances, and margin targets.
                  </p>

                  <div className="pse-stats">
                    <div className="pse-stat pse-stat--shapes">
                      <div className="pse-stat-head">
                        <Compass size={16} className="text-fire" />
                        <span className="pse-stat-label">CUT SHAPES</span>
                      </div>
                      <span className="pse-stat-value">22/25/26/Hex</span>
                    </div>
                    <div className="pse-stat pse-stat--carbon">
                      <div className="pse-stat-head">
                        <FlaskConical size={16} />
                        <span className="pse-stat-label">CARBON RATIO</span>
                      </div>
                      <span className="pse-stat-value">75%–85%+</span>
                    </div>
                    <div className="pse-stat pse-stat--minrun">
                      <div className="pse-stat-head">
                        <Box size={16} className="text-green" />
                        <span className="pse-stat-label">MIN. RUN</span>
                      </div>
                      <span className="pse-stat-value text-green">1x 20ft FCL</span>
                    </div>
                  </div>

                  {/* Tailored Chemical & Physical Composition Box */}
                  <div className="pse-comp-box">
                    <div className="pse-comp-head">
                      <SlidersHorizontal size={14} />
                      <span>TAILORED CHEMICAL &amp; PHYSICAL COMPOSITION</span>
                    </div>
                    <div className="pse-comp-grid">
                      <div className="comp-grid-item">
                        <span className="comp-label">Fixed Carbon:</span>
                        <strong className="comp-val">75% - 85%+</strong>
                      </div>
                      <div className="comp-grid-item">
                        <span className="comp-label">Ash Threshold:</span>
                        <strong className="comp-val">1.8% - 3.0%</strong>
                      </div>
                      <div className="comp-grid-item">
                        <span className="comp-label">Moisture/Volatiles:</span>
                        <strong className="comp-val">Custom Climatized</strong>
                      </div>
                      <div className="comp-grid-item">
                        <span className="comp-label">Cuts:</span>
                        <strong className="comp-val">22/25/26mm / Hex</strong>
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
        <section className="section packaging-section" id="packaging" dir="ltr">
          <div className="container">
            {/* Header */}
            <div className="pkg-header">
              <div className="pkg-header-left">
                <p className="pkg-eyebrow">// PACKAGING &amp; MASTER CASE ARCHITECTURE</p>
                <h2 className="pkg-title">RETAIL &amp; WHOLESALE PACKAGING SPECIFICATIONS</h2>
              </div>
              <div className="pkg-header-right">
                <p className="pkg-header-desc">
                  Factory-calibrated packaging solutions engineered for long-distance maritime freight, maximum moisture protection, and global retail barcode compliance.
                </p>
              </div>
            </div>

            {/* Main Showcase Card */}
            <div className="pkg-card">
              {/* Top Sub-Bar */}
              <div className="pkg-card-topbar">
                <div className="pkg-topbar-left">
                  <span className="pkg-tag-badge">OFFICIAL PRODUCTION PACKAGING</span>
                  <span className="pkg-sku-code">[SKU-BS-72 / PRO-LINE]</span>
                  <span className="pkg-spec-origin">
                    <CheckCircle2 size={13} className="text-green" />
                    <span>Direct Export Spec • Made in Indonesia</span>
                  </span>
                </div>
                <div className="pkg-topbar-right">
                  <span className="pkg-status-dot"></span>
                  <span className="pkg-status-text">FACTORY DIRECT CALIBRATED</span>
                </div>
              </div>

              {/* Card Body (2 Columns) */}
              <div className="pkg-card-body">
                {/* Left Media Box */}
                <div className="pkg-media-col">
                  <div className="pkg-img-wrap">
                    <img
                      src={productImg1}
                      alt="Coco Sheesh 72 PCS Standard 1 KG Official Packaging Box"
                      className="pkg-box-img"
                      loading="lazy"
                    />
                    <div className="pkg-img-overlay">
                      <div className="pkg-overlay-left">
                        <Box size={14} />
                        <span>72 PCS • 1 KG NET</span>
                      </div>
                      <div className="pkg-overlay-right">
                        <span>EAN/UPC BARCODE READY</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Specs Col */}
                <div className="pkg-info-col">
                  <span className="pkg-info-eyebrow">// RETAIL &amp; WHOLESALE MASTER UNIT SPECIFICATION</span>
                  <h3 className="pkg-info-title">COCO SHEESH ™ 72 PCS STANDARD 1 KG MASTER PACK</h3>
                  <p className="pkg-info-desc">
                    The global benchmark format for shisha lounges and specialty distributors. Precision 25×25×25 mm cubic cut geometry manufactured from 100% natural reclaimed coconut charcoal with high-retention cubic density and odorless burn characteristics.
                  </p>

                  {/* 4 Metric Boxes */}
                  <div className="pkg-metrics-grid">
                    <div className="pkg-metric-item">
                      <span className="pkg-m-label">BOX COUNT</span>
                      <strong className="pkg-m-val">72 CUBES</strong>
                      <span className="pkg-m-sub">Uniform 25mm</span>
                    </div>
                    <div className="pkg-metric-item">
                      <span className="pkg-m-label">NET WEIGHT</span>
                      <strong className="pkg-m-val">1.00 KG</strong>
                      <span className="pkg-m-sub">2.205 lbs</span>
                    </div>
                    <div className="pkg-metric-item">
                      <span className="pkg-m-label">HEAT YIELD</span>
                      <strong className="pkg-m-val">&gt; 7,400</strong>
                      <span className="pkg-m-sub">kcal/kg Calorific</span>
                    </div>
                    <div className="pkg-metric-item">
                      <span className="pkg-m-label">ASH RESIDUAL</span>
                      <strong className="pkg-m-val">&lt; 2.2%</strong>
                      <span className="pkg-m-sub">White Residual</span>
                    </div>
                  </div>

                  {/* 3 Checklist Specs */}
                  <div className="pkg-checklist">
                    <div className="pkg-check-row">
                      <div className="pkg-check-label">
                        <CheckCircle2 size={15} className="pkg-check-icon" />
                        <span>Outer Carton Configuration:</span>
                      </div>
                      <span className="pkg-check-val">20 × 1 KG Boxes per Master (20 KG Net)</span>
                    </div>
                    <div className="pkg-check-row">
                      <div className="pkg-check-label">
                        <CheckCircle2 size={15} className="pkg-check-icon" />
                        <span>Inner Protection:</span>
                      </div>
                      <span className="pkg-check-val">Heat-Sealed Moisture Barrier Foil Inlay</span>
                    </div>
                    <div className="pkg-check-row">
                      <div className="pkg-check-label">
                        <CheckCircle2 size={15} className="pkg-check-icon" />
                        <span>20ft FCL Capacity:</span>
                      </div>
                      <span className="pkg-check-val">1,000 Master Cartons (~20 Metric Tons)</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pkg-actions">
                    <a href="#form-section" className="btn pkg-btn-primary">
                      <Box size={16} />
                      <span>ORDER 72 PCS 1 KG PRODUCTION RUN</span>
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
                <p className="pcg-eyebrow">// GEOMETRIC DIMENSIONS &amp; FORM FACTORS</p>
                <h2 className="pcg-title">PRECISION CUT GEOMETRIES</h2>
              </div>
              <div className="pcg-header-right">
                <p className="pcg-header-desc">
                  Custom calibrated mechanical cutters calibrate each edge to within ±0.3mm
                  tolerance, guaranteeing uniform airflow in all standard heat management
                  devices (HMDs).
                </p>
              </div>
            </div>

            <div
              className="touch-scroll-viewport"
              ref={sizesScroll.scrollerRef}
            >
              <div className="pcg-grid touch-scroll-track">
              {/* 22mm */}
              <div className="pcg-card">
                <div className="pcg-card-top">
                  <h3 className="pcg-dim"><span className="pcg-dim-num">22 × 22 × 22 mm</span></h3>
                  <div className="pcg-name">STANDARD CUBE</div>
                  <p className="pcg-desc">Rapid heat ignition format. Ideal for classic foil setups and smaller bowls requiring lower localized radiant heat.</p>
                </div>
                <div className="pcg-card-footer">
                  <span className="pcg-pack-label">PACK COUNT</span>
                  <span className="pcg-pack-val">96 PCS / KG</span>
                </div>
              </div>

              {/* 25mm POPULAR */}
              <div className="pcg-card pcg-card--popular">
                <div className="pcg-card-top">
                  <h3 className="pcg-dim">
                    <span className="pcg-dim-num">25 × 25 × 25 mm</span>
                    <span className="pcg-popular-badge">POPULAR</span>
                  </h3>
                  <div className="pcg-name">GLOBAL INDUSTRY STANDARD</div>
                  <p className="pcg-desc">The benchmark size globally. Perfectly fits Kaloud Lotus and contemporary aluminum HMD enclosures with minimal rotation.</p>
                </div>
                <div className="pcg-card-footer">
                  <span className="pcg-pack-label">PACK COUNT</span>
                  <span className="pcg-pack-val">72 PCS / KG</span>
                </div>
              </div>

              {/* 26mm */}
              <div className="pcg-card">
                <div className="pcg-card-top">
                  <h3 className="pcg-dim"><span className="pcg-dim-num">26 × 26 × 26 mm</span></h3>
                  <div className="pcg-name">MAX-THERMAL CUBE</div>
                  <p className="pcg-desc">Extended mass for prolonged sessions. Retains peak core temperature up to 180 minutes without frequent replenishment.</p>
                </div>
                <div className="pcg-card-footer">
                  <span className="pcg-pack-label">PACK COUNT</span>
                  <span className="pcg-pack-val">64 PCS / KG</span>
                </div>
              </div>

              {/* Hexagonal */}
              <div className="pcg-card pcg-card--hex">
                <div className="pcg-card-top">
                  <h3 className="pcg-dim"><span className="pcg-dim-num pcg-dim-hex">Hexagonal Format</span></h3>
                  <div className="pcg-name">COMMERCIAL CYLINDER</div>
                  <p className="pcg-desc">Center-bored hexagonal rod design providing maximum cross-sectional airflow for sustained high-temperature operations.</p>
                </div>
                <div className="pcg-card-footer">
                  <span className="pcg-pack-label">LENGTH / ∅</span>
                  <span className="pcg-pack-val">CUSTOM CUT</span>
                </div>
              </div>
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
                <p className="oem-eyebrow">// PRIVATE LABEL MANUFACTURING [OEM / CONTRACT]</p>
                <h2 className="oem-title">FULL TURNKEY OEM &amp; WHITE-LABEL PACKAGING</h2>
                <p className="oem-body">
                  We manufacture on behalf of global shisha brands and retail groups. From customized inner heat-sealed
                  moisture barrier foil pouches to heavy-duty outer UV-varnished cartons, our facility manages full end-to-end
                  packaging production according to target jurisdiction labeling laws.
                </p>
              </div>
              <div className="oem-banner-right">
                <p className="oem-minimums-label">// CONTRACT MINIMUMS</p>
                <div className="oem-fcl">
                  <span className="oem-fcl-value">1 × 20ft FCL</span>
                </div>
                <p className="oem-fcl-note">
                  Approx. 18-20 Metric Tons depending on cube dimension &amp; pallet load specifications.
                </p>
                <a href="#form-section" className="btn oem-cta-btn">
                  LAUNCH OEM INQUIRY
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Active Export Shipping Lanes & World Map (Figma Recreation) */}
        <section className="section shipping-section" id="shipping" dir="ltr">
          <div className="container">
            {/* Header */}
            <div className="shipping-header">
              <div className="shipping-header-left">
                <p className="shipping-eyebrow">
                  <span className="shipping-slash">//</span> INTERNATIONAL SUPPLY CHAIN &amp; MARITIME CORRIDORS
                </p>
                <h2 className="shipping-title">ACTIVE EXPORT SHIPPING LANES</h2>
              </div>
              <div className="shipping-header-right">
                <div className="freight-modes-badge">
                  <span className="freight-label">FREIGHT MODES</span>
                  <span className="freight-modes">FCL / LCL BULK • EXW • FOB • CIF</span>
                </div>
                <p className="shipping-header-desc">
                  Direct containerized transport with verified IMO/UN 3175 non-DG maritime safety certificates and automated shipping line dispatch.
                </p>
              </div>
            </div>

            {/* 4 KPI Strip */}
            <div className="shipping-kpi-grid">
              <div className="shipping-kpi-card">
                <span className="kpi-label">GLOBAL TRANSIT LANES</span>
                <div className="kpi-value num-latin">7 PRIMARY HUBS</div>
                <span className="kpi-desc">US, MENA, Levant &amp; SE Asia</span>
              </div>
              <div className="shipping-kpi-card">
                <span className="kpi-label">SCHEDULED OCEAN FREIGHT</span>
                <div className="kpi-value num-latin">14 - 28 DAYS</div>
                <span className="kpi-desc">Port-to-port verified schedule</span>
              </div>
              <div className="shipping-kpi-card">
                <span className="kpi-label">CARGO CLASSIFICATION</span>
                <div className="kpi-value num-latin">NON-DG / SIRC</div>
                <span className="kpi-desc">UN 3175 Self-Heating Safe</span>
              </div>
              <div className="shipping-kpi-card">
                <span className="kpi-label">ANNUAL EXPORT QUOTA</span>
                <div className="kpi-value num-latin">840+ MT</div>
                <span className="kpi-desc">100% On-time FCL dispatch</span>
              </div>
            </div>

            {/* World Map Display Card */}
            <div className="shipping-map-display">
              <div className="map-top-bar">
                <div className="map-top-title">
                  <span className="pill-dot dot-peach"></span>
                  <span>GLOBAL EXPORT CORRIDORS &amp; ACTIVE DESTINATION MAP</span>
                </div>
                <div className="map-datum-pill num-latin">
                  GEODETIC DATUM: WGS-84 / HIGH-SEAS TELEMETRY
                </div>
              </div>

              <div className="map-legend-bar">
                <div className="legend-item">
                  <span className="legend-circle legend-circle--origin"></span>
                  <span>TURKEY (EXTRUSION ORIGIN)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-circle legend-circle--dest"></span>
                  <span>PRIMARY EXPORT DESTINATIONS</span>
                </div>
                <div className="legend-item">
                  <span className="legend-circle legend-circle--inactive"></span>
                  <span>INACTIVE / BUFFER TERRITORIES</span>
                </div>
              </div>

              <div className="map-canvas-container">
                {/* Floating Dispatch Telemetry Box */}
                <div className="map-telemetry-box num-latin">
                  <div className="telemetry-title">COCO SHEESH MARITIME DISPATCH TELEMETRY</div>
                  <div className="telemetry-row">LANES: US, TURKEY, GCC (KSA &amp; KUWAIT), LEVANT, YEMEN, PH</div>
                  <div className="telemetry-row">CARGO SAFETY: IMO / UN 3175 COMPLIANT (NON-DG)</div>
                </div>

                {/* Stylized Faceted World Map */}
                <svg viewBox="0 0 1000 480" className="shipping-map-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Graticule background grid lines */}
                  <g stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.8">
                    <line x1="0" y1="120" x2="1000" y2="120" />
                    <line x1="0" y1="240" x2="1000" y2="240" />
                    <line x1="0" y1="360" x2="1000" y2="360" />
                    <line x1="250" y1="0" x2="250" y2="480" />
                    <line x1="500" y1="0" x2="500" y2="480" />
                    <line x1="750" y1="0" x2="750" y2="480" />
                  </g>

                  {/* Continents (Dark Polygon Geometries) */}
                  {/* North America */}
                  <polygon points="120,80 180,60 270,90 290,140 230,190 150,170 110,130" fill="#13151c" stroke="rgba(255,255,255,0.06)" />
                  <polygon points="100,140 160,150 200,210 170,240 120,200" fill="#151720" stroke="rgba(255,255,255,0.06)" />
                  
                  {/* US Highlighted Territory (Active Destination) */}
                  <polygon points="155,245 220,230 305,250 295,295 240,320 170,300" fill="#dc2626" fillOpacity="0.45" stroke="#ef4444" strokeWidth="1.6" filter="drop-shadow(0 0 8px rgba(239, 68, 68, 0.5))" />

                  {/* South America */}
                  <polygon points="245,300 285,320 335,370 290,440 245,410 230,340" fill="#10131a" stroke="rgba(255,255,255,0.06)" />
                  <polygon points="195,305 225,325 210,345 190,325" fill="#0d0f14" stroke="rgba(255,255,255,0.04)" />

                  {/* Europe & Scandinavia */}
                  <polygon points="435,100 495,85 530,120 480,160 430,140" fill="#151822" stroke="rgba(255,255,255,0.06)" />
                  <polygon points="460,165 520,155 540,190 485,200 450,185" fill="#171a25" stroke="rgba(255,255,255,0.06)" />

                  {/* Turkey (Origin Highlight) */}
                  <polygon points="510,240 558,235 560,265 515,268" fill="#ef4444" fillOpacity="0.85" stroke="#fca5a5" strokeWidth="1.6" filter="drop-shadow(0 0 10px rgba(239, 68, 68, 0.8))" />

                  {/* Levant & Saudi Arabia (Active Destination) */}
                  <polygon points="505,268 535,265 540,290 510,290" fill="#ea580c" fillOpacity="0.75" stroke="#f97316" strokeWidth="1.4" />
                  <polygon points="535,275 585,270 592,345 540,345 528,300" fill="#dc2626" fillOpacity="0.55" stroke="#ef4444" strokeWidth="1.4" filter="drop-shadow(0 0 6px rgba(234, 88, 12, 0.4))" />
                  
                  {/* Yemen (Active Destination) */}
                  <polygon points="538,340 580,340 568,368 535,360" fill="#ea580c" fillOpacity="0.75" stroke="#f97316" strokeWidth="1.4" />

                  {/* Africa */}
                  <polygon points="430,210 500,215 525,290 480,410 430,360 410,270" fill="#12141c" stroke="rgba(255,255,255,0.06)" />
                  <polygon points="485,290 535,320 505,370 475,340" fill="#101218" stroke="rgba(255,255,255,0.05)" />

                  {/* Asia / Russia */}
                  <polygon points="545,80 670,75 790,110 750,210 610,190 540,140" fill="#141720" stroke="rgba(255,255,255,0.06)" />
                  <polygon points="615,195 720,210 770,270 680,300 600,240" fill="#13151d" stroke="rgba(255,255,255,0.06)" />
                  <polygon points="610,250 675,270 645,340 600,310" fill="#11131a" stroke="rgba(255,255,255,0.05)" />

                  {/* Philippines (Active Destination) */}
                  <polygon points="730,315 760,325 755,365 725,350" fill="#ea580c" fillOpacity="0.75" stroke="#f97316" strokeWidth="1.4" filter="drop-shadow(0 0 6px rgba(234, 88, 12, 0.5))" />

                  {/* Australia & Oceania */}
                  <polygon points="705,360 765,360 840,410 770,440 705,400" fill="#11131a" stroke="rgba(255,255,255,0.06)" />

                  {/* Shipping Corridors Arcs (Curved Red Dashed Lines) */}
                  {/* Turkey -> United States */}
                  <path d="M 530 250 Q 370 140 230 270" stroke="#ef4444" strokeWidth="2" strokeDasharray="5 5" fill="none" filter="drop-shadow(0 0 4px rgba(239, 68, 68, 0.6))" />
                  
                  {/* Turkey -> Kuwait & Saudi */}
                  <path d="M 535 255 Q 560 260 565 285" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="4 4" fill="none" />
                  
                  {/* Turkey -> Lebanon/Palestine */}
                  <path d="M 530 255 L 522 272" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="3 3" fill="none" />

                  {/* Saudi -> Yemen */}
                  <path d="M 555 310 L 555 348" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="4 4" fill="none" />

                  {/* Saudi/Middle East -> Philippines */}
                  <path d="M 570 315 Q 655 310 740 338" stroke="#ef4444" strokeWidth="2" strokeDasharray="5 5" fill="none" filter="drop-shadow(0 0 4px rgba(239, 68, 68, 0.6))" />

                  {/* Target Nodes & Pin Markers */}
                  {/* 1. US Pin */}
                  <circle cx="230" cy="270" r="5" fill="#ffffff" stroke="#ef4444" strokeWidth="2.5" />
                  <circle cx="230" cy="270" r="9" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="1" fill="none" />

                  {/* 2. Turkey Origin Star Pin */}
                  <circle cx="532" cy="250" r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="532" cy="250" r="11" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1" strokeDasharray="2 2" fill="none" />

                  {/* 3. Lebanon/Palestine */}
                  <circle cx="522" cy="272" r="4" fill="#ffffff" stroke="#ef4444" strokeWidth="1.8" />

                  {/* 4. Kuwait */}
                  <circle cx="560" cy="285" r="4" fill="#ffffff" stroke="#ef4444" strokeWidth="1.8" />

                  {/* 5. Saudi Arabia */}
                  <circle cx="555" cy="310" r="4.5" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />

                  {/* 6. Yemen */}
                  <circle cx="555" cy="350" r="4.5" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />

                  {/* 7. Philippines */}
                  <circle cx="740" cy="338" r="5" fill="#ffffff" stroke="#ef4444" strokeWidth="2.5" />
                  <circle cx="740" cy="338" r="9" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="1" fill="none" />

                  {/* Marker Labels (Exact Text from Reference) */}
                  {/* US Label */}
                  <text x="230" y="246" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="Outfit, sans-serif" textAnchor="middle">
                    UNITED STATES (HQ)
                  </text>
                  <text x="230" y="258" fill="#cbd5e1" fontSize="7" fontWeight="500" fontFamily="'Cascadia Mono', monospace" textAnchor="middle">
                    PLANO, TX • HOUSTON PORT
                  </text>

                  {/* Turkey Origin Label */}
                  <text x="548" y="226" fill="#ffffff" fontSize="11" fontWeight="800" fontFamily="Outfit, sans-serif">
                    ★ TURKEY PLANT ORIGIN
                  </text>
                  <text x="548" y="238" fill="#fca5a5" fontSize="7" fontWeight="500" fontFamily="'Cascadia Mono', monospace">
                    MERSIN &amp; ISTANBUL TERMINALS
                  </text>

                  {/* Lebanon & Palestine Label */}
                  <text x="440" y="274" fill="#ffffff" fontSize="8" fontWeight="700" fontFamily="Outfit, sans-serif" textAnchor="end">
                    LEBANON &amp; PALESTINE
                  </text>
                  <text x="440" y="284" fill="#94a3b8" fontSize="6.5" fontWeight="500" fontFamily="'Cascadia Mono', monospace" textAnchor="end">
                    BEIRUT DIST. HUB
                  </text>

                  {/* Kuwait Label */}
                  <text x="618" y="285" fill="#ffffff" fontSize="8" fontWeight="700" fontFamily="Outfit, sans-serif">
                    KUWAIT
                  </text>
                  <text x="618" y="295" fill="#94a3b8" fontSize="6.5" fontWeight="500" fontFamily="'Cascadia Mono', monospace">
                    SHUWAIKH PORT FCL
                  </text>

                  {/* Saudi Arabia Label */}
                  <text x="615" y="318" fill="#ffffff" fontSize="8" fontWeight="700" fontFamily="Outfit, sans-serif">
                    SAUDI ARABIA
                  </text>
                  <text x="615" y="328" fill="#94a3b8" fontSize="6.5" fontWeight="500" fontFamily="'Cascadia Mono', monospace">
                    DAMMAM &amp; JEDDAH CORRIDORS
                  </text>

                  {/* Yemen Label */}
                  <text x="566" y="354" fill="#ffffff" fontSize="8" fontWeight="700" fontFamily="Outfit, sans-serif">
                    YEMEN
                  </text>
                  <text x="566" y="364" fill="#94a3b8" fontSize="6.5" fontWeight="500" fontFamily="'Cascadia Mono', monospace">
                    ADEN &amp; HODEIDAH CORRIDOR
                  </text>

                  {/* Philippines Label */}
                  <text x="740" y="322" fill="#ffffff" fontSize="9" fontWeight="700" fontFamily="Outfit, sans-serif" textAnchor="middle">
                    PHILIPPINES
                  </text>
                  <text x="740" y="374" fill="#cbd5e1" fontSize="7" fontWeight="500" fontFamily="'Cascadia Mono', monospace" textAnchor="middle">
                    MANILA SOURCING TERMINAL
                  </text>
                </svg>

                {/* Bottom pill on map */}
                <div className="map-bottom-pill">
                  <span className="pill-dot dot-peach"></span>
                  <span>8 ACTIVE DESTINATIONS | ZERO DEMURRAGE CONTRACTS</span>
                </div>
              </div>
            </div>

            {/* 8 Hub Cards Grid (Screenshot 5 Recreation) */}
            <div
              className="touch-scroll-viewport"
              ref={hubsScroll.scrollerRef}
            >
              <div className="shipping-hubs-grid touch-scroll-track">
              {/* Card 1: United States (HQ) */}
              <div className="hub-card hub-card--featured">
                <div className="hub-card-header">
                  <span className="hub-region">UNITED STATES (HQ)</span>
                  <span className="hub-badge">HUB 01</span>
                </div>
                <h4 className="hub-title">Plano, Texas</h4>
                <p className="hub-desc">
                  Domestic distribution depot servicing North America with buffered inventory for rapid LTL/FTL replenishment across all 50 states.
                </p>
                <div className="hub-specs">
                  <div className="hub-spec-row">
                    <span className="spec-name">Incoterms:</span>
                    <strong className="spec-val num-latin">DDP / FOB / EXW</strong>
                  </div>
                  <div className="hub-spec-row">
                    <span className="spec-name">Port of Entry:</span>
                    <strong className="spec-val num-latin">Houston / Long Beach</strong>
                  </div>
                  <div className="hub-spec-row">
                    <span className="spec-name">Allocation:</span>
                    <strong className="spec-val num-latin">Weekly Replenishment</strong>
                  </div>
                </div>
              </div>

              {/* Card 2: Turkey Origin */}
              <div className="hub-card">
                <div className="hub-card-header">
                  <span className="hub-region">TURKEY (EUROPE/ASIA)</span>
                  <span className="hub-badge hub-badge--origin">ORIGIN</span>
                </div>
                <h4 className="hub-title">Extrusion Plant &amp; Tech Hub</h4>
                <p className="hub-desc">
                  Heavy hydraulic extrusion machinery engineering, specialized die tooling, and European starch quality lab center.
                </p>
                <div className="hub-specs">
                  <div className="hub-spec-row">
                    <span className="spec-name">Incoterms:</span>
                    <strong className="spec-val num-latin">FOB / CIF / EXW</strong>
                  </div>
                  <div className="hub-spec-row">
                    <span className="spec-name">Port of Departure:</span>
                    <strong className="spec-val num-latin">Mersin / Istanbul</strong>
                  </div>
                  <div className="hub-spec-row">
                    <span className="spec-name">Capacity:</span>
                    <strong className="spec-val num-latin">70+ MT Monthly</strong>
                  </div>
                </div>
              </div>

              {/* Card 3: GCC */}
              <div className="hub-card">
                <div className="hub-card-header">
                  <span className="hub-region">MIDDLE EAST (GCC)</span>
                  <span className="hub-badge">HUB 02</span>
                </div>
                <h4 className="hub-title">Kuwait &amp; Saudi Arabia</h4>
                <p className="hub-desc">
                  Direct regular FCL container arrivals servicing Gulf shisha lounge networks, wholesale distribution chains, and retail franchises.
                </p>
                <div className="hub-specs">
                  <div className="hub-spec-row">
                    <span className="spec-name">Incoterms:</span>
                    <strong className="spec-val num-latin">CIF / FOB</strong>
                  </div>
                  <div className="hub-spec-row">
                    <span className="spec-name">Discharge Ports:</span>
                    <strong className="spec-val num-latin">Shuwaikh / Dammam / Jeddah</strong>
                  </div>
                  <div className="hub-spec-row">
                    <span className="spec-name">Transit Window:</span>
                    <strong className="spec-val num-latin">14 - 18 Days</strong>
                  </div>
                </div>
              </div>

              {/* Card 4: Levant */}
              <div className="hub-card">
                <div className="hub-card-header">
                  <span className="hub-region">LEVANT REGION</span>
                  <span className="hub-badge">HUB 03</span>
                </div>
                <h4 className="hub-title">Lebanon &amp; Palestine</h4>
                <p className="hub-desc">
                  Established regional master distributor network with high-frequency container rotation and bonded customs clearance.
                </p>
                <div className="hub-specs">
                  <div className="hub-spec-row">
                    <span className="spec-name">Incoterms:</span>
                    <strong className="spec-val num-latin">CIF / CPT</strong>
                  </div>
                  <div className="hub-spec-row">
                    <span className="spec-name">Discharge Ports:</span>
                    <strong className="spec-val num-latin">Beirut / Regional Depots</strong>
                  </div>
                  <div className="hub-spec-row">
                    <span className="spec-name">Transit Window:</span>
                    <strong className="spec-val num-latin">10 - 14 Days</strong>
                  </div>
                </div>
              </div>

              {/* Card 5: Yemen */}
              <div className="hub-card">
                <div className="hub-card-header">
                  <span className="hub-region">RED SEA / GULF OF ADEN</span>
                  <span className="hub-badge">HUB 04</span>
                </div>
                <h4 className="hub-title">Yemen Trade Corridor</h4>
                <p className="hub-desc">
                  Dedicated maritime break-bulk and container pathways with specialized cargo manifest approval and heat-safety verification.
                </p>
                <div className="hub-specs">
                  <div className="hub-spec-row">
                    <span className="spec-name">Incoterms:</span>
                    <strong className="spec-val num-latin">CIF / FOB</strong>
                  </div>
                  <div className="hub-spec-row">
                    <span className="spec-name">Discharge Ports:</span>
                    <strong className="spec-val num-latin">Aden / Hodeidah Entry</strong>
                  </div>
                  <div className="hub-spec-row">
                    <span className="spec-name">Compliance:</span>
                    <strong className="spec-val num-latin">UN 3175 Certified</strong>
                  </div>
                </div>
              </div>

              {/* Card 6: Southeast Asia */}
              <div className="hub-card">
                <div className="hub-card-header">
                  <span className="hub-region">SOUTHEAST ASIA</span>
                  <span className="hub-badge">HUB 05</span>
                </div>
                <h4 className="hub-title">Philippines &amp; Maritime</h4>
                <p className="hub-desc">
                  Primary coconut feedstock sourcing, inter-island consolidation logistics, and deep-sea transit corridors to global terminals.
                </p>
                <div className="hub-specs">
                  <div className="hub-spec-row">
                    <span className="spec-name">Incoterms:</span>
                    <strong className="spec-val num-latin">FOB / EXW / CIF</strong>
                  </div>
                  <div className="hub-spec-row">
                    <span className="spec-name">Hub Ports:</span>
                    <strong className="spec-val num-latin">Manila / Cebu / Davao</strong>
                  </div>
                  <div className="hub-spec-row">
                    <span className="spec-name">Raw Material:</span>
                    <strong className="spec-val num-latin">100% Mature Shells</strong>
                  </div>
                </div>
              </div>

              {/* Card 7: Direct FCL */}
              <div className="hub-card">
                <div className="hub-card-header">
                  <span className="hub-region">NORTH AMERICA / EMEA</span>
                  <span className="hub-badge">GLOBAL</span>
                </div>
                <h4 className="hub-title">Direct FCL Contracts</h4>
                <p className="hub-desc">
                  Contract shipping agreements with Maersk, MSC, and CMA CGM guaranteeing reserved container slots during peak demand.
                </p>
                <div className="hub-specs">
                  <div className="hub-spec-row">
                    <span className="spec-name">Standard Terms:</span>
                    <strong className="spec-val num-latin">Incoterms 2020 Standard</strong>
                  </div>
                  <div className="hub-spec-row">
                    <span className="spec-name">Documentation:</span>
                    <strong className="spec-val num-latin">Bill of Lading, COA, MSDS</strong>
                  </div>
                  <div className="hub-spec-row">
                    <span className="spec-name">Insurance:</span>
                    <strong className="spec-val num-latin">Full Marine Cargo Policy</strong>
                  </div>
                </div>
              </div>

              {/* Card 8: Expedite Lane (Button omitted per instructions) */}
              <div className="hub-card hub-card--expedite">
                <span className="expedite-eyebrow">// EXPEDITE YOUR LANE</span>
                <h4 className="hub-title">Custom Route Dispatch</h4>
                <p className="hub-desc">
                  Need custom port routing or blended container allocations? Our international logistics desk issues quotes within 24 hours.
                </p>
              </div>
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
                  <h5 className="trust-title">ENVIRONMENTAL AUTHORITY APPROVED</h5>
                  <p className="trust-desc">Clean manufacturing compliance without harmful pyrolytic emissions.</p>
                </div>
              </div>

              <div className="shipping-trust-item">
                <div className="trust-icon-box">
                  <ShieldCheck size={22} />
                </div>
                <div className="trust-content">
                  <h5 className="trust-title">CHEMISTRY ADMINISTRATION COMPLIANT</h5>
                  <p className="trust-desc">Certified non-hazardous formulation; fully documented with current SDS/MSDS.</p>
                </div>
              </div>

              <div className="shipping-trust-item">
                <div className="trust-icon-box">
                  <Anchor size={22} />
                </div>
                <div className="trust-content">
                  <h5 className="trust-title">NON-DG CARGO CLASSIFICATION</h5>
                  <p className="trust-desc">Self-heating test passed (UN 3175 / IMO regulations for maritime safety).</p>
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
                  <span className="order-loc-tag">// MANUFACTURING PLANT &amp; EXPORT DISPATCH HUB</span>
                  <h2 className="order-loc-title">FACTORY LOCATION</h2>
                  <p className="order-loc-desc">
                    Our Karouka Industrial facility is where every Coco Sheesh product is pressed, graded, and dispatched — serving international B2B clients with direct factory-to-container export logistics.
                  </p>
                </div>

                <div className="order-loc-card">
                  <div className="order-loc-map-wrapper">
                    <div className="order-loc-badge">
                      <span className="badge-dot" aria-hidden="true" />
                      <span>ACTIVE PRODUCTION &amp; EXPORT FACILITY</span>
                    </div>
                    <iframe
                      src="https://maps.google.com/maps?q=30.2911167,31.8124256&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      className="order-loc-map-iframe"
                      title="Coco Sheesh Factory Location Map"
                      loading="lazy"
                      allowFullScreen
                    />
                  </div>

                  <div className="order-loc-card-body">
                    <div className="order-loc-card-top">
                      <h3 className="order-loc-company">COCO SHEESH LLC</h3>
                      <a
                        href="https://www.google.com/maps/place/30%C2%B017'28.0%22N+31%C2%B048'44.7%22E/@30.2900938,31.6958655,12.33z/data=!4m4!3m3!8m2!3d30.2911167!4d31.8124256?hl=en&entry=ttu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-open-directions"
                        id="btn-open-directions"
                      >
                        <Navigation size={14} />
                        <span>OPEN DIRECTIONS</span>
                      </a>
                    </div>

                    <div className="order-loc-address">
                      <MapPin size={16} className="loc-accent-icon" />
                      <span>Karouka Industrial Zone, El-Obour City, Cairo Governorate, Egypt</span>
                    </div>

                    <div className="order-loc-contacts">
                      <div className="order-loc-contact-item">
                        <Phone size={14} className="loc-accent-icon" />
                        <span>Direct US: 210-840-3535</span>
                      </div>
                      <div className="order-loc-contact-item">
                        <Mail size={14} className="loc-accent-icon" />
                        <a href="mailto:b2b@cocosheesh.com">b2b@cocosheesh.com</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="order-loc-dock-bar">
                  <Clock size={16} className="dock-icon" />
                  <span>Production &amp; Export Dispatch Hours: Sun-Thu 08:00-17:00 EET (UTC+2)</span>
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
                    <h3>RFQ Submitted Successfully!</h3>
                    <p>Thank you for reaching out. Your quotation request has been recorded directly in our procurement system. Our sales desk will follow up promptly.</p>
                    
                    <div className="submitted-summary">
                      <div className="summary-row">
                        <span>Company:</span>
                        <strong>{submittedData.companyName}</strong>
                      </div>
                      <div className="summary-row">
                        <span>Contact:</span>
                        <strong>{submittedData.contactName}</strong>
                      </div>
                    </div>

                    <button type="button" className="btn btn-secondary" onClick={handleResetForm}>
                      <RotateCcw size={16} />
                      <span>Submit Another Quote Request</span>
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
                          <span>COMPANY / BUSINESS NAME</span>
                          <span className="req-star" aria-hidden="true">*</span>
                        </label>
                        <div className={`rfq-input-wrap ${errors.companyName ? 'has-error' : ''}`}>
                          <input
                            type="text"
                            id="input-company"
                            name="entry.2008069070"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            placeholder="e.g. Apex Global Distributors LLC"
                            required
                          />
                        </div>
                        {errors.companyName && <span className="rfq-field-error" aria-live="polite">{errors.companyName}</span>}
                      </div>

                      <div className="rfq-form-group">
                        <label htmlFor="input-contact">
                          <span>CONTACT NAME &amp; TITLE</span>
                          <span className="req-star" aria-hidden="true">*</span>
                        </label>
                        <div className={`rfq-input-wrap ${errors.contactName ? 'has-error' : ''}`}>
                          <input
                            type="text"
                            id="input-contact"
                            name="entry.1789600130"
                            value={formData.contactName}
                            onChange={handleInputChange}
                            placeholder="e.g. Marcus Vance, Procurement Director"
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
                          <span>CORPORATE EMAIL ADDRESS</span>
                          <span className="req-star" aria-hidden="true">*</span>
                        </label>
                        <div className={`rfq-input-wrap ${errors.email ? 'has-error' : ''}`}>
                          <input
                            type="email"
                            id="input-email"
                            name="entry.634112710"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="procurement@company.com"
                            required
                            autoComplete="email"
                          />
                        </div>
                        {errors.email && <span className="rfq-field-error" aria-live="polite">{errors.email}</span>}
                      </div>

                      <div className="rfq-form-group">
                        <label htmlFor="input-port">
                          <span>DESTINATION PORT / COUNTRY</span>
                          <span className="req-star" aria-hidden="true">*</span>
                        </label>
                        <div className={`rfq-input-wrap ${errors.destinationPort ? 'has-error' : ''}`}>
                          <input
                            type="text"
                            id="input-port"
                            name="entry.484345123"
                            value={formData.destinationPort}
                            onChange={handleInputChange}
                            placeholder="e.g. Houston TX (US) / Shuwaikh Port (KW)"
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
                          <span>PRODUCT TIER</span>
                        </label>
                        <div className="rfq-input-wrap">
                          <input
                            type="text"
                            id="input-tier"
                            name="entry.1498411154"
                            value={formData.productTier}
                            onChange={handleInputChange}
                            placeholder="Coco Sheesh (Ultra-Premium)"
                          />
                        </div>
                      </div>

                      <div className="rfq-form-group">
                        <label htmlFor="input-geometry">
                          <span>GEOMETRY / SIZE</span>
                        </label>
                        <div className="rfq-input-wrap">
                          <input
                            type="text"
                            id="input-geometry"
                            name="entry.1913184818"
                            value={formData.geometrySize}
                            onChange={handleInputChange}
                            placeholder="25×25×25 mm Cube (Standard)"
                          />
                        </div>
                      </div>

                      <div className="rfq-form-group">
                        <label htmlFor="input-volume">
                          <span>VOLUME REQUIREMENT</span>
                        </label>
                        <div className="rfq-input-wrap">
                          <input
                            type="text"
                            id="input-volume"
                            name="entry.1807966321"
                            value={formData.volumeReq}
                            onChange={handleInputChange}
                            placeholder="1× 20ft FCL (~18-20 MT)"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 4: full width textarea */}
                    <div className="rfq-form-group full-width">
                      <label htmlFor="input-notes">
                        <span>SPECIFICATIONS / NOTES</span>
                      </label>
                      <div className="rfq-input-wrap textarea-wrap">
                        <textarea
                          id="input-notes"
                          name="entry.106176646"
                          value={formData.notes}
                          onChange={handleInputChange}
                          rows={3}
                          placeholder="Specify any customized box packaging requirements, barcode standards, or target delivery dates..."
                        />
                      </div>
                    </div>

                    {/* Row 5: Action & NDA */}
                    <div className="rfq-form-footer">
                      <div className="rfq-nda-badge">
                        <Lock size={15} className="lock-icon" />
                        <span>All RFQ quotes strictly NDA protected.</span>
                      </div>

                      <button type="submit" id="btn-submit" className="btn-rfq-submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <span className="btn-spinner" aria-hidden="true" />
                            <span>SUBMITTING REQUEST...</span>
                          </>
                        ) : (
                          <span>SUBMIT WHOLESALE QUOTE REQUEST</span>
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
