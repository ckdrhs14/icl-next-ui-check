"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import Image from "next/image";
import { getLocalizedImg } from "@/utils/localizedImage";
import styles from "./Header.module.css";

const MENU_ITEMS = [
    {
        key: "doctorIcl",
        href: "/about/doctor#vision",
        submenu: [
            { key: "vision", href: "/about/doctor#vision" },
            { key: "doctor", href: "/about/doctor" },
            { key: "system", href: "/about/system" },
            { key: "equipment", href: "/about/equipment" },
            { key: "clinicInfo", href: "/about/info" },
            { key: "location", href: "/about/info#location" }
        ]
    },
    {
        key: "maestro",
        href: "/maestro",
        submenu: [
            { key: "maestroIcl", href: "/maestro" },
            { key: "maestroSelection", href: "/maestro#selection" },
            { key: "maestroDiagnosis", href: "/maestro#diagnosis" },
            { key: "maestroSurgery", href: "/maestro#surgery-video" },
            { key: "maestroReviews", href: "/maestro#reviews" }
        ]
    },
    {
        key: "iclDeepDive",
        href: "/icl/evo",
        submenu: [
            { key: "evoIcl", href: "/icl/evo" },
            { key: "iclDefinition", href: "/icl/definition" },
            { key: "iclAdvantages", href: "/icl/definition#advantages" },
            { key: "iclFaq", href: "/icl/faq" }
        ]
    },
    {
        key: "highMyopia",
        href: "/myopia",
        submenu: [
            { key: "myopiaClinic", href: "/myopia#myopia-cont1" },
            { key: "myopiaGlaucoma", href: "/myopia#myopia-cont2" },
            { key: "myopiaRetina", href: "/myopia#myopia-cont3" },
            { key: "myopiaCataract", href: "/myopia#myopia-cont4" },
            { key: "myopiaIcl", href: "/myopia#myopia-cont5" },
            { key: "myopiaCare", href: "/myopia#myopia-cont6" }
        ]
    },
    {
        key: "specialConditions",
        href: "/special/post-lasik",
        submenu: [
            { key: "postLasik", href: "/special/post-lasik" },
            { key: "keratoconus", href: "/special/keratoconus" },
            { key: "avellino", href: "/special/avellino" }
        ]
    },
    {
        key: "presbyopia",
        href: "/presbyopia/viva-icl",
        submenu: [
            { key: "vivaIcl", href: "/presbyopia/viva-icl" },
            { key: "presbyopiaCataract", href: "/presbyopia/cataract" }
        ]
    },
    {
        key: "community",
        href: "/community/news",
        submenu: [
            { key: "column", href: "/community/news" },
            { key: "hospitalNews", href: "/community/news?code=소식" },
            { key: "reserve", href: "/community/reservation" },
            { key: "reviews", href: "/community/reviews" },
            { key: "youtube", href: "/community/youtube" }
        ]
    }
] as const;

/* max-height values per submenu index for mobile accordion */
const MOBILE_MAX_HEIGHTS = [300, 300, 300, 320, 300, 300, 300];

export function Header() {
    const t = useTranslations("header");
    const pathname = usePathname();
    const locale = useLocale();
    const li = (src: string) => getLocalizedImg(src, locale);
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [hamOpen, setHamOpen] = useState(false);
    const [langDropdown, setLangDropdown] = useState(false);
    const [mobileAccordion, setMobileAccordion] = useState<number | null>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 150);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close lang dropdown on outside click
    useEffect(() => {
        if (!langDropdown) return;
        const handleClick = () => setLangDropdown(false);
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [langDropdown]);

    /* eslint-disable react-hooks/set-state-in-effect -- route change cleanup is intentional */
    useEffect(() => {
        setHamOpen(false);
        setMobileAccordion(null);
    }, [pathname]);
    /* eslint-enable react-hooks/set-state-in-effect */

    /* Lock body scroll when mobile menu open */
    useEffect(() => {
        if (hamOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [hamOpen]);

    const toggleHam = useCallback(() => {
        setHamOpen((prev) => !prev);
        setMobileAccordion(null);
    }, []);

    const toggleAccordion = useCallback((idx: number) => {
        setMobileAccordion((prev) => (prev === idx ? null : idx));
    }, []);

    const switchLocale = useCallback(
        (newLocale: "ko" | "en") => {
            router.replace(pathname, { locale: newLocale });
            setLangDropdown(false);
        },
        [router, pathname]
    );

    const headerClasses = [styles.header, scrolled ? styles.basicbg : "", hamOpen ? styles.ham : ""]
        .filter(Boolean)
        .join(" ");

    return (
        <>
            <header className={headerClasses}>
                <div className={styles.wrap}>
                    {/* Logo */}
                    <div className={styles.logo}>
                        <Link href="/">
                            <Image
                                src={li("/img/logo_white.svg")}
                                alt="닥터ICL"
                                width={170}
                                height={40}
                                className={styles.logoWhite}
                                priority
                            />
                            <Image
                                src={li("/img/logo_color.svg")}
                                alt="닥터ICL"
                                width={170}
                                height={40}
                                className={styles.logoColor}
                                priority
                            />
                        </Link>
                    </div>

                    {/* PC Nav */}
                    <nav className={styles.nav}>
                        <ul className={styles.menu}>
                            {MENU_ITEMS.map((item) => (
                                <li key={item.key}>
                                    <Link href={item.href}>
                                        <span>{t(`menu.${item.key}`)}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Right section */}
                    <div className={styles.rightWrap}>
                        <ul className={styles.quick}>
                            {/* Language toggle */}
                            <li
                                className={styles.langBtnLi}
                                onClick={(e) => { e.stopPropagation(); setLangDropdown((prev) => !prev); }}
                            >
                                <a href="#" onClick={(e) => e.preventDefault()}>
                                    <i className="ri-global-line" />
                                    <span>{locale === "ko" ? t("lang.kr") : t("lang.en")}</span>
                                </a>
                                {langDropdown && (
                                    <div className={styles.langDropdown}>
                                        <button
                                            onClick={() => switchLocale("ko")}
                                            className={locale === "ko" ? styles.langActive : ""}
                                        >
                                            KR
                                        </button>
                                        <button
                                            onClick={() => switchLocale("en")}
                                            className={locale === "en" ? styles.langActive : ""}
                                        >
                                            EN
                                        </button>
                                    </div>
                                )}
                            </li>
                            {/* Login */}
                            <li>
                                <Link href="/auth/login">
                                    <i className="ri-user-line" />
                                    <span>{t("login")}</span>
                                </Link>
                            </li>
                            {/* Clinic hours */}
                            <li>
                                <Link href="/about/info">
                                    <i className="ri-article-line" />
                                    <span>{t("clinicHours")}</span>
                                </Link>
                            </li>
                        </ul>

                        {/* Mobile language toggle */}
                        <div className={styles.moLang}>
                            <button
                                onClick={() => switchLocale("ko")}
                                className={locale === "ko" ? styles.langActive : ""}
                            >
                                KR
                            </button>
                            <button
                                onClick={() => switchLocale("en")}
                                className={locale === "en" ? styles.langActive : ""}
                            >
                                EN
                            </button>
                        </div>

                        {/* Hamburger */}
                        <div className={styles.hamWrap} onClick={toggleHam}>
                            <span />
                            <span />
                            <span />
                        </div>
                    </div>
                </div>

                {/* PC Mega Menu */}
                <div className={styles.headerList}>
                    <div className={styles.bgLogo}>
                        <Image
                            src="/img/common/snu_logo.png"
                            alt="SNU Logo"
                            width={200}
                            height={200}
                            style={{ width: "auto", height: "100%", opacity: 0.1 }}
                        />
                    </div>
                    <div className={styles.headerListCont}>
                        {MENU_ITEMS.map((item) => (
                            <div key={item.key} className={styles.listBox}>
                                {item.submenu.map((sub) => (
                                    <Link key={sub.key} href={sub.href} className={styles.txtBox}>
                                        {t(`submenu.${sub.key}`)}
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile GNB overlay */}
                <div className={styles.gnbClickBx}>
                    <div className={styles.gnbBx}>
                        <div className={styles.gnbCntBx}>
                            <div className={styles.gnbListBx2}>
                                {MENU_ITEMS.map((item, idx) => (
                                    <div key={item.key} className={styles.gnbList2}>
                                        <div className={styles.gnbListTit2}>
                                            <div
                                                className={`${styles.gnbListTit2Tit} ${mobileAccordion === idx ? styles.on : ""}`}
                                                onClick={() => toggleAccordion(idx)}
                                            >
                                                {t(`menu.${item.key}`)}
                                            </div>
                                            <div
                                                className={`${styles.gnbSubBx} ${mobileAccordion === idx ? styles.on : ""}`}
                                                style={
                                                    mobileAccordion === idx
                                                        ? { maxHeight: `${MOBILE_MAX_HEIGHTS[idx]}px` }
                                                        : undefined
                                                }
                                            >
                                                {item.submenu.map((sub) => (
                                                    <Link
                                                        key={sub.key}
                                                        href={sub.href}
                                                        className={styles.gnbListSub2}
                                                        onClick={() => setHamOpen(false)}
                                                    >
                                                        {t(`submenu.${sub.key}`)}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Quick Group Bar - fixed bottom */}
            <div className={styles.quickGroup}>
                <div className={styles.contInner}>
                    <div className={styles.quickBox}>
                        <Link href="/community/reservation" className={`${styles.btnBox} ${styles.btnReserve}`}>
                            <div className={styles.imgBox}>
                                <img src={li("/img/common/icon_cal_br.png")} alt="" className={styles.brImg} />
                            </div>
                            <div className={styles.textBox}>
                                <p>{t("quick.reserve")}</p>
                            </div>
                        </Link>
                        <div className={styles.line} />
                        <Link href="/about/info" className={`${styles.btnBox} ${styles.btnMap}`}>
                            <div className={styles.imgBox}>
                                <img src={li("/img/common/icon_map_br.png")} alt="" className={styles.brImg} />
                            </div>
                            <div className={styles.textBox}>
                                <p>
                                    {t("quick.location")} / {t("quick.clinicHours")}
                                </p>
                            </div>
                        </Link>
                        <div className={styles.line} />
                        <a href="tel:02-566-1215" className={`${styles.btnBox} ${styles.btnCall}`}>
                            <div className={styles.imgBox}>
                                <img src="/img/common/icon_call_br.png" alt="" className={styles.brImg} />
                            </div>
                            <div className={styles.textBox}>
                                <p>{t("quick.call")}</p>
                            </div>
                        </a>
                        <div className={styles.line} />
                        <a
                            href="https://pf.kakao.com/_rXGTG"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${styles.btnBox} ${styles.btnKakao}`}
                        >
                            <div className={styles.imgBox}>
                                <img src={li("/img/common/icon_kakao_br.png")} alt="" className={styles.brImg} />
                            </div>
                            <div className={styles.textBox}>
                                <p>{t("quick.kakao")}</p>
                            </div>
                        </a>
                        <div className={styles.line} />
                        <a
                            href="https://m.booking.naver.com/booking/13/bizes/1003562"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${styles.btnBox} ${styles.btnNaver}`}
                        >
                            <div className={styles.imgBox}>
                                <img src="/img/common/icon_naver_br.png" alt="" className={styles.brImg} />
                            </div>
                            <div className={styles.textBox}>
                                <p>{t("quick.naver")}</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
