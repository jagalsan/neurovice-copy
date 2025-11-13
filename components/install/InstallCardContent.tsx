interface InstallCardContentProps {
  platformLabel: string;
  title: string;
  description: string;
  extraLabel?: string;
}

export function InstallCardContent({
  platformLabel,
  title,
  description,
  extraLabel,
}: InstallCardContentProps) {
  return (
    <>
      <div className="mb-1">
        <p className="text-[16px] mb-0 font-bold uppercase opacity-60">
          {platformLabel}
        </p>
        <h3 className="text-[30px] uppercase mb-0">
          {title}
        </h3>
      </div>

      <p className="text-[16px] font-semibold mb-6">
        {description}
      </p>

      {extraLabel && (
        <div className="mb-6">
          <div className="inline-flex items-center px-6 py-2 rounded-[10px] border-2 border-[#111118CC] font-bold bg-transparent text-[14px] uppercase text-[#111118CC]">
            {extraLabel}
          </div>
        </div>
      )}
    </>
  );
}
