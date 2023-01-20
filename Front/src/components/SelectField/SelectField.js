import { InputLabel, MenuItem, Select } from "@mui/material";
import { StyledFormControl } from "./SelectField.style";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export const SelectField = ({ fieldProperties: { field, id, label, required }, options, value }) => {
  return (
    <StyledFormControl key={field}>
      <InputLabel required={required}>{label}</InputLabel>
      <Select
        id={id}
        value={value ?? ""}
        label={label}
        onChange={() => console.log("blabla")}
        MenuProps={MenuProps}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option._id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};
