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

        </>
    );
}
