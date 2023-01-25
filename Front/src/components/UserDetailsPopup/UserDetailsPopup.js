import { Button, Dialog, ListItem, TextField, DialogTitle } from "@mui/material";

import { StyledList } from "./UserDetailsPopup.style";

const textFields = [
  {
    field: "name"
  },
  {
    field: "phone",
    type: "number"
  },
  {
    field: "address"
  }
];

export const UserDetailsPopup = ({ open, onOrder, handleClose, setUserDetails, userDetails }) => {
  const handleChange = (e, field) => {
    const val = e.target.value;
    setUserDetails(prev => ({ ...prev, [field]: val }));
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>User Details</DialogTitle>
      <StyledList>
        {textFields.map(({ field, type }, index) => (
          <ListItem key={index}>
            <TextField
              type={type}
              value={userDetails?.[field]}
              label={field}
              variant="standard"
              onChange={e => handleChange(e, field)}
            />
          </ListItem>
        ))}
        <ListItem>
          <Button variant="contained" size="medium" onClick={onOrder}>
            Finish Order
          </Button>
        </ListItem>
      </StyledList>
    </Dialog>
  );
};
