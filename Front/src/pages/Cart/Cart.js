import { useState } from "react";
import storeService from "../../services/storeService";
import { CartItem, UserDetailsPopup } from "../../components";
import { Paper, Typography, Grid, Button } from "@mui/material";

export const Cart = ({ cartItems, setCartItems }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const totalPrice = cartItems
    .reduce(
      (accumulator, currentValue) =>
        accumulator + parseFloat(currentValue.price),
      0
    )
    .toFixed(3);

  const onClickBuyHandler = () => {
    // Order is an array of cart items id's
    const products = cartItems.map((cartItem) => cartItem._id);

    storeService
      .addOrder({ products, ...userDetails })
      .then(() => {
        alert("The order has been successfully added to DB");
        setCartItems([]);
      })
      .catch((err) => {
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
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: 1200,
          flexGrow: 1,
        }}
      >
        {cartItems.map((cartItem, index) => (
          <CartItem key={index} cartItem={cartItem} />
        ))}
        {totalPrice > 0 ? (
          <Grid container spacing={2} sx={{ my: 2 }}>
            <Grid item xs={11}>
              <Typography variant="subtitle1" component="div">
                TotalAmount: {totalPrice}$
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Button
                variant="contained"
                size="medium"
                onClick={() => setOpenPopup(true)}
              >
                Buy
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="subtitle1" component="div">
            Your cart is empty
          </Typography>
        )}
      </Paper>
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
