import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CartesianGrid, Legend, Tooltip, XAxis, YAxis, BarChart, Bar, ResponsiveContainer } from "recharts";
import orderService from "../../services/orderService";

export const OrdersBarChart = ({ title }) => {
  const [ordersCountByUser, setOrdersCountByUser] = useState([]);

  useEffect(() => {
    orderService.getOrdersCountByUser().then(data => setOrdersCountByUser(data));
  }, []);

  return (
    <>
      <Grid item container spacing={5} direction={"column"}>
        <Grid item xs={2}>
          <Typography component="span" variant="h4" color="text.primary" fontWeight="bold">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <ResponsiveContainer width="100%" height={600}>
            <BarChart
              data={ordersCountByUser}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="userId" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="numOfOrders" fill="#8884d8" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </>
  );
};
