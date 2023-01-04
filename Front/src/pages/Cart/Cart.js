import { useState } from "react";
import storeService from "../../services/storeService";
import { CartItem, UserDetailsPopup } from "../../components";
import { Typography, Grid, Button } from "@mui/material";
import { StyledPaper, StyledGridContainer } from "./Cart.style";
import { useRecoilState } from "recoil";
import { cartItemsState } from "../../Recoil";

export const Cart = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const [openPopup, setOpenPopup] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const totalPrice = cartItems
    .reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity * parseFloat(currentValue.price),
      0
    )
    .toFixed(3);

  const onClickBuyHandler = () => {
    // Order is an array of cart items id's
    const products = cartItems.map(cartItem => cartItem._id);

    storeService
      .addOrder({ products, ...userDetails })
      .then(() => {
        alert("The order has been successfully added to DB");
        setCartItems([]);
      })
      .catch(err => {
        console.error(err);
        alert("The order failed");
      })
      .finally(handleClosePopup);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setUserDetails({});
  };

  return (
    <>
      <StyledPaper>
        {cartItems.map((cartItem, index) => (
          <CartItem key={index} cartItem={cartItem} />
        ))}
        {totalPrice > 0 ? (
          <StyledGridContainer container spacing={2}>
            <Grid item xs={11}>
              <Typography variant="subtitle1" component="div">
                TotalAmount: {totalPrice}$
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Button variant="contained" size="medium" onClick={() => setOpenPopup(true)}>
                Buy
              </Button>
            </Grid>
          </StyledGridContainer>
        ) : (
          <Typography variant="subtitle1" component="div">
            Your cart is empty
          </Typography>
        )}
      </StyledPaper>
      {openPopup && (
        <UserDetailsPopup
          open={openPopup}
          handleClose={handleClosePopup}
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          onOrder={onClickBuyHandler}
        />
      )}
    </>
  );
};