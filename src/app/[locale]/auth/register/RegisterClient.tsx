'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { getLocalizedImg } from '@/utils/localizedImage';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const EMAIL_DOMAINS = ['', 'naver.com', 'daum.net', 'nate.com', 'gmail.com'];
const PHONE_PREFIX = ['', '010', '02', '011', '016', '017', '018', '019', '051', '053', '032'];

function generateYears() {
  const current = new Date().getFullYear();
  const years: number[] = [];
  for (let y = current; y >= 1920; y--) years.push(y);
  return years;
}

export default function RegisterClient() {
  const t = useTranslations('auth.register');
  const locale = useLocale();
  const li = (src: string) => getLocalizedImg(src, locale);
  const [agreed, setAgreed] = useState(false);
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [pw, setPw] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [emailId, setEmailId] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [emailDomainCustom, setEmailDomainCustom] = useState('');
  const [phonePrefix, setPhonePrefix] = useState('');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [smsYn, setSmsYn] = useState(false);
  const [emailYn, setEmailYn] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!agreed) { alert(t('alertAgree')); return; }
    if (!name.trim()) { alert(t('alertName')); return; }
    if (userId.length < 5) { alert(t('alertId')); return; }
    if (pw.length < 8) { alert(t('alertPw')); return; }
    if (pw !== pwConfirm) { alert(t('alertPwMatch')); return; }
    if (!emailId.trim()) { alert(t('alertEmail')); return; }
    const domain = emailDomain || emailDomainCustom;
    if (!domain) { alert(t('alertEmailDomain')); return; }
    if (!phonePrefix || !phone2 || !phone3) { alert(t('alertPhone')); return; }

    setLoading(true);
    try {
      // TODO: POST register API
      setSubmitted(true);
    } catch {
      alert(t('alertError'));
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={styles.wrapper}>
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h3 className={styles.heroTitle}>{t('heroTitle')}</h3>
            <p className={styles.heroSub}>{t('heroSub')}</p>
          </div>
        </section>
        <section className={styles.formSection}>
          <div className={styles.successBox}>
            <h3>{t('successTitle')}</h3>
            <p>{t('successDesc')}</p>
            <Link href="/auth/login" className={styles.loginLink}>{t('successLogin')}</Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h3 className={styles.heroTitle}>{t('heroTitle')}</h3>
          <p className={styles.heroSub}>{t('heroSub')}</p>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className={styles.formContainer}>
          <Image src={li('/img/etc/login_logo.png')} alt={t('logoAlt')} width={384} height={74} className={styles.logo} />

          <div className={styles.privacyGroup}>
            <h4 className={styles.privacyTitle}><span className={styles.required}>{t('privacyRequired')}</span> {t('privacyTitle')}</h4>
            <div className={styles.privacyBox}>
              <p>{t('privacyText1')}</p>
              <p>{t('privacyText2')}</p>
              <p>{t('privacyText3')}</p>
            </div>
            <div className={styles.privacyCheck}>
              <input id="privacy-agree" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className={styles.checkbox} />
              <label htmlFor="privacy-agree">{t('privacyAgree')}</label>
            </div>
          </div>

          <div className={styles.requiredNote}>
            <span>{t('requiredNote')}</span><span className={styles.requiredDot} />
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>{t('labelName')}<span className={styles.requiredDot} /></label>
              <input type="text" placeholder={t('placeholderName')} value={name} onChange={(e) => setName(e.target.value)} className={styles.fieldInput} required />
            </div>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>{t('labelId')}<span className={styles.requiredDot} /></label>
              <input type="text" placeholder={t('placeholderId')} value={userId} onChange={(e) => setUserId(e.target.value)} className={styles.fieldInput} required />
            </div>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>{t('labelPw')}<span className={styles.requiredDot} /></label>
              <input type="password" placeholder={t('placeholderPw')} value={pw} onChange={(e) => setPw(e.target.value)} className={styles.fieldInput} required />
            </div>
            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>{t('labelPwConfirm')}<span className={styles.requiredDot} /></label>
              <input type="password" placeholder={t('placeholderPwConfirm')} value={pwConfirm} onChange={(e) => setPwConfirm(e.target.value)} className={styles.fieldInput} required />
            </div>

            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>{t('labelEmail')}<span className={styles.requiredDot} /></label>
              <div className={styles.fieldMulti}>
                <input type="text" value={emailId} onChange={(e) => setEmailId(e.target.value)} className={styles.fieldInput} required />
                <span className={styles.atSign}>@</span>
                {emailDomain === '' ? (
                  <input type="text" placeholder={t('placeholderEmailDomain')} value={emailDomainCustom} onChange={(e) => setEmailDomainCustom(e.target.value)} className={styles.fieldInput} />
                ) : (
                  <input type="text" value={emailDomain} readOnly className={styles.fieldInput} />
                )}
                <select value={emailDomain} onChange={(e) => { setEmailDomain(e.target.value); if (e.target.value) setEmailDomainCustom(''); }} className={styles.fieldSelect}>
                  <option value="">{t('placeholderEmailDomain')}</option>
                  {EMAIL_DOMAINS.filter(Boolean).map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>{t('labelPhone')}<span className={styles.requiredDot} /></label>
              <div className={styles.fieldMulti}>
                <select value={phonePrefix} onChange={(e) => setPhonePrefix(e.target.value)} className={styles.fieldSelect}>
                  <option value="">{t('phoneSelect')}</option>
                  {PHONE_PREFIX.filter(Boolean).map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                <input type="text" value={phone2} onChange={(e) => setPhone2(e.target.value.replace(/[^0-9]/g, ''))} maxLength={4} className={styles.fieldInput} required />
                <input type="text" value={phone3} onChange={(e) => setPhone3(e.target.value.replace(/[^0-9]/g, ''))} maxLength={4} className={styles.fieldInput} required />
              </div>
            </div>

            <div className={styles.fieldRow}>
              <label className={styles.fieldLabel}>{t('labelBirth')}<span className={styles.requiredDot} /></label>
              <div className={styles.fieldMulti}>
                <select value={birthYear} onChange={(e) => setBirthYear(e.target.value)} className={styles.fieldSelect}>
                  <option value="">{new Date().getFullYear()}</option>
                  {generateYears().map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
                <span className={styles.dateUnit}>{t('yearUnit')}</span>
                <select value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)} className={styles.fieldSelect}>
                  <option value="">{new Date().getMonth() + 1}</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
                <span className={styles.dateUnit}>{t('monthUnit')}</span>
                <select value={birthDay} onChange={(e) => setBirthDay(e.target.value)} className={styles.fieldSelect}>
                  <option value="">{new Date().getDate()}</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                <span className={styles.dateUnit}>{t('dayUnit')}</span>
              </div>
            </div>

            <div className={styles.optGroup}>
              <div className={styles.optItem}>
                <input id="sms-yn" type="checkbox" checked={smsYn} onChange={(e) => setSmsYn(e.target.checked)} className={styles.checkbox} />
                <label htmlFor="sms-yn">{t('labelSms')} <span className={styles.requiredDot} /></label>
              </div>
              <div className={styles.optItem}>
                <input id="email-yn" type="checkbox" checked={emailYn} onChange={(e) => setEmailYn(e.target.checked)} className={styles.checkbox} />
                <label htmlFor="email-yn">{t('labelEmailOpt')} <span className={styles.requiredDot} /></label>
              </div>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>{loading ? t('loading') : t('submit')}</button>
          </form>
        </div>
      </section>

      <section className={styles.bottomSection}>
        <div className={styles.bottomBgLogo}><Image src="/img/common/snu_logo.png" alt="" width={406} height={421} /></div>
        <div className={styles.bottomImgBox} data-aos="fade-up" data-aos-duration="1000"><Image src={li('/img/etc/login_logo_w.png')} alt="" width={204} height={37} /></div>
        <div className={styles.bottomImgBox} data-aos="fade-up" data-aos-duration="1000">
          <Image src={li('/img/etc/mem_sub_com_text_n.png')} alt="" width={639} height={84} className="pc" />
          <Image src={li('/img/etc/mem_sub_com_text_mo_n.png')} alt="" width={286} height={74} className="mo" />
        </div>
      </section>
    </div>
  );
}
