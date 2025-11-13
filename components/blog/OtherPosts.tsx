import ArticleCard from "./ArticleCard";
import type { Locale } from "@/i18n/config";

const mockOtherPosts = [
  {
    id: 1,
    imageSrc: "/mock/blog-placeholder.png",
    imageAlt: "VR model",
    category: "VR ADULT EXPERIENCES",
    categoryHref: "#",
    date: "OCTOBER 21, 2024",
    title: "STREAMLINED VR EXPERIENCES FOR ADULT ENTERTAINMENT",
    slug: "streamlined-vr-experiences",
  },
  {
    id: 2,
    imageSrc: "/mock/blog-placeholder.png",
    imageAlt: "VR model",
    category: "VR ADULT EXPERIENCES",
    categoryHref: "#",
    date: "OCTOBER 21, 2024",
    title: "EXPLORING MINIMALISM IN VR ADULT CONTENT",
    slug: "exploring-minimalism",
  },
  {
    id: 3,
    imageSrc: "/mock/blog-placeholder.png",
    imageAlt: "VR model",
    category: "VIRTUAL REALITY",
    categoryHref: "#",
    date: "OCTOBER 21, 2024",
    title: "EXPLORING MINIMALIST VR IN ADULT ENTERTAINMENT",
    slug: "minimalist-vr-entertainment",
  },
  {
    id: 4,
    imageSrc: "/mock/blog-placeholder.png",
    imageAlt: "VR model",
    category: "VR PLEASURE",
    categoryHref: "#",
    date: "OCTOBER 21, 2024",
    title: "STREAMLINED VR EXPERIENCES FOR ADULT ENTERTAINMENT",
    slug: "vr-pleasure-experiences",
  },
  {
    id: 5,
    imageSrc: "/mock/blog-placeholder.png",
    imageAlt: "VR model",
    category: "VIRTUAL INTIMACY",
    categoryHref: "#",
    date: "OCTOBER 21, 2024",
    title: "MINIMALIST APPROACHES TO VR ADULT CONTENT",
    slug: "minimalist-approaches",
  },
  {
    id: 6,
    imageSrc: "/mock/blog-placeholder.png",
    imageAlt: "VR model",
    category: "IMMERSIVE EXPERIENCES",
    categoryHref: "#",
    date: "OCTOBER 21, 2024",
    title: "ELEVATING ADULT CONTENT WITH VR SIMPLICITY",
    slug: "elevating-content-vr",
  },
];

interface OtherPostsSectionProps {
  locale: Locale;
}

export default function OtherPostsSection({ locale }: OtherPostsSectionProps) {
  return (
    <section className="w-full bg-[#171614] py-16">
      <div className="max-w-[1459px] mx-auto px-4 md:px-6">
        <h2 className="text-center font-heading text-[28px] md:text-[36px] text-[#17FBF8] mb-10">
          Other Posts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockOtherPosts.map((post) => (
            <ArticleCard
              key={post.id}
              imageSrc={post.imageSrc}
              imageAlt={post.imageAlt}
              category={post.category}
              categoryHref={post.categoryHref}
              date={post.date}
              title={post.title}
              href={`/${locale}/blog/${post.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
