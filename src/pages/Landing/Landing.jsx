import React, { useState, useRef } from 'react';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import Contact from '../../components/Contact';
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
  Zap
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

export default function Landing() {
  /* ─── Integrated Google Form State ───────────────────────────────────── */
  const [formData, setFormData] = useState({
    name: '',
    major: '',
    otherMajor: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState({ name: '', major: '' });
  const formRef = useRef(null);
  const iframeRef = useRef(null);

  /* ─── Manufacturing 14-step presentation state ──────────────────────── */
  const [mfgStep, setMfgStep] = useState(0);
  const mfgTouch = useRef(null);
  const goMfgNext = () => setMfgStep((s) => Math.min(s + 1, MFG_STEPS.length - 1));
  const goMfgPrev = () => setMfgStep((s) => Math.max(s - 1, 0));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'entry.2008069070') {
      setFormData((prev) => ({ ...prev, name: value }));
      if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
    } else if (name === 'entry.1493185888') {
      setFormData((prev) => ({
        ...prev,
        major: value,
        otherMajor: value === '__other_option__' ? prev.otherMajor : '',
      }));
      if (errors.major) setErrors((prev) => ({ ...prev, major: '' }));
    } else if (name === 'entry.1493185888.other_option_response') {
      setFormData((prev) => ({ ...prev, otherMajor: value }));
      if (errors.otherMajor) setErrors((prev) => ({ ...prev, otherMajor: '' }));
    }
  };

  const handleFormSubmit = (e) => {
    let hasError = false;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'يرجى إدخال الاسم بالكامل.';
      hasError = true;
    }

    if (!formData.major) {
      newErrors.major = 'يرجى اختيار التخصص / المجال.';
      hasError = true;
    } else if (formData.major === '__other_option__' && !formData.otherMajor.trim()) {
      newErrors.otherMajor = 'يرجى تحديد التخصص أو المجال المطلوب.';
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
      name: formData.name.trim(),
      major:
        formData.major === '__other_option__'
          ? formData.otherMajor.trim() || 'Other'
          : formData.major,
    });
  };

  const handleIframeLoad = () => {
    if (isSubmitting) {
      completeSubmission();
    }
  };

  const handleResetForm = () => {
    setFormData({ name: '', major: '', otherMajor: '' });
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

        {/* 4. Our Products */}
        <section className="section products-section" id="products">
          <div className="container">
            <header className="pse-header">
              <div className="pse-header-main">
                <p className="pse-eyebrow">
                  <span className="pse-eyebrow-dot" aria-hidden="true"></span>
                  <span>// Our products</span>
                </p>
                <h2 className="pse-title">The Coco Sheesh Range</h2>
              </div>
              <div className="pse-header-aside">
                <p className="pse-intro">
                  Four ways to buy our charcoal: a retail box, a wholesale line, full private label
                  production, and shelf-ready packs. Everything is made from coconut shells and
                  natural starch, pressed on our lines in Egypt.
                </p>
                <ul className="pse-tags">
                  <li className="pse-tag">
                    <span className="pse-tag-dot pse-tag-dot--fire" aria-hidden="true"></span>
                    Coconut shell charcoal
                  </li>
                  <li className="pse-tag">
                    <span className="pse-tag-dot pse-tag-dot--ember" aria-hidden="true"></span>
                    Made in Egypt
                  </li>
                </ul>
              </div>
            </header>

            <div className="pse-list">
              {/* 01 — Image left / editorial split */}
              <article className="pse pse--left">
                <div className="pse-media">
                  <div className="pse-shot">
                    <img
                      src={productImg1}
                      alt="Coco Sheesh retail box of premium coconut charcoal beside black charcoal cubes"
                    />
                    <div className="pse-chips">
                      <span className="pse-chip">
                        <span className="pse-chip-dot" aria-hidden="true"></span>
                        Product 01 — Premium line
                      </span>
                      <span className="pse-chip">Coconut shell charcoal</span>
                    </div>
                    <div className="pse-caption">
                      <span className="pse-caption-main">
                        <span className="pse-caption-label">Coco Sheesh retail box</span>
                        <span className="pse-caption-note">72 pieces • 1 kg</span>
                      </span>
                      <span className="pse-caption-value">150–180 min</span>
                    </div>
                  </div>
                </div>

                <div className="pse-body">
                  <div className="pse-meta">
                    <span className="pse-meta-code">[ Coco Sheesh • Coconut charcoal ]</span>
                    <span className="pse-meta-index">01 / 04</span>
                  </div>
                  <h3 className="pse-name">Coco Sheesh Premium</h3>
                  <p className="pse-desc">
                    Our flagship coconut charcoal. It is made from coconut shells and a natural
                    starch binder, so it lights fast, burns steady and leaves a clean white ash.
                  </p>
                  <div className="pse-stats">
                    <div className="pse-stat pse-stat--fire">
                      <span className="pse-stat-label">Burn time</span>
                      <span className="pse-stat-value">150–180 min</span>
                    </div>
                    <div className="pse-stat pse-stat--ember">
                      <span className="pse-stat-label">Ash content</span>
                      <span className="pse-stat-value">Under 2%</span>
                    </div>
                    <div className="pse-stat pse-stat--coconut">
                      <span className="pse-stat-label">Shapes</span>
                      <span className="pse-stat-value">Cube & hexagon</span>
                    </div>
                  </div>
                </div>
              </article>

              {/* 02 — Text left / image right */}
              <article className="pse pse--right">
                <div className="pse-body">
                  <div className="pse-meta">
                    <span className="pse-meta-code">[ Black Sheesh • Wholesale line ]</span>
                    <span className="pse-meta-index">02 / 04</span>
                  </div>
                  <h3 className="pse-name">Black Sheesh Commercial</h3>
                  <p className="pse-desc">
                    Our commercial line for cafés, lounges and distributors. It is pressed on our
                    Turkish production lines and packed for bulk orders, so every box holds the
                    same clean cube.
                  </p>
                  <div className="pse-spec">
                    <div className="pse-spec-head">Available options</div>
                    <div className="pse-spec-row">
                      <span className="pse-spec-key">Cube sizes</span>
                      <span className="pse-spec-val">22 / 23 / 25 / 26 mm</span>
                    </div>
                    <div className="pse-spec-row">
                      <span className="pse-spec-key">Shapes</span>
                      <span className="pse-spec-val">Cube & hexagon</span>
                    </div>
                    <div className="pse-spec-row">
                      <span className="pse-spec-key">Supply</span>
                      <span className="pse-spec-val">Wholesale & export</span>
                    </div>
                  </div>
                </div>

                <div className="pse-media">
                  <div className="pse-shot">
                    <img
                      src={productImg2}
                      alt="Rows of charcoal cubes curing on racks inside the open production hall"
                      loading="lazy"
                    />
                    <div className="pse-chips">
                      <span className="pse-chip">
                        <span className="pse-chip-dot" aria-hidden="true"></span>
                        Product 02 — Wholesale line
                      </span>
                      <span className="pse-chip">Bulk orders</span>
                    </div>
                    <div className="pse-caption">
                      <span className="pse-caption-main">
                        <span className="pse-caption-label">Cured & stacked</span>
                        <span className="pse-caption-note">Conditioned before packing</span>
                      </span>
                    </div>
                  </div>
                </div>
              </article>

              {/* 03 — Two-image split showcase / text right */}
              <article className="pse pse--duo">
                <div className="pse-media pse-media--duo">
                  <div className="pse-shot">
                    <img
                      src={productImg3}
                      alt="Charcoal mix pushed out of the extrusion die on the production line"
                      loading="lazy"
                    />
                    <div className="pse-chips">
                      <span className="pse-chip">
                        <span className="pse-chip-dot" aria-hidden="true"></span>
                        Product 03 — Private label
                      </span>
                      <span className="pse-chip">Made for your brand</span>
                    </div>
                    <div className="pse-caption">
                      <span className="pse-caption-main">
                        <span className="pse-caption-label">Stage 01 — Extrusion</span>
                        <span className="pse-caption-note">Charcoal mix pushed through the die</span>
                      </span>
                    </div>
                  </div>
                  <div className="pse-shot">
                    <img
                      src={productImg4}
                      alt="Hydraulic press forming a charcoal cube on the production line"
                      loading="lazy"
                    />
                    <div className="pse-caption">
                      <span className="pse-caption-main">
                        <span className="pse-caption-label">Stage 02 — Pressing</span>
                        <span className="pse-caption-note">Cubes formed under pressure</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pse-body">
                  <div className="pse-meta">
                    <span className="pse-meta-code">[ Private label • OEM ]</span>
                    <span className="pse-meta-index">03 / 04</span>
                  </div>
                  <h3 className="pse-name">Private Label Production</h3>
                  <p className="pse-desc">
                    We make charcoal under your own brand. You choose the size, the shape and the
                    box — we take care of pressing, checks and packing.
                  </p>
                  <div className="pse-stats">
                    <div className="pse-stat pse-stat--fire">
                      <span className="pse-stat-label">Branding</span>
                      <span className="pse-stat-value">Your own label</span>
                    </div>
                    <div className="pse-stat pse-stat--ember">
                      <span className="pse-stat-label">Packing</span>
                      <span className="pse-stat-value">Your own design</span>
                    </div>
                    <div className="pse-stat pse-stat--coconut">
                      <span className="pse-stat-label">Quality</span>
                      <span className="pse-stat-value">Checked before shipment</span>
                    </div>
                  </div>
                </div>
              </article>

              {/* 04 — Text left / packshot plate right */}
              <article className="pse pse--right pse--inset">
                <div className="pse-body">
                  <div className="pse-meta">
                    <span className="pse-meta-code">[ Packaging • 72 pcs / 1 kg ]</span>
                    <span className="pse-meta-index">04 / 04</span>
                  </div>
                  <h3 className="pse-name">Retail Ready Packs</h3>
                  <p className="pse-desc">
                    The 1 kg box holds 72 pieces and is ready for the shelf. We can also pack the
                    same charcoal under your own label, in your own design.
                  </p>
                  <div className="pse-figures">
                    <div className="pse-figure">
                      <span className="pse-figure-value">72</span>
                      <span className="pse-figure-label">Pieces per box</span>
                    </div>
                    <div className="pse-figure">
                      <span className="pse-figure-value">1 kg</span>
                      <span className="pse-figure-label">Net weight</span>
                    </div>
                    <div className="pse-figure">
                      <span className="pse-figure-value">22–26</span>
                      <span className="pse-figure-label">Cube sizes (mm)</span>
                    </div>
                  </div>
                </div>

                <div className="pse-media pse-media--inset">
                  <div className="pse-shot pse-shot--inset">
                    <img
                      src={productImg1}
                      alt="Coco Sheesh 1 kg retail box holding 72 charcoal cubes"
                      loading="lazy"
                    />
                    <div className="pse-chips">
                      <span className="pse-chip">
                        <span className="pse-chip-dot" aria-hidden="true"></span>
                        Product 04 — Retail pack
                      </span>
                      <span className="pse-chip">Shelf ready</span>
                    </div>
                    <div className="pse-caption">
                      <span className="pse-caption-main">
                        <span className="pse-caption-label">Shelf-ready pack</span>
                        <span className="pse-caption-note">Your label, our charcoal</span>
                      </span>
                      <span className="pse-caption-value">1 kg</span>
                    </div>
                  </div>
                </div>
              </article>
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

            <div className="pcg-grid">
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
                <div className="pcg-popular-badge">POPULAR</div>
                <div className="pcg-card-top">
                  <h3 className="pcg-dim"><span className="pcg-dim-num">25 × 25 × 25 mm</span></h3>
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
        </section>

        {/* 6. Our Materials */}
        <section className="section materials-section" id="materials">
          <div className="container">
            <div className="section-header">
              <div className="section-badge badge-coconut">
                <Leaf size={15} />
                <span>نقاء المواد الأولية</span>
              </div>
              <h2 className="section-title">
                مواد طبيعية نقية <br />
                تمنح منتجنا الثبات والأمان
              </h2>
              <p className="section-subtitle">
                نلتزم بالشفافية الكاملة في تكوين منتجاتنا؛ حيث تتكامل قشور جوز الهند الطبيعية مع النشا الغذائي المستورد من تركيا لتقديم فحم مضغوط بأعلى معايير النقاء.
              </p>
            </div>

            <div className="materials-grid">
              <div className="card-base material-card">
                <div className="mat-header">
                  <div className="mat-icon-wrapper">
                    <Leaf size={28} />
                  </div>
                  <span className="mat-origin-tag">خام طبيعي 100%</span>
                </div>
                <span className="mat-role-badge">المادة الأساسية</span>
                <h3 className="mat-title">قشور جوز الهند الطبيعية</h3>
                <p className="mat-description">
                  نعتمد على خامات نقية ومختارة من قشور جوز الهند الطبيعية، تضمن نقاء الاحتراق وخلوه من الشوائب المعدنية أو الأتربة.
                </p>
                <div className="mat-check-list">
                  <div className="mat-check-item">
                    <CheckCircle2 size={16} className="mat-check-icon" />
                    <span>مكون طبيعي منتقى بعناية</span>
                  </div>
                  <div className="mat-check-item">
                    <CheckCircle2 size={16} className="mat-check-icon" />
                    <span>خالٍ من المضافات والمسرعات الكيميائية</span>
                  </div>
                </div>
              </div>

              <div className="card-base material-card">
                <div className="mat-header">
                  <div className="mat-icon-wrapper">
                    <Wheat size={28} />
                  </div>
                  <span className="mat-origin-tag">مستورد من تركيا (Food-Grade)</span>
                </div>
                <span className="mat-role-badge">المادة الرابطة</span>
                <h3 className="mat-title">نشا غذائي مستورد من تركيا</h3>
                <p className="mat-description">
                  نستخدم حصرياً نشا غذائياً عالي النقاء مستورداً من تركيا كمادة رابطة طبيعية آمنة، لضمان تماسك القطع دون أي انبعاثات ضارة.
                </p>
                <div className="mat-check-list">
                  <div className="mat-check-item">
                    <CheckCircle2 size={16} className="mat-check-icon" />
                    <span>مكون طبيعي منتقى بعناية</span>
                  </div>
                  <div className="mat-check-item">
                    <CheckCircle2 size={16} className="mat-check-icon" />
                    <span>خالٍ من المضافات والمسرعات الكيميائية</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="materials-assurance-note">
              <div className="assurance-icon-box">
                <Sparkles size={22} />
              </div>
              <div className="assurance-text">
                <h4 className="assurance-title">معايير أمان المكونات</h4>
                <p className="assurance-body">
                  إن استخدام النشا الغذائي المستورد كعنصر رابط يضمن عدم تصاعد روائح غير مرغوبة أو غازات كيميائية ضارة أثناء الاستخدام، 
                  مما يحافظ على نقاء التجربة ونظافة الرماد.
                </p>
              </div>
            </div>
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
                <a href="#contact" className="btn oem-cta-btn">
                  LAUNCH OEM INQUIRY
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Why Choose Us */}
        <section className="section why-us-section" id="why-us">
          <div className="container">
            <div className="section-header">
              <div className="section-badge badge-coconut">
                <Award size={15} />
                <span>ميزتنا التنافسية</span>
              </div>
              <h2 className="section-title">
                لماذا يختارنا كبار الموزعين <br />
                وشركاء التجارة الدوليين؟
              </h2>
              <p className="section-subtitle">
                نجمع بين القوة الإنتاجية والاستقرار التجاري لنمنحك ميزة تنافسية حقيقية في سوق الفحم المضغوط.
              </p>
            </div>

            <div className="advantages-grid">
              <div className="card-base advantage-card">
                <div className="adv-card-header">
                  <div className="adv-icon-box"><Award size={22} /></div>
                  <span className="adv-stat-pill">أعلى معايير</span>
                </div>
                <h3 className="adv-title">جودة تصنيع فائقة ومستقرة</h3>
                <p className="adv-desc">رقابة هندسية صارمة من خلط المواد إلى الكبس الهيدروليكي والتجفيف لضمان تماسك كل قطعة.</p>
                <div className="adv-card-glow" aria-hidden="true"></div>
              </div>

              <div className="card-base advantage-card">
                <div className="adv-card-header">
                  <div className="adv-icon-box"><DollarSign size={22} /></div>
                  <span className="adv-stat-pill">سعر المصنع</span>
                </div>
                <h3 className="adv-title">أسعار تنافسية مباشرة من المصنع</h3>
                <p className="adv-desc">عروض تسعير مباشرة تخلو من الوسطاء، تتيح لك هوامش ربحية ممتازة وتنافسية تجارية عالية.</p>
                <div className="adv-card-glow" aria-hidden="true"></div>
              </div>

              <div className="card-base advantage-card">
                <div className="adv-card-header">
                  <div className="adv-icon-box"><Gauge size={22} /></div>
                  <span className="adv-stat-pill num-latin">+70 طن</span>
                </div>
                <h3 className="adv-title">طاقة إنتاجية 70+ طن شهرياً</h3>
                <p className="adv-desc">خطوط إنتاج مستمرة تضمن تسليم طلبيات الحاويات وعقود التوريد الشهرية دون أي تأخير.</p>
                <div className="adv-card-glow" aria-hidden="true"></div>
              </div>

              <div className="card-base advantage-card">
                <div className="adv-card-header">
                  <div className="adv-icon-box"><Maximize2 size={22} /></div>
                  <span className="adv-stat-pill">6+ خيارات</span>
                </div>
                <h3 className="adv-title">مرونة تامة في المقاسات والأشكال</h3>
                <p className="adv-desc">تشكيلة متكاملة من المقاسات المكعبة (22 إلى 26 ملم) والسداسية مع إمكانية التخصيص.</p>
                <div className="adv-card-glow" aria-hidden="true"></div>
              </div>

              <div className="card-base advantage-card">
                <div className="adv-card-header">
                  <div className="adv-icon-box"><Layers size={22} /></div>
                  <span className="adv-stat-pill">توريد مستمر</span>
                </div>
                <h3 className="adv-title">وفرة واستمرارية في المواد الخام</h3>
                <p className="adv-desc">سلاسل إمداد منتظمة لقشور جوز الهند والنشا الغذائي التركي تضمن ثبات التشغيل على مدار العام.</p>
                <div className="adv-card-glow" aria-hidden="true"></div>
              </div>

              <div className="card-base advantage-card">
                <div className="adv-card-header">
                  <div className="adv-icon-box"><Tag size={22} /></div>
                  <span className="adv-stat-pill">Private Label</span>
                </div>
                <h3 className="adv-title">جاهزية كاملة للتصنيع للغير</h3>
                <p className="adv-desc">خبرة متكاملة في التعبئة والتغليف المخصص وطباعة الهويات التجارية لشركاء التوزيع.</p>
                <div className="adv-card-glow" aria-hidden="true"></div>
              </div>

              <div className="card-base advantage-card">
                <div className="adv-card-header">
                  <div className="adv-icon-box"><Globe size={22} /></div>
                  <span className="adv-stat-pill">تصدير عالمي</span>
                </div>
                <h3 className="adv-title">خبرة تصديرية وسجل دولي</h3>
                <p className="adv-desc">معرفة تامة بإجراءات الشحن الدولي ومتطلبات التخليص الجمركي للأسواق العربية والأجنبية.</p>
                <div className="adv-card-glow" aria-hidden="true"></div>
              </div>

              <div className="card-base advantage-card">
                <div className="adv-card-header">
                  <div className="adv-icon-box"><Factory size={22} /></div>
                  <span className="adv-stat-pill">صناعة معيارية</span>
                </div>
                <h3 className="adv-title">تصنيع محلي بمعايير عالمية</h3>
                <p className="adv-desc">مصنع قائم على أرض مصرية بخبرات تركية متراكمة منذ 2018، يوفر سرعة استجابة فائقة.</p>
                <div className="adv-card-glow" aria-hidden="true"></div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Quality & Certifications */}
        <section className="section certifications-section" id="certifications">
          <div className="container">
            <div className="section-header">
              <div className="section-badge">
                <ShieldCheck size={15} />
                <span>الجودة والاعتمادات</span>
              </div>
              <h2 className="section-title">
                التزام بمعايير الجودة <br />
                والشهادات البيئية والكيميائية
              </h2>
              <p className="section-subtitle">
                يمتلك المصنع اعتمادات بيئية وفحوصات كيميائية معتبرة لضمان أمان المنتج ومطابقته لشروط التصدير والتداول الدولي.
              </p>
            </div>

            <div className="certifications-grid">
              <div className="card-base cert-card">
                <div className="cert-top-row">
                  <div className="cert-icon-box"><Trees size={24} /></div>
                  <span className="cert-tag">بيئي معتمد</span>
                </div>
                <h3 className="cert-title">الشهادات والاعتمادات البيئية</h3>
                <p className="cert-desc">شهادات رسمية تثبت مطابقة المنشأة وعمليات التصنيع للمعايير البيئية والسلامة المهنية.</p>
                <div className="asset-placeholder cert-doc-placeholder">
                  <div className="asset-placeholder-icon"><FileCheck size={26} /></div>
                  <span className="placeholder-primary-text">وثيقة الاعتماد الرسمي</span>
                  <span className="placeholder-secondary-text">سيتم إرفاق صورة الشهادة الرسمية وبيانات الاعتماد فور تسليم المستندات</span>
                </div>
              </div>

              <div className="card-base cert-card">
                <div className="cert-top-row">
                  <div className="cert-icon-box"><FlaskConical size={24} /></div>
                  <span className="cert-tag">فحص كيميائي معتمد</span>
                </div>
                <h3 className="cert-title">الشهادات والتحاليل الكيميائية</h3>
                <p className="cert-desc">شهادات واختبارات معملية تؤكد خلو المواد من الإضافات الكيميائية الضارة وسلامة نواتج الاحتراق.</p>
                <div className="asset-placeholder cert-doc-placeholder">
                  <div className="asset-placeholder-icon"><FileCheck size={26} /></div>
                  <span className="placeholder-primary-text">وثيقة الاعتماد الرسمي</span>
                  <span className="placeholder-secondary-text">سيتم إرفاق صورة الشهادة الرسمية وبيانات الاعتماد فور تسليم المستندات</span>
                </div>
              </div>
            </div>

            <div className="cert-verification-notice">
              <Info size={18} className="notice-icon" />
              <p className="notice-text">
                كافة الشهادات والتقارير المعملية متاحة للمعاينة والتزويد بها للعملاء التجاريين والمستوردين عند توقيع عقود التوريد.
              </p>
            </div>
          </div>
        </section>

        {/* 10. Export Markets */}
        <section className="section export-section" id="markets">
          <div className="container">
            <div className="section-header">
              <div className="section-badge badge-coconut">
                <Globe2 size={15} />
                <span>الانتشار والتصدير</span>
              </div>
              <h2 className="section-title">
                شبكة تصدير دولية <br />
                تصل إلى مختلف الأسواق العالمية
              </h2>
              <p className="section-subtitle">
                نفتخر بتصدير منتجاتنا المضغوطة وفق المعايير اللوجستية الدولية لتصل بكفاءة إلى شركائنا في الدول الشقيقة والأسواق العالمية.
              </p>
            </div>

            <div className="export-display-card">
              <div className="export-map-overlay" aria-hidden="true">
                <svg viewBox="0 0 1000 480" className="world-map-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M150 120 Q 220 80 320 110 T 480 140 T 600 120 T 780 150 T 890 200" stroke="rgba(220, 38, 38, 0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <path d="M200 240 Q 350 210 520 230 T 720 220 T 840 280" stroke="rgba(234, 88, 12, 0.15)" strokeWidth="1.5" strokeDasharray="6 6" />
                  <circle cx="530" cy="220" r="6" fill="#ef4444" className="map-pulse-node" />
                  <circle cx="580" cy="235" r="4" fill="#fca5a5" />
                  <circle cx="560" cy="200" r="4" fill="#fca5a5" />
                  <circle cx="550" cy="180" r="4" fill="#fca5a5" />
                  <circle cx="610" cy="270" r="4" fill="#fca5a5" />
                  <circle cx="820" cy="260" r="5" fill="#fca5a5" />
                </svg>
              </div>

              <div className="export-content-pane">
                <div className="export-info-header">
                  <div className="export-status-pill">
                    <Ship size={16} />
                    <span>شحن بحري وجوي منتظم للحاويات الكاملة (FCL) والجزئية</span>
                  </div>
                </div>

                <div className="markets-grid">
                  <div className="market-card">
                    <div className="market-icon-indicator"><Navigation size={14} className="market-nav-arrow" /></div>
                    <div className="market-details">
                      <span className="market-name">الكويت</span>
                      <span className="market-en num-latin">Kuwait</span>
                      <span className="market-region">الخليج العربي</span>
                    </div>
                  </div>

                  <div className="market-card">
                    <div className="market-icon-indicator"><Navigation size={14} className="market-nav-arrow" /></div>
                    <div className="market-details">
                      <span className="market-name">المملكة العربية السعودية</span>
                      <span className="market-en num-latin">Saudi Arabia</span>
                      <span className="market-region">الخليج العربي</span>
                    </div>
                  </div>

                  <div className="market-card">
                    <div className="market-icon-indicator"><Navigation size={14} className="market-nav-arrow" /></div>
                    <div className="market-details">
                      <span className="market-name">لبنان</span>
                      <span className="market-en num-latin">Lebanon</span>
                      <span className="market-region">بلاد الشام</span>
                    </div>
                  </div>

                  <div className="market-card">
                    <div className="market-icon-indicator"><Navigation size={14} className="market-nav-arrow" /></div>
                    <div className="market-details">
                      <span className="market-name">فلسطين</span>
                      <span className="market-en num-latin">Palestine</span>
                      <span className="market-region">بلاد الشام</span>
                    </div>
                  </div>

                  <div className="market-card">
                    <div className="market-icon-indicator"><Navigation size={14} className="market-nav-arrow" /></div>
                    <div className="market-details">
                      <span className="market-name">اليمن</span>
                      <span className="market-en num-latin">Yemen</span>
                      <span className="market-region">شبه الجزيرة العربية</span>
                    </div>
                  </div>

                  <div className="market-card">
                    <div className="market-icon-indicator"><Navigation size={14} className="market-nav-arrow" /></div>
                    <div className="market-details">
                      <span className="market-name">تركيا</span>
                      <span className="market-en num-latin">Turkey</span>
                      <span className="market-region">أوروبا وآسيا</span>
                    </div>
                  </div>

                  <div className="market-card">
                    <div className="market-icon-indicator"><Navigation size={14} className="market-nav-arrow" /></div>
                    <div className="market-details">
                      <span className="market-name">الفلبين</span>
                      <span className="market-en num-latin">Philippines</span>
                      <span className="market-region">جنوب شرق آسيا</span>
                    </div>
                  </div>

                  <div className="market-card">
                    <div className="market-icon-indicator"><Navigation size={14} className="market-nav-arrow" /></div>
                    <div className="market-details">
                      <span className="market-name">أسواق دولية أخرى</span>
                      <span className="market-en num-latin">Other Global Markets</span>
                      <span className="market-region">توسع مستمر</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 11. Local Distribution */}
        <section className="section local-dist-section" id="distribution">
          <div className="container">
            <div className="section-header">
              <div className="section-badge">
                <Store size={15} />
                <span>التوزيع داخل جمهورية مصر العربية</span>
              </div>
              <h2 className="section-title">
                تغطية محلية شاملة <br />
                تصل إلى كافة أنحاء الجمهورية
              </h2>
              <p className="section-subtitle">
                نغطي السوق المصري عبر شبكة توزيع منظمة تضمن سرعة الوصول وتوافر منتجاتنا وخدمة عملائنا في مختلف القطاعات.
              </p>
            </div>

            <div className="dist-channels-grid">
              <div className="card-base dist-channel-card card-ember-accent">
                <div className="dist-icon-box"><UserCheck size={26} /></div>
                <div className="dist-role-tag num-latin">Representatives</div>
                <h3 className="dist-title">مندوبين معتمدين</h3>
                <p className="dist-desc">فريق من المندوبين المتخصصين للتواصل المباشر مع نقاط البيع والمتاجر وتلبية الاحتياجات الفورية.</p>
                <div className="dist-check-row">
                  <CheckCircle2 size={16} className="text-fire" />
                  <span>تغطية معتمدة ومباشرة</span>
                </div>
              </div>

              <div className="card-base dist-channel-card card-ember-accent">
                <div className="dist-icon-box"><Briefcase size={26} /></div>
                <div className="dist-role-tag num-latin">Agents</div>
                <h3 className="dist-title">وكلاء تجاريين</h3>
                <p className="dist-desc">شبكة من الوكلاء التجاريين في المحافظات الرئيسية لإدارة التوزيع الإقليمي بكفاءة ومرونة.</p>
                <div className="dist-check-row">
                  <CheckCircle2 size={16} className="text-fire" />
                  <span>تغطية معتمدة ومباشرة</span>
                </div>
              </div>

              <div className="card-base dist-channel-card card-ember-accent">
                <div className="dist-icon-box"><Store size={26} /></div>
                <div className="dist-role-tag num-latin">Authorized Distributors</div>
                <h3 className="dist-title">موزعين معتمدين</h3>
                <p className="dist-desc">شراكات مع كبار موزعي ومستودعات الفحم لتوفير الكميات الضخمة وتأمين المخزون المستمر.</p>
                <div className="dist-check-row">
                  <CheckCircle2 size={16} className="text-fire" />
                  <span>تغطية معتمدة ومباشرة</span>
                </div>
              </div>
            </div>

            <div className="nationwide-coverage-banner">
              <div className="coverage-icon-badge"><MapPin size={24} /></div>
              <div className="coverage-text">
                <h4>انتشار واسع في محافظات مصر</h4>
                <p>سواء كنت تاجر جملة، صاحب مقهى، أو موزعاً محلياً، تضمن منظومة التوزيع وصول طلبيتك بأسرع وقت وأعلى جودة ممكنة.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 12. Factory Location */}
        <section className="section location-section" id="location">
          <div className="container">
            <div className="section-header">
              <div className="section-badge badge-coconut">
                <MapPin size={15} />
                <span>المقر والموقع الجغرافي</span>
              </div>
              <h2 className="section-title">موقع المنشأة الصناعية</h2>
              <p className="section-subtitle">
                موقع تصنيعي ولوجستي استراتيجي مهيأ لاستقبال وتفريغ الخامات وشحن الحاويات للأسواق المحلية وموانئ التصدير.
              </p>
            </div>

            <div className="location-grid">
              <div className="card-base location-info-card">
                <div className="loc-card-header">
                  <div className="loc-icon-box"><Building size={24} /></div>
                  <span className="loc-status-badge">المنشأة الصناعية الرئيسية</span>
                </div>

                <h3 className="loc-title">مجمع مصانع كوكو شيش</h3>

                <div className="address-placeholder-box">
                  <div className="address-placeholder-header">
                    <MapPin size={18} className="text-fire" />
                    <span className="address-label">عنوان المصنع:</span>
                  </div>
                  <p className="address-placeholder-value">
                    جمهورية مصر العربية
                    <span className="placeholder-note">(سيتم إدراج العنوان التفصيلي والإحداثيات الرسمية قريباً)</span>
                  </p>
                </div>

                <div className="loc-meta-list">
                  <div className="loc-meta-item">
                    <Compass size={18} className="loc-meta-icon" />
                    <div className="loc-meta-details">
                      <span className="meta-label">الربط اللوجستي:</span>
                      <span className="meta-text">موقع متصل بالطرق الرئيسية المؤدية للموانئ البحرية وشبكات النقل المحلية</span>
                    </div>
                  </div>

                  <div className="loc-meta-item">
                    <Clock size={18} className="loc-meta-icon" />
                    <div className="loc-meta-details">
                      <span className="meta-label">استقبال الشحنات والعملاء:</span>
                      <span className="meta-text">تنسيق مسبق لزيارات فحص الجودة ومراجعة طلبيات التصدير والتوريد</span>
                    </div>
                  </div>
                </div>

                <div className="location-action-note">
                  <Navigation size={16} />
                  <span>متاح توفير مسار الوصول المباشر للشركاء التجاريين بعد التنسيق</span>
                </div>
              </div>

              <div className="card-base location-map-container">
                <div className="asset-placeholder map-placeholder">
                  <div className="map-radar-ring" aria-hidden="true">
                    <div className="radar-circle"></div>
                    <div className="radar-pin"><MapPin size={32} /></div>
                  </div>
                  <span className="placeholder-primary-text">مساحة خريطة الموقع الجغرافي (Google Maps)</span>
                  <span className="placeholder-secondary-text">وعاء مخصص للدمج المباشر مع خريطة جوجل التفاعلية فور تحديد الإحداثيات الرسمية</span>
                  <div className="map-placeholder-tag num-latin">Google Maps Integration Area</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 13. Contact / Final CTA */}
        <Contact />

        {/* 14. Integrated Form Demo (Moved from Form Demo.html into React Landing Flow) */}
        <section className="form-section" id="form-section">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">استمارة التوريد والتسجيل</span>
              <h2 className="section-title">تسجيل البيانات والتوريد المباشر</h2>
              <p className="section-subtitle">سجل بياناتك واستفسارك أدناه — سيتم إرسال الرد وتوثيق البيانات فوراً في قاعدة البيانات السحابية.</p>
            </div>

            <div className="form-wrapper custom-card">
              {/* Success View */}
              {isSubmitted ? (
                <div id="form-success" className="form-success" role="status" aria-live="polite">
                  <div className="success-icon-wrap">
                    <svg className="success-checkmark" viewBox="0 0 52 52" aria-hidden="true">
                      <circle className="checkmark-circle" cx="26" cy="26" r="24" fill="none" />
                      <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                    </svg>
                  </div>
                  <h3>تم استلام ردك بنجاح!</h3>
                  <p>تم إرسال وتسجيل بياناتك مباشرة في نموذج Google Form وجدول البيانات المرتبط به بنجاح وبدون إعادة تحميل للصفحة.</p>
                  
                  <div className="submitted-summary">
                    <div className="summary-row">
                      <span>الاسم:</span>
                      <strong>{submittedData.name}</strong>
                    </div>
                    <div className="summary-row">
                      <span>التخصص / المجال:</span>
                      <strong>{submittedData.major}</strong>
                    </div>
                  </div>

                  <button type="button" className="btn btn-secondary" onClick={handleResetForm}>
                    <RotateCcw size={16} />
                    <span>إرسال استجابة أخرى</span>
                  </button>
                </div>
              ) : (
                /* Native HTML Form submitting to Google Form silently */
                <form
                  ref={formRef}
                  id="native-google-form"
                  action="https://docs.google.com/forms/d/e/1FAIpQLSf4LFq5q7Q4b2I7Qex59YQ_EblbInsGC5Gvdeq0vkHRlywpIw/formResponse"
                  method="POST"
                  target="hidden_iframe"
                  className="native-form"
                  onSubmit={handleFormSubmit}
                  noValidate
                >


                  {/* Name Field (entry.2008069070) */}
                  <div className="form-group" id="group-name">
                    <label htmlFor="input-name">
                      <span>ما هو اسمك؟ (What is your name?)</span>
                      <span className="req-star" aria-hidden="true">*</span>
                    </label>
                    <div className={`input-wrapper ${errors.name ? 'has-error' : ''}`}>
                      <span className="field-icon" aria-hidden="true">👤</span>
                      <input
                        type="text"
                        id="input-name"
                        name="entry.2008069070"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="أدخل اسمك بالكامل"
                        required
                        autoComplete="name"
                      />
                    </div>
                    {errors.name && <span className="field-error" aria-live="polite">{errors.name}</span>}
                  </div>

                  {/* Major Dropdown Field (entry.1493185888) */}
                  <div className="form-group" id="group-major">
                    <label htmlFor="select-major">
                      <span>التخصص / المجال (Your Major)</span>
                      <span className="req-star" aria-hidden="true">*</span>
                    </label>
                    <div className={`input-wrapper select-wrapper ${errors.major ? 'has-error' : ''}`}>
                      <span className="field-icon" aria-hidden="true">🎓</span>
                      <select
                        id="select-major"
                        name="entry.1493185888"
                        value={formData.major}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="" disabled>اختر التخصص (Select your major)</option>
                        <option value="BIS">BIS (Business Information Systems)</option>
                        <option value="Finance">Finance</option>
                        <option value="Computer science">Computer Science</option>
                        <option value="__other_option__">أخرى (Other)</option>
                      </select>
                      <span className="select-chevron" aria-hidden="true">▾</span>
                    </div>
                    {errors.major && <span className="field-error" aria-live="polite">{errors.major}</span>}
                  </div>

                  {/* Conditional 'Other' Field */}
                  {formData.major === '__other_option__' && (
                    <div className="form-group" id="group-other">
                      <label htmlFor="input-other">
                        <span>يرجى تحديد التخصص (Please specify your major)</span>
                        <span className="req-star" aria-hidden="true">*</span>
                      </label>
                      <div className={`input-wrapper ${errors.otherMajor ? 'has-error' : ''}`}>
                        <span className="field-icon" aria-hidden="true">✍️</span>
                        <input
                          type="text"
                          id="input-other"
                          name="entry.1493185888.other_option_response"
                          value={formData.otherMajor}
                          onChange={handleInputChange}
                          placeholder="مثال: Data Science, Marketing, Engineering..."
                          required
                        />
                      </div>
                      {errors.otherMajor && <span className="field-error" aria-live="polite">{errors.otherMajor}</span>}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="form-action">
                    <button type="submit" id="btn-submit" className="btn-submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <span className="btn-spinner" aria-hidden="true"></span>
                          <span>جارٍ الإرسال والتسجيل...</span>
                        </>
                      ) : (
                        <>
                          <span>إرسال البيانات (Submit Response)</span>
                          <Send size={18} />
                        </>
                      )}
                    </button>
                    <p className="form-footnote">
                      <span className="lock-icon" aria-hidden="true">🔒</span>
                      <span>إرسال مشفر ومباشر إلى Google Form دون إعادة تحميل الصفحة.</span>
                    </p>
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
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      {/* 15. Footer */}
      <Footer />
    </div>
  );
}
