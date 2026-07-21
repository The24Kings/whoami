import type { ButtonHTMLAttributes } from "react";

import "./BreadCrumb.css";

export type CrumbVariants = "folder" | "file";

export interface CrumbProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  variant?: CrumbVariants;
  current?: boolean;
}

export const BreadCrumb = ({
  variant = "folder",
  name,
  current,
  ...rest
}: CrumbProps) => {
  return (
    <span>
      <button
        type="button"
        className={`crumb crumb-${variant}`}
        aria-current={current ? "page" : undefined}
        {...rest}
      >
        {name}
      </button>
      {variant === "folder" && "/"}
    </span>
  );
};
