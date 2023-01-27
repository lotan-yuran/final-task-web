import { Grid, Typography, Divider, IconButton } from "@mui/material";
import { StyledCardMedia } from "./Cartitem.style";
import { QuantityButton } from "../QuantityButton";
import DeleteIcon from "@mui/icons-material/Delete";

export const CartItem = ({
  cartItem: {
    product: { name, price, imageURL, description, _id },
    quantity
  },
  handleIncrement,
  handleDecrement,
  handleDelete
}) => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item>
          <StyledCardMedia component="img" image={imageURL} />
        </Grid>
        <Grid item xs={22} sm container spacing={2}>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {description}
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">
                ID: {_id}
              </Typography> */}
            </Grid>
            <Grid item xs>
              <Typography variant="body2" component="div">
                Price: {price}$
              </Typography>
              <QuantityButton
                size="small"
                quantity={quantity}
                handleIncrement={() => handleIncrement(_id)}
                handleDecrement={() => handleDecrement(_id)}
              ></QuantityButton>
              <Typography variant="body2" component="div">
                Total: {price * quantity}$
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <IconButton size="small" aria-label="delete" edge="end" onClick={() => handleDelete(_id)}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};
