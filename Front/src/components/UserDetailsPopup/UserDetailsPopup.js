import { Button, Dialog, TextField, DialogTitle, Box, DialogContent, Alert, AlertTitle } from "@mui/material";
import { useState } from "react";
import { mobilePhoneRegex } from "../../constants";

const textFields = [
  {
    field: "name",
    id: "name",
    name: "name",
    required: true
  },
  {
    field: "phone",
    name: "phone",
    id: "phone",
    type: "number",
    required: true
  },
  {
    field: "address",
    name: "address",
    id: "address",
    required: true
  }
];

export const UserDetailsPopup = ({ open, onOrder, handleClose, setUserDetails, userDetails }) => {
  const [error, setError] = useState(false);

  const handleChange = (e, field) => {
    const val = e.target.value;
    setUserDetails(prev => ({ ...prev, [field]: val }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get("name"),
      phone: form.get("phone"),
      address: form.get("address")
    };

    if (validateValues(data)) {
      onOrder();
    }
  };

  function checkNotEmpty(data) {
    return Object.values(textFields).some(({ field, required }) => required && data?.[field] === "");
  }

  const validateValues = data => {
    if (!data["phone"].match(mobilePhoneRegex)) {
      setError("Invalid phone number!");
      return false;
    }

    if (checkNotEmpty(data)) {
      setError("All the fields are required!");
      return false;
    }

    setError(false);
    return true;
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>User Details</DialogTitle>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          <strong>{error}</strong>
        </Alert>
      )}
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          {textFields.map(({ field, type, id, name, required }, index) => (
            <TextField
              id={id}
              key={index}
              type={type}
              name={name}
              value={userDetails?.[field]}
              label={field}
              required={required}
              variant="standard"
              margin="normal"
              onChange={e => handleChange(e, field)}
            />
          ))}
          <Button type="submit" variant="contained" size="medium">
            Finish Order
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
