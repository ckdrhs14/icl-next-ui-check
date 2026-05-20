import type { ReactNode } from 'react';
import Script from 'next/script';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
        />
      </head>
      <body suppressHydrationWarning>
        {/* GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P8M6Z82L"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
        {/* Analytics & GTM – placed in root layout outside React reconciliation tree */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-11442225205" strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','AW-11442225205',{allow_enhanced_conversions:true});`}</Script>
        <Script id="gtm-init" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-P8M6Z82L');`}</Script>
        <Script id="schema-org" type="application/ld+json" strategy="afterInteractive">{JSON.stringify({"@context":"http://schema.org","@type":"Organization","name":"doctorICL 닥터ICL","url":"https://doctoricl.com/","sameAs":["https://blog.naver.com/doctor_icl","https://www.youtube.com/@driclno.1","https://www.instagram.com/doctoricl"]})}</Script>
      </body>
    </html>
  );
}
