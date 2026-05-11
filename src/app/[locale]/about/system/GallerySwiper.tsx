"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import styles from "./page.module.css";

interface Slide {
    src: string;
    caption: string;
}

export function GallerySwiper({ slides }: { slides: Slide[] }) {
    return (
        <div className={`${styles.gallery} pc`}>
            <Swiper
                modules={[Autoplay]}
                loop
                loopAdditionalSlides={2}
                centeredSlides
                spaceBetween={30}
                speed={800}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false
                }}
                className={styles.gallerySwiper}
            >
                {slides.map((slide, idx) => (
                    <SwiperSlide key={idx}>
                        <Image src={slide.src} alt={slide.caption} width={800} height={500} />
                        <p className={styles.galleryCaption}>{slide.caption}</p>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
