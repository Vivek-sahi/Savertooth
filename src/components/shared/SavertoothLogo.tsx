"use client";

interface SavertoothLogoProps {
  size?: number;
  className?: string;
  variant?: "full" | "icon";
}

export default function SavertoothLogo({
  size = 40,
  className = "",
  variant = "full",
}: SavertoothLogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle */}
        <circle cx="32" cy="32" r="32" fill="url(#saverGrad)" />

        {/* Sabertooth face silhouette — fierce, minimal */}
        {/* Ears */}
        <path
          d="M16 22L21 10L26 20Z"
          fill="#FFF"
          opacity="0.9"
        />
        <path
          d="M48 22L43 10L38 20Z"
          fill="#FFF"
          opacity="0.9"
        />

        {/* Head shape */}
        <ellipse cx="32" cy="28" rx="14" ry="11" fill="#FFF" opacity="0.9" />

        {/* Eyes — fierce slits */}
        <ellipse cx="26" cy="26" rx="3" ry="2" fill="#1a1a1a" />
        <ellipse cx="38" cy="26" rx="3" ry="2" fill="#1a1a1a" />
        <circle cx="26.5" cy="25.8" r="0.8" fill="#F59E0B" />
        <circle cx="38.5" cy="25.8" r="0.8" fill="#F59E0B" />

        {/* Nose */}
        <path
          d="M30 31L32 29L34 31L32 32.5Z"
          fill="#E8927C"
        />

        {/* Mouth line */}
        <path
          d="M26 33Q32 36 38 33"
          stroke="#1a1a1a"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* SABER TEETH — the signature element */}
        <path
          d="M25 33L23 46Q24 47 26 45L27 35Z"
          fill="#FFF"
          stroke="#E5E5E5"
          strokeWidth="0.5"
        />
        <path
          d="M39 33L41 46Q40 47 38 45L37 35Z"
          fill="#FFF"
          stroke="#E5E5E5"
          strokeWidth="0.5"
        />

        {/* Small teeth */}
        <path d="M28 34L28.5 37L29.5 34Z" fill="#FFF" stroke="#E5E5E5" strokeWidth="0.3" />
        <path d="M34 34L34.5 37L35.5 34Z" fill="#FFF" stroke="#E5E5E5" strokeWidth="0.3" />

        {/* Whisker marks */}
        <line x1="18" y1="29" x2="24" y2="30" stroke="#CCC" strokeWidth="0.7" strokeLinecap="round" />
        <line x1="18" y1="32" x2="24" y2="32" stroke="#CCC" strokeWidth="0.7" strokeLinecap="round" />
        <line x1="46" y1="29" x2="40" y2="30" stroke="#CCC" strokeWidth="0.7" strokeLinecap="round" />
        <line x1="46" y1="32" x2="40" y2="32" stroke="#CCC" strokeWidth="0.7" strokeLinecap="round" />

        {/* Coin/savings element — small coin behind ear */}
        <circle cx="50" cy="14" r="7" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1.5" />
        <text x="50" y="17.5" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#92400E">₹</text>

        <defs>
          <linearGradient id="saverGrad" x1="0" y1="0" x2="64" y2="64">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
        </defs>
      </svg>

      {variant === "full" && (
        <span className="text-xl font-bold tracking-tight">
          <span className="text-amber-500">Saver</span>
          <span className="text-slate-800">tooth</span>
        </span>
      )}
    </div>
  );
}

export function SavertoothLogoDark({
  size = 40,
  className = "",
  variant = "full",
}: SavertoothLogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="32" cy="32" r="32" fill="url(#saverGradDark)" />
        <path d="M16 22L21 10L26 20Z" fill="#FFF" opacity="0.9" />
        <path d="M48 22L43 10L38 20Z" fill="#FFF" opacity="0.9" />
        <ellipse cx="32" cy="28" rx="14" ry="11" fill="#FFF" opacity="0.9" />
        <ellipse cx="26" cy="26" rx="3" ry="2" fill="#1a1a1a" />
        <ellipse cx="38" cy="26" rx="3" ry="2" fill="#1a1a1a" />
        <circle cx="26.5" cy="25.8" r="0.8" fill="#F59E0B" />
        <circle cx="38.5" cy="25.8" r="0.8" fill="#F59E0B" />
        <path d="M30 31L32 29L34 31L32 32.5Z" fill="#E8927C" />
        <path d="M26 33Q32 36 38 33" stroke="#1a1a1a" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <path d="M25 33L23 46Q24 47 26 45L27 35Z" fill="#FFF" stroke="#E5E5E5" strokeWidth="0.5" />
        <path d="M39 33L41 46Q40 47 38 45L37 35Z" fill="#FFF" stroke="#E5E5E5" strokeWidth="0.5" />
        <path d="M28 34L28.5 37L29.5 34Z" fill="#FFF" stroke="#E5E5E5" strokeWidth="0.3" />
        <path d="M34 34L34.5 37L35.5 34Z" fill="#FFF" stroke="#E5E5E5" strokeWidth="0.3" />
        <line x1="18" y1="29" x2="24" y2="30" stroke="#CCC" strokeWidth="0.7" strokeLinecap="round" />
        <line x1="18" y1="32" x2="24" y2="32" stroke="#CCC" strokeWidth="0.7" strokeLinecap="round" />
        <line x1="46" y1="29" x2="40" y2="30" stroke="#CCC" strokeWidth="0.7" strokeLinecap="round" />
        <line x1="46" y1="32" x2="40" y2="32" stroke="#CCC" strokeWidth="0.7" strokeLinecap="round" />
        <circle cx="50" cy="14" r="7" fill="#FCD34D" stroke="#F59E0B" strokeWidth="1.5" />
        <text x="50" y="17.5" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#92400E">₹</text>
        <defs>
          <linearGradient id="saverGradDark" x1="0" y1="0" x2="64" y2="64">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
        </defs>
      </svg>

      {variant === "full" && (
        <span className="text-xl font-bold tracking-tight">
          <span className="text-amber-400">Saver</span>
          <span className="text-white">tooth</span>
        </span>
      )}
    </div>
  );
}
