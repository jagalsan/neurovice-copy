interface InfoTableProps {
  data: [string, string][];
}

export default function InfoTable({ data }: InfoTableProps) {
  return (
    <div className="divide-y divide-y-[2px] divide-[#17FBF833]">
      {data.map(([key, value]) => (
        <div
          key={key}
          className="grid grid-cols-3 gap-4 py-3 text-[13px]"
        >
          <div className="text-[#17FBF8] font-[600] tracking-[0.18em] uppercase">
            {key}
          </div>
          <div className="col-span-2 text-[#17FBF8] font-[400] uppercase">{value}</div>
        </div>
      ))}
    </div>
  );
}
