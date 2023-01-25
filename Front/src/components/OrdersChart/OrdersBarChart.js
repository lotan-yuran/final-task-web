import { useEffect, useState } from "react";
import { CartesianGrid, Legend, Tooltip, XAxis, YAxis, BarChart, Bar } from "recharts";
import orderService from "../../services/orderService";

export const OrdersBarChart = () => {
  const [ordersCountByUser, setOrdersCountByUser] = useState([]);

  useEffect(() => {
    orderService.getOrdersCountByUser().then(data => {
      console.log("data");
      console.log(data);
      setOrdersCountByUser(data);
    });
  }, []);

  return (
    <BarChart
      width={730}
      height={400}
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
  );
};
