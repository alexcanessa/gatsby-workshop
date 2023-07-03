import Spring from "../../Spring";
import * as styles from "./Hero.module.scss";

export type HeroProps = {
  title: React.ReactNode;
  children?: React.ReactNode;
  imageUrl?: string;
};

const Hero = ({ title, children, imageUrl }: HeroProps) => {
  return (
    <div className={styles.hero}>
      <Spring>
        <div
          className={styles.content}
          style={{
            background: `url(${imageUrl}) right no-repeat`,
            backgroundSize: "50%",
          }}
        >
          <h1 className={styles.title}>{title}</h1>
          {children && <div className={styles.subtitle}>{children}</div>}
        </div>
      </Spring>
    </div>
  );
};

export default Hero;
