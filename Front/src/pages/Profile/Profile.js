import {
  Box,
  Button,
  Accordion,
  Typography,
  AccordionDetails,
  AccordionSummary,
  AccordionActions
} from "@mui/material";
import { useEffect, useState } from "react";
import { OrderItems } from "../../components";
import { ExpandMore } from "@mui/icons-material";
import orderService from "../../services/orderService";

export const Profile = () => {
  const [orders, setOrders] = useState([]);

  const TWO_DAYS = 60 * 60 * 24 * 1000 * 2;

  useEffect(() => {
    orderService
      .getUserOrders("322592973")
      .then(data => {
        setOrders(data);
      })
      .catch(err => {
        console.error(err);
        alert("Failed to get you orders, try again later");
      });
  }, []);

  const checkForTimeDifference = (date, timeDifference) => {
    const now = Date.now();
    const temp = new Date(date);
    const miliDate = temp.getTime();
    return now - miliDate < timeDifference;
  };

  return (
    <>
      <h1>My Orders</h1>
      {orders.length > 0 && <h4>Please notice you may cancel an order within 48 hours </h4>}
      <Box sx={{ m: 3 }}>
        {orders.length > 0 ? (
          orders.map(order => (
            <Accordion key={order._id}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>
                  <b>Order Code:</b> {order._id} <br />
                  <b>Ordered At:</b> {new Date(order.orderedAt).toLocaleString()} <br />
                  <b>Ordered By:</b> {order.name} <br />
                  <b>Ordered To:</b> {order.address} <br />
                  <b>Contact Number:</b> {order.phone} <br />
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <OrderItems products={order.products} />
              </AccordionDetails>
              {checkForTimeDifference(order.orderedAt, TWO_DAYS) && (
                <AccordionActions>
                  <Button variant="contained" size="medium" onClick={() => console.log("first")}>
                    Cancel Order
                  </Button>
                </AccordionActions>
              )}
            </Accordion>
          ))
        ) : (
          <Typography variant="subtitle1" component="div">
            No orders yet
          </Typography>
        )}
      </Box>
    </>
  );
};
