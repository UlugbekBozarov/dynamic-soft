import { styled } from "@mui/material";
import { get } from "lodash";
import Link from "next/link";

export const StyledLink = styled(Link)<{ isLast?: boolean | undefined }>(
  ({ theme, isLast = false }) => {
    return {
      display: "flex",
      alignItems: "center",
      fontSize: "0.875rem",
      fontWeight: 400,
      textDecoration: "none",
      color: get(
        theme,
        isLast ? "palette.text.disabled" : "palette.text.primary"
      ),
      "& svg": {
        marginRight: "7px",
      },
      "&:hover": isLast
        ? {
            cursor: "context-menu",
            textDecoration: "none",
          }
        : {
            textDecoration: "underline",
          },
    };
  }
);

export const StyledDot = styled("span")({
  width: "4px",
  height: "4px",
  borderRadius: "50%",
  backgroundColor: "rgb(145, 158, 171)",
  marginLeft: "3px",
  marginRight: "3px",
  "@media(min-width: 768px)": {
    marginLeft: "10px",
    marginRight: "10px",
  },
});
