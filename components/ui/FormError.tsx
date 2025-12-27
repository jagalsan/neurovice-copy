"use client";

import { AlertTriangle } from "lucide-react";

interface FormErrorProps {
  errors: string[];
}

export default function FormError({ errors }: FormErrorProps) {
  if (!errors || errors.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {errors.map((error, index) => (
        <div
          key={index}
          className="flex items-center gap-2 px-4 py-3.5 rounded-[5px] border border-[#E41D8D] bg-[#E41D8D]/10"
        >
          <AlertTriangle className="w-5 h-5 text-[#E41D8D] flex-shrink-0" />
          <span className="text-[#E41D8D] text-sm">{error}</span>
        </div>
      ))}
    </div>
  );
}
