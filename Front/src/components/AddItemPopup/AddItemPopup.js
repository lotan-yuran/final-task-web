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
    inputProps: {
      min: 0
      //   inputMode: "numeric",
      //   pattern: "[0-9]*",
    },
    extraProps: {
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

export const AddItemPopup = ({ open, item, setItem, handleCancel, handleConfirm }) => {
  const [isformValid, setIsFormValid] = useState(true);
  // const [item, setItem] = useState({});

  const handleChange = (e, field) => {
    const val = e.target.value;
    setItem(prevItem => ({ ...prevItem, [field]: val }));
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

    if (!isValid) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
      handleConfirm(item);
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
        {textFields.map(({ field, label, type, autoFocus, required, inputProps, extraProps }) => {
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
              inputProps={inputProps}
              InputProps={extraProps}
              error={valueTrimLength === 0}
              onChange={e => handleChange(e, field)}
            />
          );
        })}
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
