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
import { StyledTextField } from "./EditItemPopup.style";
import { SelectField } from "../../components";

const textFields = [
  {
    field: "_id",
    label: "Item ID",
    disabled: true
  },
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
  label: "Category",
  required: true
};

export const EditItemPopup = ({
  open,
  handleCancel,
  handleConfirm,
  editedItem,
  setEditedItem,
  categories
}) => {
  const [isformValid, setIsFormValid] = useState(true);

  const handleChange = (e, field) => {
    const val = e.target.value;
    setEditedItem(prevEditedItem => ({ ...prevEditedItem, [field]: val }));
  };

  const handleSelectChange = (e, field) => {
    setEditedItem(prevEditedItem => ({ ...prevEditedItem, [field]: categories[e.target.value] }));
  };

  const handleSubmit = () => {
    let isValid = true;

    // validate that all form fields are not empty
    textFields.forEach(({ field }) => {
      const value = editedItem?.[field];
      if (!value?.toString().trim().length) {
        isValid = false;
        return;
      }
    });

    if (!isValid) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
      handleConfirm();
    }
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Edit Store Item</DialogTitle>
      {!isformValid && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          All the fields are required — <strong>check it out!</strong>
        </Alert>
      )}
      <DialogContent>
        {textFields.map(({ field, label, type, InputProps, autoFocus, required, disabled }) => {
          const value = editedItem?.[field];
          const valueTrimLength = value?.toString().trim().length;

          return (
            <StyledTextField
              key={field}
              label={label}
              disabled={disabled}
              type={type}
              defaultValue={value}
              required={required}
              autoFocus={autoFocus}
              fullWidth
              InputProps={InputProps}
              error={valueTrimLength === 0}
              helperText={!valueTrimLength ? `${label} is required` : " "}
              onChange={e => handleChange(e, field)}
            />
          );
        })}
        <SelectField
          fieldProperties={categoryField}
          value={categories.findIndex(x => x._id === editedItem?.category?._id)}
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
