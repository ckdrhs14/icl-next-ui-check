"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import styles from "./Footer.module.css";

export function Footer() {
    const t = useTranslations("footer");

    return (
        <footer className={styles.footer}>
            <div className={styles.innerCon}>
                <div className={styles.logo}>
                    <Image src="/img/layout/footer_logo.svg" alt="닥터아이씨엘안과" width={140} height={40} />
                </div>
                <ul className={styles.ftNavList}>
                    <li>
                        <Link href="/legal/privacy">{t("privacy")}</Link>
                    </li>
                    <li>
                        <Link href="/legal/terms">{t("terms")}</Link>
                    </li>
                    <li>
                        <Link href="/legal/non-covered">{t("nonCovered")}</Link>
                    </li>
                    <li>
                        <a href="#">{t("certificate")}</a>
                    </li>
                </ul>
                <ul className={styles.ftTxtList}>
                    <li>{t("companyName")}</li>
                    <li>{t("address")}</li>
                    <li>{t("ceo")}</li>
                    <li>{t("tel")}</li>
                    <li>{t("bizNo")}</li>
                </ul>
                <p className={styles.copyright}>{t("copyright")}</p>
            </div>
        </footer>
    );
}
