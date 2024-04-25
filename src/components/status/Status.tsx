"use client";

import { FC, memo } from "react";
import { Circle } from "./Status.style";

const Status: FC<{
  value: boolean;
}> = ({ value }) => {
  return <Circle isActive={value} />;
};

export default memo(Status);
