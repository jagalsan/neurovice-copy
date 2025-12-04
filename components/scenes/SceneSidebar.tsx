"use client";

import Card from "@/components/Card";
import Image from "next/image";
import Link from "next/link";
import { primaryButtonPink, primaryButtonBase } from "@/lib/styles/buttons";
import { useAddToCart } from "@/lib/hooks/useAddToCart";
import { CartItem } from "@/lib/stores/cart.store";
import { ApkIcon, MetaIcon, WindowsIcon } from "../icons/PlatformIcons";
import ChipList from "./ChipList";

interface SceneSidebarProps {
  coverSrc: string;
  sceneCount: number;
  fileSize: string;
  starName: string;
  starSlug: string;
  starImage: string;
  starBio?: string;
  starTags?: string[];
  cartItem: Omit<CartItem, "quantity">;
  sceneTitle: string;
  sceneDescription?: string;
  releaseDate?: string;
  platforms?: string[];
}

export default function SceneSidebar({
  coverSrc,
  sceneCount,
  fileSize,
  starName,
  starSlug,
  starImage,
  starBio,
  starTags = [],
  cartItem,
  sceneTitle,
  sceneDescription,
  releaseDate,
  platforms = [],
}: SceneSidebarProps) {
  const { addToCart } = useAddToCart();

  return (
    <div className="space-y-6">
      <Card showGrid={false} className="bg-[#111118]">
        <div className="flex items-start gap-5 p-5 md:p-6">
          {coverSrc && (
            <div
              className="relative w-[92px] h-[120px] shrink-0 rounded-[10px] overflow-hidden"
              style={{ boxShadow: "0px 4px 40px 0px #17C5C333" }}
            >
              <Image src={coverSrc} alt="Cover" fill className="object-contain" />
            </div>
          )}

          <div className="flex-1">
            <h3 className="font-heading uppercase text-[28px] sm:text-[36px] text-[#A6FFFF] mb-0">
              Get access
            </h3>

            <div className="space-y-4">
              <div className="flex flex-col">
                <span
                  className="text-xs font-[600] tracking-[0.28em] uppercase text-[#17FBF8] text-[13px] z-10 bg-transparent"
                  style={{ textShadow: "0px 0px 15px #00FFFC" }}
                >
                  {sceneCount > 0 ? `${sceneCount} scenes available` : 'Scene available'}
                </span>
                <span
                  className="text-xs font-[400] tracking-[0.28em] uppercase text-[#17FBF8] text-[10px] z-10 bg-transparent"
                  style={{ textShadow: "0px 0px 15px #00FFFC" }}
                >
                  {fileSize}
                </span>
              </div>
            </div>
          </div>
        </div>
        <button
          className={primaryButtonPink}
          onClick={() => addToCart(cartItem)}
        >
          <span className="flex items-center gap-3 text-white">
            BUY FOR{" "}
            <span className="line-through opacity-40">
              ${cartItem.oldPrice}
            </span>{" "}
            ${cartItem.price}
          </span>
        </button>
      </Card>

      <Card className="bg-[#111118]">
        <div>
          {coverSrc && (
            <div className="relative w-full h-[150px] md:h-[190px] mb-[16px]">
              <Image
                src={coverSrc}
                alt={sceneTitle}
                fill
                className="object-contain"
                priority
              />
            </div>
          )}

          <div>
            {releaseDate && (
              <p
                className="uppercase text-[12px] text-[#17FBF8] mb-[8px]"
                style={{ textShadow: "0 0 15px rgba(166,255,255,0.6)" }}
              >
                Release: {new Date(releaseDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            )}

            {platforms.length > 0 && (
              <div className="flex items-center gap-4 text-[#A6FFFF]">
                {platforms.includes('META QUEST') && <MetaIcon className="w-6 h-6 opacity-50" />}
                {platforms.includes('WINDOWS PCVR') && <WindowsIcon className="w-6 h-6 opacity-50" />}
                {platforms.includes('ANDROID') && <ApkIcon className="w-6 h-6 opacity-50" />}
              </div>
            )}
          </div>

          <h4 className="font-heading uppercase text-[#17FBF8] text-[24px] mt-[8px]">
            {sceneTitle}
          </h4>

          {sceneDescription && (
            <p className="uppercase text-[#17FBF8] text-[16px] mt-[16px]">
              {sceneDescription}
            </p>
          )}
        </div>
      </Card>

      <Card className="bg-[#111118]">
        <div>
          {starImage && (
            <div className="relative w-full h-[200px] rounded-[10px] overflow-hidden mb-4">
              <Image
                src={starImage}
                alt={starName}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="space-y-2 mb-4">
            <p className="uppercase text-[10px] text-[#17FBF8]" style={{ textShadow: "0 0 15px rgba(166,255,255,0.6)" }}>
              Pornstar
            </p>
            <h4 className="font-heading text-[#17FBF8] text-[24px]">{starName.toUpperCase()}</h4>
            {starBio && (
              <p className="text-[16px] text-[#17FBF8] uppercase">
                {starBio}
              </p>
            )}
            {starTags.length > 0 && (
              <ChipList 
                interactive={false} 
                items={starTags} 
              />
            )}
          </div>
          <Link href={`/stars/${starSlug}`} className={primaryButtonBase}>
            VIEW MORE
          </Link>
        </div>
      </Card>
    </div>
  );
}
