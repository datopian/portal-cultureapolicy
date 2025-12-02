import nextSeoConfig, { imageUrl, siteTitle, url } from "@/next-seo.config";
import { BreadcrumbJsonLd, LogoJsonLd, NextSeo, WebPageJsonLd, SiteLinksSearchBoxJsonLd } from "next-seo";

export function GroupPageStructuredData() {
  const title = "Collections"
  const description = "Collections page of " + siteTitle
  return (
    <>
      <LogoJsonLd
        url={`${url}/collections`}
        logo={`${url}/favicon.ico`}
      />
      <NextSeo
        canonical={`${url}/collections`}
        title={`${title} | ${siteTitle}`}
        description={description}
        openGraph={{
          url: `${url}/collections`,
          title: `${title} | ${siteTitle}`,
          description: description,
          images: [
            {
              url: imageUrl,
              alt: title,
              width: 1200,
              height: 627,
            },
          ],
          site_name: siteTitle,
        }}
        twitter={nextSeoConfig.twitter}
      />
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: 'Home',
            item: url,
          },
          {
            position: 2,
            name: 'Collections Page',
            item: `${url}/collections`,
          },
        ]}
      />
      <WebPageJsonLd
        id={`${url}/collections#webpage`}
        url={`${url}/collections`}
        name={title}
        description={description}
      />
      <SiteLinksSearchBoxJsonLd
        url={`${url}/collections`}
        potentialActions={[
          {
            target: `${url}/collections`,
            queryInput: "search_term_string"
          },
        ]}
      />
    </>
  );
}