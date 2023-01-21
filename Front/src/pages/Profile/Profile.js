import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { OrderItems } from "../../components";
import orderService from "../../services/orderService";

export const Profile = () => {
  const [orders, setOrders] = useState([]);

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

  return (
    <>
      <h1>My Orders</h1>
      {orders.length > 0 && <h4>Please notice you may cancel an order within 48 hours </h4>}
      <Box sx={{ m: 3 }}>
        {orders.length > 0 ? (
          orders.map(order => <OrderItems key={order._id} order={order} setOrders={setOrders} />)
        ) : (
          <Typography variant="subtitle1" component="div">
            No orders yet
          </Typography>
        )}
      </Box>
    </>
  );
};
