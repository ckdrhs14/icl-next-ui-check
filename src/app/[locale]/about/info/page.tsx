import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { getLocalizedImg } from "@/utils/localizedImage";
import styles from "./page.module.css";

export async function generateMetadata() {
    const t = await getTranslations("about.info");
    return { title: t("metaTitle"), description: t("metaDesc") };
}

export default async function InfoPage() {
    const t = await getTranslations("about.info");
    const locale = await getLocale();
    const li = (src: string) => getLocalizedImg(src, locale);
    return (
        <div className={styles.wrapper}>
            <section className={styles.mainSection}>
                <div className={`${styles.bgText} pc`}>
                    <Image src={li("/img/int/int2_bg_text.png")} alt="location" width={1920} height={200} />
                </div>

                <div className={styles.contInner} data-aos="fade-up" data-aos-duration="1000">
                    {/* 진료시간 */}
                    <div className={styles.timGroupWrap}>
                        <div className={styles.titBox}>
                            <h3 className={styles.titBoxH3}>{t("clinicHoursTitle")}</h3>
                        </div>
                        <div className={styles.timBox}>
                            <div className={styles.timInnerBox}>
                                <p className={styles.timBoxRow}>
                                    <span className={styles.timBoxBold}>{t("weekdays")}</span>
                                    <span>{t("weekdaysTime")}</span>
                                </p>
                                <p className={styles.timBoxRow}>
                                    <span className={styles.timBoxBold}>{t("saturday")}</span>
                                    <span>{t("saturdayTime")}</span>
                                </p>
                                <p className={styles.timBoxRow}>
                                    <span className={styles.timBoxBold}>{t("lunchTime")}</span>
                                    <span>{t("lunchTimeValue")}</span>
                                </p>
                            </div>
                            <p className={styles.smFz}>{t("closedDays")}</p>
                        </div>
                    </div>

                    {/* 오시는길 */}
                    <div id="location" className={styles.cont2}>
                        <div className={styles.titBox}>
                            <h3 className={`${styles.titBoxH3} ${styles.titLine}`}>{t("directionsTitle")}</h3>
                        </div>

                        <div className={styles.contGroup}>
                            {/* 차량 & 대중교통 */}
                            <div className={styles.contTop}>
                                <div className={styles.leftGroup}>
                                    <div className={styles.desText}>
                                        <p>{t("byCar")}</p>
                                    </div>
                                    <div className={styles.imgBox}>
                                        <Image src="/img/int/int2_map1.gif" alt="차량으로 오시는길" width={550} height={400} unoptimized />
                                    </div>
                                </div>

                                <div className={`${styles.middleGroup} mo`}>
                                    <div className={styles.desText}>
                                        <p>{t("parking")}</p>
                                    </div>
                                    <div className={`${styles.imgBox} ${styles.imgBoxBorder}`}>
                                        <Image src="/img/int/int2_map3.png" alt="주차장 입구" width={550} height={400} />
                                    </div>
                                </div>

                                <div className={styles.rightGroup}>
                                    <div className={styles.desText}>
                                        <p>{t("byTransit")}</p>
                                    </div>
                                    <div className={styles.imgBox}>
                                        <Image src="/img/int/int2_map2.gif" alt="대중교통 오시는길" width={550} height={400} unoptimized />
                                    </div>
                                </div>
                            </div>

                            {/* 1번 출구 */}
                            <div className={styles.contTop}>
                                <div className={styles.leftGroup}>
                                    <div className={styles.desText}>
                                        <p>{t("backEntrance")}</p>
                                    </div>
                                    <div className={styles.imgBox}>
                                        <Image src="/img/int/int2_map4.png" alt="후문으로 가는 길" width={550} height={400} />
                                    </div>
                                </div>
                                <div className={styles.rightGroup}>
                                    <div className={styles.desText}>
                                        <p>{t("frontEntrance")}</p>
                                    </div>
                                    <div className={styles.imgBox}>
                                        <Image src="/img/int/int2_map5.png" alt="정문으로 가는 길" width={550} height={400} />
                                    </div>
                                </div>
                            </div>

                            {/* 지도 버튼 & 주소 */}
                            <div className={styles.contBot}>
                                <div className={styles.mapBtnGroup}>
                                    <a
                                        href="https://place.map.kakao.com/518228682"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${styles.btnBox} ${styles.btnKakao}`}
                                    >
                                        <i className={styles.iconKakao} />
                                        <p>{t("kakaoMap")}</p>
                                    </a>
                                    <a
                                        href="https://naver.me/Gt1t61PK"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${styles.btnBox} ${styles.btnNaver}`}
                                    >
                                        <i className={styles.iconNaver} />
                                        <p>{t("naverMap")}</p>
                                    </a>
                                </div>
                                <div className={styles.addrBox}>
                                    <p>
                                        {t("address1")}
                                        <br /> {t("address2")}
                                    </p>
                                    <p className={styles.addrSm}>{t("landmark")}</p>
                                </div>
                                <div className={styles.numBox}>
                                    <p>
                                        <span className={styles.numBold}>TEL</span> 02.566.1215
                                    </p>
                                    <p>
                                        <span className={styles.numBold}>FAX</span> 02.567.1215
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 지방에서 오시는 경우 */}
                    <div className={styles.contPlus}>
                        <div className={styles.titBox}>
                            <h3 className={styles.titBoxH3}>{t("fromProvince")}</h3>
                        </div>

                        <div className={styles.contGroup}>
                            <div className={styles.contBox}>
                                <div className={styles.plusTit}>
                                    <p>{t("byExpressBus")}</p>
                                </div>
                                <div className={styles.desCBox}>
                                    <div className={styles.imgBox}>
                                        <Image src="/img/int/int2_plus_img1.png" alt="고속버스 터미널 1" width={360} height={250} />
                                    </div>
                                    <div className={styles.imgBox}>
                                        <Image src="/img/int/int2_plus_img2.png" alt="고속버스 터미널 2" width={360} height={250} />
                                    </div>
                                    <div className={styles.imgBox}>
                                        <Image src="/img/int/int2_plus_img3.png" alt="고속버스 터미널 3" width={360} height={250} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.contGroup}>
                            <div className={styles.contBox}>
                                <div className={styles.plusTit}>
                                    <p>{t("byKTX")}</p>
                                </div>
                                <div className={styles.desCBox}>
                                    <div className={styles.imgBox}>
                                        <Image src="/img/int/int2_plus_img4.png" alt="KTX 서울역 1" width={360} height={250} />
                                    </div>
                                    <div className={styles.imgBox}>
                                        <Image src="/img/int/int2_plus_img5.png" alt="KTX 서울역 2" width={360} height={250} />
                                    </div>
                                    <div className={styles.imgBox}>
                                        <Image src="/img/int/int2_plus_img6.png" alt="KTX 서울역 3" width={360} height={250} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.contGroup}>
                            <div className={styles.contBox}>
                                <div className={styles.plusTit}>
                                    <p>{t("bySRT")}</p>
                                </div>
                                <div className={styles.desCBox}>
                                    <div className={styles.imgBox}>
                                        <Image src="/img/int/int2_plus_img7.png" alt="SRT 수서역 1" width={360} height={250} />
                                    </div>
                                    <div className={styles.imgBox}>
                                        <Image src="/img/int/int2_plus_img8.png" alt="SRT 수서역 2" width={360} height={250} />
                                    </div>
                                    <div className={styles.imgBox}>
                                        <Image src="/img/int/int2_plus_img9.png" alt="SRT 수서역 3" width={360} height={250} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
