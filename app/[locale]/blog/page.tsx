import ArticleCard from "@/components/blog/ArticleCard";
import Pagination from "@/components/blog/Pagination";
import { SearchBar } from "@/components/blog/SearchBar";
import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  
  return await generatePageMetadata(locale as Locale, {
    titleKey: "seo.blog_title",
    descriptionKey: "seo.blog_description",
    path: "/blog",
  });
}

type BlogPost = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  category: string;
  date: string;
  title: string;
  slug: string;
};

const mockPosts: BlogPost[] = Array.from({ length: 9 }).map((_, idx) => ({
  id: `post-${idx + 1}`,
  imageSrc: "/mock/blog-placeholder.png",
  imageAlt: "Exploring minimalism in VR adult content",
  category: [
    "VR Adult Experiences",
    "Virtual Reality",
    "VR Pleasure",
    "Virtual Intimacy",
    "Immersive Experiences",
    "Adult VR Adventures",
    "Sensual VR Worlds",
    "Exploring VR Fantasies",
  ][idx % 8],
  date: "October 21, 2024",
  title: [
    "Streamlined VR Experiences for Adult Entertainment",
    "Exploring Minimalism in VR Adult Content",
    "Elevating Adult Content with VR Simplicity",
    "Minimalist Approaches to VR Adult Content",
  ][idx % 4],
  slug: `article-${idx + 1}`,
}));

export default async function BlogPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;

  return (
    <div className="bg-[#171614]">
      <section className="max-w-[1459px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-12 md:mb-16">
          <span 
            className="text-xs font-[500] tracking-[0.28em] uppercase text-[var(--color-brand-500)] z-10 bg-transparent" 
            style={{ textShadow: "0px 0px 15px #00FFFC" }}
          >
            Blog
          </span>

          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[var(--color-brand-500)] mb-3">
            Trending Topics &amp; Expert Tips
          </h1>

          <p className="text-xs md:text-sm text-[var(--color-brand-300)] uppercase tracking-[0.18em] mb-8">
            Stay informed with our latest articles, insights, and expert tips on
            industry trends.
          </p>

          <SearchBar />
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {mockPosts.map((post) => (
            <ArticleCard
              key={post.id}
              imageSrc={post.imageSrc}
              imageAlt={post.imageAlt}
              category={post.category}
              date={post.date}
              title={post.title}
              href={`/${typedLocale}/blog/${post.slug}`}
            />
          ))}
        </section>

        <div className="mt-10 md:mt-14">
          <Pagination currentPage={1} totalPages={3} />
        </div>
      </section>
    </div>
  );
}