import { Grid } from "@mui/material";
import { Item } from "../../components";

export const Store = ({ addItemToCart, items }) => {
  return (
    <Grid container spacing={4} justify="center">
      {items.map((item) => (
        <Grid key={item._id} item xs={12} sm={6} md={3}>
          <Item item={item} addItemToCart={addItemToCart} />
        </Grid>
      ))}
    </Grid>
  );
};
