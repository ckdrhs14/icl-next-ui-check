import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { getLocalizedImg } from "@/utils/localizedImage";
import { DoctorVideo } from "./DoctorVideo";
import { HistorySwiper } from "./HistorySwiper";
import { DomesticTimeline } from "./DomesticTimeline";
import styles from "./page.module.css";

export async function generateMetadata() {
    const t = await getTranslations("about.doctor");
    return { title: t("metaTitle"), description: t("metaDesc") };
}

export default async function DoctorPage() {
    const t = await getTranslations("about.doctor");
    const locale = await getLocale();
    const li = (src: string) => getLocalizedImg(src, locale);

    const INTERNATIONAL_HISTORY = [
        {
            year: "2008",
            label: t("intlHistory0Label"),
            title: t("intlHistory0Title"),
            desc: t("intlHistory0Desc")
        },
        {
            year: "2009",
            label: t("intlHistory1Label"),
            title: t("intlHistory1Title"),
            desc: t("intlHistory1Desc")
        },
        {
            year: "2009",
            label: t("intlHistory2Label"),
            title: t("intlHistory2Title"),
            desc: t("intlHistory2Desc")
        },
        {
            year: "2015",
            label: t("intlHistory3Label"),
            title: t("intlHistory3Title"),
            desc: t("intlHistory3Desc")
        },
        { year: "2015", label: t("intlHistory4Label"), title: t("intlHistory4Title"), desc: t("intlHistory4Desc") },
        { year: "2016", label: t("intlHistory5Label"), title: t("intlHistory5Title"), desc: t("intlHistory5Desc") },
        { year: "2016", label: t("intlHistory6Label"), title: t("intlHistory6Title"), desc: t("intlHistory6Desc") },
        { year: "2017", label: t("intlHistory7Label"), title: t("intlHistory7Title"), desc: t("intlHistory7Desc") },
        {
            year: "2017",
            label: t("intlHistory8Label"),
            title: t("intlHistory8Title"),
            desc: t("intlHistory8Desc")
        },
        {
            year: "2019",
            label: t("intlHistory9Label"),
            title: t("intlHistory9Title"),
            desc: t("intlHistory9Desc")
        },
        { year: "2023", label: t("intlHistory10Label"), title: t("intlHistory10Title"), desc: t("intlHistory10Desc") },
        {
            year: "2024",
            label: t("intlHistory11Label"),
            title: t("intlHistory11Title"),
            desc: t("intlHistory11Desc")
        },
        { year: "2024", label: t("intlHistory12Label"), title: t("intlHistory12Title"), desc: t("intlHistory12Desc") }
    ];

    const DOMESTIC_HISTORY = [
        { year: "2004", title: t("domesticHistory0Title"), desc: t("domesticHistory0Desc") },
        {
            year: "2005",
            title: t("domesticHistory1Title"),
            desc: t("domesticHistory1Desc")
        },
        {
            year: "2005",
            title: t("domesticHistory2Title"),
            desc: t("domesticHistory2Desc")
        },
        {
            year: "2006",
            title: t("domesticHistory3Title"),
            desc: t("domesticHistory3Desc")
        },
        {
            year: "2006",
            title: t("domesticHistory4Title"),
            desc: t("domesticHistory4Desc")
        },
        { year: "2006", title: t("domesticHistory5Title"), desc: t("domesticHistory5Desc") },
        {
            year: "2006",
            title: t("domesticHistory6Title"),
            desc: t("domesticHistory6Desc")
        },
        { year: "2008", title: t("domesticHistory7Title"), desc: t("domesticHistory7Desc") },
        { year: "2008", title: t("domesticHistory8Title"), desc: t("domesticHistory8Desc") },
        {
            year: "2008",
            title: t("domesticHistory9Title"),
            desc: t("domesticHistory9Desc")
        },
        { year: "2008", title: t("domesticHistory10Title"), desc: t("domesticHistory10Desc") },
        {
            year: "2008",
            title: t("domesticHistory11Title"),
            desc: t("domesticHistory11Desc")
        },
        { year: "2008", title: t("domesticHistory12Title"), desc: t("domesticHistory12Desc") },
        {
            year: "2008",
            title: t("domesticHistory13Title"),
            desc: t("domesticHistory13Desc")
        },
        {
            year: "2008",
            title: t("domesticHistory14Title"),
            desc: t("domesticHistory14Desc")
        },
        {
            year: "2008",
            title: t("domesticHistory15Title"),
            desc: t("domesticHistory15Desc")
        },
        {
            year: "2008",
            title: t("domesticHistory16Title"),
            desc: t("domesticHistory16Desc")
        },
        {
            year: "2008",
            title: t("domesticHistory17Title"),
            desc: t("domesticHistory17Desc")
        },
        {
            year: "2008",
            title: t("domesticHistory18Title"),
            desc: t("domesticHistory18Desc")
        },
        { year: "2008", title: t("domesticHistory19Title"), desc: t("domesticHistory19Desc") },
        {
            year: "2008",
            title: t("domesticHistory20Title"),
            desc: t("domesticHistory20Desc")
        },
        {
            year: "2009",
            title: t("domesticHistory21Title"),
            desc: t("domesticHistory21Desc")
        },
        {
            year: "2009",
            title: t("domesticHistory22Title"),
            desc: t("domesticHistory22Desc")
        },
        {
            year: "2009",
            title: t("domesticHistory23Title"),
            desc: t("domesticHistory23Desc")
        },
        {
            year: "2009",
            title: t("domesticHistory24Title"),
            desc: t("domesticHistory24Desc")
        },
        {
            year: "2009",
            title: t("domesticHistory25Title"),
            desc: t("domesticHistory25Desc")
        },
        {
            year: "2009",
            title: t("domesticHistory26Title"),
            desc: t("domesticHistory26Desc")
        },
        {
            year: "2012",
            title: t("domesticHistory27Title"),
            desc: t("domesticHistory27Desc")
        },
        {
            year: "2015",
            title: t("domesticHistory28Title"),
            desc: t("domesticHistory28Desc")
        },
        {
            year: "2016",
            title: t("domesticHistory29Title"),
            desc: t("domesticHistory29Desc")
        },
        {
            year: "2016",
            title: t("domesticHistory30Title"),
            desc: t("domesticHistory30Desc")
        },
        {
            year: "2018",
            title: t("domesticHistory31Title"),
            desc: t("domesticHistory31Desc")
        },
        {
            year: "2018",
            title: t("domesticHistory32Title"),
            desc: t("domesticHistory32Desc")
        },
        {
            year: "2019",
            title: t("domesticHistory33Title"),
            desc: t("domesticHistory33Desc")
        },
        {
            year: "2019",
            title: t("domesticHistory34Title"),
            desc: t("domesticHistory34Desc")
        },
        {
            year: "2020",
            title: t("domesticHistory35Title"),
            desc: t("domesticHistory35Desc")
        }
    ];

    return (
        <div className={styles.wrapper}>
            {/* Hero: Doctor Introduction */}
            <section className={styles.heroSection}>
                <div className={styles.heroBg} />
                <div className={styles.heroInner} data-aos="fade-up" data-aos-duration="1000">
                    <div className={styles.heroLeft}>
                        <div className={styles.heroTextTop}>
                            <div className={styles.heroName}>
                                <p className={styles.nameKr}>{t("heroName")}</p>
                                <p className={styles.nameRole}>{t("heroTitle")}</p>
                            </div>
                            <p className={styles.nameEn}>{t("heroNameEn")}</p>
                        </div>
                        <div className={styles.heroComm}>
                            <p>
                                {t("heroDesc")}
                                <br />
                                {t("heroQuote")}
                            </p>
                        </div>

                        {/* Mobile nav buttons */}
                        <div className={`${styles.navBtnGroup} mo`}>
                            <a href="#career" className={styles.navBtn} style={{ background: "var(--color-tan)" }}>
                                {t("navCareer")}
                            </a>
                            <a
                                href="#intl-history"
                                className={styles.navBtn}
                                style={{ background: "var(--color-teal)" }}
                            >
                                {t("navIntl")}
                            </a>
                            <a
                                href="#domestic-history"
                                className={styles.navBtn}
                                style={{ background: "var(--color-navy)" }}
                            >
                                {t("navDomestic")}
                            </a>
                        </div>
                    </div>

                    <div className={styles.heroRight}>
                        <Image
                            src="/img/int/int1_sec1_pic.png"
                            alt={t("heroImgAlt")}
                            width={600}
                            height={750}
                            priority
                            className={styles.doctorImg}
                        />
                    </div>
                </div>
            </section>

            {/* Career Section */}
            <section id="career" className={styles.careerSection}>
                <div className={styles.lensDecor}>
                    <Image src="/img/int/bg_lens_1.webp" alt="" width={400} height={400} className={styles.lens1} />
                    <Image src="/img/int/bg_lens_2.webp" alt="" width={400} height={400} className={styles.lens2} />
                </div>
                <div className={styles.careerInner} data-aos="fade-up" data-aos-duration="1000">
                    <Image
                        src={li("/img/int/int1_sec2_text_20250902.webp")}
                        alt={t("careerImgAlt")}
                        width={1650}
                        height={800}
                        className="pc"
                    />
                    <Image
                        src={li("/img/int/m_int1_sec2_text_20250902.webp")}
                        alt={t("careerImgAlt")}
                        width={600}
                        height={800}
                        className="mo"
                    />
                </div>
            </section>

            {/* Video Section */}
            <section className={styles.videoSection}>
                <DoctorVideo />
            </section>

            {/* International Conference History */}
            <section id="intl-history" className={styles.historySection}>
                <div className={styles.sectionInner} data-aos="fade-up" data-aos-duration="1000">
                    <div className={styles.sectionTitle}>
                        <p className={styles.titleSub}>HISTORY OF</p>
                        <h4 className={styles.titleAccent}>{t("sectionClinic")}</h4>
                        <p className={styles.titleEn}>{t("sectionIntlSub")}</p>
                        <h3 className={styles.titleMain}>{t("sectionIntlTitle")}</h3>
                    </div>
                    <div className={styles.dividerLine} />
                    <HistorySwiper items={INTERNATIONAL_HISTORY} />
                </div>
            </section>

            {/* Domestic Conference Timeline */}
            <section id="domestic-history" className={styles.timelineSection}>
                <div className={styles.sectionInner}>
                    <div className={styles.sectionTitle}>
                        <p className={styles.titleSub}>HISTORY OF</p>
                        <h4 className={styles.titleAccent}>{t("sectionClinic")}</h4>
                        <h3 className={styles.titleMain}>{t("sectionDomesticTitle")}</h3>
                        <p className={styles.titleEn}>{t("sectionDomesticSub")}</p>
                    </div>
                    <DomesticTimeline items={DOMESTIC_HISTORY} />
                </div>
            </section>

            {/* ===== Vision Sections ===== */}
            <section id="vision" className={styles.visionHeroSection}>
                <div className={styles.visionHeroContent} data-aos="fade-up" data-aos-duration="1000">
                    <div className={styles.visionHeroTitleGroup}>
                        <div className={styles.visionHeroTitleImg}>
                            <Image
                                src={li("/img/int/int1-sec3-txt1.png")}
                                alt={t("visionImgAlt")}
                                width={600}
                                height={200}
                            />
                        </div>
                    </div>
                    <div className={styles.visionHeroBodyImg}>
                        <Image
                            src={li("/img/int/int1-sec3-txt2.png")}
                            alt={t("visionDescImgAlt")}
                            width={1000}
                            height={400}
                            className="pc"
                        />
                        <Image
                            src={li("/img/int/int1-sec3-txt2-mo.png")}
                            alt={t("visionDescImgAlt")}
                            width={600}
                            height={400}
                            className="mo"
                        />
                    </div>
                </div>
            </section>

            <section className={styles.visionMessageSection}>
                <div className={styles.visionMessageBg}>
                    <Image
                        src="/img/int/int1-sec4-bgtop.png"
                        alt=""
                        width={1920}
                        height={600}
                        className={styles.visionMessageBgImg}
                    />
                </div>
                <div className={styles.visionMessageTitleImg}>
                    <Image
                        src={li("/img/int/int1-sec4-txt1.png")}
                        alt=""
                        width={800}
                        height={200}
                        className="pc"
                    />
                    <Image
                        src={li("/img/int/int1-sec4-txt1-mo.png")}
                        alt=""
                        width={500}
                        height={200}
                        className="mo"
                    />
                </div>

                <div className={styles.visionMessageInner} data-aos="fade-up" data-aos-duration="1000">
                    <div className={styles.visionCommentBlock}>
                        <div className={styles.visionCommentText}>
                            <h4>&ldquo;{t("visionGreeting")}</h4>
                            <h4 className={styles.visionCommentHighlight}>
                                {t("visionIntro")}&rdquo;
                            </h4>
                        </div>
                        <div className={styles.visionCommentImg}>
                            <Image
                                src="/img/int/int1-sec4-docimg.png"
                                alt={t("visionDoctorImgAlt")}
                                width={400}
                                height={500}
                            />
                        </div>
                    </div>

                    <div className={styles.visionContentGrid}>
                        <VisionContentBox
                            num="01"
                            title={t("visionBox1Title")}
                            desc={t("visionBox1Desc")}
                        />
                        <VisionContentBox
                            num="02"
                            title={t("visionBox2Title")}
                            desc={t("visionBox2Desc")}
                        />
                        <VisionContentBox
                            num="03"
                            title={t("visionBox3Title")}
                            desc={t("visionBox3Desc")}
                        />
                        <VisionContentBox
                            num="04"
                            title={t("visionBox4Title")}
                            desc={t("visionBox4Desc")}
                        />
                    </div>
                </div>
            </section>

            <section className={styles.visionPledgeSection}>
                <div className={styles.visionPledgeContent} data-aos="fade-up" data-aos-duration="1000">
                    <div className={styles.visionPledgeTxtBox}>
                        <Image
                            src={li("/img/int/int1-sec5-txt.png")}
                            alt={t("pledgeImgAlt")}
                            width={315}
                            height={150}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

function VisionContentBox({
    num,
    title,
    desc,
}: {
    num: string;
    title: string;
    desc: string;
}) {
    return (
        <div className={styles.visionContentBox}>
            <span className={styles.visionContentNum}>{num}</span>
            <div className={styles.visionContentText}>
                <p className={styles.visionContentTitle}>{title}</p>
                <p className={styles.visionContentDesc}>{desc}</p>
            </div>
        </div>
    );
}
