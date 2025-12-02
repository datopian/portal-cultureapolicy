import { useTheme } from "@/components/theme/theme-provider";
import Link from "next/link";

export default function ActionCard({
  title,
  description,
  icon,
  href,
  target="_self",
  rel
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  target?: string;
  rel?: string;
}) {
  const { theme } = useTheme();
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={`w-full group border-b-[4px] border-white hover:border-accent hover:bg-accent-50 bg-[var(--background-color)] ${theme.styles.shadowMd} flex flex-col items-center py-10 lg:py-16  px-5 lg:px-4 text-center rounded-[10px]`}
    >
      {icon && (
        <span className="mb-4 text-accent text-[52px] font-normal">{icon}</span>
      )}

      <h2 className="font-bold text-black mb-[14px] text-[20px] lg:text-[25px] uppercase group-hover:text-accent">
        {title}
      </h2>
      <div className="tracking-[0.05em] text-[var(--gray-dark)] text-[16px] leading-[19px]">
        {description}
      </div>
    </Link>
  );
}
