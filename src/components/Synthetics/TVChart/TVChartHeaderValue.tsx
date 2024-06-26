import { FC, ReactNode, createElement } from "react";

export const TVChartHeaderValue: FC<{ children: ReactNode; as?: "span" | "div" }> = ({ children, as = "div" }) => {
  return createElement(
    as,
    {
      className: "whitespace-nowrap text-12",
    },
    children
  );
};
