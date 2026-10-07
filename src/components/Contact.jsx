import React from 'react';
import { ArrowLeft, MessageSquare, Mail, PhoneCall, Handshake, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="contact-card-wrapper card-ember-accent">
          {/* Background Ambient Glow */}
          <div className="contact-glow-ambient" aria-hidden="true"></div>

          <div className="contact-inner-content">
            <div className="section-badge">
              <Handshake size={15} />
              <span>تواصل مباشر • شراكة B2B</span>
            </div>

            <h2 className="contact-headline">
              هل تبحث عن شريك موثوق <br />
              <span className="text-gradient-fire">لتوريد الفحم المضغوط؟</span>
            </h2>

            <p className="contact-lead-text">
              سواء كنت ترغب في بدء شراكة تصنيع لعلامتك التجارية (Private Label)، أو استيراد حاويات للأسواق الدولية، 
              أو الانضمام لشبكة التوزيع المعتمدة داخل مصر؛ يسعدنا استقبال استفسارك التجاري.
            </p>

            {/* B2B Value Points */}
            <div className="contact-checkpoints">
              <div className="checkpoint-item">
                <CheckCircle2 size={16} className="text-fire" />
                <span>إمكانية إرسال عينات فحص واعتماد الجودة</span>
              </div>
              <div className="checkpoint-item">
                <CheckCircle2 size={16} className="text-fire" />
                <span>عروض أسعار تصدير وتوريد مباشر من أرض المصنع</span>
              </div>
              <div className="checkpoint-item">
                <CheckCircle2 size={16} className="text-fire" />
                <span>مرونة في مقاسات الكبس ومواصفات التعبئة</span>
              </div>
            </div>

            {/* Direct Professional B2B Contact Triggers */}
            <div className="contact-actions-panel">
              <div className="action-buttons-group">
                <a
                  href="mailto:contact@cocosheesh.com"
                  className="btn btn-primary contact-action-btn"
                  id="contact-email-cta"
                >
                  <Mail size={18} />
                  <span>مراسلة قسم المبيعات والتصدير</span>
                  <ArrowLeft size={16} />
                </a>

                <a
                  href="#form-section"
                  className="btn btn-secondary contact-action-btn"
                  id="contact-form-cta"
                >
                  <MessageSquare size={18} />
                  <span>تعبئة استمارة التوريد والتسجيل</span>
                </a>
              </div>

              {/* Official Contact Info Placeholder */}
              <div className="contact-info-placeholder">
                <PhoneCall size={16} className="text-fire" />
                <span className="placeholder-contact-note">
                  قنوات الاتصال المباشرة وأرقام الواتساب التجاري الرسمية ستكون مفعلة فور اعتمادها.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
