import type { ReactNode } from "react";

type AlertVariant = "error" | "success" | "info";

interface AlertProps {
  variant: AlertVariant;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

const VARIANT_STYLES: Record<AlertVariant, string> = {
  error: "border-red-200 bg-red-50 text-red-800",
  success: "border-green-200 bg-green-50 text-green-800",
  info: "border-blue-200 bg-blue-50 text-blue-800",
};

const ICON_STYLES: Record<AlertVariant, string> = {
  error: "text-red-500",
  success: "text-green-500",
  info: "text-blue-500",
};

function AlertIcon({ variant }: { variant: AlertVariant }) {
  if (variant === "success") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="m8.5 12.5 2.5 2.5 5-5" />
      </svg>
    );
  }

  if (variant === "info") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5" />
        <path d="M12 8h.01" />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5" />
      <path d="M12 16h.01" />
    </svg>
  );
}

export function Alert({
  variant,
  title,
  description,
  action,
  className = "",
}: AlertProps) {
  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={`flex items-start gap-3 rounded-lg border px-4 py-3 ${VARIANT_STYLES[variant]} ${className}`}
    >
      <span className={`mt-0.5 shrink-0 ${ICON_STYLES[variant]}`}>
        <AlertIcon variant={variant} />
      </span>
      <div className="flex-1">
        <p className="text-sm font-medium">{title}</p>
        {description && (
          <p className="mt-0.5 text-sm opacity-90">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
