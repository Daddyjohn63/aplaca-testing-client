import { PageHeroSection } from "@/components/marketing/page-hero-section"
import { db } from "@/lib/db"
import Link from "next/link"
import Image from "next/image"
import { PaginationControls } from "@/components/pagination-controls"
import { siteConfig } from "@/site-config"
import { notFound } from "next/navigation"
import { getSEOMetadata } from "@/lib/seo"

type ParamsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export const metadata = getSEOMetadata({
  title: 'Blog',
  description: 'Explore our blog for expert tips, tutorials, and insights.',
  openGraph: {
   title: "Blog",
    description: "Explore our blog for expert tips, tutorials, and insights."
  }
})


const BlogPage = async({searchParams}: ParamsProps) => {

  const isBlogPublic = siteConfig.isBlogPublic;

  if(!isBlogPublic) {
    return notFound()
  }

  const page = Number(searchParams.page) || 1;
  const take = Number(searchParams.take) || 9;
  const skip = (page - 1) * take

  const data = await db.post.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      media: {
        select: {
          imagePath: true
        }
      },
      category: {
        select: {
          name: true,
        },
      },
    },
    where: {
      status: 'published'
    },
    take: take,
    skip: skip,
    orderBy: {
      createdAt: 'desc'
    },
  })

  //Count total published posts for pagination
  const count = await db.post.count({
    where: {
      status: 'published'
    }
  })

  const totalPages = Math.ceil(count / take);

  return (
    <div>
      <PageHeroSection title="Blog" description="Checkout our amazing articles" />
      <section className="pt-14 pb-20">
        <div className="container">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-14">
            {data && data.map((post) => {
              return (
                <div key={post.id} className="space-y-4">
                  {!!post.media && (
                  <Link href={`blog/${post.slug}`}>
                      <div className="w-full aspect-video rounded-md overflow-hidden flex items-center justify-center bg-muted border-2 border-transparent hover:border-primary">
                        <Image
                          src={`${siteConfig.fileStorage.bucketUrl}/${post.media.imagePath}`}
                          className="w-full"
                          alt={post.title}
                          width="570"
                          height="320"
                        />
                      </div>
                  </Link>
                  )}
                  <div className="space-y-1">
                    <Link href={`blog/${post.slug}`}>
                      <h3 className="font-bold text-xl leading-7 hover:text-primary">{post.title}</h3>
                    </Link>
                    {post.excerpt && 
                      <p className="text-sm text-foreground/60">{post.excerpt}... <Link href={`blog/${post.slug}`} className="text-primary">[readmore]</Link></p>
                    }
                    <div className="pt-2">
                      {/*
                      <p className="text-xs text-muted-foreground">Aug 24th, 2024</p>
                    */}
                      <ul className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        <li><span>#{post.category.name}</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="pt-10">
          {count > 0 ? <PaginationControls totalPages={totalPages} page={page}/> : ''}
        </div>
      </section>
    </div>

  )
}
export default BlogPage
