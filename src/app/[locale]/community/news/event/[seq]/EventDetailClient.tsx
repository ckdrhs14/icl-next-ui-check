'use client';

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { getLocalizedImg } from '@/utils/localizedImage';
import styles from './page.module.css';

/* placeholder – replace with API fetch */
const PLACEHOLDER_EVENT = {
  seq: 101,
  title: 'ICL 렌즈삽입술 여름 이벤트',
  content: '<p>이벤트 상세 내용이 여기에 표시됩니다.</p>',
  img: '',
  thumb: '',
  showed: true,
  credate: '2025-05-01',
};

export default function EventDetailClient({ seq }: { seq: string }) {
  const router = useRouter();
  const t = useTranslations('community.event');
  const locale = useLocale();
  const li = (src: string) => getLocalizedImg(src, locale);
  const event = PLACEHOLDER_EVENT; // TODO: fetch by seq

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [tel, setTel] = useState('');
  const [content, setContent] = useState('');
  const [agreed, setAgreed] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    if (!agreed) { alert(t('alertAgree')); return; }
    if (!name) { alert(t('alertName')); return; }
    if (!age) { alert(t('alertAge')); return; }
    if (!tel || tel.length < 10) { alert(t('alertTel')); return; }
    setLoading(true);
    try {
      // TODO: POST to API
      // const res = await fetch(`/api/events/${seq}/register`, { method: 'POST', body: JSON.stringify({ name, age, tel, content, agreed }) });
      alert(t('alertSuccess'));
      setName('');
      setAge('');
      setTel('');
      setContent('');
      setAgreed(false);
    } catch {
      alert(t('alertError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Hero */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h3 className={styles.heroTitle}>{t('heroTitle')}</h3>
          <p className={styles.heroSub}>{t('heroSub')}</p>
        </div>
      </section>

      {/* Detail */}
      <section className={styles.detailSection}>
        <div className={styles.container}>
          <div className={styles.titleBox}>
            <p className={styles.tit}>{event.title}</p>
            <p className={styles.detailSpan}>
              <span className={styles.detailName}>{t('admin')}</span>
              <span className={styles.detailDate}>{event.credate}</span>
            </p>
          </div>

          <div className={styles.contentArea}>
            {event.img && (
              <Image src={`/img/board/notice/${event.img}`} alt="" width={960} height={600} style={{ width: '100%', height: 'auto' }} />
            )}
            <div dangerouslySetInnerHTML={{ __html: event.content }} />
          </div>

          {/* Inline Event Form */}
          {event.showed && (
            <div className={styles.eventSection}>
              <div className={styles.eventMImg}>
                <Image src="/img/event/Frame 2081.png" alt={t('labelName')} width={400} height={100} />
              </div>
              <div className={styles.eventMContent}>
                <div className={styles.eventContent}>
                  <div className={styles.eventDetail}>
                    <p>{t('labelName')} <span className={styles.required}>*</span></p>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('placeholderName')} />
                  </div>
                  <div className={styles.eventDetail}>
                    <p>{t('labelAge')} <span className={styles.required}>*</span></p>
                    <input type="text" value={age} onChange={(e) => setAge(e.target.value)} placeholder={t('placeholderAge')} />
                  </div>
                  <div className={styles.eventDetail}>
                    <p>{t('labelTel')} <span className={styles.required}>*</span></p>
                    <input type="text" value={tel} onChange={(e) => setTel(e.target.value.replace(/[^0-9]/g, ''))} placeholder={t('placeholderTel')} />
                  </div>
                  <div className={styles.eventDetail}>
                    <p>{t('labelContent')} <span className={styles.required}>*</span></p>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder={t('placeholderContent')} />
                  </div>
                </div>
                <div className={styles.eventSubmit}>
                  <div className={styles.eventFf}>
                    <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} id="ali-inline" />
                    <label htmlFor="ali-inline"><p><span className={styles.required}>{t('privacyRequired')}</span> {t('privacyAgree')}</p></label>
                    <Image src="/img/event/Frame 93.png" alt={t('privacyAgree')} width={80} height={30} className={styles.btnChk} onClick={() => window.open('/legal/privacy')} />
                  </div>
                  <Image src="/img/event/Frame 91.png" alt={t('alertSuccess')} width={200} height={50} className={`${styles.btnChk} ${styles.pcOnly}`} onClick={() => handleSubmit()} />
                  <Image src="/img/event/Frame 912.png" alt={t('alertSuccess')} width={200} height={50} className={`${styles.btnChk} ${styles.moOnly}`} onClick={() => handleSubmit()} />
                </div>
              </div>
            </div>
          )}

          <div className={styles.backBtnBox}>
            <button className={styles.backBtn} onClick={() => router.back()}>{t('backList')}</button>
          </div>
        </div>
      </section>

      {/* Fixed Sidebar Event Form (PC) */}
      {event.showed && (
        <div className={styles.eventFix}>
          <div className={styles.eventFixInner}>
            <div className={styles.eventImgSetting}>
              <Image src="/img/event/Frame 20811.png" alt={t('labelName')} width={300} height={80} />
            </div>
            <div className={styles.eventFixForm}>
              <div className={styles.eventFixRow}>
                <p>{t('labelName')}<span className={styles.required}> *</span></p>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('placeholderName')} />
              </div>
              <div className={styles.eventFixRow}>
                <p>{t('labelAge')}<span className={styles.required}> *</span></p>
                <input type="text" value={age} onChange={(e) => setAge(e.target.value)} placeholder={t('placeholderAge')} />
              </div>
              <div className={styles.eventFixRow}>
                <p>{t('labelTel')}<span className={styles.required}> *</span></p>
                <input type="text" value={tel} onChange={(e) => setTel(e.target.value.replace(/[^0-9]/g, ''))} placeholder={t('placeholderTelShort')} />
              </div>
              <div className={styles.eventFixRow}>
                <p>{t('labelContent')}<span className={styles.required}> *</span></p>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder={t('placeholderContent')} />
              </div>
            </div>
            <div className={styles.eventFixSubmit}>
              <div className={styles.eventFixAgree}>
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} id="ali-fix" style={{ appearance: 'auto' }} />
                <label htmlFor="ali-fix"><p><span className={styles.required}>{t('privacyRequired')}</span> {t('privacyAgree')}</p></label>
                <Image src="/img/event/Frame 93.png" alt={t('privacyAgree')} width={80} height={30} className={styles.btnChk} onClick={() => window.open('/legal/privacy')} />
              </div>
              <div className={styles.eventFixAgree}>
                <Image src="/img/event/Frame 91.png" alt={t('alertSuccess')} width={200} height={50} className={styles.btnChk} onClick={() => handleSubmit()} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom */}
      <section className={styles.bottomSection}>
        <div className={styles.bottomBgLogo}>
          <Image src="/img/common/snu_logo.png" alt="" width={406} height={421} />
        </div>
        <div className={styles.bottomImgBox}>
          <Image src={li('/img/etc/login_logo_w.png')} alt="" width={204} height={37} className="pc" />
        </div>
        <div className={styles.bottomImgBox}>
          <Image src={li('/img/etc/mem_sub_com_text_n.png')} alt="" width={639} height={84} className="pc" />
          <Image src={li('/img/etc/mem_sub_com_text_mo_n.png')} alt="" width={286} height={74} className="mo" />
        </div>
      </section>
    </div>
  );
}
