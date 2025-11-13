export default function HamburgerButton({ open, setOpen }: any) {
  return (
    <button
      onClick={() => setOpen(!open)}
      className="md:hidden flex flex-col justify-center gap-1.5 w-9 h-9 relative border-l border-[#17FBF866] h-full w-[80px] items-center"
    >
      <span
        className={`
          w-6 h-[2px] bg-[var(--color-brand-800)] transition-all duration-300
          ${open ? "rotate-45 translate-y-[7px]" : ""}
        `}
      />
      <span
        className={`
          w-6 h-[2px] bg-[var(--color-brand-800)] transition-all duration-300
          ${open ? "opacity-0" : "opacity-100"}
        `}
      />
      <span
        className={`
          w-6 h-[2px] bg-[var(--color-brand-800)] transition-all duration-300
          ${open ? "-rotate-45 -translate-y-[7px]" : ""}
        `}
      />
    </button>
  );
}