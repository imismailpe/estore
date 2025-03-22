import Link from 'next/link';
import styles from './components.module.css';
const ProductView = ({ product = {} }) => {
    if (Object.keys(product).length === 0) {
        return null;
    }
    const detailUrl = `/products/details/${product._id}`
    return (
        <Link href={detailUrl}>
            <div className={styles.product}>
                <img src={`https://picsum.photos/180/180?${product._id}`} width={155} className={styles.prodSquare} />
                <div className={styles.productDetails}>
                    <h4 className={styles.productName}>{product.name}</h4>
                    <div className={styles.priceSection}>
                        <span className={styles.priceMRP}>Rs.{product.options[0].mrp}</span>
                        <span className={styles.priceSellingP}>Rs.{product.options[0].sellingPrice}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
export default ProductView;