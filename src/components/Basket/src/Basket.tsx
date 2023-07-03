import {
  CartLink,
  LineItem,
  LineItemAmount,
  LineItemName,
  LineItemQuantity,
  LineItemRemoveLink,
  LineItemsContainer,
  LineItemsCount,
} from "@commercelayer/react-components";
import classnames from "classnames";
import * as styles from "./Basket.module.scss";
import basketIcon from "../../../images/bag.svg";

export type BasketProps = {
  isActive?: boolean;
  onClick?: () => void;
};

const Basket = ({ isActive, onClick }: BasketProps) => {
  return (
    <div
      className={classnames(styles.basket, {
        [styles.active]: isActive,
      })}
    >
      <button className={styles.close} type="button" onClick={onClick}>
        Close
      </button>
      <h2>Basket</h2>
      <LineItemsContainer>
        <p className="your-custom-class">
          Your shopping cart contains <LineItemsCount /> items
        </p>
        <LineItem>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <LineItemName />
            <LineItemQuantity max={10} />
            <LineItemAmount />
            <LineItemRemoveLink style={{ color: "#fff" }} />
          </div>
        </LineItem>
        <br />
        <CartLink label="Go to checkout" className={styles.cartLink} />
      </LineItemsContainer>
    </div>
  );
};

export const BasketTrigger = ({ onClick }: { onClick?: () => void }) => {
  return (
    <LineItemsContainer>
      <button onClick={onClick} type="button" className={styles.basketTrigger}>
        <LineItemsCount className={styles.count} />
        <img
          className={styles.basketImage}
          src={basketIcon}
          alt="Open basket"
        />
      </button>
    </LineItemsContainer>
  );
};

export default Basket;
