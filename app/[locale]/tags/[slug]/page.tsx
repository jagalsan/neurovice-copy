import Card from "@/components/Card";
import Pagination from "@/components/Pagination";
import TagChaptersGridAnimated from "@/components/tags/TagChaptersGridAnimated";

const primaryButtonBase =
  "w-full h-[67px] px-[10px] py-[20px] rounded-[10px] border border-[rgba(255,255,255,0.4)] " +
  "flex items-center justify-center gap-[10px] font-heading text-[18px] tracking-[0.24em] uppercase " +
  "bg-[linear-gradient(90deg,#A6F9F8,#17C5C3)] text-[#050608] " +
  "shadow-[0_0_40px_rgba(23,197,195,0.5),0_0_10px_rgba(23,197,195,0.6)] " +
  "transition-transform duration-200 hover:scale-[1.02]";

type Params = { slug: string };

const chips = ["ROLEPLAY", "LATINA", "PETITE", "PIERCED NIPPLES", "TATTOOS"];

const chapters = Array.from({ length: 12 }).map((_, i) => ({
  coverSrc: `/mock/example_${(i % 3) + 1}_x.png`,
  coverAlt: `Chapter ${i + 1}`,
  title: "TURBOFAP",
  releaseLabel: "1 YEAR SUBSCRIPTION",
  platforms: ["META", "WINDOWS", "APK"] as string[],
  accentColor: "#17FBF8",
  viewMoreHref: "#",
  buyHref: "#",
}));

export default async function TagPage({ params }: { params: Params }) {
  const paramsAux = await params;
  const tag = decodeURIComponent(paramsAux.slug || "").toUpperCase();

  return (
    <section className="text-white px-4 md:px-8 max-w-[1024px] mx-auto py-8 space-y-12">
      <Card className="bg-[transparent] space-y-0">
        <span
          className="text-[10px] md:text-xs font-[600] uppercase text-[#7FF7F5] mb-0"
          style={{ textShadow: "0 0 15px #00FFFC" }}
        >
          Tag
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#17FBF8] mb-8 mt-0">
          {tag}
        </h1>

        <h2 className="font-heading text-lg md:text-2xl text-[#17FBF8]">
          Best {tag} VR: Virtual Reality Porn
        </h2>

        <p className="max-w-[980px] text-[14px] md:text-[15px] text-[#7FF7F5] mb-8 uppercase">
          Immerse yourself in the world of {tag.toLowerCase()} VR, where
          stunning visuals meet the excitement of virtual reality. Discover
          premium content that brings your fantasies to life.
        </p>

        <h3 className="font-heading text-sm md:text-base uppercase text-[#17FBF8]">
          What makes {tag} VR porn special
        </h3>

        <p className="max-w-[980px] text-[14px] md:text-[15px] leading-relaxed text-[#7FF7F5] mb-4 uppercase">
          VR porn offers an unparalleled experience that combines realism with
          interactivity. The immersive nature of virtual reality allows viewers
          to engage with the content like never before.
        </p>

        <div className="flex flex-wrap gap-2 pt-2 mb-8">
          {chips.map((c) => (
            <span
              key={c}
              className="rounded-[4px] px-3 py-2 border border-[#17FBF84D] bg-[#111118CC] text-[#17FBF8] text-[14px] uppercase"
              style={{ boxShadow: "0px 0px 15px 0px #17FBF833" }}
            >
              {c}
            </span>
          ))}
        </div>

        <button className={primaryButtonBase}>
          <span className="relative z-10">Unlock with subscription</span>
        </button>
      </Card>

      <Card title={`Chapters tagged as #${tag}`}>
        <TagChaptersGridAnimated chapters={chapters} />
      </Card>
      <Pagination currentPage={1} totalPages={3} />
    </section>
  );
}
