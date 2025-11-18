import Card from "@/components/Card";
import AlsoAppearedIn from "@/components/chapters/AlsoAppearedIn";
import HeroVideo from "@/components/HeroVideo";
import {
  ApkIcon,
  MetaIcon,
  WindowsIcon,
} from "@/components/icons/PlatformIcons";
import Image from "next/image";
import Link from "next/link";

const primaryButtonBase =
  "w-full h-[67px] px-[10px] py-[20px] rounded-[10px] border border-[rgba(255,255,255,0.4)] " +
  "flex items-center justify-center gap-[10px] font-heading text-[18px] tracking-[0.24em] uppercase " +
  "bg-[linear-gradient(90deg,#A6F9F8,#17C5C3)] text-[#050608] " +
  "shadow-[0_0_40px_rgba(23,197,195,0.5),0_0_10px_rgba(23,197,195,0.6)] " +
  "transition-transform duration-200 hover:scale-[1.02]";

const primaryButtonPink =
  "w-full h-[67px] px-[10px] py-[20px] rounded-[10px] " +
  "border border-[rgba(200,106,159,0.6)] " +
  "flex items-center justify-center gap-[10px] " +
  "font-heading text-[18px] tracking-[0.24em] uppercase " +
  "bg-[#761A4E] text-[#050608] " +
  "shadow-[0_0_40px_rgba(183,26,114,0.5),0_0_10px_rgba(183,26,114,0.6)] " +
  "transition-transform duration-200 hover:scale-[1.02]";

const chips = (items: string[]) => (
  <div className="flex flex-wrap gap-2">
    {items.map((c) => (
      <span
        key={c}
        className="rounded-[4px] px-3 py-2 border border-[#17FBF84D] bg-[#111118CC] text-[#17FBF8] text-[14px] uppercase"
        style={{ boxShadow: "0px 0px 15px 0px #17FBF833" }}
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
  "/mock/star_1_mock.png",
  "/mock/star_2_mock.png",
  "/mock/star_3_mock.png",
];

const features = [
  "ROLEPLAY",
  "FUN VIBRATORS",
  "HUMILIATION",
  "STUDENT PROFESSOR ROLE-PLAY",
  "TEENS (18+)",
  "POV VR",
];

const genres = ["TEEN PORN", "TEEN PORN", "VR GAME PORN", "8K VR PORN"];

const info = [
  ["RELEASE DATE", "07/15/25"],
  [
    "PLATFORMS",
    "WINDOWS PCVR, META QUEST 3/3S, PICO 4 ULTRA, HTC VIVE, VALVE INDEX",
  ],
  ["PORNSTAR", "PUNKY NATALIE"],
  ["LANGUAGE", "ENGLISH"],
  ["RESOLUTION", "UP TO 8K, DEPENDING ON GPU"],
  ["DEGREE", "195"],
];

const reqs = [
  ["DEVICE SUPPORT", "ANY PCVR HEADSET WITH OPENXR RUNTIME SUPPORT"],
  ["OS", "MS WINDOWS 10"],
  ["CPU", "INTEL CORE i3 OR AMD RYZEN 3 3200"],
  ["GPU", "NVIDIA RTX 2060 OR AMD RX 5600 WITH LATEST DRIVERS"],
  ["RAM", "8GB"],
  ["DISK SPACE", "15GB"],
];

export default function ChapterDetailPage() {
  return (
    <div className="w-full bg-[#171614]">
      <div className="max-w-[1459px] mx-auto px-4 md:px-8 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="order-2 lg:order-1 lg:col-span-2 space-y-6">
            <Card className="bg-[#111118] hidden lg:block" padded={false}>
              <HeroVideo
                showTitle
                title="PUNKY NATALIE"
                subtitle=""
                posterSrc="/mock/video_placeholder.png"
              />
            </Card>

            <Card className="bg-[#111118]" title="VR scenes (screenshots)">
              <div className="space-y-4">
                <div className="flex gap-3 overflow-x-auto py-1 pr-1">
                  {screenshots.map((src, i) => (
                    <div
                      key={i}
                      className="relative w-[240px] h-[140px] shrink-0 rounded-[12px] overflow-hidden"
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

            <Card className="bg-[#111118]" title="Features">
              <div className="space-y-4">{chips(features)}</div>
            </Card>

            <Card className="bg-[#111118]" title="Genre">
              <div className="space-y-4">{chips(genres)}</div>
            </Card>

            <Card className="bg-[#111118]" title="General info">
              <div className="space-y-4">
                <div className="divide-y divide-white/10">
                  {info.map(([k, v]) => (
                    <div
                      key={k}
                      className="grid grid-cols-3 gap-4 py-3 text-[13px]"
                    >
                      <div className="text-[#7FF7F5] tracking-[0.18em] uppercase">
                        {k}
                      </div>
                      <div className="col-span-2 text-white/90">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card
              className="bg-[#111118] mb-8"
              title="Minimum system requirements for PCVR"
            >
              <div className="space-y-4">
                <div className="divide-y divide-white/10">
                  {reqs.map(([k, v]) => (
                    <div
                      key={k}
                      className="grid grid-cols-3 gap-4 py-3 text-[13px]"
                    >
                      <div className="text-[#7FF7F5] tracking-[0.18em] uppercase">
                        {k}
                      </div>
                      <div className="col-span-2 text-white/90">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            <AlsoAppearedIn
              name="Punky Natalie"
              items={[
                {
                  coverSrc: "/mock/example_1_x.png",
                  coverAlt: "Chapter 1",
                },
                {
                  coverSrc: "/mock/example_2_x.png",
                  coverAlt: "Chapter 2",
                },
                {
                  coverSrc: "/mock/example_3_x.png",
                  coverAlt: "Chapter 3",
                },
              ]}
            />
          </div>

          <aside className="order-1 lg:order-2 lg:col-span-1 space-y-6">
            <Card className="bg-[#111118] block lg:hidden" padded={false}>
              <HeroVideo
                showTitle
                title="PUNKY NATALIE"
                subtitle=""
                posterSrc="/mock/video_placeholder.png"
              />
            </Card>
            <Card showGrid={false} className="bg-[#111118]">
              <div className="flex items-start gap-5 p-5 md:p-6">
                <div
                  className="relative w-[92px] h-[120px] shrink-0 rounded-[10px] overflow-hidden"
                  style={{ boxShadow: "0px 4px 40px 0px #17C5C333" }}
                >
                  <Image
                    src="/mock/example_1_x.png"
                    alt="Star 1"
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-heading uppercase text-[28px] sm:text-[36px] text-[#A6FFFF] mb-0">
                    Get access
                  </h3>

                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <span
                        className="text-xs font-[600] tracking-[0.28em] uppercase text-[#17FBF8] text-[13px]  z-10 bg-transparent"
                        style={{ textShadow: "0px 0px 15px #00FFFC" }}
                      >
                        12 chapters available
                      </span>
                      <span
                        className="text-xs font-[400] tracking-[0.28em] uppercase text-[#17FBF8] text-[10px]  z-10 bg-transparent"
                        style={{ textShadow: "0px 0px 15px #00FFFC" }}
                      >
                        14.6GB
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <button className={primaryButtonPink}>
                <span className="flex items-center gap-3 text-white">
                  BUY FOR <span className="line-through opacity-40">$89</span>{" "}
                  $19
                </span>
              </button>
            </Card>

            <Card className="bg-[#111118]">
              <div>
                <div className="relative w-full h-[150px] md:h-[190px] mb-[16px]">
                  <Image
                    src="/mock/punky_natalie.png"
                    alt="Punky Natalie logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                <div>
                  <p
                    className="uppercase text-[12px] text-[#A6FFFF] mb-[8px]"
                    style={{ textShadow: "0 0 15px rgba(166,255,255,0.6)" }}
                  >
                    Release: September 2024
                  </p>

                  <div className="flex items-center gap-4 text-[#A6FFFF]">
                    <MetaIcon className="w-6 h-6 opacity-50" />
                    <WindowsIcon className="w-6 h-6 opacity-50" />
                    <ApkIcon className="w-6 h-6 opacity-50" />
                  </div>
                </div>

                <h4 className="font-heading uppercase text-[#17FBF8] text-[24px] mt-[8px]">
                  Punky Natalie
                </h4>

                <p className="uppercase text-[#17FBF8] text-[16px] mt-[16px]">
                  This VR porn game is actually your invitation to the tropical
                  paradise of Maui. Gizelle Blanco is the island’s best-kept
                  secret, ready to give you both coconut kisses & sunset
                  surprises.
                </p>
              </div>
            </Card>

            <Card className="bg-[#111118]">
              <div className="space-y-4">
                <div className="relative w-full h-[140px] rounded-[12px] overflow-hidden">
                  <Image
                    src="/mock/star_1_mock.png"
                    alt="Performer"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <p className="uppercase text-[10px] tracking-[0.24em] text-white/60">
                    Pornstar
                  </p>
                  <h4 className="font-heading text-white">PUNKY NATALIE</h4>
                  <p className="text-[12px] text-white/70">
                    Punky Natalie is the ultimate latina hottie. Her sexy accent
                    and fiery passion are just a few of her numerous talents.
                  </p>
                  {chips([
                    "ROLEPLAY",
                    "LATINA",
                    "PETITE",
                    "PIERCED NIPPLES",
                    "TATTOOS",
                    "...",
                  ])}
                </div>
                <Link href="#" className={primaryButtonBase}>
                  View more
                </Link>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
