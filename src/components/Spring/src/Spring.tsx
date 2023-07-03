import * as styles from "./Spring.module.scss";
import classnames from "classnames";

export type SpringProps = {
  children: React.ReactNode;
  className?: string;
};

const Spring = ({ children, className }: SpringProps) => {
  return <div className={classnames(className, styles.spring)}>{children}</div>;
};

export default Spring;
