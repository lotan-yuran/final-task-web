import { Button, ButtonGroup } from "@mui/material";
import { StyledQuantityButton } from "./QuantityButton.style";

export const QuantityButton = ({ quantity, handleIncrement, handleDecrement }) => {
  return (
    <ButtonGroup size="small" aria-label="small outlined button group">
      <Button variant="contained" color="primary" disabled={quantity === 1} onClick={handleDecrement}>
        -
      </Button>
      <StyledQuantityButton disabled>{quantity}</StyledQuantityButton>
      <Button variant="contained" color="primary" onClick={handleIncrement}>
        +
      </Button>
    </ButtonGroup>
  );
};
