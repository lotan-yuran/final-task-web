import { useSetRecoilState } from "recoil";
import { cartItemsState } from "../../Recoil";
import { useLocation } from "react-router-dom";
import { Box, Button, CardMedia, Grid } from "@mui/material";

export const Product = () => {
  const location = useLocation();
  const { product } = location.state;

  const { name, price, imageURL, description, _id } = product;

  const setCartItems = useSetRecoilState(cartItemsState);

  const addItemToCart = () => {
    setCartItems(prevCartItem => {
      const existingItem = prevCartItem.find(item => {
        return product._id === item._id;
      });

      // If already exists increase quantity
      if (existingItem) {
        return prevCartItem.map(item => {
          if (product._id === item._id) {
            return {
              ...item,
              quantity: item.quantity + 1
            };
          }
          return item;
        });
      } else {
        // Add new item into the cart
        return prevCartItem.concat({ ...product, quantity: 1 });
      }
    });
  };

  return (
    <Box sx={{ m: 3 }}>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <CardMedia component="img" image={imageURL} />
        </Grid>
        <Grid item xs={6}>
          <h1>{name}</h1>#{_id} <br /> <br />
          {description}
          <h3>{price}$</h3>
          <Button onClick={addItemToCart} variant="contained">
            ADD TO CART
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
