import { StyledCard } from "./Item.style";
import { AddShoppingCart } from "@mui/icons-material";
import { CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";

export const Item = ({ item, addItemToCart }) => {
  const { name, price, imageURL, description } = item;

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
