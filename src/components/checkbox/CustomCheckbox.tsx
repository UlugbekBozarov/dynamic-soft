import { FC } from "react";
import { Checkbox, CheckboxProps } from "@mui/material";

import {
  CheckIndeterminate,
  CheckboxChecked,
  Checkbox as CheckboxIcon,
} from "@/assets/icons";

const CustomCheckbox: FC<CheckboxProps> = (props) => {
  return (
    <Checkbox
      {...props}
      icon={<CheckboxIcon />}
      checkedIcon={<CheckboxChecked />}
      indeterminateIcon={<CheckIndeterminate />}
    />
  );
};

export default CustomCheckbox;
