'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from '../legal.module.css';

export default function NonCoveredClient() {
  const t = useTranslations('legal.nonCovered');
  const [activeTab, setActiveTab] = useState('cert');

  const TABS = [
    { key: 'cert', label: t('tabCert') },
    { key: 'procedure', label: t('tabProcedure') },
    { key: 'material', label: t('tabMaterial') },
  ];

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

          <div className={styles.tabGroup}>
            {TABS.map((tab) => (
              <button key={tab.key} className={`${styles.tabBtn} ${activeTab === tab.key ? styles.tabBtnActive : ''}`} onClick={() => setActiveTab(tab.key)}>
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'cert' && (
            <table className={styles.table}>
              <thead>
                <tr><th>{t('thCode')}</th><th>{t('thName')}</th><th>{t('thClassification')}</th><th>{t('thCost')}</th><th>{t('thLastUpdated')}</th></tr>
              </thead>
              <tbody>
                <tr><td>PDZ010000</td><td>일반진단서</td><td>재발급 1,000원/건</td><td>20,000원</td><td>2024-05-14</td></tr>
                <tr><td>PDE010001</td><td>영문진단서</td><td>재발급 1,000원/건</td><td>20,000원</td><td>2024-05-14</td></tr>
                <tr><td>PDZ080000</td><td>병무용진단서</td><td>재발급 1,000원/건</td><td>20,000원</td><td>2024-05-14</td></tr>
                <tr><td>PDZ090002</td><td>입퇴원확인서</td><td>재발급 1,000원/건</td><td>3,000원</td><td>2024-05-14</td></tr>
                <tr><td>PDZ090004</td><td>통원확인서</td><td>재발급 1,000원/건</td><td>3,000원</td><td>2024-05-14</td></tr>
                <tr><td>PDZ090007</td><td>진료확인서</td><td>재발급 1,000원/건</td><td>3,000원</td><td>2024-05-14</td></tr>
                <tr><td>PDZ150000</td><td>입원사실증명</td><td>재발급 1,000원/건</td><td>3,000원</td><td>2024-05-14</td></tr>
                <tr><td>PDZ110101</td><td>진료기록사본</td><td>1~5매</td><td>1,000원</td><td>2024-05-14</td></tr>
                <tr><td>PDZ110102</td><td>진료기록사본</td><td>6매 이상</td><td>100원</td><td>2024-05-14</td></tr>
                <tr><td>PDZ020001</td><td>상해진단서</td><td>3주 미만</td><td>100,000원</td><td>2024-05-14</td></tr>
                <tr><td>PDZ020002</td><td>상해진단서</td><td>3주 이상</td><td>150,000원</td><td>2024-05-14</td></tr>
                <tr><td>PDZ070001</td><td>장애진단서</td><td>신체장애</td><td>15,000원</td><td>2024-05-14</td></tr>
                <tr><td>-</td><td>세부내역서</td><td>-</td><td>{t('free')}</td><td>2024-05-14</td></tr>
                <tr><td>-</td><td>납입확인서</td><td>-</td><td>{t('free')}</td><td>2024-05-14</td></tr>
              </tbody>
            </table>
          )}

          {activeTab === 'procedure' && (
            <table className={styles.table}>
              <thead>
                <tr><th>{t('thCategory')}</th><th>{t('thSubCategory')}</th><th>{t('thCode')}</th><th>{t('thName')}</th><th>{t('thClassification')}</th><th>{t('thMinCost')}</th><th>{t('thMaxCost')}</th><th>{t('thPriceIncluded')}</th><th>{t('thRemarks')}</th><th>{t('thLastUpdated')}</th></tr>
              </thead>
              <tbody>
                <tr><td>검사료</td><td>시기능검사</td><td>EZ799</td><td>간섭에 의한 눈물 지질층 두께 측정</td><td>양안</td><td>60,000원</td><td>140,000원</td><td></td><td></td><td>2024-05-14</td></tr>
                <tr><td>검사료</td><td>일반진단검사</td><td>AV15</td><td>아벨리노검사</td><td></td><td>150,000원</td><td></td><td></td><td>위탁</td><td>2024-05-14</td></tr>
                <tr><td>기타</td><td>기타</td><td>TICL</td><td>안내렌즈삽입술</td><td>양안</td><td>6,500,000원</td><td></td><td>Y</td><td>약제비 포함 / 양안</td><td>2024-05-14</td></tr>
                <tr><td>기타</td><td>기타</td><td>ICL</td><td>안내렌즈삽입술</td><td>양안</td><td>5,500,000원</td><td></td><td>Y</td><td>약제비 포함 / 양안</td><td>2024-05-14</td></tr>
                <tr><td>처치 및 수술료등</td><td>감각기</td><td></td><td>백내장및수정체수술-수정체유화술</td><td>단안</td><td>1,000,000원</td><td>5,000,000원</td><td>Y</td><td>인공수정체 종류에 따라 다름</td><td>2024-05-14</td></tr>
                <tr><td>처치 및 수술료등</td><td></td><td></td><td>결막모반제거술</td><td>단안</td><td>150,000원</td><td>300,000원</td><td></td><td>크기에따라 다름</td><td>2024-05-14</td></tr>
                <tr><td>검사료</td><td>시기능검사</td><td>E7801</td><td>눈의 계측검사[편측]-레이저</td><td>단안</td><td>35,000원</td><td>200,000원</td><td></td><td>급여인정 기준외실시</td><td>2024-05-14</td></tr>
                <tr><td>검사료</td><td>시기능검사</td><td>EZ796</td><td>안구광학단층촬영[편측]</td><td>단안</td><td>35,000원</td><td>200,000원</td><td></td><td>급여인정 기준외실시</td><td>2024-05-14</td></tr>
                <tr><td>검사료</td><td>시기능검사</td><td>EZ798</td><td>각막단층촬영</td><td>양안</td><td>20,000원</td><td>100,000원</td><td></td><td></td><td>2024-05-14</td></tr>
              </tbody>
            </table>
          )}

          {activeTab === 'material' && (
            <table className={styles.table}>
              <thead>
                <tr><th>{t('thCategory')}</th><th>{t('thCode')}</th><th>{t('thName')}</th><th>{t('thClassification')}</th><th>{t('thCost')}</th><th>{t('thPriceIncluded')}</th><th>{t('thLastUpdated')}</th></tr>
              </thead>
              <tbody>
                <tr><td>드림렌즈</td><td>ocu</td><td>오큐소프트</td><td></td><td>24,000원</td><td></td><td>2024-05-14</td></tr>
                <tr><td>드림렌즈</td><td>dmdx</td><td>데모덱스</td><td></td><td>28,000원</td><td></td><td>2024-05-14</td></tr>
                <tr><td>드림렌즈</td><td></td><td>렌즈세척액</td><td></td><td>8,000원</td><td></td><td>2024-05-14</td></tr>
                <tr><td>드림렌즈</td><td></td><td>렌즈보존액</td><td></td><td>12,000원</td><td></td><td>2024-05-14</td></tr>
                <tr><td>드림렌즈</td><td></td><td>단백질제거제</td><td></td><td>13,000원</td><td></td><td>2024-05-14</td></tr>
                <tr><td>드림렌즈</td><td></td><td>단백질제거제2</td><td></td><td>12,000원</td><td></td><td>2024-05-14</td></tr>
                <tr><td>드림렌즈</td><td>4Z0440401</td><td>Paragon CRT 100</td><td>양안</td><td>1,000,000원</td><td></td><td>2024-05-14</td></tr>
                <tr><td>드림렌즈</td><td>4Z0440402</td><td>Paragon CRT 100 Dual Axis</td><td>양안</td><td>1,200,000원</td><td></td><td>2024-05-14</td></tr>
                <tr><td>조절성 인공수정체</td><td>BI2012EB</td><td>클라레온 팬옵틱스 토릭</td><td>단안</td><td>6,000,000원</td><td>치료재료대 가격포함</td><td>2024-05-14</td></tr>
                <tr><td>조절성 인공수정체</td><td>BI0211EB</td><td>클라레온 팬옵틱스</td><td>단안</td><td>5,000,000원</td><td>치료재료대 가격포함</td><td>2024-05-14</td></tr>
                <tr><td>조절성 인공수정체</td><td>BI0201DB</td><td>VIVINEX™ GEMETRIC™</td><td>단안</td><td>5,000,000원</td><td>치료재료대 가격포함</td><td>2024-05-14</td></tr>
                <tr><td>조절성 인공수정체</td><td>BI0200DB</td><td>VIVINEX™ GEMETRIC™ TORIC</td><td>단안</td><td>6,000,000원</td><td>치료재료대 가격포함</td><td>2024-05-14</td></tr>
                <tr><td>조절성 인공수정체</td><td>BI0207LN</td><td>TECNIS EYHANCE</td><td>단안</td><td>3,000,000원</td><td>치료재료대 가격포함</td><td>2026-03-01</td></tr>
                <tr><td>조절성 인공수정체</td><td>BI0200LN</td><td>TECNIS EYHANCE TORIC II IOL</td><td>단안</td><td>3,500,000원</td><td>치료재료대 가격포함</td><td>2026-03-01</td></tr>
                <tr><td>조절성 인공수정체</td><td>BI0203OZ</td><td>AT LISA TRI 839MP</td><td>단안</td><td>4,000,000원</td><td>치료재료대 가격포함</td><td>2024-05-14</td></tr>
                <tr><td>조절성 인공수정체</td><td>BI0204OZ</td><td>AT LISA TRI TORIC 939M(P)</td><td>단안</td><td>4,500,000원</td><td>치료재료대 가격포함</td><td>2024-05-14</td></tr>
                <tr><td>조절성 인공수정체</td><td>BI0203KU</td><td>FINEVISION, POD F GF</td><td>단안</td><td>4,500,000원</td><td>치료재료대 가격포함</td><td>2024-05-14</td></tr>
                <tr><td>조절성 인공수정체</td><td>BI0201KU</td><td>FINEVISION, POD F</td><td>단안</td><td>4,500,000원</td><td>치료재료대 가격포함</td><td>2024-05-14</td></tr>
                <tr><td>조절성 인공수정체</td><td>BI0202KU</td><td>FINEVISION TORIC, POD FT</td><td>단안</td><td>5,000,000원</td><td>치료재료대 가격포함</td><td>2024-05-14</td></tr>
                <tr><td>조절성 인공수정체</td><td>BI0203CY</td><td>ISOPURE</td><td>단안</td><td>2,000,000원</td><td>치료재료대 가격포함</td><td>2024-05-14</td></tr>
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}
