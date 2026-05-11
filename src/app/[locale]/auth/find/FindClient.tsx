'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { getLocalizedImg } from '@/utils/localizedImage';
import Image from 'next/image';
import styles from './page.module.css';

export default function FindClient() {
  const t = useTranslations('auth.find');
  const locale = useLocale();
  const li = (src: string) => getLocalizedImg(src, locale);
  const [activeTab, setActiveTab] = useState<'id' | 'pw'>('id');

  const [idName, setIdName] = useState('');
  const [idPhone, setIdPhone] = useState('');
  const [idResult, setIdResult] = useState('');

  const [pwUserId, setPwUserId] = useState('');
  const [pwName, setPwName] = useState('');
  const [pwPhone, setPwPhone] = useState('');
  const [pwResult, setPwResult] = useState('');

  const handleFindId = async (e: FormEvent) => {
    e.preventDefault();
    if (!idName.trim()) { alert(t('alertName')); return; }
    if (!idPhone.trim()) { alert(t('alertPhone')); return; }
    setIdResult(t('resultNoId'));
  };

  const handleResetPw = async (e: FormEvent) => {
    e.preventDefault();
    if (!pwUserId.trim()) { alert(t('alertId')); return; }
    if (!pwName.trim()) { alert(t('alertName')); return; }
    if (!pwPhone.trim()) { alert(t('alertPhone')); return; }
    setPwResult(t('resultNoAccount'));
  };

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

          <div className={styles.tabGroup}>
            <button className={`${styles.tabBtn} ${activeTab === 'id' ? styles.tabBtnActive : ''}`} onClick={() => { setActiveTab('id'); setIdResult(''); }}>
              {t('tabFindId')}
            </button>
            <button className={`${styles.tabBtn} ${activeTab === 'pw' ? styles.tabBtnActive : ''}`} onClick={() => { setActiveTab('pw'); setPwResult(''); }}>
              {t('tabResetPw')}
            </button>
          </div>

          {activeTab === 'id' && (
            <div className={styles.resetWrapper}>
              <form onSubmit={handleFindId}>
                <div className={styles.inputBox}>
                  <label>{t('labelName')}</label>
                  <input type="text" placeholder={t('placeholderName')} value={idName} onChange={(e) => setIdName(e.target.value)} required />
                </div>
                <div className={styles.inputBox}>
                  <label>{t('labelPhone')}</label>
                  <input type="text" placeholder={t('placeholderPhone')} value={idPhone} onChange={(e) => setIdPhone(e.target.value.replace(/[^0-9]/g, ''))} required />
                </div>
                <button type="submit" className={styles.submitBtn}>{t('submitConfirm')}</button>
              </form>
              {idResult && <p className={styles.resultText}>{idResult}</p>}
            </div>
          )}

          {activeTab === 'pw' && (
            <div className={styles.resetWrapper}>
              <form onSubmit={handleResetPw}>
                <div className={styles.inputBox}>
                  <label>{t('labelId')}</label>
                  <input type="text" placeholder={t('placeholderId')} value={pwUserId} onChange={(e) => setPwUserId(e.target.value)} required />
                </div>
                <div className={styles.inputBox}>
                  <label>{t('labelName')}</label>
                  <input type="text" placeholder={t('placeholderName')} value={pwName} onChange={(e) => setPwName(e.target.value)} required />
                </div>
                <div className={styles.inputBox}>
                  <label>{t('labelPhone')}</label>
                  <input type="text" placeholder={t('placeholderPhone')} value={pwPhone} onChange={(e) => setPwPhone(e.target.value.replace(/[^0-9]/g, ''))} required />
                </div>
                <button type="submit" className={styles.submitBtn}>{t('submitResetPw')}</button>
              </form>
              {pwResult && <p className={styles.resultText}>{pwResult}</p>}
            </div>
          )}
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
