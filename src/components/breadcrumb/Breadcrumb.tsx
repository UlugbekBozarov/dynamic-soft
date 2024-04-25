"use client";

import { memo } from "react";
import { usePathname } from "next/navigation";
import { Box, Breadcrumbs } from "@mui/material";

import { Breadcrumb as BreadcrumbIcon } from "@/assets/icons";
import Link from "next/link";
import { StyledLink } from "./Breadcrumb.style";

const Breadcrumb = () => {
  const pathname = usePathname();

  let array = (pathname || "").split("/");
  if (array.at(-2) === "edit") {
    array = array.slice(0, -1);
  }

  return (
    <Breadcrumbs
      separator={
        <Box
          sx={{
            width: "4px",
            height: "4px",
            display: "inline-block",
            borderRadius: "50%",
            backgroundColor: "rgb(145, 158, 171)",
            marginLeft: "3px",
            marginRight: "3px",
            "@media(min-width: 768px)": {
              marginLeft: "10px",
              marginRight: "10px",
            },
          }}
        />
      }
      aria-label="breadcrumb"
    >
      {array.map((item, index) => (
        <StyledLink href="/" key={`${item}_${index}`}>
          {item === "" ? <BreadcrumbIcon /> : ""}
          {item || "home"}
        </StyledLink>
      ))}
    </Breadcrumbs>
  );
};

export default memo(Breadcrumb);
