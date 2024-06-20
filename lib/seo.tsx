//Reference: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-object
import type {Metadata} from 'next';
import { siteConfig } from '@/site-config';

export const getSEOMetadata = ({
    title,
    description,
    keywords,
    canonicalUrlRelative,
    openGraph,
    ogImageUrl,
}: Metadata & {
        canonicalUrlRelative?: string;
        ogImageUrl?: string;
    } = {}) => {

    const ogImage = ogImageUrl ? ogImageUrl : `https://${siteConfig.primaryDomain}/openGraph-image.png`

    return {

        title: title || siteConfig.appName,
        descrition: description || siteConfig.appDescription,
        keywords: keywords || siteConfig.keywords,
        applicationName: siteConfig.appName,
        metadataBase: new URL(
            process.env.NODE_ENV === "production"
                ? `https://${siteConfig.primaryDomain}/`
                : "http://localhost:3000/"
        ),


        ...(canonicalUrlRelative && {
            alternates: { canonical: canonicalUrlRelative },
        }),

        openGraph: {
            title: openGraph?.title || siteConfig.appName,
            description: openGraph?.description || siteConfig.appDescription, 
            url: openGraph?.url || siteConfig.primaryDomain,
            siteName: openGraph?.siteName || siteConfig.appName,
            images: [
                {
                    url: ogImage, // Absolute URL
                    width: 800,
                    height: 600,
                }
            ],
            locale: 'en_US',
            type: 'website',
        },

        twitter: {
            title: openGraph?.title || siteConfig.appName,
            description: openGraph?.description || siteConfig.appDescription, 
            card: 'summary_large_image', 
            creator: '@travistylervii',
            images: [ogImage,] //Absolute URLs
        },
    }
}

// Strctured Data for Rich Results on Google. Learn more: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
// Find your type here (SoftwareApp, Book...): https://developers.google.com/search/docs/appearance/structured-data/search-gallery
// Use this tool to check data is well structure: https://search.google.com/test/rich-results
// You don't have to use this component, but it increase your chances of having a rich snippet on Google.
// I recommend this one below to your /page.js for software apps: It tells Google your AppName is a Software, and it has a rating of 4.8/5 from 12 reviews.
export const renderSchemaTags = () => {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "http://schema.org",
                    "@type": "SoftwareApplication",
                    name: siteConfig.appName,
                    description: siteConfig.appDescription,
                    image: `https://${siteConfig.primaryDomain}/icon.png`,
                    url: `https://${siteConfig.primaryDomain}/`,
                    author: {
                        "@type": "Person",
                        name: "Travis Tyler",
                    },
                    datePublished: "2024-05-27",
                    applicationCategory: "EducationalApplication",
                    aggregateRating: {
                        "@type": "AggregateRating",
                        ratingValue: "4.8",
                        ratingCount: "12",
                    },
                    offers: [
                        {
                            "@type": "Offer",
                            priceCurrency: "USD",
                            price: "9.00",
                        },
                    ],
                }),
            }}
        ></script>
    );
};
