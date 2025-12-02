import nextSeoConfig, { imageUrl, siteTitle, url } from "@/next-seo.config";
import { BreadcrumbJsonLd, LogoJsonLd, NextSeo, WebPageJsonLd, SiteLinksSearchBoxJsonLd } from "next-seo";

export function OrganizationPageStructuredData() {
  const title = "Commoners";
  const description = "Commoners page of " + siteTitle
  return (
    <>
      <LogoJsonLd
        url={`${url}/commoners`}
        logo={`${url}/favicon.ico`}
      />
      <NextSeo
        canonical={`${url}/commoners`}
        title={`${title} | ${siteTitle}`}
        description={description}
        openGraph={{
          url: `${url}/commoners`,
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
            name: 'Commoners Page',
            item: `${url}/commoners`,
          },
        ]}
      />
      <WebPageJsonLd
        id={`${url}/commoners#webpage`}
        url={`${url}/commoners`}
        name={title}
        description={description}
      />
      <SiteLinksSearchBoxJsonLd
        url={`${url}/commoners`}
        potentialActions={[
          {
            target: `${url}/commoners`,
            queryInput: "search_term_string"
          },
        ]}
      />
    </>
  );
}