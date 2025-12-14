"use client";

import Card from "@/components/Card";
import Image from "next/image";

interface StarProfileCardProps {
  profileImage: string;
  starName: string;
}

export default function StarProfileCard({
  profileImage,
  starName,
}: StarProfileCardProps) {
  return (
    <Card className="bg-[#111118]" padded={false}>
      <div className="relative w-full h-[520px] md:h-[640px] rounded-[18px] overflow-hidden bg-[#171614]">
        <Image
          src={profileImage || "/mock/example_1_x.png"}
          alt={`${starName} portrait`}
          fill
          className="object-cover"
          priority
        />
      </div>
    </Card>
  );
}
