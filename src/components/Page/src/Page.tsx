import * as styles from "./Page.module.scss";

export type PageProps = {
  children: React.ReactNode;
  title: React.ReactNode;
};

const Page = ({ children, title }: PageProps) => {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>{title}</h1>
      <div>{children}</div>
    </main>
  );
};

export default Page;
