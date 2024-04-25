import { FC, Fragment, SyntheticEvent } from "react";
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import { FormControlLabel, Switch, TextField } from "@mui/material";
import { get } from "lodash";

import Error from "../error/Error";

interface ControlledSwitchProps {
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
  onChange?: (
    event: SyntheticEvent<Element, Event>,
    checked: boolean
  ) => void | undefined;
  defaultValue?: string | number | undefined;
  placeholder?: string | undefined;
  focused?: boolean;
}

const ControlledSwitch: FC<ControlledSwitchProps> = ({
  labelKey,
  name = "custom-switch",
  rules = {},
  onChange,
  defaultValue,
  ...props
}) => {
  const { control } = useFormContext();

  const switchChangeHandler =
    (formChangeHandler: (...event: any[]) => void) =>
    (event: SyntheticEvent<Element, Event>, checked: boolean) => {
      formChangeHandler(checked);
      if (onChange) {
        onChange(event, checked);
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
          <FormControlLabel
            label={labelKey}
            {...props}
            {...field}
            value={field?.value || false}
            checked={field?.value || false}
            control={<Switch />}
            required={!!get(rules, "required", false)}
            onChange={switchChangeHandler(onChange)}
          />

          <Error error={error} />
        </Fragment>
      )}
      defaultValue={defaultValue}
    />
  );
};

export default ControlledSwitch;
