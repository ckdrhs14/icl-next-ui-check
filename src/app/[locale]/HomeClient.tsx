"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import dynamic from "next/dynamic";
import { useMainGsap } from "./useMainGsap";

const GlobeCanvas = dynamic(() => import("./GlobeCanvas"), { ssr: false });
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import s from "./page.module.css";
import type { YouTubeVideo } from "@/utils/youtube";
import type { InstaPost } from "@/utils/instagram";

/* ── data ── */
const fallbackYtVideos = [
    {
        id: "j3GQyliVv2I",
        title: "한국 유일 렌즈삽입술 전문병원 닥터ICL안과",
        published: "2026-05-21",
        thumbnail: "https://img.youtube.com/vi/j3GQyliVv2I/mqdefault.jpg"
    },
    {
        id: "o1uDJjAaknU",
        title: "그 간절함이 태평양을 건넜습니다 2편 | Angelica님의 ICL렌즈삽입술 수술 후기",
        published: "2026-05-14",
        thumbnail: "https://img.youtube.com/vi/o1uDJjAaknU/mqdefault.jpg"
    },
    {
        id: "DCLsJhl3Vd4",
        title: "그 간절함이 태평양을 건넜습니다 1편 | 미국에 사는 그녀의 ICL렌즈삽입술 수술 후기",
        published: "2026-05-14",
        thumbnail: "https://img.youtube.com/vi/DCLsJhl3Vd4/mqdefault.jpg"
    },
    {
        id: "wD26Gi3DwsQ",
        title: "ICL 렌즈삽입술, 의사들을 교육하는 의사에게 받으세요",
        published: "2026-04-16",
        thumbnail: "https://img.youtube.com/vi/wD26Gi3DwsQ/mqdefault.jpg"
    },
    {
        id: "mN0EFbMyz2I",
        title: "피프티피프티 FIFTYFIFTY 예원님의 ICL 수술후기2",
        published: "2026-04-07",
        thumbnail: "https://img.youtube.com/vi/mN0EFbMyz2I/mqdefault.jpg"
    }
];

const aboutImages = [
    { src: "/img/main/main_about_img1.jpg", alt: "엑스퍼트 인스트럭터" },
    { src: "/img/main/main_about_img2.jpg", alt: "엑스퍼트 인스트럭터" },
    { src: "/img/main/main_about_img3.jpg", alt: "엑스퍼트 인스트럭터" }
];

const introImages = [
    { src: "/img/main/main_intro_img1.jpg", alt: "레퍼런스 닥터 선정" },
    { src: "/img/main/main_intro_img2.jpg", alt: "엑스퍼트 인스트럭터" },
    { src: "/img/main/main_intro_img3.jpg", alt: "ICL 엑스퍼트 인스트럭터" },
    { src: "/img/main/main_intro_img4.jpg", alt: "ICL 엑스퍼트 인스트럭터" }
];

const expertiseItems = [
    {
        en: "Beyond Reference Doctor",
        ko: "레퍼런스 닥터를 넘어선 최고의 숙련도",
        desc: "단순히 장비를 사용하는 의사가 아니라 장비와 수술 방법의 기준을 공유하고 교육하는 의사로서 수술의 원리와 구조를 깊이 이해하고 직접 적용합니다. 경험에서 끝나는 것이 아니라 기준을 만들고 발전시키는 과정까지 함께하는 것, 그것이 레퍼런스 닥터를 넘어선 집도의의 역할입니다.",
        img: "/img/main/main_expertise_img1.jpg"
    },
    {
        en: "Expert Instructor",
        ko: "의사를 교육하고 수술을 전수하는 전담의",
        desc: "수술을 배우는 의사들이 찾아와 노하우를 배우고 실제 수술 과정을 함께 연구하고 토론하며 더 안전하고 더 정교한 방법을 만들어갑니다. 누군가를 가르친다는 것은 스스로 더 높은 기준을 유지해야 한다는 의미이며, 그 과정 자체가 수술의 완성도를 높이는 또 하나의 이유가 됩니다.",
        img: "/img/main/main_expertise_img2.jpg"
    },
    {
        en: "The Standard",
        ko: "의사에게 가르치는 완벽한 기준 그대로 직접 집도",
        desc: "교육할 때 사용하는 기준과 원칙을 환자의 수술에도 동일하게 적용합니다. 설명과 이론만 전달하는 것이 아니라 그 기준을 만든 의사가 직접 수술을 집도하기 때문에 수술의 과정과 결과 모두에서 차이를 만들어냅니다.",
        img: "/img/main/main_expertise_img3.jpg"
    }
];

const experienceTabs = [
    "ICL에 집중해 온 이동훈 대표 원장",
    "의사 대상 ICL 수술 교육 국내 다수 진행",
    "같은 도수, 다른 결과 0.1mm 노모그램 보정"
];

const thesisSlides = [
    {
        src: "/img/main/main_thesis_img1.jpg",
        text: "JCRS_Risk factors for normal-tension glaucoma among subgroups of patients"
    },
    { src: "/img/main/main_thesis_img2.jpg", text: "JKOS 대한안과학회지" },
    {
        src: "/img/main/main_thesis_img3.jpg",
        text: "JCRS_Risk factors for normal-tension glaucoma among subgroups of patients"
    },
    { src: "/img/main/main_thesis_img4.jpg", text: "Ophthalmology-International Edition" },
    { src: "/img/main/main_thesis_img5.jpg", text: "KJO-Korean Journal of Ophthalmology" }
];

const faqItems = [
    {
        img: "/img/main/main_faq_img1.jpg",
        title: "ICL 수술 후 빛 번짐(링 현상)?\n부작용이 아닌 이유와 적응 기간 총정리",
        date: "2025-12-01"
    },
    {
        img: "/img/main/main_faq_img2.jpg",
        title: "ICL 수술 전 검사 궁금증 해결\n산동검사 여부·비용·검사시간 안내",
        date: "2025-12-01"
    },
    { img: "/img/main/main_faq_img3.jpg", title: "갑자기 뿌옇게 보여요!!", date: "2025-12-01" },
    { img: "/img/main/main_faq_img4.jpg", title: "토릭 ICL!! 렌즈가 돌아갈까 봐\n걱정되시나요?", date: "2025-12-01" }
];

const newsData = {
    title: "각막 보존하는 시력교정 대안, 렌즈삽입술 선택 기준은?",
    author: "이동훈 닥터아이씨엘안과 원장",
    date: "2026.03.03",
    desc: "시력교정술의 주요 선택지로 언급되던 라식·라섹·스마일라식 등 레이저 시력교정술의 흐름 속에서, 최근에는 각막 보존을 우선 가치로 두는 렌즈삽입술(ICL)이 새롭게 부상하고 있다. 각막을 절삭하는 방식과 달리, 특수 렌즈를 홍채 뒤쪽에 위치시키는 접근은 각막 구조를 보존한다는 점에서 다르다.",
    link: "https://m.health.chosun.com/svc/news_view.html?contid=2026030303044",
    images: [
        "/img/main/main_news_img1.jpg",
        "/img/main/main_news_img2.jpg",
        "/img/main/main_news_img3.jpg",
        "/img/main/main_news_img4.jpg"
    ]
};

/* ── count-up hook ── */
function useCountUp(target: number, duration = 1500) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStarted(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.5 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        if (!started) return;
        const start = performance.now();
        const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [started, target, duration]);

    return [ref, count] as const;
}

/* ── Component ── */
function HeroVideo() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia("(max-width: 768px)");
        const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
            setIsMobile(e.matches);
        };
        onChange(mql);
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.load();
            video.play().catch(() => {});
        }
    }, [isMobile]);

    return (
        <video
            ref={videoRef}
            key={isMobile ? "mo" : "pc"}
            src={isMobile ? "/video/main_hero_video_high_mo.mp4" : "/video/main_hero_video_high.mp4"}
            autoPlay
            muted
            loop
            playsInline
            poster="/img/main/main_top_video_poster.jpg"
        />
    );
}

export default function HomeClient({
    ytVideos: ytVideosProp = [],
    instaPosts = []
}: {
    ytVideos?: YouTubeVideo[];
    instaPosts?: InstaPost[];
}) {
    const ytVideos = ytVideosProp.length > 0 ? ytVideosProp : fallbackYtVideos;
    const [activeExp, setActiveExp] = useState(0);
    const [newsIndex, setNewsIndex] = useState(0);
    const [thesisPopup, setThesisPopup] = useState<string | null>(null);
    const [activeYt, setActiveYt] = useState(0);
    const ytListRef = useRef<HTMLDivElement>(null);
    const expSwiperRef = useRef<SwiperType | null>(null);
    const expNavSwRef = useRef<SwiperType | null>(null);
    const expSyncing = useRef(false);
    const newsSwiperRef = useRef<SwiperType | null>(null);
    const [isMobileNav, setIsMobileNav] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia("(max-width: 768px)");
        const onChange = (e: MediaQueryListEvent | MediaQueryList) => setIsMobileNav(e.matches);
        onChange(mql);
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, []);

    /* count-up refs */
    const [yearRef, yearCount] = useCountUp(20);
    const [casesRef, casesCount] = useCountUp(15000);
    const [minRef, minCount] = useCountUp(4);
    const [, secCount] = useCountUp(13);
    const [satRef, satCount] = useCountUp(99);

    /* GSAP ScrollTrigger 기반 스크롤 애니메이션 (원본 main.js 이식) */
    useMainGsap();

    /* About 모바일 Swiper + Memo 모바일 Swiper (원본 main.js 동일) */
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let SwiperBundle: any = null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let aboutSw: any = null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let memoSw: any = null;
        let cancelled = false;

        function setup() {
            if (!SwiperBundle) return;
            const isMobile = window.innerWidth < 768;
            // About
            const aboutEl = document.querySelector('[data-mobile-swiper="about"]') as HTMLElement | null;
            if (aboutEl) {
                if (isMobile && !aboutSw) {
                    aboutSw = new SwiperBundle(aboutEl, {
                        slidesPerView: 1.2,
                        spaceBetween: 12,
                        loop: true,
                        centeredSlides: true,
                        autoplay: { delay: 5000, disableOnInteraction: false }
                    });
                } else if (!isMobile && aboutSw) {
                    aboutSw.destroy(true, true);
                    aboutSw = null;
                }
            }
            // Memo
            const memoEl = document.querySelector('[data-mobile-swiper="memo"]') as HTMLElement | null;
            if (memoEl) {
                if (isMobile && !memoSw) {
                    memoSw = new SwiperBundle(memoEl, { slidesPerView: 1, spaceBetween: 16, speed: 400 });
                } else if (!isMobile && memoSw) {
                    memoSw.destroy(true, true);
                    memoSw = null;
                }
            }
        }
        import("swiper/bundle").then((mod) => {
            if (cancelled) return;
            SwiperBundle = mod.default;
            setTimeout(setup, 600);
        });
        window.addEventListener("resize", setup);
        return () => {
            cancelled = true;
            window.removeEventListener("resize", setup);
            try {
                aboutSw?.destroy(true, true);
            } catch {
                /* noop */
            }
            try {
                memoSw?.destroy(true, true);
            } catch {
                /* noop */
            }
            document.querySelectorAll("[data-mobile-swiper] .swiper-slide-duplicate").forEach((dup) => dup.remove());
        };
    }, []);

    /* Swiper autoplay 제어: data-autoplay 속성 감지 */
    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((m) => {
                if (m.type !== "attributes" || m.attributeName !== "data-autoplay") return;
                const el = m.target as HTMLElement;
                const val = el.getAttribute("data-autoplay");
                const gsapId = el.getAttribute("data-gsap");
                let sw: SwiperType | null = null;
                if (gsapId === "experience-swiper") sw = expSwiperRef.current;
                if (gsapId === "news-swiper") sw = newsSwiperRef.current;
                if (!sw) return;
                if (val === "true") sw.autoplay.start();
                else sw.autoplay.stop();
            });
        });
        document.querySelectorAll('[data-gsap="experience-swiper"],[data-gsap="news-swiper"]').forEach((el) => {
            observer.observe(el, { attributes: true, attributeFilter: ["data-autoplay"] });
        });
        return () => observer.disconnect();
    }, []);

    /* Thesis Swiper: vanilla 초기화 (원본 main.js 동일) */
    const thesisSwiperRef = useRef<SwiperType | null>(null);

    useEffect(() => {
        const el = document.querySelector("[data-thesis-swiper]") as HTMLElement | null;
        if (!el) return;
        let cancelled = false;

        // swiper/bundle: 모든 모듈 내장 (loop, autoplay, coverflow 등)
        import("swiper/bundle").then((mod) => {
            if (cancelled) return;
            const SwiperBundle = mod.default;

            const slideCount = el.querySelectorAll(".swiper-slide").length;
            const doLoop = slideCount >= 3;

            thesisSwiperRef.current = new SwiperBundle(el, {
                effect: "coverflow",
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: "auto",
                spaceBetween: 24,
                loop: doLoop,
                autoplay: {
                    delay: doLoop ? 0 : 3000,
                    disableOnInteraction: false
                },
                speed: doLoop ? 3000 : 600,
                watchSlidesProgress: true,
                coverflowEffect: {
                    rotate: 100,
                    depth: -20,
                    modifier: 0.1,
                    scale: 1
                },
                on: {
                    init(sw: SwiperType) {
                        syncTxt(sw.realIndex);
                    },
                    slideChange(sw: SwiperType) {
                        syncTxt(sw.realIndex);
                    }
                }
            });

            function syncTxt(realIndex: number) {
                const wrap = document.querySelector("[data-thesis-txt-wrap]");
                if (!wrap) return;
                const idx = ((realIndex % thesisSlides.length) + thesisSlides.length) % thesisSlides.length;
                wrap.querySelectorAll<HTMLElement>("[data-thesis-txt]").forEach((txtEl, i) => {
                    txtEl.style.display = i === idx ? "block" : "none";
                });
            }
        });

        return () => {
            cancelled = true;
            if (thesisSwiperRef.current) {
                // loop 복제 슬라이드 제거 후 destroy
                try {
                    thesisSwiperRef.current.destroy(true, true);
                } catch {
                    /* noop */
                }
                thesisSwiperRef.current = null;
            }
            // Swiper가 DOM에 남긴 복제 슬라이드 수동 정리
            el?.querySelectorAll(".swiper-slide-duplicate").forEach((dup) => dup.remove());
        };
    }, []);

    const copyAddress = useCallback(async () => {
        try {
            await navigator.clipboard.writeText("서울특별시 강남구 강남대로 390, 20층(역삼동, 미진프라자)");
            alert("주소가 복사되었습니다.");
        } catch {
            /* noop */
        }
    }, []);

    return (
        <>
            {/* 1. Hero Video */}
            <section className={s.heroSection} data-header-bg="white">
                <HeroVideo />
            </section>

            {/* 2. About Section */}
            <section className={s.aboutSection} data-header-bg="white">
                <div className={`${s.innerCon} ${s.aboutInner}`}>
                    <div className={s.aboutInfoWrap}>
                        <figure className={s.aboutTxtWrap}>
                            <h5 data-aos="fade-up">당신의 집도의는 누구에게 수술을 배웠습니까?</h5>
                            <h3 data-aos="fade-up">ICL 엑스퍼트 인스트럭터</h3>
                            <div className={s.aboutDesc} data-aos="fade-up">
                                <p>
                                    같은 수술이라도 결과가 다른 이유는 분명합니다.
                                    <br />
                                    닥터아이씨엘 이동훈 대표원장은 단순한
                                    <br className={s.moBlock} /> &apos;ICL 레퍼런스 닥터&apos;를 넘어,
                                    <br className={s.pcBlock} />
                                    의사를
                                    <br className={s.moBlock} /> 가르치는 의사인{" "}
                                    <b className={s.highlight}>
                                        &apos;ICL 엑스퍼트 인스트럭터
                                        <br className={s.moBlock} />
                                        (Expert Instructor)&apos;
                                    </b>
                                    입니다.
                                </p>
                                <p>
                                    의사 교육을 전담하는 엄격한 기준과 압도적인 숙련도,
                                    <br />
                                    수술의 정석을 만드는 그 실력 그대로
                                    <br className={s.moBlock} /> 당신의 소중한 눈을 직접 집도합니다.
                                </p>
                            </div>
                        </figure>
                        <div className={`swiper ${s.aboutImgList}`} data-aos="fade-up" data-mobile-swiper="about">
                            <div className="swiper-wrapper">
                                {aboutImages.map((img, i) => (
                                    <div key={i} className={`swiper-slide ${s.aboutImgItem}`}>
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            width={250}
                                            height={330}
                                            style={{ width: "100%", height: "auto" }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Intro Section */}
            <section className={s.introSection} data-gsap="intro">
                <figure className={s.introStickyContainer} data-gsap="intro-container">
                    <div className={s.introImgList} data-gsap="intro-imglist">
                        {introImages.map((img, i) => (
                            <div key={i} className={s.introImgItem} data-aos="fade-up" data-gsap="intro-img-item">
                                <div className={s.introImgItemBox}>
                                    <div className={s.introImgItemImg} data-gsap="intro-img">
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            width={400}
                                            height={700}
                                            style={{ width: "100%", height: "auto" }}
                                        />
                                    </div>
                                    <div className={s.introImgItemDeco} data-gsap="intro-deco" />
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* 스티키 텍스트 (화면에 고정) */}
                    <div className={s.introStickyWrap} data-gsap="intro-sticky">
                        <figure className={s.introTxtBoxWrap}>
                            {/* txt-box1: step 1-2 */}
                            <div className={s.introTxtBox1}>
                                <h3 className={s.introTxtH3First}>레퍼런스 닥터를 넘어</h3>
                                <h3 className={s.introTxtH3Second}>수술의 기준이 되다</h3>
                                <div className={s.scrollDownIcon}>
                                    <div className={s.mouseIcon}>
                                        <div className={s.mouseWheel} />
                                    </div>
                                </div>
                            </div>
                            {/* txt-box2: step 3 */}
                            <div className={s.introTxtBox2}>
                                <h5>ICL Expert Instructor</h5>
                                <h3>ICL 엑스퍼트 인스트럭터</h3>
                                <div className={s.scrollDownIcon}>
                                    <div className={s.mouseIcon}>
                                        <div className={s.mouseWheel} />
                                    </div>
                                </div>
                            </div>
                        </figure>
                        {/* last-content: step 4 */}
                        <figure className={s.introLastContent}>
                            <div className={s.introLastInner}>
                                <div className={s.introLastDecoImg} />
                                <div className={s.introLastTitWrap}>
                                    <h5>ICL Expert Instructor</h5>
                                    <h3>ICL 엑스퍼트 인스트럭터</h3>
                                    <p>레퍼런스 닥터를 넘어, 수술의 기준이 되다</p>
                                </div>
                                <div className={s.introLastImgWrap}>
                                    <Image
                                        src="/img/main/main_intro_doctor.png"
                                        alt="이동훈 원장님"
                                        width={530}
                                        height={800}
                                        style={{ width: "100%", height: "auto" }}
                                    />
                                </div>
                                <div className={s.introLastTxtWrap}>
                                    <p>
                                        닥터아이씨엘 이동훈 대표원장은 ICL 레퍼런스 닥터를 거쳐, <br />
                                        현재는{" "}
                                        <b>
                                            전 세계 상위 1% 수준의 의사 교육 전담 포지션인 &apos;ICL 엑스퍼트
                                            인스트럭터&apos;로 활동
                                        </b>
                                        하고 있습니다.
                                    </p>
                                    <p>
                                        전문의에게 수술을 가르치는 더 엄격하고 정교한 기준. <br />
                                        의사를 가르치는 그 최고의 기술력이 닥터아이씨엘에서는 수술의 기본이 됩니다.{" "}
                                        <br />
                                        <b>결과의 차이, 집도의의 급(級)에서 시작</b>됩니다.
                                    </p>
                                </div>
                            </div>
                        </figure>
                    </div>
                </figure>
            </section>

            {/* 4. Expertise Section */}
            <section className={s.expertiseSection} data-gsap="expertise">
                <div className={s.expertiseTitWrap}>
                    <div className={s.cateTitWrap}>
                        <h5 data-aos="fade-left">ICL Expert Instructor</h5>
                        <h3 data-aos="fade-left">
                            같은 수술, 다른 결과 이유는{" "}
                            <span className={s.highlight}>&apos;집도의&apos;에 있습니다.</span>
                        </h3>
                        <p data-aos="fade-left">
                            수술의 완성도는 장비가 아닌, 집도의의 경험과 판단에서 결정됩니다.
                            <br />
                            수많은 케이스를 통해 축적된 노하우가 결과의 차이를 만들어냅니다.
                        </p>
                    </div>
                </div>
                {/* itemContainer: 스크롤 여유 높이 / itemRollerWrap: pin 대상 */}
                <div className={s.expertiseContainer} data-gsap="expertise-container">
                    <div className={s.expertiseRoller} data-gsap="expertise-roller">
                        <div className={s.expertiseList} data-gsap="expertise-list">
                            {expertiseItems.map((item, i) => (
                                <div key={i} className={s.expertiseItem} data-gsap="expertise-item">
                                    <div className={s.expertiseItemInner}>
                                        <div className={s.expertiseItemTxtWrap}>
                                            <div className={s.expertiseItemTit} data-gsap="expertise-tit">
                                                <h3 data-aos="fade-left">{item.en}</h3>
                                                <h5 data-aos="fade-left">{item.ko}</h5>
                                            </div>
                                            <div className={s.expertiseItemDesc} data-aos="fade-left">
                                                <p>{item.desc}</p>
                                            </div>
                                        </div>
                                        <div className={s.expertiseItemImgWrap}>
                                            <div className={s.expertiseItemImg} data-aos="fade-in">
                                                <Image
                                                    src={item.img}
                                                    alt={item.ko}
                                                    width={800}
                                                    height={500}
                                                    style={{ width: "100%", height: "auto" }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={s.expertiseDarkPanel} data-gsap="expertise-dark">
                            <div className={s.decoTxtWrap}>
                                <span className={`${s.decoTxt} ${s.decoTxt1}`} data-gsap="deco-txt1">
                                    ICL Expert Instructor
                                </span>
                                <span className={`${s.decoTxt} ${s.decoTxt2}`} data-gsap="deco-txt2">
                                    ICL Expert Instructor
                                </span>
                            </div>
                            <div className={s.expertiseDarkPanelTit}>
                                <h3>
                                    &ldquo;당신의 집도의는 누구에게&nbsp;
                                    <br className={s.moBlock} /> 수술을 배웠습니까?&rdquo;
                                </h3>
                                <p>의사를 가르치는 의사, 이동훈 대표원장이 닥터아이씨엘의 이름으로 증명합니다.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Experience Section */}
            <section className={`${s.contentSection} ${s.experienceSection}`}>
                <div className={s.innerCon}>
                    <div className={`${s.cateTitWrap} ${s.centerTit}`}>
                        <h5 data-aos="fade-up">ICL Expert Instructor</h5>
                        <h3 data-aos="fade-up">
                            ICL 엑스퍼트 인스트럭터는 <span className={s.highlight}>경험으로 증명됩니다.</span>
                        </h3>
                        <p data-aos="fade-up">이 과정의 끝에 ICL 엑스퍼트 인스트럭터 이동훈 대표 원장이 있습니다.</p>
                    </div>
                    {isMobileNav ? (
                        <Swiper
                            className={`${s.experienceNav} ${s.experienceNavMobile}`}
                            data-aos="fade-up"
                            slidesPerView={1}
                            centeredSlides={true}
                            loop={true}
                            speed={400}
                            onSwiper={(sw) => {
                                expNavSwRef.current = sw;
                            }}
                            onSlideChange={(sw) => {
                                if (expSyncing.current) return;
                                expSyncing.current = true;
                                setActiveExp(sw.realIndex);
                                expSwiperRef.current?.slideToLoop(sw.realIndex);
                                requestAnimationFrame(() => {
                                    expSyncing.current = false;
                                });
                            }}
                        >
                            {experienceTabs.map((tab, i) => (
                                <SwiperSlide
                                    key={i}
                                    className={`${s.experienceNavItem} ${activeExp === i ? s.experienceNavItemActive : ""}`}
                                >
                                    <div className={s.experienceNavCircleWrap}>
                                        <span className={s.experienceNavCircle} />
                                    </div>
                                    <h5>{tab}</h5>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className={s.experienceNav} data-aos="fade-up">
                            {experienceTabs.map((tab, i) => (
                                <div
                                    key={i}
                                    className={`${s.experienceNavItem} ${activeExp === i ? s.experienceNavItemActive : ""}`}
                                    onClick={() => {
                                        setActiveExp(i);
                                        expSwiperRef.current?.slideToLoop(i);
                                    }}
                                >
                                    <div className={s.experienceNavCircleWrap}>
                                        <span className={s.experienceNavCircle} />
                                    </div>
                                    <h5>{tab}</h5>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className={s.experienceContentWrap}>
                        <Swiper
                            data-gsap="experience-swiper"
                            modules={[EffectFade, Autoplay]}
                            effect="fade"
                            fadeEffect={{ crossFade: true }}
                            speed={600}
                            loop={true}
                            autoplay={{ delay: 5000, disableOnInteraction: false }}
                            onSwiper={(sw) => {
                                expSwiperRef.current = sw;
                                sw.autoplay.stop();
                            }}
                            onSlideChange={(sw) => {
                                if (expSyncing.current) return;
                                expSyncing.current = true;
                                setActiveExp(sw.realIndex);
                                if (expNavSwRef.current && !expNavSwRef.current.destroyed) {
                                    expNavSwRef.current.slideToLoop(sw.realIndex, 400, false);
                                }
                                requestAnimationFrame(() => {
                                    expSyncing.current = false;
                                });
                            }}
                            allowTouchMove={true}
                        >
                            {/* Slide 1: Stats */}
                            <SwiperSlide>
                                <div className={s.experienceSlide}>
                                    <div className={s.experienceSlideImg}>
                                        <Image
                                            src="/img/main/main_experience_img1.jpg"
                                            alt="ICL에 집중해 온 이동훈 대표 원장"
                                            width={795}
                                            height={530}
                                            style={{ width: "100%", height: "auto" }}
                                        />
                                    </div>
                                    <div className={s.experienceSlideInfo}>
                                        <div className={s.experienceTitWrap}>
                                            <h5>
                                                <span className={s.highlight}>1 C</span>hoice for{" "}
                                                <span className={s.highlight}>L</span>ife
                                            </h5>
                                            <p>ICL에 집중해 온 이동훈 대표 원장</p>
                                        </div>
                                        <div className={s.statGrid}>
                                            <div className={s.statItem} ref={yearRef}>
                                                <div className={s.statNum}>
                                                    <span className={s.statCount}>{yearCount}</span>
                                                    <span className={s.statUnit}>년</span>
                                                    <span className={s.statPlus}>
                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                            <path
                                                                d="M12 6.857H6.857V12H5.143V6.857H0V5.143h5.143V0h1.714v5.143H12v1.714Z"
                                                                fill="black"
                                                            />
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div className={s.statTxt}>
                                                    <h5>ICL에 집중해온 시간</h5>
                                                </div>
                                            </div>
                                            <div className={s.statItem} ref={casesRef}>
                                                <div className={s.statNum}>
                                                    <span className={s.statCount}>{casesCount.toLocaleString()}</span>
                                                    <span className={s.statUnit}>건</span>
                                                    <span className={s.statPlus}>
                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                            <path
                                                                d="M12 6.857H6.857V12H5.143V6.857H0V5.143h5.143V0h1.714v5.143H12v1.714Z"
                                                                fill="black"
                                                            />
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div className={s.statTxt}>
                                                    <h5>ICL 수술 집도 건 수</h5>
                                                </div>
                                            </div>
                                            <div className={s.statItem} ref={minRef}>
                                                <div className={s.statNum}>
                                                    <span className={s.statCount}>{minCount}</span>
                                                    <span className={s.statUnit}>분</span>
                                                    <span className={s.statCount}>{secCount}</span>
                                                    <span className={s.statUnit}>초</span>
                                                </div>
                                                <div className={s.statTxt}>
                                                    <h5>
                                                        평균 수술 시간
                                                        <br />
                                                        단안기준, 렌즈세팅 및 소독시간 제외
                                                    </h5>
                                                    <h6>2022.11~2023.7 평균실적</h6>
                                                </div>
                                            </div>
                                            <div className={s.statItem} ref={satRef}>
                                                <div className={s.statNum}>
                                                    <span className={s.statCount}>{satCount}</span>
                                                    <span className={s.statUnit}>%</span>
                                                </div>
                                                <div className={s.statTxt}>
                                                    <h5>
                                                        수술 후 만족도
                                                        <br />
                                                        (스페인, 한국, 싱가폴 공동조사)
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            {/* Slide 2 */}
                            <SwiperSlide>
                                <div className={s.experienceSlide}>
                                    <div className={s.experienceSlideImg}>
                                        <Image
                                            src="/img/main/main_experience_img2.jpg"
                                            alt="의사 대상 ICL 수술 교육 국내 다수 진행"
                                            width={795}
                                            height={530}
                                            style={{ width: "100%", height: "auto" }}
                                        />
                                    </div>
                                    <div className={s.experienceSlideInfo}>
                                        <div className={s.infoList}>
                                            {[
                                                { n: 1, b: "국내 다수 회차", t: "의사 대상 ICL 수술 교육 진행" },
                                                { n: 2, b: "고난도 케이스 중심", t: "어려운 수술 케이스 교육" },
                                                { n: 3, b: "실제 수술 현장 중심", t: "이론이 아닌 집도 기준 전수" },
                                                { n: 4, b: "국내외 의료진 참여", t: "다양한 임상 케이스 공유" }
                                            ].map((item) => (
                                                <div key={item.n} className={s.infoListItem}>
                                                    <span className={s.infoListItemCircle}>{item.n}</span>
                                                    <p>
                                                        <b>{item.b}</b> {item.t}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            {/* Slide 3 */}
                            <SwiperSlide>
                                <div className={s.experienceSlide}>
                                    <div className={s.experienceSlideImg}>
                                        <Image
                                            src="/img/main/main_experience_img3.jpg"
                                            alt="같은 도수, 다른 결과 0.1mm 노모그램 보정"
                                            width={795}
                                            height={530}
                                            style={{ width: "100%", height: "auto" }}
                                        />
                                    </div>
                                    <div className={s.experienceSlideInfo}>
                                        <div className={s.infoList}>
                                            {[
                                                { n: 1, b: "0.1mm 단위 보정", t: "개인별 노모그램 수동 보정" },
                                                { n: 2, b: "데이터 + 판단 병행", t: "기계 수치 그대로 쓰지 않음" },
                                                { n: 3, b: "차트 기록 기반", t: "수술 결과를 다음 판단에 반영" },
                                                { n: 4, b: "재수술 최소화 기준", t: "처음부터 한 번에 끝내는 설계" }
                                            ].map((item) => (
                                                <div key={item.n} className={s.infoListItem}>
                                                    <span className={s.infoListItemCircle}>{item.n}</span>
                                                    <p>
                                                        <b>{item.b}</b> {item.t}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </section>

            {/* 6. Thesis Section */}
            <section className={`${s.contentSection} ${s.thesisSection}`} data-header-bg="white">
                <div className={`${s.cateTitWrap} ${s.centerTit}`}>
                    <h5 data-aos="fade-up">Global Doctoricl Eye Center</h5>
                    <h3 data-aos="fade-up">이동훈 대표원장님의 논문</h3>
                    <p data-aos="fade-up">
                        ICL 제1저자 연구논문 한국인 최초 안과학 최고 권위 학술지 Ophthalmology 등재
                    </p>
                </div>
                <div className={s.thesisSwiperWrap} data-aos="fade-up">
                    <div className={`swiper ${s.thesisSwiperEl}`} data-thesis-swiper="">
                        <div className="swiper-wrapper">
                            {[...thesisSlides, ...thesisSlides, ...thesisSlides].map((slide, i) => (
                                <div key={i} className="swiper-slide" data-text={slide.text}>
                                    <div
                                        className={s.thesisSlide}
                                        onClick={() => {
                                            setThesisPopup(slide.src);
                                            thesisSwiperRef.current?.autoplay?.stop();
                                        }}
                                    >
                                        <Image
                                            src={slide.src}
                                            alt={slide.text}
                                            width={365}
                                            height={500}
                                            style={{ width: "100%", height: "auto" }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={s.thesisTxtWrap} data-thesis-txt-wrap="">
                    {thesisSlides.map((slide, i) => (
                        <p key={i} data-thesis-txt={i} style={{ display: "none" }}>
                            {slide.text}
                        </p>
                    ))}
                </div>
            </section>

            {/* Thesis Popup — 항상 렌더, CSS로 표시/숨김 (Swiper DOM 충돌 방지) */}
            <div
                className={`${s.thesisPopup} ${thesisPopup ? s.thesisPopupVisible : ""}`}
                onClick={() => {
                    setThesisPopup(null);
                    thesisSwiperRef.current?.autoplay?.start();
                }}
            >
                <div className={s.thesisPopupImg}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {thesisPopup && <img src={thesisPopup} alt="논문" />}
                </div>
                <button
                    className={s.thesisPopupClose}
                    onClick={() => {
                        setThesisPopup(null);
                        thesisSwiperRef.current?.autoplay?.start();
                    }}
                >
                    <span />
                    <span />
                </button>
            </div>

            {/* 7. Technology Section */}
            <section className={s.technologySection} data-gsap="technology">
                <div className={s.techContainerWrap} data-gsap="tech-wrap">
                    <figure className={`${s.techInfo} ${s.techInfo1}`} data-gsap="tech-info1">
                        <div className={s.technologyInner}>
                            <figure className={s.technologyTitWrap}>
                                <div className={s.cateTitWrap}>
                                    <h5 data-aos="fade-left">ICL Expert Instructor</h5>
                                    <h3 data-aos="fade-left">
                                        그렇다면 <span className={s.highlight}>0.1mm의 판단은</span>
                                        <br />
                                        어떻게 만들어질까요?
                                    </h3>
                                    <div className={s.techTxtDesc} data-aos="fade-left">
                                        <p>감각이 아니라 첨단 장비를 통한 정확한 측정과 기록으로 판단합니다.</p>
                                    </div>
                                </div>
                                <div className={s.technologyImgWrap}>
                                    <div className={s.technologyImg} data-aos="fade-up">
                                        <Image
                                            src="/img/main/main_technology_img1_1.jpg"
                                            alt="첨단 장비"
                                            width={400}
                                            height={300}
                                            style={{ width: "100%", height: "auto" }}
                                        />
                                    </div>
                                    <div className={s.technologyImg} data-aos="fade-up">
                                        <Image
                                            src="/img/main/main_technology_img1_2.jpg"
                                            alt="정확한 측정"
                                            width={400}
                                            height={300}
                                            style={{ width: "100%", height: "auto" }}
                                        />
                                    </div>
                                </div>
                            </figure>
                            <figure className={s.technologyThumb} data-gsap="tech-thumb1">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/img/main/main_technology_bg.gif"
                                    alt="0.1mm의 판단"
                                    data-gsap="tech-thumb1-img"
                                />
                            </figure>
                        </div>
                    </figure>
                    <figure className={`${s.techInfo} ${s.techInfo2}`} data-gsap="tech-info2">
                        <div className={s.technologyInner}>
                            <figure className={s.technologyTitWrap}>
                                <div className={s.cateTitWrap}>
                                    <h5>ICL Expert Instructor</h5>
                                    <h3>
                                        이러한 과정으로 <br />
                                        0.1mm의 판단은{" "}
                                        <span className={s.moBlock}>
                                            <br />
                                        </span>
                                        완성됩니다.
                                    </h3>
                                    <p>(0.1mm 노모그램 보정)</p>
                                </div>
                                <div className={s.technologyImgWrap} style={{ marginTop: 40 }}>
                                    <div className={s.technologyImg}>
                                        <Image
                                            src="/img/main/main_technology_img2_1.jpg"
                                            alt="노모그램 보정"
                                            width={400}
                                            height={300}
                                            style={{ width: "100%", height: "auto" }}
                                        />
                                    </div>
                                    <div className={s.technologyImg}>
                                        <Image
                                            src="/img/main/main_technology_img2_2.jpg"
                                            alt="노모그램 보정"
                                            width={400}
                                            height={300}
                                            style={{ width: "100%", height: "auto" }}
                                        />
                                    </div>
                                </div>
                            </figure>
                            <figure className={s.technologyThumb}>
                                <video
                                    src="/video/main_technology_video.mp4"
                                    muted
                                    loop
                                    playsInline
                                    autoPlay
                                    poster="/img/main/main_technology_video_poster.jpg"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </figure>
                        </div>
                    </figure>
                </div>
            </section>

            {/* 8. Memo Section */}
            <section className={`${s.contentSection} ${s.memoSection}`}>
                <div data-gsap="memo" className={s.memoInner}>
                    <div className={`${s.cateTitWrap} ${s.centerTit} ${s.memoTitWrap}`}>
                        <h5>ICL Expert Instructor</h5>
                        <h3>
                            이러한 과정으로 <br />
                            <span className={s.highlight}>0.1mm의 판단은</span> 완성됩니다.
                        </h3>
                        <p>수술은 끝나도 기록은 끝나지 않습니다</p>
                    </div>
                    <div className={`swiper ${s.memoList}`} data-mobile-swiper="memo">
                        <div className="swiper-wrapper">
                            {[1, 2, 3].map((n) => (
                                <div
                                    key={n}
                                    className={`swiper-slide ${s.memoItem} ${s[`memoItem${n}` as keyof typeof s]}`}
                                >
                                    <Image
                                        src={`/img/main/main_memo_img${n}.png`}
                                        alt="수술 기록"
                                        width={400}
                                        height={550}
                                        style={{ width: "100%", height: "auto" }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. Global Section */}
            <section className={`${s.contentSection} ${s.globalSection}`} data-header-bg="white">
                <div className={s.innerCon}>
                    <div className={`${s.cateTitWrap} ${s.centerTit}`}>
                        <h5 data-aos="fade-up">Global Doctoricl Eye Center</h5>
                        <h3 data-aos="fade-up">글로벌 닥터 ICL 안과</h3>
                        <p data-aos="fade-up">ICL 수술의 기준을 세계 학술 현장에서 공유합니다.</p>
                    </div>
                    <GlobeCanvas />
                </div>
            </section>

            {/* 10. FAQ Section */}
            <section className={`${s.contentSection} ${s.faqSection}`}>
                <div className={s.innerCon}>
                    <div className={`${s.cateTitWrap} ${s.centerTit}`}>
                        <h5 data-aos="fade-up">Doctoricl Insights</h5>
                        <h3 data-aos="fade-up">
                            닥터 ICL 안과 고객님들이 <span className={s.highlight}>궁금해 하시는 내용</span>
                        </h3>
                        <p data-aos="fade-up">닥터 ICL 칼럼에서 확인하세요</p>
                    </div>
                    <div className={s.faqGrid} data-aos="fade-up">
                        {faqItems.map((item, i) => (
                            <div key={i} className={s.faqItem}>
                                <div className={s.faqItemImg}>
                                    <Image
                                        src={item.img}
                                        alt={item.title}
                                        width={400}
                                        height={300}
                                        style={{ width: "100%", height: "auto" }}
                                    />
                                </div>
                                <div className={s.faqItemTxt}>
                                    <h5>
                                        {item.title.split("\n").map((line, j) => (
                                            <span key={j}>
                                                {line}
                                                {j < item.title.split("\n").length - 1 && <br />}
                                            </span>
                                        ))}
                                    </h5>
                                    <p>{item.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 10-1. YouTube Section */}
            <section className={s.youtubeSection}>
                <div className={s.youtubeInner}>
                    <div className={s.youtubePlayer} data-aos="fade-right">
                        <iframe
                            key={ytVideos[activeYt].id}
                            src={`https://www.youtube.com/embed/${ytVideos[activeYt].id}?rel=0`}
                            title={ytVideos[activeYt].title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                    <div className={s.youtubeContent} data-aos="fade-left">
                        <div className={s.youtubeTitWrap}>
                            <div>
                                <h5>Doctoricl YOUTUBE</h5>
                                <h3>
                                    렌즈삽입술은 닥터ICL안과
                                    <br />
                                    <span>유튜브에서 닥터ICL을 만나보세요</span>
                                </h3>
                            </div>
                            <a
                                href="https://www.youtube.com/@driclno.1/videos"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={s.youtubeBtn}
                            >
                                <span className={s.youtubeBtnDot} />
                                <span>닥터ICL안과 유튜브 바로가기</span>
                            </a>
                        </div>
                        <div className={s.youtubeListWrap}>
                            <div className={s.youtubeList} ref={ytListRef} data-lenis-prevent>
                                {ytVideos.map((v, i) => (
                                    <div key={v.id}>
                                        <button
                                            type="button"
                                            className={`${s.youtubeItem} ${activeYt === i ? s.youtubeItemActive : ""}`}
                                            onClick={() => setActiveYt(i)}
                                        >
                                            <div className={s.youtubeItemThumb}>
                                                <img src={v.thumbnail} alt={v.title} />
                                            </div>
                                            <div className={s.youtubeItemTxt}>
                                                <h6>{v.title}</h6>
                                                <p>{v.published}</p>
                                            </div>
                                        </button>
                                        {i < ytVideos.length - 1 && <div className={s.youtubeDivider} />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 10-2. Instagram Section */}
            <section className={s.instaSection}>
                <div className={s.instaTitArea} data-aos="fade-up">
                    <div className={s.instaTitWrap}>
                        <h5>Doctoricl Insights</h5>
                        <h3>
                            닥터ICL안과의 <span className={s.highlight}>새로운 소식</span>을 만나보세요
                        </h3>
                    </div>
                    <a
                        href="https://www.instagram.com/doctoricl/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={s.instaBtn}
                    >
                        <span className={s.instaBtnDot} />
                        <span>닥터ICL 인스타그램 바로가기</span>
                    </a>
                </div>
                <div className={s.instaGrid} data-aos="fade-up">
                    {instaPosts.length > 0
                        ? instaPosts.map((post) => (
                              <a
                                  key={post.id}
                                  href={post.permalink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={s.instaCard}
                              >
                                  <div className={s.instaCardImg}>
                                      <img src={post.thumbnail} alt={post.caption.slice(0, 50)} />
                                  </div>
                                  <div className={s.instaCardTxt}>
                                      <h6>
                                          {post.caption.length > 40 ? post.caption.slice(0, 40) + "…" : post.caption}
                                      </h6>
                                      <p>{post.timestamp}</p>
                                  </div>
                              </a>
                          ))
                        : [
                              { img: 1, title: "2025 KOREA EVO ICL FORUM", date: "2025-08-06" },
                              { img: 2, title: "ICL EXPERT INSTRUCTOR 공식 선정", date: "2025-07-22" },
                              { img: 3, title: "세계 6인의 ICL Expert Doctor 선정", date: "2025-07-15" },
                              { img: 4, title: "2026 EVO ICL APAC EXPERTS SUMMIT", date: "2025-06-30" }
                          ].map((item) => (
                              <a
                                  key={item.img}
                                  href="https://www.instagram.com/doctoricl/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={s.instaCard}
                              >
                                  <div className={s.instaCardImg}>
                                      <Image
                                          src={`/img/main/main_insta_placeholder${item.img}.jpg`}
                                          alt={item.title}
                                          width={420}
                                          height={549}
                                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                      />
                                  </div>
                                  <div className={s.instaCardTxt}>
                                      <h6>{item.title}</h6>
                                      <p>{item.date}</p>
                                  </div>
                              </a>
                          ))}
                </div>
            </section>

            {/* 11. News Section */}
            <section className={`${s.contentSection} ${s.newsSection}`}>
                <div className={s.innerCon}>
                    <div className={s.newsContainer} data-aos="fade-up">
                        <div className={s.newsTop}>
                            <Image
                                src="/img/main/symbol_chosunmedia.png"
                                alt="조선미디어"
                                width={200}
                                height={40}
                                style={{ width: "auto", height: "auto" }}
                            />
                            <h5>
                                신뢰받는 매체가 선택한 <br />
                                닥터 ICL 안과 의료 소식
                            </h5>
                        </div>
                        <Swiper
                            data-gsap="news-swiper"
                            modules={[EffectFade, Autoplay]}
                            effect="fade"
                            fadeEffect={{ crossFade: true }}
                            speed={600}
                            loop={true}
                            autoplay={{ delay: 5000, disableOnInteraction: false }}
                            onSwiper={(sw) => {
                                newsSwiperRef.current = sw;
                                sw.autoplay.stop();
                            }}
                            onSlideChange={(sw) => setNewsIndex(sw.realIndex)}
                        >
                            {newsData.images.map((img, i) => (
                                <SwiperSlide key={i}>
                                    <div className={s.newsSlide}>
                                        <div className={s.newsSlideImg}>
                                            <Image
                                                src={img}
                                                alt="뉴스"
                                                width={595}
                                                height={400}
                                                style={{ width: "100%", height: "auto" }}
                                            />
                                        </div>
                                        <div className={s.newsSlideTxt}>
                                            <div className={s.newsSlideTit}>
                                                <h3>{newsData.title}</h3>
                                                <div className={s.newsSlideTitMeta}>
                                                    <b>{newsData.author}</b>
                                                    <span className={s.newsMetaLine} />
                                                    <span>{newsData.date}</span>
                                                </div>
                                            </div>
                                            <div className={s.newsSlideDesc}>
                                                <p>{newsData.desc} ·····</p>
                                            </div>
                                            <a
                                                href={newsData.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={s.newsLink}
                                            >
                                                <span>뉴스 기사 보러가기</span>
                                            </a>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className={s.newsThumbNav}>
                            {newsData.images.map((img, i) => (
                                <div
                                    key={i}
                                    className={`${s.newsThumbItem} ${newsIndex === i ? s.newsThumbItemActive : ""}`}
                                    onClick={() => newsSwiperRef.current?.slideToLoop(i)}
                                >
                                    <Image
                                        src={img}
                                        alt={`뉴스 ${i + 1}`}
                                        width={80}
                                        height={80}
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 12. Location Section */}
            <section className={s.locationSection}>
                <div className={s.locationMap}>
                    <Image
                        src="/img/main/map.jpg"
                        alt="오시는 길"
                        width={1000}
                        height={900}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </div>
                <div className={s.locationTxtWrap}>
                    {/* Address */}
                    <div className={s.locationTxtItem}>
                        <div className={s.locationTit}>
                            <h3 data-aos="fade-left">오시는 길</h3>
                            <p data-aos="fade-left">
                                <button type="button" className={s.addressCopyBtn} onClick={copyAddress}>
                                    서울특별시 강남구 강남대로 390,
                                    <br className={s.moBlock} /> 20층(역삼동, 미진프라자)
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="15"
                                        height="17"
                                        viewBox="0 0 15 17"
                                        fill="none"
                                    >
                                        <path
                                            d="M5 13.333a1.667 1.667 0 01-1.667-1.666V1.667C3.333 1.208 3.497.816 3.823.49 4.15.163 4.542 0 5 0h7.5c.458 0 .85.163 1.177.49.326.326.49.718.49 1.177v10c0 .458-.164.85-.49 1.177a1.605 1.605 0 01-1.177.49H5zm0-1.666h7.5V1.667H5v10zM1.667 16.667c-.459 0-.851-.164-1.178-.49A1.605 1.605 0 010 15V3.333h1.667V15h9.166v1.667H1.667z"
                                            fill="#1B1B1B"
                                        />
                                    </svg>
                                </button>
                            </p>
                        </div>
                        <div className={s.mapBtnList} data-aos="fade-left">
                            <div className={`${s.mapBtn} ${s.naverBtn}`}>
                                <a href="https://naver.me/Gt1t61PK" target="_blank" rel="noopener noreferrer">
                                    <span>
                                        <Image
                                            src="/img/main/icon_naver_map.png"
                                            alt="네이버 지도"
                                            width={24}
                                            height={24}
                                        />
                                    </span>
                                    <span>네이버 지도</span>
                                </a>
                            </div>
                            <div className={`${s.mapBtn} ${s.googleBtn}`}>
                                <a
                                    href="https://maps.app.goo.gl/TD3nU2nwgVGqjrs37"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span>
                                        <Image
                                            src="/img/main/icon_google_map.png"
                                            alt="구글 지도"
                                            width={24}
                                            height={24}
                                        />
                                    </span>
                                    <span>구글 지도</span>
                                </a>
                            </div>
                            <div className={`${s.mapBtn} ${s.kakaoBtn}`}>
                                <a
                                    href="https://place.map.kakao.com/518228682"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span>
                                        <Image
                                            src="/img/main/icon_kakao_map.png"
                                            alt="카카오 지도"
                                            width={24}
                                            height={24}
                                        />
                                    </span>
                                    <span>카카오 지도</span>
                                </a>
                            </div>
                            <div className={`${s.mapBtn} ${s.tmapBtn}`}>
                                <a
                                    href="https://poi.tmobiweb.com/app/share/position?contents=cGtleT0xMTIyNjE2NDAxJnBvaUlkPTExMjI2MTY0"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span>
                                        <Image src="/img/main/icon_tmap_map.png" alt="티맵" width={24} height={24} />
                                    </span>
                                    <span>티맵</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* Kakao */}
                    <div className={s.locationTxtItem}>
                        <div className={s.locationTit}>
                            <h3 data-aos="fade-left">카톡상담</h3>
                            <p data-aos="fade-left">
                                카카오톡 아이디 검색에서 <br className={s.moBlock} />{" "}
                                &ldquo;닥터아이씨엘안과의원&rdquo;을 검색하세요.
                            </p>
                        </div>
                    </div>
                    {/* Hours + Phone */}
                    <div className={`${s.locationTxtItem} ${s.locationFlexItem}`}>
                        <div>
                            <div className={s.locationTit}>
                                <h3 data-aos="fade-left">진료시간</h3>
                            </div>
                            <ul className={s.locationHoursList} data-aos="fade-left">
                                <li>
                                    <b>월, 화, 목, 금</b>
                                    <span>AM 09:00 ~ PM 06:00</span>
                                </li>
                                <li>
                                    <b>토요일</b>
                                    <span>AM 08:30 ~ PM 04:00</span>
                                </li>
                                <li>
                                    <b>점심시간</b>
                                    <span>PM 01:00 ~ PM 02:00</span>
                                </li>
                            </ul>
                            <p className={s.locationHoursNote} data-aos="fade-left">
                                * 수요일, 일요일 및 공휴일은 휴무입니다.
                            </p>
                        </div>
                        <div>
                            <div className={s.locationTit} data-aos="fade-left">
                                <h3>상담예약</h3>
                            </div>
                            <div className={s.locationPhone} data-aos="fade-left">
                                <a href="tel:02-6956-8882">02. 6956. 8882</a>
                            </div>
                            <div className={s.locationSocialList} data-aos="fade-left">
                                {[
                                    {
                                        href: "https://www.youtube.com/@driclno.1",
                                        img: "icon_youtube",
                                        gray: "icon_youtube_gray"
                                    },
                                    { href: "https://pf.kakao.com/_rXGTG", img: "icon_kakao", gray: "icon_kakao_gray" },
                                    {
                                        href: "https://www.instagram.com/doctoricl/",
                                        img: "icon_insta",
                                        gray: "icon_insta_gray"
                                    },
                                    {
                                        href: "https://blog.naver.com/doctor_icl",
                                        img: "icon_blog",
                                        gray: "icon_blog_gray"
                                    }
                                ].map((social, i) => (
                                    <div key={i} className={s.socialBtn}>
                                        <a href={social.href} target="_blank" rel="noopener noreferrer">
                                            <Image src={`/img/main/${social.gray}.png`} alt="" width={30} height={30} />
                                            <Image
                                                src={`/img/main/${social.img}.png`}
                                                alt=""
                                                width={30}
                                                height={30}
                                                className={s.socialBtnHoverImg}
                                            />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
