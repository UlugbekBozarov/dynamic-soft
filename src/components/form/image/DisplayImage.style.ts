import { IconButton, styled } from "@mui/material";

import { ImageSize } from "@/types";

export const StyledImageBlock = styled("div", {
  shouldForwardProp: (prop) => !["size", "type"].includes(prop as string),
})<{ size?: ImageSize | number; type: "rounded" | "circle" }>(
  ({ theme, size, type }) => ({
    position: "relative",
    width:
      typeof size === "number"
        ? `${size}px`
        : size === "small"
        ? "80px"
        : size === "medium"
        ? "100px"
        : "120px",
    height:
      typeof size === "number"
        ? `${size}px`
        : size === "small"
        ? "80px"
        : size === "medium"
        ? "100px"
        : "120px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius:
      type === "rounded"
        ? theme?.shape?.borderRadius
        : typeof size === "number"
        ? size
        : size === "small"
        ? "80px"
        : size === "medium"
        ? "100px"
        : "120px",
    background: "#F5F5F5",
    padding:
      type === "rounded"
        ? size !== "small"
          ? "10px"
          : "2px"
        : size !== "small"
        ? "30px"
        : "2px",
    overflow: "hidden",
    transition: "all 0.3s",
    "& button": {
      opacity: 0,
      transition: "all 0.3s",
    },
    "&:hover": {
      "& button": {
        opacity: 1,
      },
    },
  })
);

export const StyledImage = styled("img")({
  maxWidth: "100%",
  maxHeight: "100%",
});

export const ModalContent = styled("div")({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px",
  "@media(min-width: 768px)": {
    padding: "30px",
  },
});

export const ModalCloseButton = styled(IconButton)({
  position: "absolute",
  top: "20px",
  right: "20px",
  width: "50px",
  height: "50px",
  background: "#fff",
  // boxShadow: "0px 0px 3px -1px rgba(0, 0, 0, 0.8)",
  "&:hover": {
    background: "#fff",
  },
});

export const StyledIconButtonBlock = styled("div", {
  shouldForwardProp: (prop: string) => !["size", "isDelete"].includes(prop),
})<{
  size?: ImageSize;
  isDelete?: boolean;
}>(({ size, isDelete = false }) => ({
  position: "absolute",
  top: size === "small" || size === "medium" ? 0 : "5px",
  right: size === "small" || size === "medium" ? 0 : "5px",
  width:
    size === "small" || size === "medium" ? "100%" : isDelete ? "75px" : "35px",
  height: size === "small" || size === "medium" ? "100%" : "35px",
  display: "flex",
  justifyContent: "flex-end",
}));

export const StyledIconButton = styled(IconButton)({
  width: "35px",
  height: "35px",
  background: "rgba(0, 0, 0, 0.6)",
  boxShadow: "0px 0px 3px -1px rgba(0, 0, 0, 0.8)",
  "&:hover": {
    background: "rgba(0, 0, 0, 0.7)",
  },
});
