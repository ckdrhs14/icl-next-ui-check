"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
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
    { src: "/img/main/main_intro_img3.jpg", alt: "ICL Expert Instructor" },
    { src: "/img/main/main_intro_img4.jpg", alt: "ICL Expert Instructor" }
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
        fullImg: "/img/main/thesis_full/jcrs_glaucoma.jpg",
        text: "JCRS_Risk Factors for Normal Tension Glaucoma Among Subgroups of Patients"
    },
    {
        src: "/img/main/main_thesis_img2.jpg",
        fullImg: "/img/main/thesis_full/jkos_dlek.jpg",
        text: "JKOS_수포각막병증에서의 심층각막내피이식(DLEK)의 치료성적"
    },
    {
        src: "/img/main/main_thesis_img2.jpg",
        fullImg: "/img/main/thesis_full/jkos_intra_ocular.jpg",
        text: "JKOS_인공수정체 삽입술에 따른 조절력 비교"
    },
    {
        src: "/img/main/main_thesis_img2.jpg",
        fullImg: "/img/main/thesis_full/jkos_restor.jpg",
        text: "JKOS_구면/비구면 ReSTOR 인공수정체의 3개월 임상 결과"
    },
    {
        src: "/img/main/main_thesis_img4.jpg",
        fullImg: "/img/main/thesis_full/ophth_icl_vault.jpg",
        text: "Ophthalmology_Correlation between Preoperative Biometry and Posterior Chamber Phakic Visian ICL Vaulting"
    },
    {
        src: "/img/main/main_thesis_img5.jpg",
        fullImg: "/img/main/thesis_full/kjo_diabetic.jpg",
        text: "KJO_Diabetic Retinopathy and Peripapillary Retinal Thickness"
    },
    {
        src: "/img/main/main_thesis_img5.jpg",
        fullImg: "/img/main/thesis_full/kjo_femto.jpg",
        text: "KJO_Femtosecond Laser-Assisted Small Incision Deep Lamellar Endothelial Keratoplasty"
    },
    {
        src: "/img/main/main_thesis_img5.jpg",
        fullImg: "/img/main/thesis_full/kjo_plk.jpg",
        text: "KJO_A Comparison of Posterior Lamellar Keratoplasty Modalities: DLEK vs. DSEK"
    }
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

interface GlobalSlide {
    image?: string;
    video?: string;
    poster?: string;
    desc: string;
}

const globalModalData: Record<string, GlobalSlide[]> = {
    korea: [
        {
            image: "/img/main/global_slide/korea1.webp",
            desc: "2016.10\nSTAAR Surgical Asia-Pacific에서 ICL 2000 Awards 수상"
        },
        {
            image: "/img/main/global_slide/korea2.webp",
            desc: "2016.11 대한민국 서울\n- 116회 대한안과학회 학술대회에서 열린 '개원의를 위한 안과학회 주최 심포지엄'에서 안과의사회 라식수술 위원회 연수교육강좌 강연\n- 주제: \"각막굴절교정수술은 어디까지 안전한가?\""
        },
        { image: "/img/main/global_slide/korea3.webp", desc: "2017.03\nEVO+ICL APAC으로부터 TICL 500 Award 수상" },
        { image: "/img/main/global_slide/korea4.webp", desc: "2017.03\nToric EVO+ICL 레퍼런스 닥터 선정" },
        {
            image: "/img/main/global_slide/korea5.webp",
            desc: "2017.03 대한민국 서울\n3rd EVO+ICL Experts Meeting에서 초청강연 및 전체토론패널선정\nTICL 500 Award 수상\nCEA(Continuing Education Awards) 평생교육공로상 수상\n주제: Why Toric ICL?"
        },
        {
            image: "/img/main/global_slide/korea6.webp",
            desc: "2017.12\nEVO+ICL Practice of Excellence 수상 및 EVO+TICL 올해의 THE BEST SURGEON 선정"
        },
        {
            image: "/img/main/global_slide/korea7.webp",
            desc: '2018.07 대한민국 서울\n제7회 삼성안과심포지움\n"Controversies in Cornea & Cataract/Refractive Surgery"에서 강연\n주제: 굴절교정수술에서의 난시 — ICL with LRI vs Toric ICL'
        },
        {
            image: "/img/main/global_slide/korea8.webp",
            desc: "2018.11 서울한강로타리클럽 특별강연\n주제: 중장년기의 눈 건강"
        },
        {
            image: "/img/main/global_slide/korea9.webp",
            desc: "2018.11\n- 120회 대한안과학회 학술대회에서 열린 '개원의를 위한 안과학회 주최 심포지엄'에서 안과의사회 라식수술 위원회 연수교육강좌 강연\n- 주제: \"쉽고 간편한 ICL sizing과 exchange 비법\""
        },
        {
            image: "/img/main/global_slide/korea10.webp",
            desc: "2019.07 STAAR Surgical 전세계 1,000,000 cases 기념 BEST SURGEON 선정"
        },
        {
            image: "/img/main/global_slide/korea11.webp",
            desc: "2019.08 김안과 심포지움 초청 강연\n주제: ICL 안내렌즈 삽입술 후 발생 가능한 문제점과 해결법"
        },
        {
            image: "/img/main/global_slide/korea12.webp",
            desc: '2019.11\n- 122회 대한안과학회 학술대회 연제 제출\n- 주제: "파장가변 전방 빛간섭단층 촬영계 CASIA2의 안내계측치를 기반으로 시행한 후방 유수정체 안내렌즈 ICL 삽입술의 장기임상결과"'
        },
        {
            image: "/img/main/global_slide/korea13.webp",
            desc: "2020 KSCRS 정보통신이사 활동 및 영문판 홈페이지 표지모델 선정"
        },
        {
            image: "/img/main/global_slide/korea14.webp",
            desc: "2022 KSCRS 편 4판 백내장 교과서\n다초점렌즈삽입술 환자선택 챕터 저자 (공동집필)"
        },
        {
            image: "/img/main/global_slide/korea15.webp",
            desc: "Korea & Japan ICL Forum (서울)\n주제: Refractive Surgery Trend"
        },
        {
            image: "/img/main/global_slide/korea16.webp",
            desc: "2025.07\n2025 EVO ICL Forum\n주제: The Importance of Visual Quality in Refractive Surgery"
        },
        {
            image: "/img/main/global_slide/korea17.webp",
            desc: "2025.11\n3rd Korea & Japan ICL Forum\n주제: Phakic IOL usage in Korea, Japan KOL perspective\n— how to treat the Elderly, Presbyopic Patients, and Hyperopic Patients treatment"
        }
    ],
    spain: [
        {
            image: "/img/main/global_slide/spain1.webp",
            desc: '2015.09 스페인 바르셀로나\nEuropean Society of Cataract & Refractive Surgery (ESCRS) in Barcelona, Spain 발표\n주제: "Correlation between Preoperative Biometry and Posterior Chamber Phakic Visian Implantable Collamer Lens Vaulting"'
        },
        {
            image: "/img/main/global_slide/spain2.webp",
            desc: '2015.09 스페인 시체스\n12차 세계 ICL 전문가 미팅에서 초청 강연\nBest Speaker 및 ICL EXPERT AWARDS 수상\n주제: "Correlation between Preoperative Biometry and Posterior Chamber Phakic Visian Implantable Collamer Lens Vaulting"'
        }
    ],
    china: [
        {
            image: "/img/main/global_slide/china1_1.webp",
            desc: '2016.03 중국 상해\n2nd APAC ICL Expert Symposium 초청강연\n주제: "렌즈삽입술에 대한 집도의로서의 의학적 견해"'
        },
        {
            video: "/video/china1.mp4",
            poster: "/img/main/global_slide/china1_poster.jpg",
            desc: "VISION Group CEO 축하 영상\n(전세계 43개 안과 운영중)"
        },
        {
            video: "/video/china2.mp4",
            poster: "/img/main/global_slide/china2_poster.jpg",
            desc: "普瑞眼科 BRIGHT EYE HOSPITAL 원장 축하 영상\n(중국 내 총 27개 병원 운영중)"
        },
        {
            video: "/video/china3.mp4",
            poster: "/img/main/global_slide/china3_poster.jpg",
            desc: "AIER 안과병원 굴절수술 표준화 관리자 축하 영상\n(세계최대 안과그룹 — 전세계 813개 안과병원 운영중)"
        },
        {
            video: "/video/china4.mp4",
            poster: "/img/main/global_slide/china4_poster.jpg",
            desc: "STAAR Surgical 중국 총 책임자 축하 영상"
        }
    ],
    indonesia: [
        {
            image: "/img/main/global_slide/indonesia1.webp",
            desc: "2016.07 인도네시아 발리\n29th APACRS\n주제: 안구공간측정 및 최적렌즈선택모델에 관한 방정식"
        }
    ],
    portugal: [
        {
            image: "/img/main/global_slide/portugal1.webp",
            desc: "2017.10 포르투갈, 리스본\n14th EVO ICL Experts Summit에서 ICL 3000 Award 수상"
        },
        {
            image: "/img/main/global_slide/portugal2.webp",
            desc: "2017.10 포르투갈, 리스본\n35th European Society of Cataract & Refractive Surgery (ESCRS) 연자 초청\n주제: Optimization of vision implantable collamer lens vault by intentional rotation"
        }
    ],
    france: [
        {
            image: "/img/main/global_slide/france1.webp",
            desc: "2019.09 프랑스 파리\n10th EVO+ICL Experts Summit에서 EVO+ICL 5,000 Award 수상"
        },
        {
            image: "/img/main/global_slide/france2.webp",
            desc: "2019.09\nEuropean Society of Cataract & Refractive Surgery (ESCRS) in Paris 참석\n주제: 스마일 엑스트라 수술의 장기 임상 결과 및 안전성\n(lenticule extraction with accelerated corneal cross-linking (SMILE Xtra): two-year results)"
        }
    ],
    usa: [
        {
            image: "/img/main/global_slide/usa1.webp",
            desc: "2020.05\nAmerican Society of Cataract & Refractive Surgery (ASCRS) in Boston (online society) 발표"
        },
        {
            image: "/img/main/global_slide/usa2.webp",
            desc: "2025.04.25~28 LA ASCRS\n주제: Optimizing outcomes in a broad range of patients"
        },
        {
            video: "/video/usa1.mp4",
            poster: "/img/main/global_slide/usa1_poster.jpg",
            desc: "STAAR Surgical CEO 축하 영상"
        },
        {
            video: "/video/usa2.mp4",
            poster: "/img/main/global_slide/usa2_poster.jpg",
            desc: "STAAR Surgical Senior Vice President 축하 영상"
        },
        {
            video: "/video/usa3.mp4",
            poster: "/img/main/global_slide/usa3_poster.jpg",
            desc: "Tracey Technologies Vice President 축하 영상"
        }
    ],
    japan: [
        {
            image: "/img/main/global_slide/japan1.webp",
            desc: "2023.11.18\n2023 Korea & Japan ICL Forum (도쿄)\n주제: Quality of Vision & Recovery"
        },
        {
            image: "/img/main/global_slide/japan2.webp",
            desc: "2024.03.15~17\n2024 APAC Experts Summit\n주제: ICL — Now and Future"
        },
        {
            image: "/img/main/global_slide/japan3.webp",
            desc: "2024.11.14\n15th ICL Study Group Committee\n주제: ICL 수술 후 안내염의 원인과 대책"
        },
        {
            image: "/img/main/global_slide/japan4.webp",
            desc: "Yoshihiro Kitazawa 원장과 이동훈 원장\n(일본 최대 ICL 전문 클리닉 대표원장)"
        },
        {
            image: "/img/main/global_slide/japan5.webp",
            desc: "EYE CLINIC TOKYO 국제 진료 협력 파트너십 체결\n(일본 NO.1 ICL 전문 클리닉)"
        }
    ]
};

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
            src={isMobile ? "/video/main_hero_video_high_mo_v2.mp4" : "/video/main_hero_video_high_v2.mp4"}
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
    const t = useTranslations("home");
    const ytVideos = ytVideosProp.length > 0 ? ytVideosProp : fallbackYtVideos;
    const [activeExp, setActiveExp] = useState(0);
    const [newsIndex, setNewsIndex] = useState(0);
    const [thesisPopup, setThesisPopup] = useState<string | null>(null);

    useEffect(() => {
        if (thesisPopup) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [thesisPopup]);

    const [activeYt, setActiveYt] = useState(0);
    const [globalModal, setGlobalModal] = useState<string | null>(null);
    const [globalSlideIndex, setGlobalSlideIndex] = useState(0);
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
                slideToClickedSlide: false,
                preventClicks: false,
                preventClicksPropagation: false,
                touchStartPreventDefault: false,
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
                    },
                    click(_sw: SwiperType, event: PointerEvent | MouseEvent | TouchEvent) {
                        const target = (event.target as HTMLElement).closest(
                            "[data-thesis-full]"
                        ) as HTMLElement | null;
                        if (!target) return;
                        const fullImg = target.getAttribute("data-thesis-full") || "";
                        if (fullImg) {
                            setThesisPopup(fullImg);
                            thesisSwiperRef.current?.autoplay?.stop();
                        }
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

    const globalSwiperRef = useRef<SwiperType | null>(null);

    const openGlobalModal = useCallback((id: string) => {
        if (globalModalData[id]) {
            setGlobalSlideIndex(0);
            setGlobalModal(id);
            document.body.style.overflow = "hidden";
        }
    }, []);

    const closeGlobalModal = useCallback(() => {
        setGlobalModal(null);
        document.body.style.overflow = "";
    }, []);

    const copyAddress = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(t("location.address"));
            alert(t("location.address_copied"));
        } catch {
            /* noop */
        }
    }, [t]);

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
                            <h5 data-aos="fade-up">{t("about.question")}</h5>
                            <h3 data-aos="fade-up">{t("about.title")}</h3>
                            <div className={s.aboutDesc} data-aos="fade-up">
                                <p>
                                    {t("about.desc1")}
                                    <br />
                                    {t("about.desc2_1")}
                                    <br className={s.moBlock} /> {t("about.desc2_ref")}
                                    <br className={s.pcBlock} />
                                    {t("about.desc2_2")}
                                    <br className={s.moBlock} /> {t("about.desc2_3")}{" "}
                                    <b className={s.highlight}>{t("about.desc2_expert")}</b>
                                    {t("about.desc2_end")}
                                </p>
                                <p>
                                    {t("about.desc3_1")}
                                    <br />
                                    {t("about.desc3_2")}
                                    <br className={s.moBlock} /> {t("about.desc3_3")}
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
                                <h3 className={s.introTxtH3First}>{t("intro.h3_1")}</h3>
                                <h3 className={s.introTxtH3Second}>{t("intro.h3_2")}</h3>
                                <div className={s.scrollDownIcon}>
                                    <div className={s.mouseIcon}>
                                        <div className={s.mouseWheel} />
                                    </div>
                                </div>
                            </div>
                            {/* txt-box2: step 3 */}
                            <div className={s.introTxtBox2}>
                                <h5>ICL Expert Instructor</h5>
                                <h3>{t("intro.sub_h3")}</h3>
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
                                    <h3>{t("intro.sub_h3")}</h3>
                                    <p>{t("intro.last_p")}</p>
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
                                        {t("intro.last_txt1")} <br /> <b>{t("intro.last_txt1_b")}</b>
                                        {t("intro.last_txt1_end")}
                                    </p>
                                    <p>
                                        {t("intro.last_txt2")} <br />
                                        {t("intro.last_txt3")} <br />
                                        <b>{t("intro.last_txt3_b")}</b>
                                        {t("intro.last_txt3_end")}
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
                            {t("expertise.h3_1")} <span className={s.highlight}>{t("expertise.h3_highlight")}</span>
                        </h3>
                        <p data-aos="fade-left">{t("expertise.desc")}</p>
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
                                                <h3 data-aos="fade-left">{t(`expertise.items.${i}.en`)}</h3>
                                                <h5 data-aos="fade-left">{t(`expertise.items.${i}.ko`)}</h5>
                                            </div>
                                            <div className={s.expertiseItemDesc} data-aos="fade-left">
                                                <p>{t(`expertise.items.${i}.desc`)}</p>
                                            </div>
                                        </div>
                                        <div className={s.expertiseItemImgWrap}>
                                            <div className={s.expertiseItemImg} data-aos="fade-in">
                                                <Image
                                                    src={item.img}
                                                    alt={t(`expertise.items.${i}.ko`)}
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
                                <h3>{t("expertise.dark_quote")}</h3>
                                <p>{t("expertise.dark_sub")}</p>
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
                            {t("experience.h3_1")} <span className={s.highlight}>{t("experience.h3_highlight")}</span>
                        </h3>
                        <p data-aos="fade-up">{t("experience.desc")}</p>
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
                                    <h5>{t(`experience.tabs.${i}`)}</h5>
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
                                    <h5>{t(`experience.tabs.${i}`)}</h5>
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
                                            <p>{t("experience.slide1_sub")}</p>
                                        </div>
                                        <div className={s.statGrid}>
                                            <div className={s.statItem} ref={yearRef}>
                                                <div className={s.statNum}>
                                                    <span className={s.statCount}>{yearCount}</span>
                                                    <span className={s.statUnit}>{t("experience.stat_year")}</span>
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
                                                    <h5>{t("experience.stat_year_label")}</h5>
                                                </div>
                                            </div>
                                            <div className={s.statItem} ref={casesRef}>
                                                <div className={s.statNum}>
                                                    <span className={s.statCount}>{casesCount.toLocaleString()}</span>
                                                    <span className={s.statUnit}>{t("experience.stat_cases")}</span>
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
                                                    <h5>{t("experience.stat_cases_label")}</h5>
                                                </div>
                                            </div>
                                            <div className={s.statItem} ref={minRef}>
                                                <div className={s.statNum}>
                                                    <span className={s.statCount}>{minCount}</span>
                                                    <span className={s.statUnit}>{t("experience.stat_min")}</span>
                                                    <span className={s.statCount}>{secCount}</span>
                                                    <span className={s.statUnit}>{t("experience.stat_sec")}</span>
                                                </div>
                                                <div className={s.statTxt}>
                                                    <h5>
                                                        {t("experience.stat_time_label")}
                                                        <br />
                                                        {t("experience.stat_time_sub")}
                                                    </h5>
                                                    <h6>{t("experience.stat_time_period")}</h6>
                                                </div>
                                            </div>
                                            <div className={s.statItem} ref={satRef}>
                                                <div className={s.statNum}>
                                                    <span className={s.statCount}>{satCount}</span>
                                                    <span className={s.statUnit}>%</span>
                                                </div>
                                                <div className={s.statTxt}>
                                                    <h5>
                                                        {t("experience.stat_pct_label")}
                                                        <br />
                                                        {t("experience.stat_pct_sub")}
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
                                            {[0, 1, 2, 3].map((i) => (
                                                <div key={i} className={s.infoListItem}>
                                                    <span className={s.infoListItemCircle}>{i + 1}</span>
                                                    <p>
                                                        <b>{t(`experience.slide2.${i}.b`)}</b>{" "}
                                                        {t(`experience.slide2.${i}.t`)}
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
                                            {[0, 1, 2, 3].map((i) => (
                                                <div key={i} className={s.infoListItem}>
                                                    <span className={s.infoListItemCircle}>{i + 1}</span>
                                                    <p>
                                                        <b>{t(`experience.slide3.${i}.b`)}</b>{" "}
                                                        {t(`experience.slide3.${i}.t`)}
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
                    <h3 data-aos="fade-up">{t("thesis.h3")}</h3>
                    <p data-aos="fade-up">{t("thesis.desc")}</p>
                </div>
                <div className={s.thesisSwiperWrap} data-aos="fade-up">
                    <div className={`swiper ${s.thesisSwiperEl}`} data-thesis-swiper="">
                        <div className="swiper-wrapper">
                            {[...thesisSlides, ...thesisSlides, ...thesisSlides].map((slide, i) => (
                                <div key={i} className="swiper-slide" data-text={slide.text}>
                                    <div className={s.thesisSlide} data-thesis-full={slide.fullImg}>
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
                                        {t("technology.h3_1")}{" "}
                                        <span className={s.highlight}>{t("technology.h3_highlight")}</span>
                                        <br />
                                        {t("technology.h3_2")}
                                    </h3>
                                    <div className={s.techTxtDesc} data-aos="fade-left">
                                        <p>{t("technology.desc")}</p>
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
                                        {t("technology.h3_3")} <br />
                                        {t("technology.h3_4")}{" "}
                                        <span className={s.moBlock}>
                                            <br />
                                        </span>
                                        {t("technology.h3_5")}
                                    </h3>
                                    <p>{t("technology.sub")}</p>
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
                            {t("memo.h3_1")} <br />
                            <span className={s.highlight}>{t("memo.h3_highlight")}</span> {t("memo.h3_2")}
                        </h3>
                        <p>{t("memo.desc")}</p>
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
                        <h3 data-aos="fade-up">{t("global.h3")}</h3>
                        <p data-aos="fade-up">{t("global.desc")}</p>
                    </div>
                    <GlobeCanvas onMarkerClick={openGlobalModal} />
                </div>
            </section>

            {/* Global Modal */}
            {globalModal && globalModalData[globalModal] && (
                <div className={`${s.globalModal} ${s.globalModalOpen}`}>
                    <div className={s.globalModalBackdrop} onClick={closeGlobalModal} />
                    <div className={s.globalModalPanel}>
                        <button
                            className={s.globalModalClose}
                            type="button"
                            aria-label="닫기"
                            onClick={closeGlobalModal}
                        >
                            <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    d="M6 6l12 12M18 6L6 18"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                        <Swiper
                            className={s.globalModalSwiper}
                            modules={[EffectFade]}
                            effect="fade"
                            fadeEffect={{ crossFade: true }}
                            speed={320}
                            loop={true}
                            allowTouchMove={true}
                            onSwiper={(sw) => {
                                globalSwiperRef.current = sw;
                            }}
                            onSlideChange={(sw) => setGlobalSlideIndex(sw.realIndex)}
                        >
                            {globalModalData[globalModal].map((slide, i) => (
                                <SwiperSlide key={i}>
                                    <div className={s.globalModalBody}>
                                        <div className={s.globalModalImg}>
                                            {slide.video ? (
                                                <video
                                                    src={slide.video}
                                                    poster={slide.poster}
                                                    controls
                                                    playsInline
                                                    muted
                                                    preload="metadata"
                                                />
                                            ) : (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={slide.image || ""}
                                                    alt={t(`global.slides.${globalModal}.${i}`).split("\n")[0]}
                                                />
                                            )}
                                        </div>
                                        <div className={s.globalModalText}>
                                            <div className={s.globalModalTextInner}>
                                                {(() => {
                                                    const desc = t(`global.slides.${globalModal}.${i}`);
                                                    const lines = desc.split("\n");
                                                    const dateLine = lines[0] || "";
                                                    const descLine = lines.length > 1 ? lines[1] : "";
                                                    const subLines = lines.slice(2).join("\n");
                                                    return (
                                                        <div>
                                                            <p className={s.globalModalDate}>{dateLine}</p>
                                                            <p className={s.globalModalDesc}>{descLine}</p>
                                                            {subLines && (
                                                                <p className={s.globalModalSubdesc}>{subLines}</p>
                                                            )}
                                                        </div>
                                                    );
                                                })()}
                                                {globalModalData[globalModal].length > 1 && (
                                                    <div className={s.globalModalNav}>
                                                        <button
                                                            type="button"
                                                            className={s.globalModalArrow}
                                                            aria-label="이전"
                                                            onClick={() => globalSwiperRef.current?.slidePrev()}
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16"
                                                                height="12"
                                                                viewBox="0 0 16 12"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    d="M6 12L7.4 10.55L3.85 7H16V5H3.85L7.4 1.45L6 0L0 6L6 12Z"
                                                                    fill="#111"
                                                                />
                                                            </svg>
                                                        </button>
                                                        <span className={s.globalModalCounter}>
                                                            <span className={s.globalModalCounterCurrent}>
                                                                {String(globalSlideIndex + 1).padStart(2, "0")}
                                                            </span>
                                                            <span className={s.globalModalCounterDivider}>·</span>
                                                            <span className={s.globalModalCounterTotal}>
                                                                {String(globalModalData[globalModal].length).padStart(
                                                                    2,
                                                                    "0"
                                                                )}
                                                            </span>
                                                        </span>
                                                        <button
                                                            type="button"
                                                            className={s.globalModalArrow}
                                                            aria-label="다음"
                                                            onClick={() => globalSwiperRef.current?.slideNext()}
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16"
                                                                height="12"
                                                                viewBox="0 0 16 12"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    d="M10 12L8.6 10.55L12.15 7H0V5H12.15L8.6 1.45L10 0L16 6L10 12Z"
                                                                    fill="#111"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            )}

            {/* 10. FAQ Section */}
            <section className={`${s.contentSection} ${s.faqSection}`}>
                <div className={s.innerCon}>
                    <div className={`${s.cateTitWrap} ${s.centerTit}`}>
                        <h5 data-aos="fade-up">Doctoricl Insights</h5>
                        <h3 data-aos="fade-up">
                            {t("faq.h3_1")} <span className={s.highlight}>{t("faq.h3_highlight")}</span>
                        </h3>
                        <p data-aos="fade-up">{t("faq.desc")}</p>
                    </div>
                    <div className={s.faqGrid} data-aos="fade-up">
                        {faqItems.map((item, i) => {
                            const title = t(`faq.items.${i}.title`);
                            return (
                                <div key={i} className={s.faqItem}>
                                    <div className={s.faqItemImg}>
                                        <Image
                                            src={item.img}
                                            alt={title}
                                            width={400}
                                            height={300}
                                            style={{ width: "100%", height: "auto" }}
                                        />
                                    </div>
                                    <div className={s.faqItemTxt}>
                                        <h5>
                                            {title.split("\n").map((line: string, j: number) => (
                                                <span key={j}>
                                                    {line}
                                                    {j < title.split("\n").length - 1 && <br />}
                                                </span>
                                            ))}
                                        </h5>
                                        <p>{t(`faq.items.${i}.date`)}</p>
                                    </div>
                                </div>
                            );
                        })}
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
                                <h5>{t("youtube.h5")}</h5>
                                <h3>
                                    {t("youtube.h3_1")}
                                    <br />
                                    <span>{t("youtube.h3_2")}</span>
                                </h3>
                            </div>
                            <a
                                href="https://www.youtube.com/@driclno.1/videos"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={s.youtubeBtn}
                            >
                                <span className={s.youtubeBtnDot} />
                                <span>{t("youtube.btn")}</span>
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
                            {t("instagram.h3_1")} <span className={s.highlight}>{t("instagram.h3_highlight")}</span>
                            {t("instagram.h3_2")}
                        </h3>
                    </div>
                    <a
                        href="https://www.instagram.com/doctoricl/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={s.instaBtn}
                    >
                        <span className={s.instaBtnDot} />
                        <span>{t("instagram.btn")}</span>
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
                        : [0, 1, 2, 3]
                              .map((i) => ({ img: i + 1 }))
                              .map((item, i) => (
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
                                              alt={t(`instagram.fallback.${i}.title`)}
                                              width={420}
                                              height={549}
                                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                          />
                                      </div>
                                      <div className={s.instaCardTxt}>
                                          <h6>{t(`instagram.fallback.${i}.title`)}</h6>
                                          <p>{t(`instagram.fallback.${i}.date`)}</p>
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
                                {t("news.top_h5")} <br />
                                {t("news.top_h5_2")}
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
                                                <h3>{t("news.title")}</h3>
                                                <div className={s.newsSlideTitMeta}>
                                                    <b>{t("news.author")}</b>
                                                    <span className={s.newsMetaLine} />
                                                    <span>{newsData.date}</span>
                                                </div>
                                            </div>
                                            <div className={s.newsSlideDesc}>
                                                <p>{t("news.desc")} ·····</p>
                                            </div>
                                            <a
                                                href={newsData.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={s.newsLink}
                                            >
                                                <span>{t("news.link_text")}</span>
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
                            <h3 data-aos="fade-left">{t("location.h3_map")}</h3>
                            <p data-aos="fade-left">
                                <button type="button" className={s.addressCopyBtn} onClick={copyAddress}>
                                    {t("location.address")}
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
                                    <span>{t("location.naver")}</span>
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
                                            alt={t("location.google")}
                                            width={24}
                                            height={24}
                                        />
                                    </span>
                                    <span>{t("location.google")}</span>
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
                                            alt={t("location.kakao")}
                                            width={24}
                                            height={24}
                                        />
                                    </span>
                                    <span>{t("location.kakao")}</span>
                                </a>
                            </div>
                            <div className={`${s.mapBtn} ${s.tmapBtn}`}>
                                <a
                                    href="https://poi.tmobiweb.com/app/share/position?contents=cGtleT0xMTIyNjE2NDAxJnBvaUlkPTExMjI2MTY0"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span>
                                        <Image
                                            src="/img/main/icon_tmap_map.png"
                                            alt={t("location.tmap")}
                                            width={24}
                                            height={24}
                                        />
                                    </span>
                                    <span>{t("location.tmap")}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* Kakao */}
                    <div className={s.locationTxtItem}>
                        <div className={s.locationTit}>
                            <h3 data-aos="fade-left">{t("location.h3_kakao")}</h3>
                            <p data-aos="fade-left">{t("location.kakao_desc")}</p>
                        </div>
                    </div>
                    {/* Hours + Phone */}
                    <div className={`${s.locationTxtItem} ${s.locationFlexItem}`}>
                        <div>
                            <div className={s.locationTit}>
                                <h3 data-aos="fade-left">{t("location.h3_hours")}</h3>
                            </div>
                            <ul className={s.locationHoursList} data-aos="fade-left">
                                {[0, 1, 2].map((i) => (
                                    <li key={i}>
                                        <b>{t(`location.hours.${i}.day`)}</b>
                                        <span>{t(`location.hours.${i}.time`)}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className={s.locationHoursNote} data-aos="fade-left">
                                {t("location.hours_note")}
                            </p>
                        </div>
                        <div>
                            <div className={s.locationTit} data-aos="fade-left">
                                <h3>{t("location.h3_contact")}</h3>
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
