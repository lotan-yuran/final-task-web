import { Grid, Typography, Divider, Box } from "@mui/material";
import { StyledCardMedia } from "./OrderItem.style";

export const OrderItem = ({
  orderItem: {
    product: { name, price, imageURL, _id },
    quantity
  }
}) => {
  return (
    <>
      <Divider />
      <Box sx={{ m: 1 }}>
        <Grid container spacing={3}>
          <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <StyledCardMedia component="img" image={imageURL} />
          </Grid>
          <Grid item xs={22} sm container spacing={2}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ID: {_id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {price}$
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity: {quantity}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="body2" component="div">
                  Total: {price * quantity}$
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
