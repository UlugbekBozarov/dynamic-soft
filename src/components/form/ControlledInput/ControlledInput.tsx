import { FC, Fragment } from "react";
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import { TextField } from "@mui/material";
import { get } from "lodash";
import Error from "../error/Error";

interface ControlledInputProps {
  labelKey?: string | undefined;
  name: string;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, any>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
  multiline?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  type?: "text" | "password" | "number" | undefined;
  onChange?: (value: string) => void | undefined;
  defaultValue?: string | number | undefined;
  placeholder?: string | undefined;
  focused?: boolean;
}

const ControlledInput: FC<ControlledInputProps> = ({
  labelKey,
  name = "custom-input",
  rules = {},
  onChange,
  defaultValue,
  ...props
}) => {
  const { control } = useFormContext();

  const inputChangeHandler =
    (formChangeHandler: (...event: any[]) => void) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      formChangeHandler(get(event, "target.value", ""));
      if (onChange) {
        onChange(get(event, "target.value", ""));
      }
    };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      disabled={get(props, "disabled")}
      render={({
        field: { ref, onChange, ...field },
        fieldState: { error },
      }) => (
        <Fragment>
          <TextField
            id={`input-${name}`}
            fullWidth
            {...props}
            {...field}
            required={!!get(rules, "required", false)}
            label={labelKey}
            inputRef={ref}
            error={!!error}
            value={field?.value || ""}
            onChange={inputChangeHandler(onChange)}
          />
          <Error error={error} />
        </Fragment>
      )}
      defaultValue={defaultValue}
    />
  );
};

export default ControlledInput;
