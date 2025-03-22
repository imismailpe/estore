import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h4 className={styles.title}>
          E-Stores
        </h4>
        <div className={styles.grid}>
          <Link href='/products/add' className={styles.card}>
            {/* <a className={styles.card}> */}
              <h2>Add Products &rarr;</h2>
              <p>Add products to store</p>
            {/* </a> */}
          </Link>
          <Link href='/categories' className={styles.card}>
            {/* <a className={styles.card}> */}
              <h2>Manage Category &rarr;</h2>
              <p>Add/Delete categories of products</p>
            {/* </a> */}
          </Link>
          <Link href={'/products'} className={styles.card}>
            {/* <a className={styles.card}> */}
              <h2>View Products &rarr;</h2>
              <p>View available products</p>
            {/* </a> */}
          </Link>
          <Link href={'/products/update'} className={styles.card}>
            {/* <a className={styles.card}> */}
              <h2>Update Products &rarr;</h2>
              <p>Update/Delete products</p>
            {/* </a> */}
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export const metadata = {
  title: "E-Store",
  description: 'Sample E-Store app on Next.js',
}
