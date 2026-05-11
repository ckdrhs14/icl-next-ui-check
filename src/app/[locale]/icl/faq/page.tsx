import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';
import { getLocalizedImg } from '@/utils/localizedImage';
import styles from './page.module.css';

export async function generateMetadata() {
  const t = await getTranslations('icl.faq');
  return { title: t('metaTitle'), description: t('metaDesc') };
}

export default async function FaqPage() {
  const locale = await getLocale();
  const li = (src: string) => getLocalizedImg(src, locale);
  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.faqHeader}>
        <div className={`${styles.faqHeaderPc} pc`}>
          <Image src={li('/img/faq_header.png')} alt="ICL FAQ" width={1920} height={500} priority />
        </div>
        <div className={`${styles.faqHeaderMb} mo`}>
          <Image src={li('/img/faq_header_m.png')} alt="ICL FAQ" width={768} height={400} priority />
        </div>
      </div>

      {/* FAQ Content */}
      <div className={styles.faqCont}>
        <div className={styles.faqImg} data-aos="fade-up" data-aos-duration="1000">
          <Image src={li('/img/faq.png')} alt="FAQ" width={1200} height={3000} className="pc" />
          <Image src={li('/img/faq_m.png')} alt="FAQ" width={768} height={3000} className={styles.faqMbImg} />
        </div>
      </div>

      {/* Bottom Banner */}
      <div className={styles.bottomSection}>
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
      </div>
    </div>
  );
}
