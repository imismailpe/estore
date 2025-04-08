import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>E-Store</h4>
      <center>
        <div className={styles.grid}>
          <Link href="/products/add" className={styles.card}>
            <h2>Add Products &rarr;</h2>
            <p>Add products to store</p>
          </Link>
          <Link href="/categories" className={styles.card}>
            <h2>Manage Category &rarr;</h2>
            <p>Add/Delete categories of products</p>
          </Link>
          <Link href={"/products"} className={styles.card}>
            <h2>View Products &rarr;</h2>
            <p>View available products</p>
          </Link>
          <Link href={"/products/update"} className={styles.card}>
            <h2>Update Products &rarr;</h2>
            <p>Update/Delete products</p>
          </Link>
        </div>
      </center>
    </div>
  );
}

export const metadata = {
  title: "E-Store",
  description: "Sample E-Store app on Next.js",
};
