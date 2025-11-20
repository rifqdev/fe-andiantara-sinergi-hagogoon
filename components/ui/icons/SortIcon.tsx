interface SortIconProps {
  direction: "asc" | "desc";
  className?: string;
}

export default function SortIcon({ direction, className = "" }: SortIconProps) {
  return (
    <svg
      className={`inline-block w-4 h-4 ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      {direction === "asc" ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      )}
    </svg>
  );
}
