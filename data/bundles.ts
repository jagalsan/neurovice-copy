import type { ChapterCardProps } from "@/components/chapters/ChapterCard";

export type BundleColorKey = "purple" | "yellow" | "pink" | "red";

export type Bundle = {
  id: number;
  titleKey: string; 
  nameKey: string; 
  descriptionKey: string; 
  buttonTextKey: string; 
  accent: BundleColorKey;
  originalPrice?: string;
  salePrice: string;
  chapters: ChapterCardProps[];
};

export const bundles: Bundle[] = [
  {
    id: 1,
    titleKey: "labels.bundle_one",
    nameKey: "labels.premium_collection",
    descriptionKey: "messages.purchase_individual_chapter",
    buttonTextKey: "actions.buy_all_for",
    accent: "purple",
    originalPrice: "$80",
    salePrice: "$49",
    chapters: [
      {
        title: "Angela White",
        releaseLabel: "RELEASE: SEPTEMBER 2024",
        accentColor: "#7A4FF4",
        coverSrc: "/mock/example_1_x.png",
        coverAlt: "Angela White",
        platforms: ["META", "WINDOWS", "APK"],
        viewMoreHref: "/chapters/angela-1",
        buyHref: "/chapters/angela-1",
      },
      {
        title: "Angela White II",
        releaseLabel: "RELEASE: SEPTEMBER 2024",
        accentColor: "#7A4FF4",
        platforms: ["META", "WINDOWS", "APK"],
        coverSrc: "/mock/example_3_x.png",
        coverAlt: "Angela White II",
      },
      {
        title: "Punny Natalie",
        releaseLabel: "RELEASE: SEPTEMBER 2024",
        platforms: ["META", "WINDOWS", "APK"],
        coverSrc: "/mock/example_2_x.png",
        coverAlt: "Punny Natalie",
        accentColor: "#7A4FF4",
      },
    ],
  },
  {
    id: 2,
    titleKey: "labels.bundle_two",
    nameKey: "labels.starter_pack",
    descriptionKey: "messages.curated_chapter_pack",
    buttonTextKey: "actions.buy_all_for",
    accent: "yellow",
    originalPrice: "$80",
    salePrice: "$49",
    chapters: [
      {
        title: "Angela White",
        releaseLabel: "RELEASE: SEPTEMBER 2024",
        accentColor: "#EFB710",
        platforms: ["META", "WINDOWS", "APK"],
        coverSrc: "/mock/example_1_x.png",
        coverAlt: "Angela White",
      },
      {
        title: "Angela White II",
        releaseLabel: "RELEASE: SEPTEMBER 2024",
        accentColor: "#EFB710",
        platforms: ["META", "WINDOWS", "APK"],
        coverSrc: "/mock/example_2_x.png",
        coverAlt: "Angela White II",
      },
      {
        title: "Punny Natalie",
        releaseLabel: "RELEASE: SEPTEMBER 2024",
        platforms: ["META", "WINDOWS", "APK"],
        coverSrc: "/mock/example_3_x.png",
        coverAlt: "Punny Natalie",
        accentColor: "#EFB710",
      },
    ],
  },
  {
    id: 3,
    titleKey: "labels.bundle_three",
    nameKey: "labels.exclusive_series",
    descriptionKey: "messages.exclusive_neon_content",
    buttonTextKey: "actions.buy_all_for",
    accent: "pink",
    originalPrice: "$80",
    salePrice: "$49",
    chapters: [
      {
        title: "Angela White",
        releaseLabel: "RELEASE: SEPTEMBER 2024",
        accentColor: "#E41D8D",
        platforms: ["META", "WINDOWS", "APK"],
        coverSrc: "/mock/example_1_x.png",
        coverAlt: "Angela White",
      },
      {
        title: "Angela White II",
        releaseLabel: "RELEASE: SEPTEMBER 2024",
        accentColor: "#E41D8D",
        platforms: ["META", "WINDOWS", "APK"],
        coverSrc: "/mock/example_2_x.png",
        coverAlt: "Angela White II",
      },
      {
        title: "Punny Natalie",
        releaseLabel: "RELEASE: SEPTEMBER 2024",
        platforms: ["META", "WINDOWS", "APK"],
        coverSrc: "/mock/example_3_x.png",
        coverAlt: "Punny Natalie",
        accentColor: "#E41D8D",
      },
    ],
  },
  {
    id: 4,
    titleKey: "labels.bundle_four",
    nameKey: "labels.latest_releases",
    descriptionKey: "messages.latest_hot_releases",
    buttonTextKey: "actions.buy_all_for",
    accent: "red",
    originalPrice: "$80",
    salePrice: "$49",
    chapters: [
      {
        title: "Angela White",
        releaseLabel: "RELEASE: SEPTEMBER 2024",
        accentColor: "#E41D3B",
        platforms: ["META", "WINDOWS", "APK"],
        coverSrc: "/mock/example_1_x.png",
        coverAlt: "Angela White",
      },
      {
        title: "Angela White II",
        releaseLabel: "RELEASE: SEPTEMBER 2024",
        accentColor: "#E41D3B",
        platforms: ["META", "WINDOWS", "APK"],
        coverSrc: "/mock/example_2_x.png",
        coverAlt: "Angela White II",
      },
      {
        title: "Punny Natalie",
        releaseLabel: "RELEASE: SEPTEMBER 2024",
        platforms: ["META", "WINDOWS", "APK"],
        coverSrc: "/mock/example_3_x.png",
        coverAlt: "Punny Natalie",
        accentColor: "#E41D3B",
      },
      {
        title: "Punny sadsadsa",
        releaseLabel: "RELEASE: SEPTEMBER 2024",
        platforms: ["META", "WINDOWS", "APK"],
        coverSrc: "/mock/example_2_x.png",
        coverAlt: "Punny sadsadsa",
        accentColor: "#E41D3B",
      },
    ],
  },
];
