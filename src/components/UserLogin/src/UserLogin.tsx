import userIcon from "../../../images/user.svg";
import * as styles from "./UserLogin.module.scss";

const UserLogin = () => {
  return (
    <a href="/" className={styles.userLogin}>
      <img className={styles.image} src={userIcon} alt="Login" />
    </a>
  );
};

export default UserLogin;
