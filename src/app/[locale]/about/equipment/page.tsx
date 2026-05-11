import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import styles from './page.module.css';

export async function generateMetadata() {
  const t = await getTranslations('about.equipment');
  return { title: t('metaTitle'), description: t('metaDesc') };
}

export default async function EquipmentPage() {
  const t = await getTranslations('about.equipment');

  const EQUIPMENT_SEC1 = [
    {
      num: '01',
      img: '/img/equip/equip_sec1_img_01.png',
      name: t('equip0Name'),
      medium: t('equip0Medium'),
      desc: t('equip0Desc'),
    },
    {
      num: '02',
      img: '/img/equip/equip_sec1_img_02.png',
      name: t('equip1Name'),
      medium: t('equip1Medium'),
      desc: t('equip1Desc'),
    },
    {
      num: '03',
      img: '/img/equip/equip_sec1_img_03.png',
      name: t('equip2Name'),
      medium: t('equip2Medium'),
      desc: t('equip2Desc'),
    },
    {
      num: '04',
      img: '/img/equip/equip_sec1_img_04.png',
      name: t('equip3Name'),
      medium: t('equip3Medium'),
      desc: t('equip3Desc'),
    },
    {
      num: '05',
      img: '/img/equip/equip_sec1_img_05.png',
      name: t('equip4Name'),
      medium: t('equip4Medium'),
      desc: t('equip4Desc'),
    },
    {
      num: '06',
      img: '/img/equip/equip_sec1_img_06.png',
      name: t('equip5Name'),
      medium: t('equip5Medium'),
      desc: t('equip5Desc'),
    },
    {
      num: '07',
      img: '/img/equip/equip_sec1_img_07.png',
      name: t('equip6Name'),
      medium: t('equip6Medium'),
      desc: t('equip6Desc'),
    },
    {
      num: '08',
      img: '/img/equip/equip_sec1_img_08.png',
      name: t('equip7Name'),
      medium: t('equip7Medium'),
      desc: t('equip7Desc'),
    },
    {
      num: '09',
      img: '/img/equip/equip_sec1_img_09.png',
      name: t('equip8Name'),
      medium: t('equip8Medium'),
      desc: t('equip8Desc'),
    },
    {
      num: '10',
      img: '/img/equip/equip_sec1_img_10.png',
      name: t('equip9Name'),
      medium: t('equip9Medium'),
      desc: t('equip9Desc'),
    },
    {
      num: '11',
      img: '/img/equip/equip_sec1_img_11.png',
      name: t('equip10Name'),
      medium: t('equip10Medium'),
      desc: t('equip10Desc'),
    },
    {
      num: '12',
      img: '/img/equip/equip_sec1_img_12.png',
      name: t('equip11Name'),
      medium: t('equip11Medium'),
      desc: t('equip11Desc'),
    },
    {
      num: '13',
      img: '/img/equip/equip_sec1_img_13.png',
      name: t('equip12Name'),
      medium: t('equip12Medium'),
      desc: t('equip12Desc'),
    },
    {
      num: '14',
      img: '/img/equip/equip_sec1_img_14.png',
      name: t('equip13Name'),
      medium: t('equip13Medium'),
      desc: t('equip13Desc'),
    },
    {
      num: '15',
      img: '/img/equip/equip_sec1_img_15.png',
      name: t('equip14Name'),
      medium: t('equip14Medium'),
      desc: t('equip14Desc'),
    },
  ];

  const EQUIPMENT_SEC2 = [
    {
      num: '01',
      img: '/img/equip/equip_sec2_img_01.png',
      name: t('clean0Name'),
      medium: t('clean0Medium'),
      desc: t('clean0Desc'),
    },
    {
      num: '02',
      img: '/img/equip/equip_sec2_img_02.png',
      name: t('clean1Name'),
      medium: t('clean1Medium'),
      desc: t('clean1Desc'),
    },
    {
      num: '03',
      img: '/img/equip/equip_sec2_img_03.png',
      name: t('clean2Name'),
      medium: t('clean2Medium'),
      desc: t('clean2Desc'),
    },
    {
      num: '04',
      img: '/img/equip/equip_sec2_img_04.png',
      name: t('clean3Name'),
      medium: t('clean3Medium'),
      desc: t('clean3Desc'),
    },
    {
      num: '05',
      img: '/img/equip/equip_sec2_img_05.png',
      name: t('clean4Name'),
      medium: t('clean4Medium'),
      desc: t('clean4Desc'),
    },
    {
      num: '06',
      img: '/img/equip/equip_sec2_img_06.png',
      name: t('clean5Name'),
      medium: t('clean5Medium'),
      desc: t('clean5Desc'),
    },
  ];

  return (
    <div className={styles.wrapper}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent} data-aos="fade-up" data-aos-duration="1000">
          <h3 className={styles.heroTitle}>{t('heroTitle')}</h3>
          <p className={styles.heroSub}>{t('heroSub')}</p>
        </div>
      </section>

      {/* Section 1: Equipment List */}
      <section className={styles.sec1}>
        <div className={styles.sectionInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.sectionTit}>
            <h3 className={`${styles.sectionTitH3} ${styles.teal}`}>{t('sectionTitle')}</h3>
            <p>
              {t('sectionDesc')}
            </p>
          </div>
          <div className={styles.equipList}>
            {EQUIPMENT_SEC1.map((equip, idx) => (
              <div key={idx} className={styles.equipBox}>
                <div className={styles.equipImgBox}>
                  <Image src={equip.img} alt={equip.name} width={500} height={400} />
                  <div className={styles.numBox}>
                    <p>{equip.num}</p>
                  </div>
                </div>
                <div className={styles.desBox}>
                  <h4 className={styles.desBoxH4}>{equip.name}</h4>
                  <div className={styles.desBoxLine} />
                  <p className={styles.desBoxMedium}>{equip.medium}</p>
                  <p className={styles.desBoxDesc}>{equip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Cleaning System */}
      <section className={styles.sec2}>
        <div className={styles.sectionInner} data-aos="fade-up" data-aos-duration="1000">
          <div className={styles.sectionTit}>
            <h3 className={`${styles.sec2TitH3} ${styles.brown}`}>
              {t('cleaningTitle')}
            </h3>
            <p>
              {t('cleaningDesc')}
            </p>
          </div>
          <div className={styles.sec2List}>
            {EQUIPMENT_SEC2.map((equip, idx) => (
              <div key={idx} className={styles.equipBox}>
                <div className={styles.equipImgBox}>
                  <Image src={equip.img} alt={equip.name} width={500} height={400} />
                  <div className={`${styles.numBox} ${styles.numBoxBrown}`}>
                    <p>{equip.num}</p>
                  </div>
                </div>
                <div className={styles.desBox}>
                  <h4 className={styles.desBoxH4}>{equip.name}</h4>
                  <div className={`${styles.desBoxLine} ${styles.desBoxLineBrown}`} />
                  <p className={styles.desBoxMedium}>{equip.medium}</p>
                  <p className={styles.desBoxDesc}>{equip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
