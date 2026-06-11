"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./QuickBarSide.module.css";

export function QuickBarSide() {
    const t = useTranslations("header");
    const locale = useLocale();
    const isKo = locale === "ko";
    const [open, setOpen] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className={`${styles.quickBarSide} ${isKo ? styles.ko : styles.en}`}>
            {/* 메뉴 항목들 (모바일: 토글로 보이기/숨기기) */}
            <div className={`${styles.items} ${open ? styles.itemsOpen : ""}`}>
                {/* 전화상담 / Phone Inquiry */}
                <a href="tel:02-566-1215" className={styles.cardWhite}>
                    <img src="/img/common/quickbar/icon_call.svg" alt="" className={styles.icon} />
                    <span className={styles.label}>{t("quick.sideCall")}</span>
                </a>

                {/* 빠른 예약 / Quick Reservation */}
                <Link href="/community/reservation" className={styles.cardWhite}>
                    <img src="/img/common/quickbar/icon_calendar.svg" alt="" className={styles.icon} />
                    <span className={styles.label}>{t("quick.sideReserve")}</span>
                </Link>

                {/* 오시는길 / Location */}
                <Link href="/about/map" className={styles.cardWhite}>
                    <img src="/img/common/quickbar/icon_location.svg" alt="" className={styles.icon} />
                    <span className={styles.label}>{t("quick.sideLocation")}</span>
                </Link>

                {/* 카톡상담 (ko) / WhatsApp (en) */}
                {isKo ? (
                    <a
                        href="https://pf.kakao.com/_rXGTG"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.cardKakao}
                    >
                        <img src="/img/common/quickbar/icon_kakao.svg" alt="" className={styles.icon} />
                        <span className={styles.label}>{t("quick.sideMessenger")}</span>
                    </a>
                ) : (
                    <a
                        href="https://wa.me/821076742012"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.cardWhatsapp}
                    >
                        <img src="/img/common/quickbar/icon_whatsapp.svg" alt="" className={styles.icon} />
                        <span className={styles.labelWhite}>{t("quick.sideMessenger")}</span>
                    </a>
                )}

                {/* 네이버예약 (ko only) */}
                {isKo && (
                    <a
                        href="https://m.booking.naver.com/booking/13/bizes/1003562"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.cardNaver}
                    >
                        <img src="/img/common/quickbar/icon_naver.svg" alt="" className={styles.icon} />
                        <span className={styles.labelWhite}>{t("quick.sideNaver")}</span>
                    </a>
                )}
            </div>

            {/* PC: TOP 버튼 / Mobile: 퀵메뉴 토글 버튼 */}
            <button type="button" onClick={scrollToTop} className={`${styles.cardTop} ${styles.btnTop}`}>
                <img src="/img/common/quickbar/icon_arrow_top.svg" alt="" className={styles.icon} />
                <span className={styles.labelWhite}>{t("quick.sideTop")}</span>
            </button>

            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={`${styles.cardToggle} ${styles.btnToggle}`}
            >
                <img src="/img/common/quickbar/icon_lightning.svg" alt="" className={styles.icon} />
                <span className={styles.labelWhite}>{t("quick.sideQuickMenu")}</span>
            </button>
        </div>
    );
}
