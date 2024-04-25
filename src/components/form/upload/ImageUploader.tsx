import { forwardRef } from "react";
import { CircularProgress } from "@mui/material";

import { Image } from "@/assets/icons";
import { ImageSize } from "@/types";

import {
  StyledContainer,
  StyledImageBlock,
  StyledInput,
  UploadImageBlock,
} from "./ImageUploader.style";

interface ImageUploaderProps {
  accept?: string;
  autoFocus?: boolean;
  className?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  onAnimationStart?: (event: any) => void;
  onBlur?: (event: any) => void;
  onChange?: (event: any, ...args: any) => void;
  onFocus?: (event: any) => void;
  size?: ImageSize;
  loading?: boolean | undefined;
  value?: string | undefined;
}

const ImageUploader = forwardRef(
  ({ size, loading, value = "", ...props }: ImageUploaderProps, ref: any) => {
    return (
      <StyledContainer size={size}>
        <UploadImageBlock>
          <StyledInput ref={ref} {...props} value={value} />
        </UploadImageBlock>
        <StyledImageBlock>
          {loading ? <CircularProgress /> : <Image />}
        </StyledImageBlock>
      </StyledContainer>
    );
  }
);

export default ImageUploader;
