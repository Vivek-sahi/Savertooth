"use client";

import { useEffect, useState, useRef } from "react";

interface SavertoothLogoProps {
  size?: number;
  className?: string;
  variant?: "full" | "icon";
  animate?: boolean;
}

type GazeDirection = "center" | "left" | "right" | "up";

const GAZE_OFFSETS: Record<GazeDirection, { lx: number; ly: number; rx: number; ry: number }> = {
  center: { lx: 0, ly: 0, rx: 0, ry: 0 },
  left:   { lx: -1.5, ly: 0, rx: -1.5, ry: 0 },
  right:  { lx: 1.5, ly: 0, rx: 1.5, ry: 0 },
  up:     { lx: 0, ly: -1.2, rx: 0, ry: -1.2 },
};

const GAZE_SEQUENCE: GazeDirection[] = ["left", "center", "right", "center", "up", "center"];

function useGazeAnimation(enabled: boolean) {
  const [gaze, setGaze] = useState<GazeDirection>("center");
  const indexRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const startDelay = 2000 + Math.random() * 2000;
    let timeout: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;

    timeout = setTimeout(() => {
      interval = setInterval(() => {
        const dir = GAZE_SEQUENCE[indexRef.current % GAZE_SEQUENCE.length];
        setGaze(dir);
        indexRef.current += 1;
      }, 1200 + Math.random() * 800);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [enabled]);

  return gaze;
}

function SabertoothSVG({
  size,
  gaze,
  headFill,
  eyeSocketFill,
  pupilFill,
  shineFill,
  toothFill,
  toothStroke,
  toothTipFill,
  mouthFill,
}: {
  size: number;
  gaze: GazeDirection;
  headFill: string;
  eyeSocketFill: string;
  pupilFill: string;
  shineFill: string;
  toothFill: string;
  toothStroke: string;
  toothTipFill: string;
  mouthFill: string;
}) {
  const g = GAZE_OFFSETS[gaze];
  const headTilt = gaze === "left" ? -2 : gaze === "right" ? 2 : 0;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id="headGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.12" />
          <stop offset="100%" stopColor="black" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="toothGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#e8e8e8" stopOpacity="1" />
        </linearGradient>
        <filter id="shadow3d" x="-10%" y="-10%" width="130%" height="140%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodColor="#000" floodOpacity="0.18" />
        </filter>
        <filter id="innerShadow" x="-5%" y="-5%" width="110%" height="120%">
          <feDropShadow dx="0" dy="0.8" stdDeviation="0.5" floodColor="#000" floodOpacity="0.1" />
        </filter>
      </defs>

      <g
        filter="url(#shadow3d)"
        style={{
          transform: `rotate(${headTilt}deg)`,
          transformOrigin: "20px 20px",
          transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Ears */}
        <rect x="7" y="4" width="8" height="10" rx="2.5" fill={headFill} />
        <rect x="25" y="4" width="8" height="10" rx="2.5" fill={headFill} />
        {/* Ear bevel highlight */}
        <rect x="7.5" y="4.5" width="7" height="3" rx="1.5" fill="white" opacity="0.1" />
        <rect x="25.5" y="4.5" width="7" height="3" rx="1.5" fill="white" opacity="0.1" />
        {/* Inner ear */}
        <rect x="9" y="6" width="4" height="5" rx="1.5" fill="var(--crayon-orange)" opacity="0.55" />
        <rect x="27" y="6" width="4" height="5" rx="1.5" fill="var(--crayon-orange)" opacity="0.55" />

        {/* Head block — with bevel */}
        <rect x="6" y="10" width="28" height="18" rx="4.5" fill={headFill} />
        {/* Top bevel highlight */}
        <rect x="7" y="10.5" width="26" height="4" rx="2" fill="white" opacity="0.1" />
        {/* Bottom edge shadow */}
        <rect x="7" y="24" width="26" height="3" rx="1.5" fill="black" opacity="0.06" />
        {/* Overlay gradient for 3D depth */}
        <rect x="6" y="10" width="28" height="18" rx="4.5" fill="url(#headGrad)" />

        {/* Eye sockets */}
        <rect x="10.5" y="14.5" width="7" height="6" rx="2" fill={eyeSocketFill} filter="url(#innerShadow)" />
        <rect x="22.5" y="14.5" width="7" height="6" rx="2" fill={eyeSocketFill} filter="url(#innerShadow)" />

        {/* Pupils — animated */}
        <rect
          x={14 + g.lx}
          y={16 + g.ly}
          width="3"
          height="3"
          rx="1"
          fill={pupilFill}
          style={{ transition: "x 0.4s ease, y 0.4s ease" }}
        />
        <rect
          x={26 + g.rx}
          y={16 + g.ry}
          width="3"
          height="3"
          rx="1"
          fill={pupilFill}
          style={{ transition: "x 0.4s ease, y 0.4s ease" }}
        />

        {/* Eye shine */}
        <circle cx={15 + g.lx} cy={16.8 + g.ly} r="0.7" fill={shineFill} style={{ transition: "cx 0.4s ease, cy 0.4s ease" }} />
        <circle cx={27 + g.rx} cy={16.8 + g.ry} r="0.7" fill={shineFill} style={{ transition: "cx 0.4s ease, cy 0.4s ease" }} />

        {/* Nose — rounded block */}
        <rect x="17" y="22" width="6" height="3.5" rx="1.8" fill="var(--crayon-orange)" />
        <rect x="17.5" y="22.3" width="5" height="1.2" rx="0.6" fill="white" opacity="0.15" />

        {/* Saber teeth — 3D with gradient */}
        <rect x="11" y="26" width="4.5" height="11" rx="2" fill="url(#toothGrad)" stroke={toothStroke} strokeWidth="0.6" />
        <rect x="24.5" y="26" width="4.5" height="11" rx="2" fill="url(#toothGrad)" stroke={toothStroke} strokeWidth="0.6" />
        {/* Tooth highlight */}
        <rect x="11.8" y="27" width="1.5" height="8" rx="0.75" fill="white" opacity="0.35" />
        <rect x="25.3" y="27" width="1.5" height="8" rx="0.75" fill="white" opacity="0.35" />

        {/* Tooth tips */}
        <path d="M13.25 36L11.5 37.8Q13.25 38.8 15 37.8Z" fill={toothTipFill} />
        <path d="M26.75 36L25 37.8Q26.75 38.8 28.5 37.8Z" fill={toothTipFill} />

        {/* Mouth */}
        <rect x="16" y="27" width="8" height="2.2" rx="1.1" fill={mouthFill} />
      </g>
    </svg>
  );
}

export default function SavertoothLogo({
  size = 38,
  className = "",
  variant = "full",
  animate = true,
}: SavertoothLogoProps) {
  const gaze = useGazeAnimation(animate);

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <SabertoothSVG
        size={size}
        gaze={gaze}
        headFill="var(--text-primary)"
        eyeSocketFill="white"
        pupilFill="var(--text-primary)"
        shineFill="white"
        toothFill="white"
        toothStroke="var(--border-soft)"
        toothTipFill="white"
        mouthFill="#3d3d4a"
      />
      {variant === "full" && (
        <span
          className="text-2xl tracking-tight text-[var(--text-primary)]"
          style={{ fontFamily: "var(--font-brand)", fontWeight: 800 }}
        >
          Savertooth
        </span>
      )}
    </div>
  );
}

export function SavertoothLogoDark({
  size = 38,
  className = "",
  variant = "full",
  animate = true,
}: SavertoothLogoProps) {
  const gaze = useGazeAnimation(animate);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <SabertoothSVG
        size={size}
        gaze={gaze}
        headFill="white"
        eyeSocketFill="var(--text-primary)"
        pupilFill="white"
        shineFill="var(--text-primary)"
        toothFill="var(--text-primary)"
        toothStroke="#3d3d4a"
        toothTipFill="var(--text-primary)"
        mouthFill="rgba(255,255,255,0.5)"
      />
      {variant === "full" && (
        <span
          className="text-2xl tracking-tight text-white"
          style={{ fontFamily: "var(--font-brand)", fontWeight: 800 }}
        >
          Savertooth
        </span>
      )}
    </div>
  );
}
