import { StyledCard } from "./Item.style";
import { AddShoppingCart } from "@mui/icons-material";
import { CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import { useRecoilState } from "recoil";
import { cartItemsState } from "../../Recoil";

export const Item = ({ item }) => {
  const { name, price, imageURL, description } = item;
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);

  const addItemToCart = newItem => {
    setCartItems(prevCartItem => {
      const existingItem = prevCartItem.find(item => {
        return newItem._id === item._id;
      });

      // If already exists increase quantity
      if (existingItem) {
        return prevCartItem.map(item => {
          if (newItem._id === item._id) {
            return {
              ...item,
              quantity: item.quantity + 1
            };
          }
          return item;
        });
      } else {
        // Add new item into the cart
        return prevCartItem.concat({ ...newItem, quantity: 1 });
      }
    });
  };

  return (
    <StyledCard>
      <CardHeader title={name} />
      <CardMedia component="img" height="150" image={imageURL} />
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          {price}$
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={() => addItemToCart(item)}>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </StyledCard>
  );
};
