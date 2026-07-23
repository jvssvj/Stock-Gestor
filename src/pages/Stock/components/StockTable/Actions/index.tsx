import type { ReactNode } from "react";

interface ActionsProps {
  icon: ReactNode
  isTrash?: boolean
  text: string
  onClick?: () => void
}

export default function Actions({ icon, isTrash, text, onClick }: ActionsProps) {
  return (
    <div
      onClick={onClick}
      className="relative flex items-center justify-center flex-col"
    >
      <span
        aria-label={text}
        className={`cursor-pointer text-text-muted transition-all duration-200 ease-in-out hover:scale-110 ${isTrash ? "text-danger" : ""}`}
      >
        {icon}
      </span>
    </div>
  );
}
