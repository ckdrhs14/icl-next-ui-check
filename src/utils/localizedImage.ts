/**
 * Returns locale-specific image/video path.
 * For 'en' locale, swaps to the English version if available.
 */

const LOCALIZED_IMAGES: Record<string, string> = {
  // Logos
  '/img/logo_white.svg': '/img/en/logo_white.svg',
  '/img/logo_color.svg': '/img/en/logo_color.svg',
  // etc
  '/img/etc/login_logo.png': '/img/etc/en/login_logo.png',
  '/img/etc/login_logo_w.png': '/img/etc/en/login_logo_w.png',
  '/img/etc/mem_sub_com_text_n.png': '/img/etc/en/mem_sub_com_text_n.png',
  '/img/etc/mem_sub_com_text_mo_n.png': '/img/etc/en/mem_sub_com_text_mo_n.png',
  // cat (cataract)
  '/img/cat/cat_s1_1.png': '/img/cat/en/cat_s1_1.png',
  '/img/cat/cat_s1_2.png': '/img/cat/en/cat_s1_2.png',
  '/img/cat/cat_s7_1.png': '/img/cat/en/cat_s7_1.png',
  '/img/cat/cat_s7_2.png': '/img/cat/en/cat_s7_2.png',
  // common icons
  '/img/common/icon_cal_br.png': '/img/common/en/icon_cal_br.png',
  '/img/common/icon_cal_nbr.png': '/img/common/en/icon_cal_nbr.png',
  '/img/common/icon_kakao_br.png': '/img/common/en/icon_kakao_br.png',
  '/img/common/icon_kakao_nbr.png': '/img/common/en/icon_kakao_nbr.png',
  '/img/common/icon_map_br.png': '/img/common/en/icon_map_br.png',
  '/img/common/icon_map_nbr.png': '/img/common/en/icon_map_nbr.png',
  // dise (disease / special)
  '/img/dise/dis1_sec1_img1.png': '/img/dise/en/dis1_sec1_img1.png',
  '/img/dise/dis1_sec1_img1_mo.png': '/img/dise/en/dis1_sec1_img1_mo.png',
  '/img/dise/dis1_sec1_img6.png': '/img/dise/en/dis1_sec1_img6.png',
  '/img/dise/dis1_sec1_img7.png': '/img/dise/en/dis1_sec1_img7.png',
  '/img/dise/dis1_sec4_img2.png': '/img/dise/en/dis1_sec4_img2.png',
  '/img/dise/dis1_sec4_img3.png': '/img/dise/en/dis1_sec4_img3.png',
  '/img/dise/dis4_sec1_img1.png': '/img/dise/en/dis4_sec1_img1.png',
  '/img/dise/dis4_sec1_img1_m.png': '/img/dise/en/dis4_sec1_img1_m.png',
  '/img/dise/dis4_sec2_img1.png': '/img/dise/en/dis4_sec2_img1.png',
  '/img/dise/dis4_sec2_img1_m.png': '/img/dise/en/dis4_sec2_img1_m.png',
  '/img/dise/dis4_sec2_img3.png': '/img/dise/en/dis4_sec2_img3.png',
  '/img/dise/n_dis4_sec6_img1.png': '/img/dise/en/n_dis4_sec6_img1.png',
  '/img/dise/n_dis4_sec6_img2.png': '/img/dise/en/n_dis4_sec6_img2.png',
  '/img/dise/n_dis4_sec6_img3.png': '/img/dise/en/n_dis4_sec6_img3.png',
  // int (doctor, info)
  '/img/int/int1_sec2_text_20250902.webp': '/img/int/en/int1_sec2_text.png',
  '/img/int/m_int1_sec2_text_20250902.webp': '/img/int/en/int1_sec2_text.png',
  '/img/int/int1_sec2_text_n.png': '/img/int/en/int1_sec2_text_n.png',
  '/img/int/int1_sec2_text_mo_3.png': '/img/int/en/int1_sec2_text_mo_3.png',
  '/img/int/int1-sec3-txt1.png': '/img/int/en/int1-sec3-txt1.png',
  '/img/int/int1-sec3-txt2.png': '/img/int/en/int1-sec3-txt2.png',
  '/img/int/int1-sec3-txt2-mo.png': '/img/int/en/int1-sec3-txt2-mo.png',
  '/img/int/int1-sec4-txt1.png': '/img/int/en/int1-sec4-txt1.png',
  '/img/int/int1-sec4-txt1-mo.png': '/img/int/en/int1-sec4-txt1-mo.png',
  '/img/int/int1-sec5-txt.png': '/img/int/en/int1-sec5-txt.png',
  '/img/int/int2_bg_text.png': '/img/int/en/int2_bg_text.png',
  // plus (icl definition, keratoconus)
  '/img/plus/icl2_sec1_img.png': '/img/plus/en/icl2_sec1_img.png',
  '/img/plus/icl3_sec2_img2.png': '/img/plus/en/icl3_sec2_img2.png',
  '/img/plus/icl3_sec4_img1.png': '/img/plus/en/icl3_sec4_img1.png',
  '/img/plus/icl3_sec4_img1_mo.png': '/img/plus/en/icl3_sec4_img1_mo.png',
  '/img/plus/icl3_sec4_img3.png': '/img/plus/en/icl3_sec4_img3.png',
  '/img/plus/icl3_sec4_img4.png': '/img/plus/en/icl3_sec4_img4.png',
  '/img/plus/icl3_sec4_img4_mo.png': '/img/plus/en/icl3_sec4_img4_mo.png',
  '/img/plus/icl3_sec10_img1.png': '/img/plus/en/icl3_sec10_img1.png',
  '/img/plus/icl3_sec10_img5.png': '/img/plus/en/icl3_sec10_img5.png',
  // plus02 (system)
  '/img/plus02/sec06_img01.png': '/img/plus02/en/sec06_img01.png',
  '/img/plus02/sec06_img02.png': '/img/plus02/en/sec06_img02.png',
  // spec (maestro, evo)
  '/img/spec/spec1_sec2.mp4': '/img/spec/en/spec1_sec2.mp4',
  '/img/spec/spec1_sec2_mo.mp4': '/img/spec/en/spec1_sec2_mo.mp4',
  '/img/spec/spec1-sec6-img1.png': '/img/spec/en/spec1-sec6-img1.png',
  '/img/spec/spec1-sec6-img2.png': '/img/spec/en/spec1-sec6-img2.png',
  '/img/spec/spec1-sec6-img3.png': '/img/spec/en/spec1-sec6-img3.png',
  '/img/spec/spec1-sec6-img4.png': '/img/spec/en/spec1-sec6-img4.png',
  '/img/spec/spec1-sec7-cont1.png': '/img/spec/en/spec1-sec7-cont1.png',
  '/img/spec/spec1-sec7-textImg1.png': '/img/spec/en/spec1-sec7-textImg1.png',
  '/img/spec/spec1-sec7-textImg2.png': '/img/spec/en/spec1-sec7-textImg2.png',
  '/img/spec/spec1-sec7-textImg3.png': '/img/spec/en/spec1-sec7-textImg3.png',
  '/img/spec/spec1-sec8-img1.png': '/img/spec/en/spec1-sec8-img1.png',
  '/img/spec/spec1-sec8-img2.png': '/img/spec/en/spec1-sec8-img2.png',
  '/img/spec/spec1-sec8-img3.png': '/img/spec/en/spec1-sec8-img3.png',
  '/img/spec/spec1-sec12-text.png': '/img/spec/en/spec1-sec12-text.png',
  '/img/spec/spec1-sec12-text-mo.png': '/img/spec/en/spec1-sec12-text-mo.png',
  '/img/spec/spec1-sec13-slide1_n.png': '/img/spec/en/spec1-sec13-slide1_n.png',
  '/img/spec/spec1-sec13-slide2_n.png': '/img/spec/en/spec1-sec13-slide2_n.png',
  '/img/spec/spec1-sec13-slide3_n.png': '/img/spec/en/spec1-sec13-slide3_n.png',
  '/img/spec/spec1-sec13-slide4_n.png': '/img/spec/en/spec1-sec13-slide4_n.png',
  '/img/spec/spec1-sec13-img1-mo2.png': '/img/spec/en/spec1-sec13-img1-mo2.png',
  // faq
  '/img/faq_header.png': '/img/faq/en/faq_header.png',
  '/img/faq_header_m.png': '/img/faq/en/faq_header_m.png',
  '/img/faq.png': '/img/faq/en/faq.png',
  '/img/faq_m.png': '/img/faq/en/faq_m.png',
};

export function getLocalizedImg(src: string, locale: string): string {
  if (locale === 'en' && LOCALIZED_IMAGES[src]) {
    return LOCALIZED_IMAGES[src];
  }
  return src;
}
