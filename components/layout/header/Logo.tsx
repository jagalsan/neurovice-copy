import Image from "next/image";

export default function Logo() {
  return (
    <div className="relative w-[150px] h-8 lg:w-[250px] lg:h-10 xl:w-[300px] xl:h-10">
      <Image
        src="/logo_neurovice.svg"
        alt="Neurovice logo"
        fill
        className="select-none object-contain"
      />
    </div>
  );
}
