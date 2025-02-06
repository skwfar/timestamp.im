"use client";

import Script from 'next/script';

export default function GoogleAnalytics({ ga_id = 'G-LBEHR5JSQN' }) { // 替换为您的 GA4 跟踪 ID
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${ga_id}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ga_id}');
          `,
        }}
      />
    </>
  );
}