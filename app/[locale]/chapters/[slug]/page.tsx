import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { generatePageMetadata } from "@/lib/metadata";
import ChapterClient from "@/components/chapters/ChapterClient";

export const dynamicParams = true;

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}): Promise<Metadata> {
  const { locale, slug } = await params;
  
  return await generatePageMetadata(locale as Locale, {
    titleKey: "seo.chapters_title",
    descriptionKey: "seo.chapters_description",
    path: `/chapters/${slug}`,
  });
}

export default async function ChapterDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;

  const chapterData = {
    title: "PUNKY NATALIE",
    posterSrc: "/mock/video_placeholder.png",
    screenshots: [
      "/mock/star_1_mock.png",
      "/mock/star_2_mock.png",
      "/mock/star_3_mock.png",
      "/mock/star_1_mock.png",
      "/mock/star_2_mock.png",
      "/mock/star_3_mock.png",
    ],
    features: [
      "ROLEPLAY",
      "FUN VIBRATORS",
      "HUMILIATION",
      "STUDENT PROFESSOR ROLE-PLAY",
      "TEENS (18+)",
      "POV VR",
    ],
    genres: ["TEEN PORN", "TEEN PORN", "VR GAME PORN", "8K VR PORN"],
    info: [
      ["RELEASE DATE", "07/15/25"],
      [
        "PLATFORMS",
        "WINDOWS PCVR, META QUEST 3/3S, PICO 4 ULTRA, HTC VIVE, VALVE INDEX",
      ],
      ["PORNSTAR", "PUNKY NATALIE"],
      ["LANGUAGE", "ENGLISH"],
      ["RESOLUTION", "UP TO 8K, DEPENDING ON GPU"],
      ["DEGREE", "195"],
    ] as [string, string][],
    requirements: [
      ["DEVICE SUPPORT", "ANY PCVR HEADSET WITH OPENXR RUNTIME SUPPORT"],
      ["OS", "MS WINDOWS 10"],
      ["CPU", "INTEL CORE i3 OR AMD RYZEN 3 3200"],
      ["GPU", "NVIDIA RTX 2060 OR AMD RX 5600 WITH LATEST DRIVERS"],
      ["RAM", "8GB"],
      ["DISK SPACE", "15GB"],
    ] as [string, string][],
    starName: "Punky Natalie",
    starSlug: "punky-natalie",
    starImage: "/mock/example_1_x.png",
    coverSrc: "/mock/example_1_x.png",
    chapterCount: 12,
    fileSize: "14.6GB",
    cartItem: {
      id: slug,
      title: "PUNKY NATALIE",
      subtitle: "Chapter",
      oldPrice: 89,
      price: 19,
      imageSrc: "/mock/example_1_x.png",
    },
    allChaptersCartItem: {
      id: `${slug}-all`,
      title: "PUNKY NATALIE",
      subtitle: "All Chapters",
      oldPrice: 199,
      price: 99,
      imageSrc: "/mock/example_1_x.png",
    },
    alsoAppearedItems: [
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
    ],
  };

  return <ChapterClient {...chapterData} />;
}
