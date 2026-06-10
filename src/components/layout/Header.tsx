"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
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
        href: "/community/column",
        submenu: [
            { key: "column", href: "/community/column" },
            { key: "hospitalNews", href: "/community/hospital-news" },
            { key: "event", href: "/community/event" },
            { key: "reserve", href: "/community/reservation" },
            { key: "reviews", href: "/community/reviews" },
            { key: "youtube", href: "/community/youtube" }
        ]
    }
] as const;

export function Header() {
    const t = useTranslations("header");
    const pathname = usePathname();
    const locale = useLocale();
    const li = (src: string) => getLocalizedImg(src, locale);
    const router = useRouter();
    const [isWhite, setIsWhite] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [mobileActive, setMobileActive] = useState<number | null>(null);
    const [quickHidden, setQuickHidden] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const detailRef = useRef<HTMLDivElement>(null);

    /* data-header-bg="white" 감지 */
    useEffect(() => {
        const check = () => {
            if (isOpen) return;
            const header = headerRef.current;
            if (!header) return;
            const probeY = header.offsetHeight || 72;
            const sections = document.querySelectorAll("[data-header-bg]");
            let found = false;
            for (let i = 0; i < sections.length; i++) {
                const r = sections[i].getBoundingClientRect();
                if (r.top <= probeY && r.bottom > probeY) {
                    found = sections[i].getAttribute("data-header-bg") === "white";
                    break;
                }
            }
            setIsWhite(found);
        };
        window.addEventListener("scroll", check, { passive: true });
        check();
        return () => window.removeEventListener("scroll", check);
    }, [isOpen]);

    /* 푸터 도달 시 퀵메뉴 숨김 */
    useEffect(() => {
        if (pathname !== "/") return;
        const toggle = () => {
            const footer = document.querySelector("footer");
            if (!footer) return;
            const footerTop = footer.getBoundingClientRect().top;
            setQuickHidden(footerTop < window.innerHeight);
        };
        window.addEventListener("scroll", toggle, { passive: true });
        toggle();
        return () => window.removeEventListener("scroll", toggle);
    }, [pathname]);

    useEffect(() => {
        if (!langOpen) return;
        const close = () => setLangOpen(false);
        document.addEventListener("click", close);
        return () => document.removeEventListener("click", close);
    }, [langOpen]);

    useEffect(() => { setIsOpen(false); setMobileActive(null); setLangOpen(false); }, [pathname]);

    useEffect(() => {
        if (isOpen) {
            const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = `${scrollbarW}px`;
        } else {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        }
        return () => { document.body.style.overflow = ""; document.body.style.paddingRight = ""; };
    }, [isOpen]);

    /* --header-top-height 설정 */
    useEffect(() => {
        const setHeight = () => {
            const header = headerRef.current;
            if (!header) return;
            const topContainer = header.querySelector(`.${styles.headerTopContainer}`) as HTMLElement;
            if (!topContainer) return;
            header.style.setProperty("--header-top-height", `${window.innerHeight - topContainer.offsetHeight}px`);
        };
        setHeight();
        window.addEventListener("resize", setHeight);
        return () => window.removeEventListener("resize", setHeight);
    }, []);

    const toggleMenu = useCallback(() => {
        setIsOpen((prev) => !prev);
        setMobileActive(null);
    }, []);

    const toggleMobileItem = useCallback((idx: number) => {
        setMobileActive((prev) => (prev === idx ? null : idx));
    }, []);

    const switchLocale = useCallback(
        (newLocale: "ko" | "en") => {
            router.replace(pathname, { locale: newLocale });
        },
        [router, pathname]
    );

    const cls = [
        styles.header,
        isWhite && !isOpen ? styles.isWhite : "",
        isOpen ? styles.open : ""
    ].filter(Boolean).join(" ");

    return (
        <>
            <header className={cls} ref={headerRef}>
                <div className={styles.headerTopContainer}>
                    <div className={styles.innerCon}>
                        <div className={styles.menuContainer}>
                            <Link href="/" className={styles.logo}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img className={styles.colorLogo} src="/img/main/logo.svg" alt="닥터 ICL" />
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img className={styles.whiteLogo} src="/img/main/logo_white.svg" alt="닥터 ICL" />
                            </Link>
                            <ul className={styles.navListWrap}>
                                {MENU_ITEMS.map((item) => (
                                    <li key={item.key}>
                                        <Link href={item.href}>{t(`menu.${item.key}`)}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <ul className={styles.btnWrap}>
                            <li className={styles.langBtnLi} onClick={(e) => { e.stopPropagation(); setLangOpen((p) => !p); }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M8.125 21.2125C6.90833 20.6875 5.84583 19.9708 4.9375 19.0625C4.02917 18.1542 3.3125 17.0917 2.7875 15.875C2.2625 14.6583 2 13.3625 2 11.9875C2 10.6125 2.2625 9.32083 2.7875 8.1125C3.3125 6.90417 4.02917 5.84583 4.9375 4.9375C5.84583 4.02917 6.90833 3.3125 8.125 2.7875C9.34167 2.2625 10.6375 2 12.0125 2C13.3875 2 14.6792 2.2625 15.8875 2.7875C17.0958 3.3125 18.1542 4.02917 19.0625 4.9375C19.9708 5.84583 20.6875 6.90417 21.2125 8.1125C21.7375 9.32083 22 10.6125 22 11.9875C22 13.3625 21.7375 14.6583 21.2125 15.875C20.6875 17.0917 19.9708 18.1542 19.0625 19.0625C18.1542 19.9708 17.0958 20.6875 15.8875 21.2125C14.6792 21.7375 13.3875 22 12.0125 22C10.6375 22 9.34167 21.7375 8.125 21.2125ZM12 19.95C12.4333 19.35 12.8083 18.725 13.125 18.075C13.4417 17.425 13.7 16.7333 13.9 16H10.1C10.3 16.7333 10.5583 17.425 10.875 18.075C11.1917 18.725 11.5667 19.35 12 19.95ZM9.4 19.55C9.1 19 8.8375 18.4292 8.6125 17.8375C8.3875 17.2458 8.2 16.6333 8.05 16H5.1C5.58333 16.8333 6.1875 17.5583 6.9125 18.175C7.6375 18.7917 8.46667 19.25 9.4 19.55ZM14.6 19.55C15.5333 19.25 16.3625 18.7917 17.0875 18.175C17.8125 17.5583 18.4167 16.8333 18.9 16H15.95C15.8 16.6333 15.6125 17.2458 15.3875 17.8375C15.1625 18.4292 14.9 19 14.6 19.55ZM4.25 14H7.65C7.6 13.6667 7.5625 13.3375 7.5375 13.0125C7.5125 12.6875 7.5 12.35 7.5 12C7.5 11.65 7.5125 11.3125 7.5375 10.9875C7.5625 10.6625 7.6 10.3333 7.65 10H4.25C4.16667 10.3333 4.10417 10.6625 4.0625 10.9875C4.02083 11.3125 4 11.65 4 12C4 12.35 4.02083 12.6875 4.0625 13.0125C4.10417 13.3375 4.16667 13.6667 4.25 14ZM9.65 14H14.35C14.4 13.6667 14.4375 13.3375 14.4625 13.0125C14.4875 12.6875 14.5 12.35 14.5 12C14.5 11.65 14.4875 11.3125 14.4625 10.9875C14.4375 10.6625 14.4 10.3333 14.35 10H9.65C9.6 10.3333 9.5625 10.6625 9.5375 10.9875C9.5125 11.3125 9.5 11.65 9.5 12C9.5 12.35 9.5125 12.6875 9.5375 13.0125C9.5625 13.3375 9.6 13.6667 9.65 14ZM16.35 14H19.75C19.8333 13.6667 19.8958 13.3375 19.9375 13.0125C19.9792 12.6875 20 12.35 20 12C20 11.65 19.9792 11.3125 19.9375 10.9875C19.8958 10.6625 19.8333 10.3333 19.75 10H16.35C16.4 10.3333 16.4375 10.6625 16.4625 10.9875C16.4875 11.3125 16.5 11.65 16.5 12C16.5 12.35 16.4875 12.6875 16.4625 13.0125C16.4375 13.3375 16.4 13.6667 16.35 14ZM15.95 8H18.9C18.4167 7.16667 17.8125 6.44167 17.0875 5.825C16.3625 5.20833 15.5333 4.75 14.6 4.45C14.9 5 15.1625 5.57083 15.3875 6.1625C15.6125 6.75417 15.8 7.36667 15.95 8ZM10.1 8H13.9C13.7 7.26667 13.4417 6.575 13.125 5.925C12.8083 5.275 12.4333 4.65 12 4.05C11.5667 4.65 11.1917 5.275 10.875 5.925C10.5583 6.575 10.3 7.26667 10.1 8ZM5.1 8H8.05C8.2 7.36667 8.3875 6.75417 8.6125 6.1625C8.8375 5.57083 9.1 5 9.4 4.45C8.46667 4.75 7.6375 5.20833 6.9125 5.825C6.1875 6.44167 5.58333 7.16667 5.1 8Z" fill="#222222" />
                                </svg>
                                <span className={styles.btnTxt}>{locale === "ko" ? "KR" : "EN"}</span>
                                {langOpen && (
                                    <div className={styles.langDropdown}>
                                        <button
                                            className={locale === "ko" ? styles.langActive : ""}
                                            onClick={() => { switchLocale("ko"); setLangOpen(false); }}
                                        >KR</button>
                                        <button
                                            className={locale === "en" ? styles.langActive : ""}
                                            onClick={() => { switchLocale("en"); setLangOpen(false); }}
                                        >EN</button>
                                    </div>
                                )}
                            </li>
                            <li>
                                <Link href="/auth/login">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M5.85 17.1C6.7 16.45 7.65 15.9375 8.7 15.5625C9.75 15.1875 10.85 15 12 15C13.15 15 14.25 15.1875 15.3 15.5625C16.35 15.9375 17.3 16.45 18.15 17.1C18.7333 16.4167 19.1875 15.6417 19.5125 14.775C19.8375 13.9083 20 12.9833 20 12C20 9.78333 19.2208 7.89583 17.6625 6.3375C16.1042 4.77917 14.2167 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 12.9833 4.1625 13.9083 4.4875 14.775C4.8125 15.6417 5.26667 16.4167 5.85 17.1ZM12 13C11.0167 13 10.1875 12.6625 9.5125 11.9875C8.8375 11.3125 8.5 10.4833 8.5 9.5C8.5 8.51667 8.8375 7.6875 9.5125 7.0125C10.1875 6.3375 11.0167 6 12 6C12.9833 6 13.8125 6.3375 14.4875 7.0125C15.1625 7.6875 15.5 8.51667 15.5 9.5C15.5 10.4833 15.1625 11.3125 14.4875 11.9875C13.8125 12.6625 12.9833 13 12 13Z" fill="#222222" />
                                    </svg>
                                    <span className={styles.btnTxt}>{t("login")}</span>
                                </Link>
                            </li>
                            <li className={styles.hamburgerBtn}>
                                <button className={styles.hamBtn} onClick={toggleMenu} type="button">
                                    <span className={`${styles.line} ${styles.line1}`} />
                                    <span className={`${styles.line} ${styles.line2}`} />
                                    <span className={`${styles.line} ${styles.line3}`} />
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Detail Menu (펼침 메뉴) */}
                <div className={styles.detailMenuContainer} ref={detailRef}>
                    <div className={styles.detailMenuBox}>
                        <div className={styles.detailLogo}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/img/main/menu_logo.svg" alt="닥터 ICL 안과" />
                        </div>
                        <ul className={styles.menuListWrap}>
                            {MENU_ITEMS.map((item, idx) => (
                                <li key={item.key} className={`${styles.menuItem} ${mobileActive === idx ? styles.isActive : ""}`}>
                                    <a
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); toggleMobileItem(idx); }}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src="/img/main/logo_symbol.svg" alt="" className={styles.menuSymbol} />
                                        <span className={styles.menuTxt}>{t(`menu.${item.key}`)}</span>
                                        <div className={styles.menuArrow}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M5.54025 5.54025C5.3994 5.68106 5.20839 5.76016 5.00923 5.76016C4.81007 5.76016 4.61906 5.68106 4.47821 5.54025L0.229299 1.29134C0.157561 1.22205 0.100342 1.13917 0.0609779 1.04754C0.021614 0.955902 0.000894509 0.857344 2.85771e-05 0.757615C-0.000838308 0.657886 0.0181656 0.558983 0.0559311 0.466677C0.0936966 0.374371 0.149467 0.29051 0.21999 0.219988C0.290511 0.149467 0.374371 0.0936959 0.466677 0.0559304C0.558983 0.018165 0.657887 -0.000838668 0.757616 2.79549e-05C0.857345 0.000894578 0.955903 0.0216143 1.04754 0.0609782C1.13917 0.100342 1.22205 0.157561 1.29134 0.229298L5.00923 3.94719L8.72712 0.229298C8.86878 0.0924815 9.0585 0.0167759 9.25544 0.0184872C9.45237 0.0201985 9.64075 0.0991896 9.78001 0.238448C9.91927 0.377706 9.99826 0.566088 9.99997 0.763022C10.0017 0.959955 9.92598 1.14968 9.78916 1.29134L5.54025 5.54025Z" fill="#5C5C5C" />
                                            </svg>
                                        </div>
                                    </a>
                                    <ul className={styles.subMenuWrap}>
                                        {item.submenu.map((sub) => (
                                            <li key={sub.key}>
                                                <Link href={sub.href} onClick={() => setIsOpen(false)}>
                                                    {t(`submenu.${sub.key}`)}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </header>

            {/* Quick Menu Bar */}
            {pathname === "/" && (
                <div className={`${styles.quickGroup} ${quickHidden ? styles.quickGroupHidden : ""}`}>
                    <ul className={styles.quickBox}>
                        <li className={styles.quickItem}>
                            <a href="tel:02-566-1215" className={styles.quickBtn}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                    <path d="M19.8554 24.375C18.8641 24.375 17.4717 24.0165 15.3866 22.8516C12.8511 21.4297 10.8899 20.117 8.36814 17.6018C5.93673 15.1719 4.75353 13.5987 3.09755 10.5854C1.22677 7.18302 1.54568 5.39959 1.90216 4.63736C2.32669 3.72635 2.95333 3.18146 3.76329 2.64064C4.22335 2.33922 4.7102 2.08084 5.21767 1.86877C5.26845 1.84693 5.31568 1.82611 5.35783 1.80732C5.60919 1.69408 5.99005 1.52295 6.47247 1.70576C6.79443 1.82662 7.08185 2.07392 7.53177 2.51826C8.45447 3.42826 9.71536 5.45494 10.1805 6.45025C10.4928 7.12107 10.6995 7.56388 10.7 8.06052C10.7 8.64197 10.4075 9.09037 10.0526 9.57431C9.98603 9.66521 9.92001 9.75205 9.85603 9.83634C9.46958 10.3442 9.38478 10.4909 9.44064 10.7529C9.55388 11.2795 10.3984 12.8472 11.7862 14.232C13.1741 15.6168 14.6965 16.4079 15.2251 16.5207C15.4983 16.5791 15.6481 16.4907 16.1722 16.0906C16.2474 16.0332 16.3245 15.9738 16.4053 15.9144C16.9466 15.5117 17.3742 15.2268 17.9419 15.2268H17.945C18.4391 15.2268 18.8621 15.4411 19.5629 15.7945C20.4769 16.2556 22.5645 17.5003 23.4801 18.424C23.9255 18.8729 24.1738 19.1593 24.2952 19.4807C24.478 19.9647 24.3058 20.344 24.1936 20.5979C24.1748 20.6401 24.154 20.6863 24.1322 20.7376C23.9184 21.2441 23.6585 21.7299 23.3557 22.1889C22.8159 22.9963 22.269 23.6214 21.3559 24.0465C20.8871 24.2683 20.374 24.3806 19.8554 24.375Z" fill="white" />
                                </svg>
                                <span className={styles.quickTxt}>{t("quick.call")}</span>
                            </a>
                        </li>
                        <li className={styles.quickItem}>
                            <a href="https://pf.kakao.com/_rXGTG" target="_blank" rel="noopener noreferrer" className={styles.quickBtn}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                    <path d="M10.2509 10.0803L9.50122 12.1939H10.9995L10.2509 10.0803Z" fill="white" />
                                    <path d="M13 1.08252C5.82076 1.08252 0 5.64119 0 11.2648C0 14.9004 2.43317 18.0909 6.09376 19.8914C4.6865 24.7122 4.64967 24.7339 4.888 24.8736C5.187 25.048 5.57484 24.8682 10.6914 21.2867C11.4411 21.3918 12.2124 21.447 13 21.447C20.1793 21.447 26 16.8884 26 11.2648C26 5.64119 20.1793 1.08252 13 1.08252ZM6.56284 14.1074C6.56284 14.4996 6.22592 14.8192 5.81317 14.8192C5.40042 14.8192 5.0635 14.4996 5.0635 14.1074V9.68094H3.8935C3.48725 9.68094 3.15792 9.35378 3.15792 8.95186C3.15792 8.54994 3.48617 8.22169 3.89242 8.22169H7.73284C8.13909 8.22169 8.46842 8.54886 8.46842 8.95078C8.46842 9.35269 8.13801 9.68094 7.73284 9.68094H6.56284V14.1074ZM12.389 14.8094C11.609 14.8094 11.7531 14.1974 11.3934 13.5149H9.10651C8.75009 14.1919 8.88984 14.8094 8.11092 14.8094C7.36017 14.8105 7.22801 14.3534 7.45659 13.6492L9.25059 8.95836C9.37734 8.60086 9.76084 8.23361 10.2494 8.22278C10.7391 8.23361 11.1237 8.60086 11.2493 8.95836C12.4334 12.6309 14.1245 14.8105 12.389 14.8094ZM16.6563 14.7098H14.2502C12.9946 14.7098 13.7583 13.0144 13.5319 8.96703C13.5319 8.55644 13.8753 8.22169 14.2978 8.22169C14.7203 8.22169 15.0638 8.55536 15.0638 8.96703V13.3437H16.6573C17.0538 13.3437 17.3756 13.6503 17.3756 14.0262C17.3745 14.4032 17.0528 14.7098 16.6563 14.7098ZM22.5269 14.1486C22.4998 14.3447 22.3947 14.5213 22.2354 14.6404C21.2009 15.4215 20.436 13.1444 19.4263 12.1802L19.1663 12.4391V14.0641C19.1663 14.4758 18.8305 14.8094 18.4156 14.8094C18.0018 14.8094 17.6659 14.4758 17.6659 14.0641V8.96703C17.6659 8.55644 18.0018 8.22169 18.4156 8.22169C18.8294 8.22169 19.1653 8.55536 19.1653 8.96703V10.5682C20.5487 9.53036 21.3157 7.67569 22.1899 8.54344C23.0479 9.39494 21.2713 10.1403 20.5357 11.1673C22.2734 13.5636 22.6038 13.6232 22.5269 14.1486Z" fill="white" />
                                </svg>
                                <span className={styles.quickTxt}>{t("quick.kakao")}</span>
                            </a>
                        </li>
                        <li className={styles.quickItem}>
                            <a href="https://m.booking.naver.com/booking/13/bizes/1003562" target="_blank" rel="noopener noreferrer" className={styles.quickBtn}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
                                    <path d="M0 0.164215V21H7.01225V9.7804L14.989 20.9588H22V0H14.8206V11.2602L6.59127 0.16483L0 0.164215Z" fill="white" />
                                </svg>
                                <span className={styles.quickTxt}>{t("quick.naver")}</span>
                            </a>
                        </li>
                        <li className={styles.quickItem}>
                            <Link href="/community/reservation" className={styles.quickBtn}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                                    <path d="M23.3999 14.4542C23.2908 14.3237 23.1435 14.2309 22.9787 14.1886C22.814 14.1463 22.6402 14.1568 22.4818 14.2185L22.0024 14.4054V17.7529L23.4649 15.4373C23.5632 15.2889 23.6101 15.1124 23.5984 14.9347C23.5867 14.7571 23.5169 14.5883 23.3999 14.4542ZM17.0624 22.9285C17.0738 23.0824 17.1288 23.2297 17.2208 23.3535C17.3129 23.4772 17.4383 23.5722 17.5824 23.6273H18.1593C18.3266 23.5664 18.4694 23.4522 18.5655 23.3023L19.378 22.0023H16.9893L17.0624 22.9285Z" fill="white" />
                                    <path d="M19.5651 2.37256H6.43506C5.35762 2.37256 4.3243 2.80057 3.56244 3.56244C2.80057 4.3243 2.37256 5.35762 2.37256 6.43506V19.5651C2.37256 20.6425 2.80057 21.6758 3.56244 22.4377C4.3243 23.1995 5.35762 23.6276 6.43506 23.6276H15.5432C15.4804 23.441 15.4421 23.2471 15.4294 23.0507L15.3644 22.0026H6.42693C5.78047 22.0026 5.16048 21.7458 4.70336 21.2886C4.24624 20.8315 3.98943 20.2115 3.98943 19.5651V9.47381H22.0026V12.6669C22.263 12.5737 22.5385 12.5296 22.8151 12.5369C23.0934 12.5423 23.3685 12.5974 23.6276 12.6994V6.43506C23.6276 5.35762 23.1995 4.3243 22.4377 3.56244C21.6758 2.80057 20.6425 2.37256 19.5651 2.37256ZM7.21506 7.16631C7.01579 7.16631 6.821 7.10722 6.65532 6.99651C6.48964 6.88581 6.36051 6.72846 6.28425 6.54436C6.20799 6.36027 6.18804 6.15769 6.22692 5.96226C6.26579 5.76682 6.36175 5.5873 6.50265 5.4464C6.64355 5.3055 6.82307 5.20954 7.01851 5.17067C7.21394 5.13179 7.41652 5.15174 7.60061 5.228C7.78471 5.30426 7.94206 5.43339 8.05276 5.59907C8.16347 5.76475 8.22256 5.95954 8.22256 6.15881C8.22256 6.29112 8.1965 6.42213 8.14587 6.54436C8.09524 6.6666 8.02102 6.77766 7.92747 6.87122C7.83391 6.96477 7.72285 7.03899 7.60061 7.08962C7.47838 7.14025 7.34737 7.16631 7.21506 7.16631ZM18.7851 7.16631C18.5179 7.16631 18.2616 7.06016 18.0726 6.87122C17.8837 6.68228 17.7776 6.42601 17.7776 6.15881C17.7776 5.8916 17.8837 5.63534 18.0726 5.4464C18.2616 5.25746 18.5179 5.15131 18.7851 5.15131C19.0523 5.15131 19.3085 5.25746 19.4975 5.4464C19.6864 5.63534 19.7926 5.8916 19.7926 6.15881C19.7926 6.42601 19.6864 6.68228 19.4975 6.87122C19.3085 7.06016 19.0523 7.16631 18.7851 7.16631Z" fill="white" />
                                    <path d="M23.465 15.4375L22.0025 17.7856L19.3619 22.035L18.5494 23.335C18.4533 23.4849 18.3105 23.5991 18.1431 23.66C18.0535 23.6991 17.9565 23.7185 17.8588 23.7169C17.794 23.7247 17.7285 23.7247 17.6638 23.7169H17.5663C17.4222 23.6618 17.2968 23.5668 17.2047 23.4431C17.1126 23.3193 17.0577 23.172 17.0463 23.0181L16.9894 22.0919L16.8513 19.9631L13.9019 19.2156C13.7363 19.1733 13.5883 19.0799 13.4789 18.9486C13.3695 18.8173 13.3043 18.6549 13.2925 18.4844C13.2804 18.3121 13.3235 18.1405 13.4156 17.9944C13.5076 17.8483 13.6438 17.7354 13.8044 17.6719L22.0025 14.495L22.4819 14.3081C22.6403 14.2464 22.8142 14.2359 22.9789 14.2782C23.1436 14.3205 23.2909 14.4133 23.4 14.5438C23.4973 14.67 23.5553 14.822 23.5669 14.9809C23.5784 15.1398 23.543 15.2986 23.465 15.4375Z" fill="white" />
                                    <path d="M23.465 15.4375L22.0025 17.7856L19.3619 22.035L18.5494 23.335C18.4533 23.4849 18.3105 23.5991 18.1431 23.66C18.0535 23.6991 17.9565 23.7185 17.8588 23.7169C17.794 23.7247 17.7285 23.7247 17.6638 23.7169H17.5663C17.4222 23.6618 17.2968 23.5668 17.2047 23.4431C17.1126 23.3193 17.0577 23.172 17.0463 23.0181L16.9894 22.0919L16.8513 19.9631L13.9019 19.2156C13.7363 19.1733 13.5883 19.0799 13.4789 18.9486C13.3695 18.8173 13.3043 18.6549 13.2925 18.4844C13.2804 18.3121 13.3235 18.1405 13.4156 17.9944C13.5076 17.8483 13.6438 17.7354 13.8044 17.6719L22.0025 14.495L22.4819 14.3081C22.6403 14.2464 22.8142 14.2359 22.9789 14.2782C23.1436 14.3205 23.2909 14.4133 23.4 14.5438C23.4973 14.67 23.5553 14.822 23.5669 14.9809C23.5784 15.1398 23.543 15.2986 23.465 15.4375Z" fill="white" />
                                </svg>
                                <span className={styles.quickTxt}>{t("quick.reserve")}</span>
                            </Link>
                        </li>
                        <li className={styles.quickItem}>
                            <Link href="/about/info" className={styles.quickBtn}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="26" viewBox="0 0 20 26" fill="none">
                                    <path d="M0.787842 9.92734C0.787842 17.1758 8.56158 23.9831 8.90299 24.272L9.5333 24.8182L10.1636 24.272C10.505 23.9778 18.2788 17.1758 18.2788 9.92734C18.2788 5.10552 14.3551 1.18188 9.5333 1.18188C4.71148 1.18188 0.787842 5.10552 0.787842 9.92734ZM14.3919 9.92734C14.3919 12.6114 12.2173 14.7859 9.5333 14.7859C6.84926 14.7859 4.67471 12.6114 4.67471 9.92734C4.67471 7.2433 6.84926 5.06875 9.5333 5.06875C12.2173 5.06875 14.3919 7.24855 14.3919 9.92734Z" fill="white" />
                                </svg>
                                <span className={styles.quickTxt}>
                                    <span className={styles.pcOnly}>{t("quick.map")}</span>
                                    <span className={styles.mobileOnly}>{t("quick.location")}</span>
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}
