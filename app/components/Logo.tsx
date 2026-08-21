import { getCurrentTenantSlug } from "~/lib/tenant-resolution";
import { getTheme } from "~/lib/themes";

interface LogoProps {
  size?: "sm" | "lg";
}

const sizeClasses: Record<"sm" | "lg", string> = {
  sm: "h-8 w-8 text-sm",
  lg: "h-12 w-12 text-base",
};

export function Logo({ size = "sm" }: LogoProps) {
  const theme = getTheme(getCurrentTenantSlug());

  return (
    <span
      className={`flex items-center justify-center rounded-lg font-semibold text-white ${sizeClasses[size]}`}
      style={{ backgroundColor: theme.colors.primary }}
    >
      {theme.initials}
    </span>
  );
}
