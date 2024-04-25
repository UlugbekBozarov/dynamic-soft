import { FC } from "react";
import { Box, Stack } from "@mui/material";

import Breadcrumb from "../breadcrumb/Breadcrumb";

interface LayoutMainProps {
  children?: any;
}

const LayoutMain: FC<LayoutMainProps> = ({ children }) => {
  return (
    <Box>
      <Box
        minHeight="30px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="8px"
      >
        <Box width="100%" pr="20px">
          <Breadcrumb />
        </Box>
        <Stack spacing="10px" direction="row"></Stack>
      </Box>
      {children}
    </Box>
  );
};

export default LayoutMain;
