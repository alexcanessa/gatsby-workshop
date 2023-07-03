import Spring from "../../Spring";
import * as styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <Spring>
      <div className={styles.footer}>
        <p>
          Every workshop this website grows and we add a new feature. Please
          join our workshops to keep iterating on top of it.
        </p>
      </div>
    </Spring>
  );
};

export default Footer;
