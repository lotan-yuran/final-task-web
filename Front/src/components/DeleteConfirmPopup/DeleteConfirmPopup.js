import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText
} from "@mui/material";

export const DeleteConfirmPopup = ({ open, handleCancel, handleConfirm, checked }) => {
  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete items"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete the following items from the store?
        </DialogContentText>
        <List dense={true}>
          {checked.map((checkedId, index) => (
            <ListItem key={index}>
              <ListItemText primary={`id: ${checkedId}`} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleConfirm} color="error" autoFocus>
          Yes - Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
