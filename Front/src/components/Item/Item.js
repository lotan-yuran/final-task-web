import { StyledCard, StyledLink } from "./Item.style";
import { AddShoppingCart } from "@mui/icons-material";
import { CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";

export const Item = ({ item, addItemToCart }) => {
  const { name, price, imageURL, description, _id } = item;

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
        <IconButton onClick={() => addItemToCart(item._id)}>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </StyledCard>
  );
};
