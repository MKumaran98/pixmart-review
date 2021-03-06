import classes from "./OrderSummaryCard.module.css";

export const OrderSummaryCard = ({ name, quantity, image }) => {
  return (
    <div className={classes["order-summary-card"]}>
      <img src={image} alt={name} className={classes["order-summary-image"]} />
      <p>{name}</p>
      <p>{quantity}</p>
    </div>
  );
};