import { CartesianGrid, Legend, Line, Tooltip, LineChart, XAxis, YAxis } from "recharts";

export const OrdersLineChart = () => {
  const data = [
    {
      _id: "1",
      name: "DAY 1",
      totalSales: 4000,
      pv: 2400,
      amt: 2400
    },
    {
      _id: "2",
      name: "DAY 2",
      totalSales: 3000,
      pv: 1398,
      amt: 2210
    },
    {
      _id: "3",
      name: "DAY 3",
      totalSales: 2000,
      pv: 9800,
      amt: 2290
    },
    {
      _id: "4",
      name: "DAY 4",
      totalSales: 2780,
      pv: 3908,
      amt: 2000
    },
    {
      _id: "5",
      name: "DAY 5",
      totalSales: 1890,
      pv: 4800,
      amt: 2181
    },
    {
      _id: "6",
      name: "DAY 6",
      totalSales: 2390,
      pv: 3800,
      amt: 2500
    },
    {
      _id: "7",
      name: "DAY 7",
      totalSales: 3490,
      pv: 4300,
      amt: 2100
    }
  ];

  return (
    <LineChart width={730} height={250} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="totalSales" stroke="#82ca9d" />
    </LineChart>
  );
};
