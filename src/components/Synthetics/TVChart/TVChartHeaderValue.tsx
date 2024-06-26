import { FC, ReactNode } from "react";

export const TVChartHeaderValue: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
  return <span className={`${className} whitespace-nowrap text-12`}>{children}</span>;
};
