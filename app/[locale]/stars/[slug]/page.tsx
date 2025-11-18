import Card from "@/components/Card";
import Image from "next/image";
import { SiInstagram, SiOnlyfans, SiX } from "react-icons/si";

const primaryButtonBase =
  "w-full h-[67px] px-[10px] py-[20px] rounded-[10px] border border-[rgba(255,255,255,0.4)] " +
  "flex items-center justify-center gap-[10px] font-heading text-[18px] tracking-[0.24em] uppercase " +
  "bg-[linear-gradient(90deg,#A6F9F8,#17C5C3)] text-[#050608] " +
  "shadow-[0_0_40px_rgba(23,197,195,0.5),0_0_10px_rgba(23,197,195,0.6)] " +
  "transition-transform duration-200 hover:scale-[1.02]";

const chips = (items: string[]) => (
  <div className="flex flex-wrap gap-2">
    {items.map((c) => (
      <span
        key={c}
        className="rounded-[4px] px-3 py-2 border border-[#17FBF84D] bg-[#111118CC] text-[#17FBF8] text-[13px] uppercase"
        style={{ boxShadow: "0 0 15px #17FBF833" }}
      >
        {c}
      </span>
    ))}
  </div>
);

const screenshots = [
  "/mock/star_1_mock.png",
  "/mock/star_2_mock.png",
  "/mock/star_3_mock.png",
];

const aboutCopy =
  "VIXENP_ has made a stunning entrance into the Braindance universe, captivating fans since her debut in our instructional video. After weeks of eager requests from our dedicated braindancers, she finally joined the fold, and her two chapters cards are a breath of fresh air in our catalogue. Offering a softer and gentler approach, these releases showcase a different setup and an innovative approach to Braindance content, setting them apart from previous releases.";

const allVideos = [
  "/mock/example_1_x.png",
  "/mock/example_2_x.png",
  "/mock/example_3_x.png",
  "/mock/example_1_x.png",
  "/mock/example_2_x.png",
  "/mock/example_3_x.png",
  "/mock/example_3_x.png",
];

export default function StarDetailPage() {
  const gridColor = "rgba(23,251,248,0.25)";

  return (
    <div className="w-full bg-[#171614]">
      <div className="max-w-[1459px] mx-auto px-4 md:px-8 py-8 md:py-10 space-y-10">
        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-6">
          <Card className="bg-[#111118]" padded={false}>
            <div className="relative w-full h-[520px] md:h-[640px] rounded-[18px] overflow-hidden">
              <Image
                src="/mock/star_1_mock.png"
                alt="Punky Natalie portrait"
                fill
                className="object-cover"
                priority
              />
            </div>
          </Card>

          <Card className="bg-[#111118]">
            <div className="space-y-5">
              <span className="text-[#A6FFFF] text-[13px] mb-3 block" style={{ textShadow: "0 0 15px rgba(166,255,255,0.6)" }}>
                Pornstar
              </span>

              <h1
                className="font-heading uppercase text-[38px] leading-[0.95] text-[#A6FFFF]"
                style={{ textShadow: "0 0 15px rgba(166,255,255,0.6)" }}
              >
                PUNKY
                <br />
                NATALIE
              </h1>

              <div className="grid grid-cols-3 gap-4 text-[12px] uppercase">
                <div>
                  <p className="text-[#7FF7F5]/50">Height</p>
                  <p className="text-[#A6FFFF]" style={{ textShadow: "0 0 15px rgba(166,255,255,0.6)" }}>5.11&quot;</p>
                </div>
                <div>
                  <p className="text-[#7FF7F5]/50">Breast</p>
                  <p className="text-[#A6FFFF]" style={{ textShadow: "0 0 15px rgba(166,255,255,0.6)" }}>36DD</p>
                </div>
                <div>
                  <p className="text-[#7FF7F5]/50">Weight</p>
                  <p className="text-[#A6FFFF]" style={{ textShadow: "0 0 15px rgba(166,255,255,0.6)" }}>123 lbs</p>
                </div>
                <div>
                  <p className="text-[#7FF7F5]/50">Hair Color</p>
                  <p className="text-[#A6FFFF]" style={{ textShadow: "0 0 15px rgba(166,255,255,0.6)" }}>Blue</p>
                </div>
                <div>
                  <p className="text-[#7FF7F5]/50">Ethnicity</p>
                  <p className="text-[#A6FFFF]" style={{ textShadow: "0 0 15px rgba(166,255,255,0.6)" }}>White</p>
                </div>
                <div>
                  <p className="text-[#7FF7F5]/50">Age</p>
                  <p className="text-[#A6FFFF]" style={{ textShadow: "0 0 15px rgba(166,255,255,0.6)" }}>27</p>
                </div>
              </div>

              <p className="uppercase text-[13px] leading-relaxed text-[#7FF7F5]">
                I kinda envy other people who can jerk-off to me in Braindance,
                while I can’t. It’s just that good
              </p>

              {chips([
                "ROLEPLAY",
                "LATINA",
                "PETITE",
                "PIERCED NIPPLES",
                "TATTOOS",
                "...",
              ])}

              <div className="flex items-center gap-4 text-[#A6FFFF]">
                <SiOnlyfans className="w-5 h-5 opacity-80" />
                <SiInstagram className="w-5 h-5 opacity-80" />
                <SiX className="w-5 h-5 opacity-80" />
              </div>

              <button className={primaryButtonBase}>
                BUY ALL NATALIE’S VIDEOS
              </button>
            </div>
          </Card>
        </section>

        <Card className="bg-[#111118]" title="Gallery">
          <div className="space-y-4">
            <div className="flex gap-3 overflow-x-auto pb-1 pr-1">
              {screenshots.map((src, i) => (
                <div
                  key={i}
                  className="relative w-[260px] h-[140px] shrink-0 rounded-[12px] overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={`shot-${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card
          className="bg-[#111118]"
          title="Minimum system requirements for PCVR"
        >
          <p className="uppercase text-[14px] leading-relaxed text-[#7FF7F5]">
            {aboutCopy}
          </p>
        </Card>

        <div className="relative">
          <div
            className="pointer-events-none absolute -inset-x-6 -inset-y-6 z-0 mt-[110px]"
            style={{
              backgroundImage: `
              linear-gradient(to right, ${gridColor} 1px, transparent 1px),
              linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
            `,
              backgroundSize: "26px 26px",
            }}
          />
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
              <div className="pl-1 flex flex-col justify-between">
                <div>
                  <h3
                    className="font-heading text-[40px] leading-[0.95] md:text-[56px] text-[#A6FFFF] uppercase"
                    style={{ textShadow: "0 0 15px #00FFFC" }}
                  >
                    PUNKY
                    <br />
                    NATALIE
                  </h3>

                  <p className="mt-4 font-heading text-[11px] tracking-[0.24em] uppercase text-[#7FF7F5]">
                    ALL VIDEOS
                  </p>

                  <button className={primaryButtonBase + " mt-4"}>
                    BUY ALL
                  </button>
                </div>
              </div>

              {/* Primeras 3 imágenes */}
              {allVideos.slice(0, 3).map((src, i) => (
                <div
                  key={i}
                  className="relative w-full aspect-[175/240] rounded-[18px] overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={`video-${i}`}
                    fill
                    className="object-contain drop-shadow-[0_26px_40px_rgba(0,0,0,0.85)]"
                  />
                </div>
              ))}
            </div>

            {/* Siguientes filas: 4 imágenes por fila */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {allVideos.slice(3).map((src, i) => (
                <div
                  key={i + 3}
                  className="relative w-full aspect-[175/240] rounded-[18px] overflow-hidden"
                >
                  <Image
                    src={src}
                    alt={`video-${i + 3}`}
                    fill
                    className="object-contain drop-shadow-[0_26px_40px_rgba(0,0,0,0.85)]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
