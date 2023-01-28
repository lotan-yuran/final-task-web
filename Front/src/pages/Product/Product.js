import { useLocation } from "react-router-dom";
import cartService from "../../services/cartService";
import { useRecoilState, useRecoilValue } from "recoil";
import { Box, Button, CardMedia, Grid } from "@mui/material";
import { cartItemsState, userDetailsSelector } from "../../Recoil";

export const Product = () => {
  const location = useLocation();
  const { product } = location.state;
  const { name, price, imageURL, description, _id } = product;

  const user = useRecoilValue(userDetailsSelector);
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);

  const addItemToCart = () => {
    const updatedProducts = newItem => {
      const existingItem = cartItems.find(({ product }) => {
        return newItem._id === product._id;
      });

      // If already exists increase quantity
      if (existingItem) {
        return cartItems.map(item => {
          const { product, quantity } = item;
          if (newItem._id === product._id) {
            return {
              product: product._id,
              quantity: item.quantity + 1
            };
          }
          return {
            product: product._id,
            quantity: quantity
          };
        });
      } else {
        // Add new item into the cart
        return [...cartItems].concat({ product: newItem._id, quantity: 1 });
      }
    };

    cartService
      .updateCart(user?.email, updatedProducts(product))
      .then(data => {
        setCartItems(data);
        alert("The product has been successfully added to cart DB");
      })
      .catch(err => {
        console.error(err);
        alert("The order failed");
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
