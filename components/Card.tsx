"use client";

import type { ReactNode, CSSProperties } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  padded?: boolean;
  title?: string;
  showGrid?: boolean;
};

export default function Card({
  children,
  className = "",
  padded = true,
  title,
  showGrid = true,
}: Props) {
  const borderColor = "rgba(23,251,248,0.20)";
  const gridColor   = "rgba(23,251,248,0.20)";
  const glow        = "rgba(23,251,248,0.20)";

  const gridStyle: CSSProperties = {
    backgroundImage: `
      linear-gradient(to right, ${gridColor} 1px, transparent 1px),
      linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
    `,
    backgroundSize: "26px 26px",
  };

  return (
    <section
      className={[
        "relative overflow-hidden rounded-[18px]",
        "border",
        className,
      ].join(" ")}
      style={{
        borderColor,
        boxShadow: `0 0 15px ${glow}`,
      }}
    >
      {showGrid && <div className="absolute inset-0" style={gridStyle} />}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#111118_0%,#111118_100%)] opacity-50" />
      <div>
        {title && (
          <div className="w-full bg-[#17fbf77a] p-[15px] relative">
            <p className="font-heading text-[#17FBF8] uppercase text-[24px]">
              {title}
            </p>
          </div>
        )}
        <div className={padded ? "relative p-4 md:p-2 lg:p-4" : "relative"}>
          {children}
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-0 rounded-[18px]"
        style={{ boxShadow: `inset 0 0 0 1px ${borderColor}` }}
      />
    </section>
  );
}