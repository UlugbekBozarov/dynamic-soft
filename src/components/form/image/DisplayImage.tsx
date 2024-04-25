import { FC, useState } from "react";
import { Modal } from "@mui/material";

import { ImageSize } from "@/types";
import { Close, Delete, Eye } from "@/assets/icons";

import {
  ModalCloseButton,
  ModalContent,
  StyledIconButton,
  StyledIconButtonBlock,
  StyledImage,
  StyledImageBlock,
} from "./DisplayImage.style";

interface DisplayImageProps {
  type?: "rounded" | "circle";
  size?: ImageSize | number;
  value?: string;
  handleDeleteImage?: () => void;
  alt?: string;
}

const DisplayImage: FC<DisplayImageProps> = ({
  type = "rounded",
  size,
  value,
  handleDeleteImage,
  alt,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <StyledImageBlock
      type={type}
      size={size}
      onClick={(event) => event.stopPropagation()}
    >
      {value ? (
        <StyledImage src={value} alt={alt || value} />
      ) : (
        <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            opacity="0.5"
            d="M22.0206 16.8198L18.8906 9.49978C18.3206 8.15978 17.4706 7.39978 16.5006 7.34978C15.5406 7.29978 14.6106 7.96978 13.9006 9.24978L12.0006 12.6598C11.6006 13.3798 11.0306 13.8098 10.4106 13.8598C9.78063 13.9198 9.15063 13.5898 8.64063 12.9398L8.42063 12.6598C7.71063 11.7698 6.83063 11.3398 5.93063 11.4298C5.03063 11.5198 4.26063 12.1398 3.75063 13.1498L2.02063 16.5998C1.40063 17.8498 1.46063 19.2998 2.19063 20.4798C2.92063 21.6598 4.19063 22.3698 5.58063 22.3698H18.3406C19.6806 22.3698 20.9306 21.6998 21.6706 20.5798C22.4306 19.4598 22.5506 18.0498 22.0206 16.8198Z"
            fill="#292D32"
          />
          <path
            opacity="0.3"
            d="M6.96984 8.38012C8.83657 8.38012 10.3498 6.86684 10.3498 5.00012C10.3498 3.13339 8.83657 1.62012 6.96984 1.62012C5.10312 1.62012 3.58984 3.13339 3.58984 5.00012C3.58984 6.86684 5.10312 8.38012 6.96984 8.38012Z"
            fill="#292D32"
          />
        </svg>
      )}
      <Modal open={open} onClose={handleClose}>
        <ModalContent onClick={handleClose}>
          <StyledImage
            src={value}
            onClick={(event) => event?.stopPropagation()}
            alt={alt || value}
          />
          <ModalCloseButton onClick={handleClose}>
            <Close />
          </ModalCloseButton>
        </ModalContent>
      </Modal>
      <StyledIconButtonBlock isDelete={!!handleDeleteImage}>
        {value ? (
          <StyledIconButton onClick={handleOpen}>
            <Eye />
          </StyledIconButton>
        ) : (
          ""
        )}
        {!!handleDeleteImage && (
          <StyledIconButton
            onClick={handleDeleteImage}
            sx={{ marginLeft: "5px" }}
          >
            <Delete />
          </StyledIconButton>
        )}
      </StyledIconButtonBlock>
    </StyledImageBlock>
  );
};

export default DisplayImage;
