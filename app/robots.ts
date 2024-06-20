import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {

  const domain = process.env.NEXT_PUBLIC_PRIMARY_DOMAIN
  const isProduction = process.env.NODE_ENV === "production"

  let rules = []

  if(isProduction){
    rules = [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/dashboard', '/admin'],
      },
    ]
  } else {
    rules = [
      {
        userAgent: '*',
        disallow: ['/'],
      },
    ]
  }

  return {
    rules: rules,
    sitemap: `${domain}/sitemap.xml`,
  }
}
