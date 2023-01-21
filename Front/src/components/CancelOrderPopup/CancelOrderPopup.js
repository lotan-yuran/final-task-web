import { Button, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from "@mui/material";

export const CancelOrderPopup = ({ open, handleCancel, handleConfirm, orderId }) => {
  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Cancel Order </DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to cancel order #{orderId}?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>No!</Button>
        <Button onClick={handleConfirm} color="error" autoFocus>
          Yes - Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
