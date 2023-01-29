import { useEffect, useState } from "react";
import { cartItemsState } from "../../Recoil";
import { userDetailsSelector } from "../../Recoil";
import cartService from "../../services/cartService";
import orderService from "../../services/orderService";
import { useRecoilState, useRecoilValue } from "recoil";
import { Typography, Grid, Button } from "@mui/material";
import { CartItem, UserDetailsPopup } from "../../components";
import { StyledPaper, StyledGridContainer } from "./Cart.style";

export const Cart = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const [openPopup, setOpenPopup] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const user = useRecoilValue(userDetailsSelector);

  useEffect(() => {
    setUserDetails(user);
  }, [user]);

  const totalPrice = cartItems
    .reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue?.quantity * parseFloat(currentValue?.product.price),
      0
    )
    .toFixed(3);

  const handleIncrement = itemId => {
    addQuantityToItem(itemId, 1);
  };

  const handleDecrement = itemId => {
    addQuantityToItem(itemId, -1);
  };

  const handleDelete = itemId => {
    const updatedProducts = cartItems
      .filter(({ product }) => product._id !== itemId)
      .map(cartItem => ({ product: cartItem.product._id, quantity: cartItem.quantity }));

    cartService
      .updateCart(user?.email, updatedProducts)
      .then(data => {
        setCartItems(data);
        alert("The product has been successfully added to cart DB");
      })
      .catch(err => {
        console.error(err);
        alert("The order failed");
      });
  };

  const addQuantityToItem = (itemId, addedQuantity) => {
    const updatedProducts = cartItems.map(cartItem => {
      const { product, quantity } = cartItem;
      if (product._id === itemId) {
        return {
          product: product._id,
          quantity: quantity + addedQuantity
        };
      }
      return {
        product: product._id,
        quantity: quantity
      };
    });

    cartService
      .updateCart(user?.email, updatedProducts)
      .then(data => {
        setCartItems(data);
        alert("The product has been successfully added to cart DB");
      })
      .catch(err => {
        console.error(err);
        alert("The order failed");
      });
  };

  const onClickBuyHandler = () => {
    // Order product is an array of cart item's id and quantity
    const products = cartItems.map(cartItem => ({
      product: cartItem.product._id,
      quantity: cartItem.quantity
    }));

    orderService
      .addOrder({ products, ...userDetails })
      .then(() => {
        alert("The order has been successfully added to DB");
        cartService
          .updateCart(user?.email, [])
          .then(data => {
            console.log(data);
            setCartItems(data);
            alert("The cart has successfully got cleaned");
          })
          .catch(err => {
            console.error(err);
            alert("Clean cart failed");
          });
        // setCartItems([]);
      })
      .catch(err => {
        console.error(err);
        alert("The order failed");
      })
      .finally(handleClosePopup);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setUserDetails(user);
  };

  return (
    <>
      <StyledPaper>
        {cartItems.map((cartItem, index) => (
          <CartItem
            key={index}
            cartItem={cartItem}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
            handleDelete={handleDelete}
          />
        ))}
        {totalPrice > 0 ? (
          <StyledGridContainer container spacing={2}>
            <Grid item xs={11}>
              <Typography variant="subtitle1" component="div">
                TotalPrice: {totalPrice}$
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
