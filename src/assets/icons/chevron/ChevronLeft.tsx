import { FC, memo } from "react";

import { IconProps } from "types";

const ChevronLeft: FC<IconProps> = ({
  width = "20",
  height = "20",
  color = "#1D2939",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.50004 9.96004L4.24004 6.70004C3.85504 6.31504 3.85504 5.68504 4.24004 5.30004L7.50004 2.04004"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default memo(ChevronLeft);
