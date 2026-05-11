"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import styles from "./Footer.module.css";

export function Footer() {
    const t = useTranslations("footer");

    return (
        <footer className={styles.footer}>
            <div className={styles.wrap}>
                <div className={styles.lbx}>
                    <div className={styles.lbxLs}>
                        <div className={styles.footlogo}>
                            <Image src="/img/logo_white.svg" alt="닥터ICL" width={100} height={32} />
                        </div>
                        <div className={styles.lbxSns}>
                            <a
                                href="https://www.youtube.com/@driclno.1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.sns}
                            >
                                <img src="/img/main/icon_yutube.png" alt="YouTube" />
                            </a>
                            <a
                                href="https://pf.kakao.com/_rXGTG"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${styles.sns} ${styles.snsKakao}`}
                            >
                                {/* <img src="/img/common/icon_kakao.png" alt="KakaoTalk" /> */}
                            </a>
                            <a
                                href="https://blog.naver.com/doctor_icl"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.sns}
                            >
                                <img src="/img/main/icon_blog.png" alt="Blog" />
                            </a>
                            <a
                                href="https://www.instagram.com/doctoricl/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.sns}
                            >
                                <img src="/img/main/icon_insta.png" alt="Instagram" />
                            </a>
                        </div>
                    </div>
                    <ul className={styles.footinfo}>
                        <li>{t("address")}</li>
                        <li>{t("ceo")}</li>
                        <li>{t("bizNo")}</li>
                        <li>{t("tel")}</li>
                    </ul>
                    <p>{t("copyright")}</p>
                </div>
                <div className={styles.rbx}>
                    <ul className={styles.popupbtn}>
                        <li>
                            <Link href="/legal/non-covered">{t("nonCovered")}</Link>
                        </li>
                        <li>
                            <Link href="/legal/terms">{t("terms")}</Link>
                        </li>
                        <li>
                            <Link href="/legal/privacy">{t("privacy")}</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
