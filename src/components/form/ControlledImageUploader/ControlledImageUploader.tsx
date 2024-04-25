import { FC, Fragment } from "react";
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import { Box, FormLabel, TextField } from "@mui/material";
import { get } from "lodash";

import { ImageSize } from "@/types";

// import { ImageUploader, DisplayImage } from "../../components";
import Error from "../error/Error";
import DisplayImage from "../image/DisplayImage";
import ImageUploader from "../upload/ImageUploader";

interface ControlledImageUploaderProps {
  labelKey?: string;
  accept?: string;
  name: string;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, any>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
  onChange?: (image: string) => void;
  size?: ImageSize;
}

const ControlledImageUploader: FC<ControlledImageUploaderProps> = ({
  labelKey,
  accept = "image/png, image/jpeg, image/jpg, image/svg, image/gif",
  name = "image",
  rules = {},
  onChange,
  size = "medium",
  ...props
}) => {
  const { control } = useFormContext();

  // const [loading, setLoading] = useState(false);

  const handleChangeImage =
    (formChangeHandler: (...event: any[]) => void) => (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        fetch("http://localhost:8087/upload/api/images", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            return response?.json();
          })
          .then((data) => {
            formChangeHandler(data);
          })
          .catch((error) => {
            console.error("Xatolik:", error);
          });
      }
    };

  const handleDeleteImage =
    (formChangeHandler: (...event: any[]) => void) => () => {
      formChangeHandler("");
    };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { ref, onChange: formChangeHandler, ...field },
        fieldState: { error },
      }) => (
        <Fragment>
          <FormLabel
            htmlFor={`image-upload-${name}`}
            required={!!get(rules, "required", false)}
          >
            {labelKey}
          </FormLabel>
          <Box>
            {field?.value ? (
              <DisplayImage
                handleDeleteImage={handleDeleteImage(formChangeHandler)}
                size={size}
                value={field?.value}
              />
            ) : (
              <TextField
                type="file"
                id={`image-upload-${name}`}
                {...props}
                {...field}
                value={field?.value || ""}
                onChange={handleChangeImage(formChangeHandler)}
                inputRef={ref}
                InputProps={{
                  inputComponent: ImageUploader,
                  inputProps: {
                    accept,
                    // loading,
                    size,
                  },
                }}
                error={!!error}
              />
            )}
          </Box>
          <Error error={error} />
        </Fragment>
      )}
    />
  );
};

export default ControlledImageUploader;
