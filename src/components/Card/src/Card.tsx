import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import { cloneElement, isValidElement, useMemo } from "react";
import * as styles from "./Card.module.scss";

export type CardProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  imageData?: IGatsbyImageData;
  footer?: React.ReactNode;
};

const Card = ({ title, children, imageData, footer }: CardProps) => {
  return (
    <div className={styles.card}>
      {imageData && (
        <div className={styles.imageWrapper}>
          <GatsbyImage
            alt={String(title)}
            image={imageData}
            className={styles.image}
          />
        </div>
      )}
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
