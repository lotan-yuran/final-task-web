import { OrderItem } from "./OrderItem/OrderItem";

export const OrderItems = ({ products }) => {
  return (
    <>
      {products.map((product, index) => (
        <OrderItem key={index} orderItem={product} />
      ))}
    </>
  );
};
