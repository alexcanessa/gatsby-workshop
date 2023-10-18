import { useState } from "react";
import { Link } from "gatsby";
import logo from "../../../images/logo.svg";
import Spring from "../../Spring";
import Basket, { BasketTrigger } from "../../Basket";
import UserLogin from "../../UserLogin";
import * as styles from "./Header.module.scss";

const Header = () => {
  const [isBasketOpen, setIsBasketOpen] = useState<boolean>(false);

  return (
    <Spring className={styles.header}>
      <div className={styles.menu}>
        <Link to="/">
          <img src={logo} alt="PokeShop" className={styles.logo} />
        </Link>
        <ul>
          <li>
            <Link to="/" className={styles.link}>
              Home
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.actions}>
        <BasketTrigger
          onClick={() => {
            setIsBasketOpen(true);
          }}
        />
        <Basket
          isActive={isBasketOpen}
          onClick={() => {
            setIsBasketOpen(false);
          }}
        />
      </div>
    </Spring>
  );
};

export default Header;
