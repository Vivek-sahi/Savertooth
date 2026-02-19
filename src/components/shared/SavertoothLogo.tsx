"use client";

interface SavertoothLogoProps {
  size?: number;
  className?: string;
  variant?: "full" | "icon";
}

export default function SavertoothLogo({
  size = 38,
  className = "",
  variant = "full",
}: SavertoothLogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Lego-block sabertooth — chunky geometric shapes */}
        {/* Base head block */}
        <rect x="6" y="10" width="28" height="18" rx="4" fill="var(--text-primary)" />

        {/* Ears — two blocky rectangles */}
        <rect x="7" y="4" width="8" height="10" rx="2" fill="var(--text-primary)" />
        <rect x="25" y="4" width="8" height="10" rx="2" fill="var(--text-primary)" />

        {/* Inner ear blocks */}
        <rect x="9" y="6" width="4" height="5" rx="1" fill="var(--crayon-orange)" opacity="0.6" />
        <rect x="27" y="6" width="4" height="5" rx="1" fill="var(--crayon-orange)" opacity="0.6" />

        {/* Eyes — two bright squares */}
        <rect x="11" y="15" width="6" height="5" rx="1.5" fill="white" />
        <rect x="23" y="15" width="6" height="5" rx="1.5" fill="white" />

        {/* Pupils */}
        <rect x="14" y="16" width="3" height="3" rx="1" fill="var(--text-primary)" />
        <rect x="26" y="16" width="3" height="3" rx="1" fill="var(--text-primary)" />

        {/* Eye shine */}
        <rect x="15" y="16.5" width="1.2" height="1.2" rx="0.6" fill="white" />
        <rect x="27" y="16.5" width="1.2" height="1.2" rx="0.6" fill="white" />

        {/* Nose — small block */}
        <rect x="17.5" y="22" width="5" height="3" rx="1.5" fill="var(--crayon-orange)" />

        {/* Saber teeth — the signature, two chunky blocks hanging down */}
        <rect x="11" y="26" width="4" height="11" rx="1.5" fill="white" stroke="var(--border-soft)" strokeWidth="0.8" />
        <rect x="25" y="26" width="4" height="11" rx="1.5" fill="white" stroke="var(--border-soft)" strokeWidth="0.8" />

        {/* Tooth tips — slightly pointed */}
        <path d="M13 36L11.5 37.5Q13 38.5 14.5 37.5Z" fill="white" />
        <path d="M27 36L25.5 37.5Q27 38.5 28.5 37.5Z" fill="white" />

        {/* Mouth line */}
        <rect x="16" y="27" width="8" height="2" rx="1" fill="#3d3d4a" />
      </svg>

      {variant === "full" && (
        <span
          className="text-2xl tracking-tight text-[var(--text-primary)]"
          style={{ fontFamily: "var(--font-brand)", fontWeight: 800 }}
        >
          savertooth
        </span>
      )}
    </div>
  );
}

export function SavertoothLogoDark({
  size = 38,
  className = "",
  variant = "full",
}: SavertoothLogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="6" y="10" width="28" height="18" rx="4" fill="white" />
        <rect x="7" y="4" width="8" height="10" rx="2" fill="white" />
        <rect x="25" y="4" width="8" height="10" rx="2" fill="white" />
        <rect x="9" y="6" width="4" height="5" rx="1" fill="var(--crayon-orange)" opacity="0.6" />
        <rect x="27" y="6" width="4" height="5" rx="1" fill="var(--crayon-orange)" opacity="0.6" />
        <rect x="11" y="15" width="6" height="5" rx="1.5" fill="var(--text-primary)" />
        <rect x="23" y="15" width="6" height="5" rx="1.5" fill="var(--text-primary)" />
        <rect x="14" y="16" width="3" height="3" rx="1" fill="white" />
        <rect x="26" y="16" width="3" height="3" rx="1" fill="white" />
        <rect x="15" y="16.5" width="1.2" height="1.2" rx="0.6" fill="var(--text-primary)" />
        <rect x="27" y="16.5" width="1.2" height="1.2" rx="0.6" fill="var(--text-primary)" />
        <rect x="17.5" y="22" width="5" height="3" rx="1.5" fill="var(--crayon-orange)" />
        <rect x="11" y="26" width="4" height="11" rx="1.5" fill="var(--text-primary)" stroke="#3d3d4a" strokeWidth="0.5" />
        <rect x="25" y="26" width="4" height="11" rx="1.5" fill="var(--text-primary)" stroke="#3d3d4a" strokeWidth="0.5" />
        <path d="M13 36L11.5 37.5Q13 38.5 14.5 37.5Z" fill="var(--text-primary)" />
        <path d="M27 36L25.5 37.5Q27 38.5 28.5 37.5Z" fill="var(--text-primary)" />
        <rect x="16" y="27" width="8" height="2" rx="1" fill="white" opacity="0.5" />
      </svg>

      {variant === "full" && (
        <span
          className="text-2xl tracking-tight text-white"
          style={{ fontFamily: "var(--font-brand)", fontWeight: 800 }}
        >
          savertooth
        </span>
      )}
    </div>
  );
}
