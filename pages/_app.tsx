import "@portaljs/components/styles.css";
import "@/styles/globals.scss";
import "@/styles/tabs.scss";

import { useEffect } from "react";
import type { AppProps } from "next/app";
import Script from "next/script";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";

import SEO from "../next-seo.config";
import { GA_MEASUREMENT_ID, pageview } from "@/lib/gtag";

import Loader from "../components/_shared/Loader";

import ThemeProvider from "../components/theme/theme-provider";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const theme = pageProps.theme || "lighter";

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    const handleRouteChange = (url: string) => pageview(url);
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider themeName={theme}>
      {GA_MEASUREMENT_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      ) : null}
      <DefaultSeo {...SEO} />
      <Loader />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
