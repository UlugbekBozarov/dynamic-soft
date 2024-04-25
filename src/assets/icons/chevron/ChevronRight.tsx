import { FC, memo } from "react";

import { IconProps } from "types";

const ChevronRight: FC<IconProps> = ({
  width = "20",
  height = "20",
  color = "#1D2939",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 12L10 8L6 4"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default memo(ChevronRight);
