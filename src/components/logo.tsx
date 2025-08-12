"use client";

import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
       <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        className="h-10 w-10"
       >
        <path 
          d="M60,110 C40,90 40,50 70,50 C90,50 100,70 100,90"
          fill="white"
          stroke="#2D4F2B"
          strokeWidth="6"
          strokeLinecap="round"
        />
         <path 
          d="M196,110 C216,90 216,50 186,50 C166,50 156,70 156,90"
          fill="white"
          stroke="#2D4F2B"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path 
          d="M80,130 Q128,100 176,130 C 190,190 128,230 128,230 C 128,230 66,190 80,130 Z"
          fill="#FDBA74"
          stroke="#2D4F2B"
          strokeWidth="8"
        />
        <ellipse cx="100" cy="140" rx="10" ry="12" fill="black" />
        <ellipse cx="156" cy="140" rx="10" ry="12" fill="black" />
        <path 
          d="M110,180 Q128,190 146,180"
          stroke="#2D4F2B"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <path 
          d="M110,115 Q128,110 146,115"
          fill="#FDBA74"
          stroke="#2D4F2B"
          strokeWidth="6"
        />
        <path d="M110 115 C 105 100, 115 90, 128 90 C 141 90, 151 100, 146 115"
          fill="#FDBA74"
          stroke="#2D4F2B"
          strokeWidth="0"
        />
       </svg>
      <span className="text-xl font-bold">Kanhaiya pashukhadya</span>
    </div>
  );
}
