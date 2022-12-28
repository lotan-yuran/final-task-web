import { Grid, Typography, CardMedia, Divider } from "@mui/material";

export const CartItem = ({
  cartItem: { name, price, imageURL, description, _id },
}) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <CardMedia component="img" sx={{ width: 151 }} image={imageURL} />
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
              {price}$
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};
