import classes from "./ProductPage.module.css";
import { useProducts } from "../../store";
import { ProductCard } from "./productCard/ProductCard";
import { Preferences } from "../preferences/Preferences";

export const ProductPage = () => {
  const { products } = useProducts();
  return (
    <div className={classes["main-section"]}>
      <div className={classes["side-bar"]}>
        <Preferences />
      </div>
      <div className={classes["product-section"]}>
        <ul>
          {products &&
            products.map(
              ({
                _id,
                name,
                image,
                price,
                rating,
                hasDiscount,
                discount,
                fastDelivery,
                inStock,
                pixmartChoice,
                inCart,
                inWishlist,
              }) => (
                <li key={_id}>
                  <ProductCard
                    id={_id}
                    name={name}
                    image={image}
                    price={price}
                    rating={rating}
                    hasDiscount={hasDiscount}
                    discount={discount}
                    fastDelivery={fastDelivery}
                    inStock={inStock}
                    pixmartChoice={pixmartChoice}
                    inCart={inCart}
                    inWishlist={inWishlist}
                  />
                </li>
              )
            )}
        </ul>
      </div>
    </div>
  );
};