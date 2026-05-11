'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { getLocalizedImg } from '@/utils/localizedImage';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function LoginClient() {
  const t = useTranslations('auth.login');
  const locale = useLocale();
  const li = (src: string) => getLocalizedImg(src, locale);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [keepLogin, setKeepLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!userId.trim()) { alert(t('alertId')); return; }
    if (!password.trim()) { alert(t('alertPw')); return; }
    setLoading(true);
    try {
      // TODO: POST login API
    } catch {
      alert(t('alertError'));
    } finally {
      setLoading(false);
    }
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

          <form onSubmit={handleSubmit} className={styles.form}>
            <input type="text" placeholder={t('placeholderId')} value={userId} onChange={(e) => setUserId(e.target.value)} className={styles.input} required />
            <input type="password" placeholder={t('placeholderPw')} value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} required />

            <div className={styles.checkGroup}>
              <input id="keep-login" type="checkbox" checked={keepLogin} onChange={(e) => setKeepLogin(e.target.checked)} className={styles.checkbox} />
              <label htmlFor="keep-login" className={styles.checkLabel}>{t('keepLogin')}</label>
            </div>

            <button type="submit" className={styles.loginBtn} disabled={loading}>
              {loading ? t('loading') : t('submit')}
            </button>
          </form>

          <div className={styles.linkGroup}>
            <Link href="/auth/find">{t('findPw')}</Link>
            <span className={styles.linkDivider}>|</span>
            <Link href="/auth/find">{t('findId')}</Link>
            <span className={styles.linkDivider}>|</span>
            <Link href="/auth/register">{t('register')}</Link>
          </div>

          <div className={styles.snsGroup}>
            <div className={styles.snsTitle}>
              <span className={styles.snsLine} />
              <span>{t('snsTitle')}</span>
              <span className={styles.snsLine} />
            </div>
            <div className={styles.snsBtns}>
              <button type="button" className={styles.snsBtn}>
                <Image src="/img/common/icon_kakao_cir.png" alt="" width={40} height={40} />
                <span>{t('kakaoLogin')}</span>
              </button>
              <button type="button" className={styles.snsBtn}>
                <Image src="/img/common/icon_naver_cir.png" alt="" width={40} height={40} />
                <span>{t('naverLogin')}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.bottomSection}>
        <div className={styles.bottomBgLogo}>
          <Image src="/img/common/snu_logo.png" alt="" width={406} height={421} />
        </div>
        <div className={styles.bottomImgBox} data-aos="fade-up" data-aos-duration="1000">
          <Image src={li('/img/etc/login_logo_w.png')} alt="" width={204} height={37} />
        </div>
        <div className={styles.bottomImgBox} data-aos="fade-up" data-aos-duration="1000">
          <Image src={li('/img/etc/mem_sub_com_text_n.png')} alt="" width={639} height={84} className="pc" />
          <Image src={li('/img/etc/mem_sub_com_text_mo_n.png')} alt="" width={286} height={74} className="mo" />
        </div>
      </section>
    </div>
  );
}
