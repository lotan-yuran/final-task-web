import {
  Button,
  Accordion,
  Typography,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
  Grid
} from "@mui/material";
import { useState } from "react";
import { ExpandMore } from "@mui/icons-material";
import { OrderItem } from "./OrderItem/OrderItem";
import { CancelOrderPopup } from "../CancelOrderPopup";
import orderService from "../../services/orderService";

export const OrderItems = ({
  order: { _id: orderId, orderedAt, name, address, phone, products },
  setOrders
}) => {
  const [openCancelPopup, setCancelDeletePopup] = useState(false);

  const TWO_DAYS = 60 * 60 * 24 * 1000 * 2;

  const checkForTimeDifference = () => {
    const now = Date.now();
    const temp = new Date(orderedAt);
    const miliDate = temp.getTime();
    return now - miliDate < TWO_DAYS;
  };

  const cancelOrder = () => {
    orderService
      .cancelOrder(orderId)
      .then(() => {
        setOrders(prevItems => {
          return prevItems.filter(item => {
            return item._id !== orderId;
          });
        });
      })
      .catch(error => {
        console.error(error.message);
        alert("Failed to cancel order");
      })
      .finally(() => {
        setCancelDeletePopup(false);
      });
  };

  const totalPrice = products
    .reduce((prev, p) => prev + p.quantity * parseFloat(p.product.price), 0)
    .toFixed(3);

  return (
    <>
      <Accordion key={orderId}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>
            <b>Order Code:</b> {orderId} <br />
            <b>Ordered At:</b> {new Date(orderedAt).toLocaleString()} <br />
            <b>Ordered By:</b> {name} <br />
            <b>Ordered To:</b> {address} <br />
            <b>Contact Number:</b> {phone} <br />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {products.map((product, index) => (
            <OrderItem key={index} orderItem={product} />
          ))}
          <Grid item xs={11}>
            <Typography variant="subtitle1" component="div">
              TotalPrice: {totalPrice}$
            </Typography>
          </Grid>
        </AccordionDetails>
        {checkForTimeDifference() && (
          <AccordionActions>
            <Button variant="contained" size="medium" onClick={() => setCancelDeletePopup(true)}>
              Cancel Order
            </Button>
          </AccordionActions>
        )}
      </Accordion>
      <CancelOrderPopup
        open={openCancelPopup}
        handleCancel={() => setCancelDeletePopup(false)}
        handleConfirm={cancelOrder}
        orderId={orderId}
      />
    </>
  );
};
