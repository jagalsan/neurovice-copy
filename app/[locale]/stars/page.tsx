import Pagination from "@/components/Pagination";
import Card from "@/components/Card";
import StarsGridAnimated from "@/components/stars/StarsGridAnimated";

const primaryButtonBase =
  "w-full h-[67px] px-[10px] py-[20px] rounded-[10px] border border-[rgba(255,255,255,0.4)] " +
  "flex items-center justify-center gap-[10px] font-heading text-[18px] tracking-[0.24em] uppercase " +
  "bg-[linear-gradient(90deg,#A6F9F8,#17C5C3)] text-[#050608] " +
  "shadow-[0_0_40px_rgba(23,197,195,0.5),0_0_10px_rgba(23,197,195,0.6)] " +
  "transition-transform duration-200 hover:scale-[1.02]";

const stars = [
  {
    coverSrc: "/mock/star_1_mock.png",
    coverAlt: "Star 1",
    title: "ANGELA WHITE II",
    releaseLabel: "2 CHAPTERS",
    accentColor: "#17FBF8",
  },
  {
    coverSrc: "/mock/star_2_mock.png",
    coverAlt: "Star 2",
    title: "ANGELA WHITE II",
    releaseLabel: "2 CHAPTERS",
    accentColor: "#17FBF8",
  },
  {
    coverSrc: "/mock/star_3_mock.png",
    coverAlt: "Star 3",
    title: "ANGELA WHITE II",
    releaseLabel: "2 CHAPTERS",
    accentColor: "#17FBF8",
  },
  {
    coverSrc: "/mock/star_1_mock.png",
    coverAlt: "Star 4",
    title: "ANGELA WHITE II",
    releaseLabel: "2 CHAPTERS",
    accentColor: "#17FBF8",
  },
  {
    coverSrc: "/mock/star_2_mock.png",
    coverAlt: "Star 5",
    title: "ANGELA WHITE II",
    releaseLabel: "2 CHAPTERS",
    accentColor: "#17FBF8",
  },
  {
    coverSrc: "/mock/star_3_mock.png",
    coverAlt: "Star 6",
    title: "ANGELA WHITE II",
    releaseLabel: "2 CHAPTERS",
    accentColor: "#17FBF8",
  },
  {
    coverSrc: "/mock/star_1_mock.png",
    coverAlt: "Star 7",
    title: "ANGELA WHITE II",
    releaseLabel: "2 CHAPTERS",
    accentColor: "#17FBF8",
  },
  {
    coverSrc: "/mock/star_2_mock.png",
    coverAlt: "Star 8",
    title: "ANGELA WHITE II",
    releaseLabel: "2 CHAPTERS",
    accentColor: "#17FBF8",
  },
  {
    coverSrc: "/mock/star_3_mock.png",
    coverAlt: "Star 9",
    title: "ANGELA WHITE II",
    releaseLabel: "2 CHAPTERS",
    accentColor: "#17FBF8",
  },
];

export default function StarsPage() {
  return (
    <section className="text-white px-4 md:px-8 max-w-[1024px] mx-auto py-8">
      <div className="space-y-12 mb-8">
        <Card className="bg-[transparent]">
          <div>
            <span
              className="text-xs font-[500] uppercase text-[var(--color-brand-500)] z-10 bg-transparent"
              style={{ textShadow: "0px 0px 15px #00FFFC" }}
            >
              Our Stars
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[#17FBF8]">
              Top VR stars
            </h1>
            <h2 className="font-heading text-lg md:text-xl text-[#17FBF8] mt-4 mb-2">
              Best TATOOS VR: Virtual Reality Porn
            </h2>
            <p className="max-w-[756px] text-[15px] uppercase text-[#7FF7F5] mb-8">
              Immerse yourself in the world of big tits VR, where stunning
              visuals meet the excitement of virtual reality. Discover premium
              content that brings your fantasies to life.
            </p>
            <div className="pt-2">
              <button className={primaryButtonBase}>
                <span className="relative z-10">Unlock with subscription</span>
              </button>
            </div>
          </div>
        </Card>

        <StarsGridAnimated stars={stars} />
      </div>
      <Pagination currentPage={1} totalPages={3} />
    </section>
  );
}
