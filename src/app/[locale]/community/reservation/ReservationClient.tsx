'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import styles from './page.module.css';

export default function ReservationClient() {
  const t = useTranslations('community.reservation');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [time, setTime] = useState('');
  const [content, setContent] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handlePhoneInput = (val: string) => {
    setPhone(val.replace(/[^0-9]/g, ''));
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert(t('alertName'));
      return;
    }
    if (!phone || phone.length < 10) {
      alert(t('alertPhone'));
      return;
    }
    if (!subject) {
      alert(t('alertSubject'));
      return;
    }
    if (!time) {
      alert(t('alertTime'));
      return;
    }
    if (!agreed) {
      alert(t('alertAgree'));
      return;
    }
    setLoading(true);
    try {
      // TODO: POST to reservation API
      // const res = await fetch('/api/reservation', { method: 'POST', body: JSON.stringify({ name, phone, subject, time, content }) });
      setSubmitted(true);
    } catch {
      alert(t('alertError'));
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className={styles.formSection}>
        <div className={styles.formBg}>
          <video className={`${styles.bgVideo} pc`} muted autoPlay loop playsInline>
            <source
              src="https://player.vimeo.com/progressive_redirect/playback/865439848/rendition/360p/file.mp4?loc=external&signature=8de62c8b29d5ffe94ce7ffc97c632e8a4dd7203898fc63f2a686329b2bb1ab14"
              type="video/mp4"
            />
          </video>
          <video className={`${styles.bgVideo} mo`} muted autoPlay loop playsInline>
            <source
              src="https://player.vimeo.com/progressive_redirect/playback/865439839/rendition/360p/file.mp4?loc=external&signature=884ae304b38a53bcf614a79efbf2f6f77cfa16775731bec169748e4e7489ed12"
              type="video/mp4"
            />
          </video>
          <div className={styles.bgFilter} />
        </div>
        <div className={styles.formWrap}>
          <div className={styles.successBox} data-aos="fade-up" data-aos-duration="1000">
            <h3>{t('successTitle')}</h3>
            <p>{t('successDesc')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.formSection}>
      <div className={styles.formBg}>
        <video className={`${styles.bgVideo} pc`} muted autoPlay loop playsInline>
          <source
            src="https://player.vimeo.com/progressive_redirect/playback/865439848/rendition/360p/file.mp4?loc=external&signature=8de62c8b29d5ffe94ce7ffc97c632e8a4dd7203898fc63f2a686329b2bb1ab14"
            type="video/mp4"
          />
        </video>
        <video className={`${styles.bgVideo} mo`} muted autoPlay loop playsInline>
          <source
            src="https://player.vimeo.com/progressive_redirect/playback/865439839/rendition/360p/file.mp4?loc=external&signature=884ae304b38a53bcf614a79efbf2f6f77cfa16775731bec169748e4e7489ed12"
            type="video/mp4"
          />
        </video>
        <div className={styles.bgFilter} />
      </div>

      <div className={styles.formWrap}>
        {/* Title */}
        <div className={styles.titGroup} data-aos="fade-up" data-aos-duration="1000">
          <h3>
            <span className={styles.colorAccent}>{t('formTitle1')}</span>
            <br />
            {t('formTitle2')}
            <br className="mo" /> {t('formTitle3')}
          </h3>
          <p className={styles.titDesc}>
            {t('formDesc1')}
            <br />
            {t('formDesc2')}
          </p>
        </div>

        {/* Form */}
        <form className={styles.formGroup} onSubmit={handleSubmit} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.topFormGroup}>
            <div className={styles.formBox}>
              <label>{t('labelName')}</label>
              <div className={styles.formLine} />
              <input
                type="text"
                placeholder={t('placeholderName')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={20}
                minLength={2}
              />
            </div>
            <div className={styles.formBox}>
              <label>{t('labelPhone')}</label>
              <div className={styles.formLine} />
              <input
                type="text"
                placeholder={t('placeholderPhone')}
                value={phone}
                onChange={(e) => handlePhoneInput(e.target.value)}
                required
                maxLength={13}
              />
            </div>
            <div className={styles.formBox}>
              <select value={subject} onChange={(e) => setSubject(e.target.value)} required>
                <option value="">{t('subjectDefault')}</option>
                <option value="렌즈삽입술">{t('subjectLens')}</option>
                <option value="재수술">{t('subjectRe')}</option>
                <option value="노안/백내장">{t('subjectPresbyopia')}</option>
                <option value="외래진료">{t('subjectOutpatient')}</option>
                <option value="기타">{t('subjectOther')}</option>
              </select>
            </div>
            <div className={styles.formBox}>
              <select value={time} onChange={(e) => setTime(e.target.value)} required>
                <option value="">{t('timeDefault')}</option>
                <option value="상시가능">{t('timeAnytime')}</option>
                <option value="10:00~12:00">10:00~12:00</option>
                <option value="14:00~16:00">14:00~16:00</option>
                <option value="16:00~18:00">16:00~18:00</option>
              </select>
            </div>
          </div>

          <div className={styles.botFormGroup}>
            <div className={`${styles.formBox} ${styles.textArea}`}>
              <label>{t('labelContent')}</label>
              <div className={styles.formLine} />
              <textarea
                placeholder={t('placeholderContent')}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.checkGroup}>
            <input
              id="privacy-agree"
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className={styles.checkbox}
            />
            <label htmlFor="privacy-agree" className={styles.checkLabel}>
              <span className={styles.cBrown}>{t('privacyRequired')}</span> {t('privacyAgree')}
            </label>
            <button
              type="button"
              className={styles.viewBtn}
              onClick={() => window.open('/legal/privacy')}
            >
              {t('privacyView')}
            </button>
          </div>

          <div className={styles.cautionBox}>
            <p className={styles.cautionBold}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="none">
                <path d="M22.356 17.821L14.728 4.608C14.503 4.217 14.178 3.892 13.788 3.666C13.397 3.44 12.954 3.321 12.502 3.321C12.051 3.321 11.608 3.44 11.217 3.666C10.826 3.892 10.502 4.217 10.277 4.608L2.648 17.821C2.422 18.212 2.303 18.655 2.303 19.106C2.303 19.557 2.421 20.001 2.647 20.392C2.872 20.782 3.197 21.107 3.588 21.332C3.979 21.558 4.423 21.676 4.874 21.676H20.131C20.582 21.676 21.025 21.558 21.416 21.332C21.807 21.107 22.132 20.782 22.358 20.392C22.583 20.001 22.702 19.557 22.702 19.106C22.702 18.655 22.582 18.212 22.356 17.821Z" fill="white"/>
              </svg>
              {t('cautionTitle')}
            </p>
            <p className={styles.cautionDesc}>
              {t('cautionDesc1')}
              <br />
              {t('cautionDesc2')}
            </p>
          </div>

          <div className={styles.submitWrap}>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? t('loading') : t('submit')}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
