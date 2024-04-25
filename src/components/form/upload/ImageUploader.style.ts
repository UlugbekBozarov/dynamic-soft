import { styled } from "@mui/material";

import { ImageSize } from "types";

export const StyledContainer = styled("div")<{
  size?: ImageSize;
}>(({ size }) => ({
  position: "relative",
  width: size === "small" ? "80px" : size === "medium" ? "100px" : "120px",
  height: size === "small" ? "80px" : size === "medium" ? "100px" : "120px",
}));

export const UploadImageBlock = styled("div")({
  position: "absolute",
  top: "0",
  right: "0",
  width: "100%",
  height: "100%",
  zIndex: "99999",
});

export const StyledInput = styled("input")`
  width: 100% !important;
  height: 100% !important;
  opacity: 0;
  box-sizing: border-box !important;
`;

export const StyledImageBlock = styled("div")({
  position: "absolute",
  top: "0",
  right: "0",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxSizing: "border-box",
  padding: "10px",
  zIndex: "1",
});
