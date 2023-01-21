import { useSetRecoilState } from "recoil";
import { cartItemsState } from "../../Recoil";
import { StyledCard, StyledLink } from "./Item.style";
import { AddShoppingCart } from "@mui/icons-material";
import { CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";

export const Item = ({ item }) => {
  const { name, price, imageURL, description, _id } = item;
  const setCartItems = useSetRecoilState(cartItemsState);

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
      <StyledLink to={`/product/${_id}`} state={{ product: item }}>
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
      </StyledLink>
      <CardActions disableSpacing>
        <IconButton onClick={() => addItemToCart(item)}>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </StyledCard>
  );
};
