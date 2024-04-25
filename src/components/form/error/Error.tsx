import { FC } from "react";
import { FieldError } from "react-hook-form";
import { Box, Typography } from "@mui/material";

import { Info } from "@/assets/icons";

import { StyledError } from "./Error.style";

interface ErrorProps {
  error?: FieldError | undefined;
}

const Error: FC<ErrorProps> = ({ error }) => {
  return error ? (
    <StyledError>
      <Box width="20px" height="20px" marginRight="7px">
        <Info />
      </Box>
      <Typography fontSize="13px" color="error" marginLeft="10px">
        {error?.message || "Invalid value"}
      </Typography>
    </StyledError>
  ) : (
    <></>
  );
};

export default Error;
