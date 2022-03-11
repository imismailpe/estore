import Image from 'next/image';
import styles from './product.module.css';
const ProductView = ({ product = {} }) => {
    if (Object.keys(product).length === 0) {
        return null;
    }
    return (
        <div className={styles.product}>
            <div className={styles.productCover}><Image src={`https://picsum.photos/150/150?${product._id}`} width={150} height={150} /></div>
            <div className={styles.productDetails}>
                <h4 className={styles.productName}>{product.name}</h4>
                <div className={styles.priceSection}>
                    <span className={styles.priceMRP}>Rs.{product.mrp}</span>
                    <span className={styles.priceSellingP}>Rs.{product.sellingPrice}</span>
                </div>
            </div>
        </div>
    )
}
export default ProductView;