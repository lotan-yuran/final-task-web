import { CartesianGrid, Legend, Tooltip, XAxis, YAxis, BarChart, Bar } from "recharts";

export const OrdersBarChart = () => {
  const data = [
    {
      _id: "1",
      name: "Product A",
      totalSales: 4000
    },
    {
      _id: "2",
      name: "Product B",
      totalSales: 3000
    },
    {
      _id: "3",
      name: "Product C",
      totalSales: 2000
    },
    {
      _id: "4",
      name: "Product D",
      totalSales: 2780
    },
    {
      _id: "5",
      name: "Product E",
      totalSales: 1890
    },
    {
      _id: "6",
      name: "Product F",
      totalSales: 2390
    },
    {
      _id: "7",
      name: "Product G",
      totalSales: 3490
    }
  ];

  return (
    <BarChart
      width={730}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="totalSales" fill="#8884d8" barSize={20} />
    </BarChart>
  );
};
