import { useEffect, useState } from "react";
import { OrderItems } from "../../components";
import { ExpandMore } from "@mui/icons-material";
import orderService from "../../services/orderService";
import { Typography, Button, AccordionSummary, Accordion, Box, AccordionDetails } from "@mui/material";

export const Profile = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    orderService
      .getUserOrders("322592973")
      .then(data => {
        console.log(data);
        setOrders(data);
      })
      .catch(err => {
        console.error(err);
        alert("Failed to get you orders, try again later");
      });
  }, []);

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
                  {/* todo : add cancel */}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <OrderItems products={order.products} />
              </AccordionDetails>
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
