import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment
} from "@mui/material";
import { useState } from "react";
import { StyledTextField } from "./AddItemPopup.style";
import { SelectField } from "../../components";

const textFields = [
  {
    field: "name",
    label: "Item Name",
    required: true,
    autoFocus: true
  },
  {
    field: "description",
    label: "Description",
    required: true
  },
  {
    field: "price",
    label: "Price",
    required: true,
    type: "number",
    InputProps: {
      inputProps: { min: 0 },
      type: "number",
      onKeyPress: event => {
        if (event.key === "-") {
          event.preventDefault();
        }
      },
      startAdornment: <InputAdornment position="start">$</InputAdornment>
    }
  },
  {
    field: "imageURL",
    label: "Image Url",
    required: true,
    type: "url"
  }
];

const categoryField = {
  field: "category",
  id: "demo-simple-select-required",
  label: "Category",
  required: true
};

export const AddItemPopup = ({ open, item, setItem, handleCancel, handleConfirm, categories }) => {
  const [isformValid, setIsFormValid] = useState(true);

  const handleChange = (e, field) => {
    const val = e.target.value;
    setItem(prevItem => ({ ...prevItem, [field]: val }));
  };

  const handleSelectChange = (e, field) => {
    setItem(prevItem => ({ ...prevItem, [field]: categories[e.target.value] }));
  };

  const handleSubmit = () => {
    let isValid = true;

    // validate that all form fields are not empty
    textFields.forEach(({ field }) => {
      const value = item?.[field];
      if (!value?.toString().trim().length) {
        isValid = false;
        return;
      }
    });

    // No category has been selected yet
    const selectValue = item?.[categoryField.field];
    if (!selectValue) {
      isValid = false;
    }

    if (!isValid) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
      handleConfirm();
    }
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Add Item to Store</DialogTitle>
      {!isformValid && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          All the fields are required — <strong>check it out!</strong>
        </Alert>
      )}
      <DialogContent>
        {textFields.map(({ field, label, type, autoFocus, required, InputProps }) => {
          const value = item?.[field];
          const valueTrimLength = value?.toString().trim().length;
          return (
            <StyledTextField
              key={field}
              label={label}
              type={type}
              defaultValue={value}
              required={required}
              autoFocus={autoFocus}
              fullWidth
              InputProps={InputProps}
              error={valueTrimLength === 0}
              onChange={e => handleChange(e, field)}
            />
          );
        })}
        <SelectField
          fieldProperties={categoryField}
          value={categories.findIndex(x => x._id === item?.category?._id)}
          options={categories}
          handleChange={handleSelectChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button type="submit" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
