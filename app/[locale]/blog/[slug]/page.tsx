import OtherPostsSection from "@/components/blog/OtherPosts";
import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";

export const dynamicParams = true;

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}): Promise<Metadata> {
  const { locale, slug } = await params;
  
  return await generatePageMetadata(locale as Locale, {
    titleKey: "Article title",
    descriptionKey: "Article description",
    path: `/blog/${slug}`,
  });
}

export default async function BlogArticlePage({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}) {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;
  return (
    <div className="w-full bg-[#171614] text-white pb-24">
      <div className="max-w-[996px] mx-auto px-4 md:px-6 pt-16">
        <div className="max-w-[756px] mx-auto text-center mb-10">
          <span 
            className="text-xs font-[500] tracking-[0.28em] uppercase text-[var(--color-brand-500)] z-10 bg-transparent" 
            style={{ textShadow: "0px 0px 15px #00FFFC" }}
          >
            Blog
          </span>

          <h1 className="font-heading text-[30px] md:text-[40px] leading-tight text-[#17FBF8] mb-4">
            Immersive experiences are becoming more accessible
          </h1>

          <p className="text-[13px] md:text-[14px] leading-relaxed text-[#B9FDFB] mb-6">
            In the ever-evolving landscape of virtual reality, adult content is
            carving out a unique niche. As technology advances, immersive
            experiences are becoming more accessible, allowing users to explore
            intimate fantasies in a safe and engaging environment.
          </p>

          <div className="flex items-center justify-center gap-3 text-[11px] tracking-[0.16em] uppercase text-white/70">
            <div className="flex items-center gap-2">
              <div className="relative w-7 h-7 rounded-full overflow-hidden bg-[#0b1115]">
                <Image
                  src="/mock/blog-placeholder.png"
                  alt="Nixxy Flowers"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-heading text-white">Nixxy Flowers</span>
            </div>
            <span className="text-[#17FBF8]">•</span>
            <span className="font-heading text-white/60">October 5, 2024</span>
          </div>
        </div>

        <div className="relative w-full max-w-[996px] mx-auto mb-10">
          <div className="relative w-full aspect-[996/508] rounded-[24px] overflow-hidden">
            <Image
              src="/mock/blog-placeholder.png"
              alt="Immersive VR experience"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        <article className="max-w-[756px] mx-auto space-y-8 text-[14px] leading-relaxed text-[#E5F7F6]">
          <p className="uppercase">
            Virtual reality (VR) adult content is revolutionizing the way we
            experience intimacy and entertainment. With modern headsets and
            powerful rendering, users are transported into immersive 3D
            environments that feel tangible and real.
          </p>

          <section className="space-y-3">
            <h2 className="font-heading text-[18px] uppercase text-[#17FBF8]">
              1. Immersive experiences in adult entertainment
            </h2>
            <p className="uppercase">
              Minimalist design elements allow creators to highlight their core
              ideas while reducing visual noise. Users can focus on what truly
              matters: presence, emotion and connection.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-[18px] uppercase text-[#17FBF8]">
              2. Intimacy &amp; connection in virtual reality
            </h2>
            <p className="uppercase">
              When users feel that the virtual space respects their boundaries
              and expectations, they engage more deeply. Carefully crafted
              environments, subtle lighting and responsive interactions help
              build a sense of trust inside the headset.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-[18px] uppercase text-[#17FBF8]">
              3. Privacy &amp; safety as design pillars
            </h2>
            <p className="uppercase">
              Clear privacy options, discrete app icons and secure account
              systems give users confidence to explore without fear of
              judgement. As more platforms adopt these standards, immersive
              adult content becomes safer and more inclusive.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-heading text-[18px] uppercase text-[#17FBF8]">
              Conclusion
            </h2>
            <p className="uppercase">
              As immersive technology becomes more accessible, adult VR
              experiences will continue to evolve. Studios that prioritize
              comfort, consent and emotional storytelling will define the next
              generation of intimate content.
            </p>
          </section>
        </article>
      </div>

      <OtherPostsSection locale={typedLocale} />
    </div>
  );
}
