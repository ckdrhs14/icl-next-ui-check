import { getTranslations } from 'next-intl/server';
import styles from '../legal.module.css';

export async function generateMetadata() {
  const t = await getTranslations('legal.privacy');
  return { title: t('metaTitle'), description: t('metaDesc') };
}

export default async function PrivacyPage() {
  const t = await getTranslations('legal.privacy');
  return (
    <div className={styles.wrapper}>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h3 className={styles.heroTitle}>{t('heroTitle')}</h3>
          <p className={styles.heroSub}>{t('heroSub')}</p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.contentInner}>
          <h2 className={styles.pageTitle}>{t('pageTitle')}</h2>

          <div className={styles.indexBox}>
            {Array.from({ length: 13 }, (_, i) => (
              <p key={i}>{t(`index${String(i + 1).padStart(2, '0')}`)}</p>
            ))}
          </div>

          <div className={styles.textBox}>
            <h4>{t('sec1Title')}</h4>
            <p>{t('sec1Desc')}</p>
            <p style={{ whiteSpace: 'pre-line' }}>{t('sec1Items')}</p>

            <h4>{t('sec2Title')}</h4>
            <p>{t('sec2Desc')}</p>
            <p style={{ whiteSpace: 'pre-line' }}>{t('sec2Items')}</p>

            <h4>{t('sec3Title')}</h4>
            <p>{t('sec3Desc')}</p>
            <p style={{ whiteSpace: 'pre-line' }}>{t('sec3Items')}</p>

            <h4>{t('officerTitle')}</h4>
            <table className={styles.table}>
              <thead>
                <tr><th>{t('thName')}</th><th>{t('thPosition')}</th><th>{t('thDept')}</th><th>{t('thPhone')}</th></tr>
              </thead>
              <tbody>
                <tr><td>{t('officerName')}</td><td>{t('officerPosition')}</td><td>{t('officerDept')}</td><td>02-566-1215</td></tr>
              </tbody>
            </table>

            <h4>{t('sec4Title')}</h4>
            <p>{t('sec4Desc')}</p>
            <p>{t('sec4Note')}</p>

            <h4>{t('sec5Title')}</h4>
            <p>{t('sec5Desc')}</p>

            <h4>{t('sec6Title')}</h4>
            <p>{t('sec6Desc')}</p>

            <h4>{t('sec7Title')}</h4>
            <p style={{ whiteSpace: 'pre-line' }}>{t('sec7Items')}</p>

            <h4>{t('sec8Title')}</h4>
            <p>{t('sec8Desc')}</p>

            <h4>{t('sec9Title')}</h4>
            <p style={{ whiteSpace: 'pre-line' }}>{t('sec9Desc')}</p>
            <p style={{ whiteSpace: 'pre-line' }}>{t('sec9Date')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
