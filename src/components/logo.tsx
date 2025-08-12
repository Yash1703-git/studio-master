"use client";

import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
       <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        className="h-8 w-8"
       >
        <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: 'hsl(var(--primary))', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: 'hsl(142.1, 76.2%, 26.3%)', stopOpacity: 1}} />
            </linearGradient>
        </defs>
        <path 
            d="M128 24C132.418 24 136 27.5817 136 32V88C136 92.4183 132.418 96 128 96C123.582 96 120 92.4183 120 88V32C120 27.5817 123.582 24 128 24Z"
            fill="url(#logoGradient)"
        />
        <path 
            d="M190.509 65.4907C193.824 68.8061 193.824 74.1939 190.509 77.5093L157.509 110.509C154.194 113.824 148.806 113.824 145.491 110.509C142.176 107.194 142.176 101.806 145.491 98.4907L178.491 65.4907C181.806 62.1754 187.194 62.1754 190.509 65.4907Z"
            fill="url(#logoGradient)"
        />
        <path 
            d="M65.4907 65.4907C68.8061 62.1754 74.1939 62.1754 77.5093 65.4907L110.509 98.4907C113.824 101.806 113.824 107.194 110.509 110.509C107.194 113.824 101.806 113.824 98.4907 110.509L65.4907 77.5093C62.1754 74.1939 62.1754 68.8061 65.4907 65.4907Z"
            fill="url(#logoGradient)"
        />
        <path 
            d="M128 128C168.421 128 201.636 153.257 217.473 184.288C220.156 189.511 216.51 195.939 210.74 195.939H45.2593C39.4893 195.939 35.8436 189.511 38.5266 184.288C54.3644 153.257 87.5786 128 128 128Z"
            fill="url(#logoGradient)"
        />
        </svg>
      <span className="text-xl font-bold">Kanhaiya pashukhadya</span>
    </div>
  );
}
