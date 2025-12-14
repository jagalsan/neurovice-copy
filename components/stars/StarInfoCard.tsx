"use client";

import Card from "@/components/Card";
import { SiInstagram, SiOnlyfans, SiX } from "react-icons/si";
import Button from "@/components/ui/Button";
import { useT } from "@/providers/I18nProvider";
import ChipList from "@/components/scenes/ChipList";
import Link from "next/link";

interface StarInfoCardProps {
  name: string;
  surname: string;
  gender?: string;
  age: number;
  bio?: string;
  tags: Array<{ id: number; name: string }>;
  ofUrl?: string;
  igUrl?: string;
  xUrl?: string;
  onBuyAll: () => void;
  starName: string;
}

export default function StarInfoCard({
  name,
  surname,
  gender,
  age,
  bio,
  tags,
  ofUrl,
  igUrl,
  xUrl,
  onBuyAll,
  starName,
}: StarInfoCardProps) {
  const t = useT();

  return (
    <Card className="bg-[#111118]">
      <div className="space-y-5">
        <span
          className="text-[#17FBF8] text-[13px] mb-3 block uppercase text-glow"
        >
          {t("labels.pornstar")}
        </span>

        <h1
          className="font-heading uppercase text-[38px] leading-[0.95] text-[#17FBF8] text-glow"
        >
          {name.toUpperCase()}
          <br />
          {surname.toUpperCase()}
        </h1>

        <div className="grid grid-cols-3 gap-4 text-[12px] uppercase">
          {gender && (
            <div>
              <p className="text-[#7FF7F5]/50">{t("labels.gender")}</p>
              <p
                className="text-[#17FBF8] text-glow"
              >
                {gender === "male" ? t("labels.male") : t("labels.female")}
              </p>
            </div>
          )}
          <div>
            <p className="text-[#7FF7F5]/50">{t("labels.age")}</p>
            <p
              className="text-[#17FBF8] text-glow"
            >
              {age}
            </p>
          </div>
        </div>

        {bio && (
          <p className="text-[14px] leading-relaxed text-[#7FF7F5]">{bio}</p>
        )}

        <ChipList items={tags} linkable type="genre" />

        <div className="flex items-center gap-4 text-[#17FBF8]">
          {ofUrl && (
            <Link
              href={ofUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
            >
              <SiOnlyfans className="w-5 h-5 opacity-80" />
            </Link>
          )}
          {igUrl && (
            <Link
              href={igUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
            >
              <SiInstagram className="w-5 h-5 opacity-80" />
            </Link>
          )}
          {xUrl && (
            <Link
              href={xUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
            >
              <SiX className="w-5 h-5 opacity-80" />
            </Link>
          )}
        </div>

        <div className="mt-4">
          <Button variant="primary" onClick={onBuyAll} fullWidth>
            {t("actions.buy_all_var", { param: starName })}
          </Button>
        </div>
      </div>
    </Card>
  );
}
