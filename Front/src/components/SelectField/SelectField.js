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

export const SelectField = ({
  fieldProperties: { field, id, label, required },
  options,
  value,
  handleChange
}) => {
  return (
    <StyledFormControl key={field}>
      <InputLabel required={required}>{label}</InputLabel>
      <Select
        id={id}
        value={value === -1 ? "" : value}
        label={label}
        onChange={e => handleChange(e, field)}
        MenuProps={MenuProps}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={index}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};
