"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./QuickBarSide.module.css";

export function QuickBarSide() {
    const t = useTranslations("header");
    const locale = useLocale();
    const isKo = locale === "ko";

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className={styles.quickBarSide}>
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

            {/* 카톡상담 (ko) / WhatsApp (en) */}
            {isKo ? (
                <a href="https://pf.kakao.com/_rXGTG" target="_blank" rel="noopener noreferrer" className={styles.cardKakao}>
                    <img src="/img/common/quickbar/icon_kakao.svg" alt="" className={styles.icon} />
                    <span className={styles.label}>{t("quick.sideMessenger")}</span>
                </a>
            ) : (
                <a href="https://wa.me/8225661215" target="_blank" rel="noopener noreferrer" className={styles.cardWhatsapp}>
                    <img src="/img/common/quickbar/icon_whatsapp.svg" alt="" className={styles.icon} />
                    <span className={styles.labelWhite}>{t("quick.sideMessenger")}</span>
                </a>
            )}

            {/* TOP */}
            <button type="button" onClick={scrollToTop} className={styles.cardTop}>
                <img src="/img/common/quickbar/icon_arrow_top.svg" alt="" className={styles.icon} />
                <span className={styles.labelWhite}>{t("quick.sideTop")}</span>
            </button>
        </div>
    );
}
