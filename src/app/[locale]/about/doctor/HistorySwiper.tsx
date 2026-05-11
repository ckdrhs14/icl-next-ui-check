"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./page.module.css";

interface HistoryItem {
    year: string;
    label: string;
    title: string;
    desc: string;
}

export function HistorySwiper({ items }: { items: HistoryItem[] }) {
    return (
        <div className={styles.swiperContainer}>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                pagination={{
                    el: `.${styles.swiperPagination}`,
                    clickable: true,
                    bulletClass: styles.bullet,
                    bulletActiveClass: styles.bulletActive
                }}
                navigation={{
                    nextEl: `.${styles.swiperBtnNext}`,
                    prevEl: `.${styles.swiperBtnPrev}`
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false
                }}
                className={styles.swiperInstance}
            >
                {items.map((item, idx) => (
                    <SwiperSlide key={idx}>
                        <div className={styles.slide}>
                            <div className={styles.slideDate}>
                                <p className={styles.slideYear}>{item.year}</p>
                                <p className={styles.slideLabel}>{item.label}</p>
                            </div>
                            <h3 className={styles.slideTitle}>{item.title}</h3>
                            <p className={styles.slideDesc}>{item.desc}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className={styles.swiperBtns}>
                <button className={styles.swiperBtnPrev} aria-label="이전" />
                <div className={styles.swiperPagination} />
                <button className={styles.swiperBtnNext} aria-label="다음" />
            </div>
        </div>
    );
}
