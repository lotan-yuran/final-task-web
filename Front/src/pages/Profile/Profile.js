import { useRecoilValue } from "recoil";
import { userState } from "../../Recoil";
import { useEffect, useState } from "react";
import { OrderItems } from "../../components";
import orderService from "../../services/orderService";
import { Box, CircularProgress, Typography } from "@mui/material";

export const Profile = () => {
  const user = useRecoilValue(userState);
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    orderService
      .getUserOrders(user.email)
      .then(data => {
        setOrders(data); 
      })
      .catch(err => {
        console.error(err);
        alert("Failed to get you orders, try again later");
      })
      .finally(() => setLoader(false));
  }, [user]);

  return (
    <>
      <h1>My Orders</h1>
      {orders.length > 0 && <h4>Please notice you may cancel an order within 48 hours </h4>}
      <Box sx={{ m: 3 }}>
        {loader ? (
          <CircularProgress />
        ) : orders.length > 0 ? (
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
