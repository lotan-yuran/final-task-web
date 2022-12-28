import { Grid, Typography, Divider, ButtonGroup, Button } from "@mui/material";
import { StyledCardMedia } from "./Cartitem.style";

export const CartItem = ({ cartItem: { name, price, imageURL, description, _id, quantity } }) => {
  const handleIncrement = () => {
    console.log("+1");
  };

  const handleDecrement = () => {
    console.log("-1");
  };

  return (
    <>
      <Grid container spacing={4}>
        <Grid item>
          <StyledCardMedia component="img" image={imageURL} />
        </Grid>
        <Grid item xs={22} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: {_id}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              Item Price: {price}$
            </Typography>
            <ButtonGroup size="small" aria-label="small outlined button group">
              <Button onClick={handleIncrement}>+</Button>
              <Button disabled>{quantity}</Button>
              <Button onClick={handleDecrement}>-</Button>
            </ButtonGroup>
            <Typography variant="subtitle1" component="div">
              Total: {price * quantity}$
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};
