'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { getLocalizedImg } from '@/utils/localizedImage';
import styles from './page.module.css';

/* placeholder data – replace with API fetch */
const ALL_COLUMNS = [
  { seq: 1, titleKey: 0, contentKey: 0, img: '', startDate: '2025-04-10' },
  { seq: 2, titleKey: 1, contentKey: 1, img: '', startDate: '2025-03-25' },
  { seq: 3, titleKey: 2, contentKey: 2, img: '', startDate: '2025-03-10' },
  { seq: 4, titleKey: 3, contentKey: 3, img: '', startDate: '2025-02-20' },
];

export default function ColumnDetailClient({ seq }: { seq: string }) {
  const router = useRouter();
  const t = useTranslations('community.column');
  const locale = useLocale();
  const li = (src: string) => getLocalizedImg(src, locale);

  const column = ALL_COLUMNS.find((c) => String(c.seq) === seq) ?? ALL_COLUMNS[0];

  /* 관련 칼럼: 현재 글 제외한 최신 3개 (작업 4) */
  const relatedColumns = ALL_COLUMNS.filter((c) => c.seq !== column.seq).slice(0, 3);

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
          {/* Title */}
          <div className={styles.titleBox}>
            <p className={styles.tit}>{t(`placeholderItems.${column.titleKey}`)}</p>
          </div>

          {/* 작업 3: Column Meta */}
          <div className={styles.columnMeta}>
            <span className={styles.metaAuthor}>
              {t('authorName')} ({t('authorTitle')})
            </span>
            <time className={styles.metaTime} dateTime={column.startDate}>
              {locale === 'ko'
                ? column.startDate.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1년 $2월 $3일')
                : column.startDate
              }
            </time>
            <span className={styles.metaReviewed}>
              {t('reviewed')}
            </span>
            <span className={styles.metaBadge}>{t('badge')}</span>
          </div>

          {/* Content */}
          <div className={styles.contentArea}>
            {column.img && (
              <Image src={`/img/board/notice/${column.img}`} alt="" width={960} height={600} style={{ width: '100%', height: 'auto' }} />
            )}
            <div dangerouslySetInnerHTML={{ __html: t.raw(`placeholderContents.${column.contentKey}`) }} />
          </div>

          {/* 작업 4: Related Columns */}
          {relatedColumns.length > 0 && (
            <div className={styles.relatedSection}>
              <h4 className={styles.relatedTitle}>{t('relatedTitle')}</h4>
              <div className={styles.relatedGrid}>
                {relatedColumns.map((rc) => (
                  <div
                    key={rc.seq}
                    className={styles.relatedCard}
                    onClick={() => router.push(`/community/column/${rc.seq}`)}
                  >
                    <div className={styles.relatedCardImg}>
                      {rc.img ? (
                        <Image src={`/img/board/notice/${rc.img}`} alt="" width={300} height={160} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                      ) : (
                        <Image src="/img/logo_color.svg" alt="" width={140} height={40} style={{ width: '60%', height: 'auto' }} />
                      )}
                    </div>
                    <div className={styles.relatedCardTxt}>
                      <div className={styles.relatedCardTitle}>{t(`placeholderItems.${rc.titleKey}`)}</div>
                      <div className={styles.relatedCardDate}>{rc.startDate}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={styles.backBtnBox}>
            <button className={styles.backBtn} onClick={() => router.push('/community/column')}>{t('backList')}</button>
          </div>
        </div>
      </section>

      {/* Bottom */}
      <section className={styles.bottomSection}>
        <div className={styles.bottomBgLogo}>
          <Image src="/img/common/snu_logo.png" alt="" width={406} height={421} />
        </div>
        <div className={styles.bottomImgBox}>
          <Image src={li('/img/etc/login_logo_w.png')} alt="" width={204} height={37} />
        </div>
        <div className={styles.bottomImgBox}>
          <Image src={li('/img/etc/mem_sub_com_text_n.png')} alt="" width={639} height={84} className="pc" />
          <Image src={li('/img/etc/mem_sub_com_text_mo_n.png')} alt="" width={286} height={74} className="mo" />
        </div>
      </section>
    </div>
  );
}
