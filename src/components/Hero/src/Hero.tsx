import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import Spring from "../../Spring";
import * as styles from "./Hero.module.scss";

export type HeroProps = {
  title: React.ReactNode;
  children?: React.ReactNode;
  imageData?: IGatsbyImageData;
};

const Hero = ({ title, children, imageData }: HeroProps) => {
  return (
    <div className={styles.hero}>
      <Spring>
        <div className={styles.content}>
          {imageData && (
            <GatsbyImage
              alt={String(title)}
              image={imageData}
              className={styles.image}
              objectFit="contain"
            />
          )}
          <h1 className={styles.title}>{title}</h1>
          {children && <div className={styles.subtitle}>{children}</div>}
        </div>
      </Spring>
    </div>
  );
};

export default Hero;
