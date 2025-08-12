import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8 text-primary"
      >
        <path d="M18.5 6.5C18.5 8.43 17.09 10 15.5 10C13.91 10 12.5 8.43 12.5 6.5C12.5 4.57 13.91 3 15.5 3C17.09 3 18.5 4.57 18.5 6.5Z" />
        <path d="M8.5 6.5C8.5 8.43 7.09 10 5.5 10C3.91 10 2.5 8.43 2.5 6.5C2.5 4.57 3.91 3 5.5 3C7.09 3 8.5 4.57 8.5 6.5Z" />
        <path d="M12 16C12 14.8954 12.8954 14 14 14H15C15.5523 14 16 14.4477 16 15V15C16 15.5523 15.5523 16 15 16H14C12.8954 16 12 15.1046 12 14" />
        <path d="M21 12.2C21 15.42 21 17.03 20.21 18.22C19.53 19.25 18.58 19.95 17.5 20.37C16.22 20.85 14.73 21 12 21C9.27 21 7.78 20.85 6.5 20.37C5.42 19.95 4.47 19.25 3.79 18.22C3 17.03 3 15.42 3 12.2C3 9.42 3.32 8.01 4.12 6.94C4.19 6.84 4.26 6.75 4.34 6.66" />
      </svg>
      <span className="text-xl font-bold">Kanhaiya pashukhadya</span>
    </div>
  );
}
