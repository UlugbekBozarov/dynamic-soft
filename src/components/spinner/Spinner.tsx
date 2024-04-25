import { FC, memo } from "react";
import { Box, CircularProgress } from "@mui/material";

interface SpinnerProps {
  width?: string;
  height?: string;
}

const Spinner: FC<SpinnerProps> = ({ width = "100%", height = "100%" }) => {
  return (
    <Box
      width={width}
      height={height}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
    </Box>
  );
};

export default memo(Spinner);
