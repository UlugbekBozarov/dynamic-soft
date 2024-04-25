import { styled } from "@mui/material";

export const Circle = styled("div", {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>(({ isActive }) => ({
  position: "relative",
  width: "20px",
  height: "20px",
  borderRadius: "15px",
  padding: "10px",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "2px",
    left: "2px",
    width: "16px",
    height: "16px",
    background: `rgb(${isActive ? "28, 189, 93" : "236, 91, 86"})`,
    borderRadius: "30px",
    boxShadow: `rgba(${
      isActive ? "28, 189, 93" : "236, 91, 86"
    }, 0.1) 0px 0px 0px 6px`,
  },
}));
