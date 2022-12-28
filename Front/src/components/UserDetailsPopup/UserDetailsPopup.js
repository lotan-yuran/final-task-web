import { Button, Dialog, ListItem, TextField, DialogTitle } from "@mui/material";

import { StyledList } from "./UserDetailsPopup.style";

const textFields = [
  {
    field: "name"
  },
  {
    field: "phone",
    type: "number"
  }
];

export const UserDetailsPopup = ({ open, onOrder, handleClose, setUserDetails }) => {
  const handleChange = (e, field) => {
    const val = e.target.value;
    setUserDetails(prev => ({ ...prev, [field]: val }));
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>User Details</DialogTitle>
      <StyledList>
        {textFields.map(({ field, type }) => (
          <ListItem>
            <TextField type={type} label={field} variant="standard" onChange={e => handleChange(e, field)} />
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
