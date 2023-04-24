import * as styles from "./Card.module.scss";

export type CardProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  image: React.ReactNode;
  footer: React.ReactNode;
};

const Card = ({ title, children, image, footer }: CardProps) => {
  return (
    <div className={styles.card}>
      <div>{image}</div>
      <div className={styles.content}>
        {/* @todo: headings should be a separate component to make sure h-level gets enforced. */}
        <h3>{title}</h3>
        {children}
      </div>
      <div className={styles.footer}>{footer}</div>
    </div>
  );
};

export default Card;
