'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { getLocalizedImg } from '@/utils/localizedImage';
import styles from './page.module.css';

/* placeholder data – replace with API fetch */
const ALL_COLUMNS = [
  { seq: 1, title: '렌즈삽입술 전 꼭 알아야 할 검사 항목', content: '<p>렌즈삽입술(ICL) 전 검사는 수술 결과를 좌우하는 가장 중요한 단계입니다. 각막 지형도, 전방 깊이, 안축장 길이, 각막 내피세포 수 등 정밀한 검사를 통해 환자 개인에게 최적화된 렌즈를 선택합니다.</p>', img: '', startDate: '2025-04-10' },
  { seq: 2, title: 'ICL 수술 후 일상복귀는 언제부터 가능한가요?', content: '<p>ICL 렌즈삽입술은 각막을 깎지 않는 시력교정술로, 수술 다음 날부터 일상 복귀가 가능합니다. 다만 수술 후 1주일간은 눈을 비비거나 수영 등 물놀이는 삼가야 합니다.</p>', img: '', startDate: '2025-03-25' },
  { seq: 3, title: '고도근시와 녹내장의 관계', content: '<p>고도근시 환자는 녹내장 발생 위험이 일반인 대비 2~3배 높습니다. 안압 측정과 시신경 검사를 정기적으로 받는 것이 중요하며, ICL 수술 전 녹내장 여부를 반드시 확인해야 합니다.</p>', img: '', startDate: '2025-03-10' },
  { seq: 4, title: 'EVO+ ICL이란 무엇인가?', content: '<p>EVO+ ICL은 기존 ICL에 비해 광학부가 확대되어 야간 빛 번짐이 줄어든 차세대 렌즈입니다. 중앙에 360μm 크기의 홀(KS-AquaPORT)이 있어 홍채 절개 없이도 방수 순환이 가능합니다.</p>', img: '', startDate: '2025-02-20' },
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
            <p className={styles.tit}>{column.title}</p>
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
            <div dangerouslySetInnerHTML={{ __html: column.content }} />
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
                      <div className={styles.relatedCardTitle}>{rc.title}</div>
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
