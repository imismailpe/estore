import Image from 'next/image';
import Link from 'next/link';
import styles from './components.module.css';
const ProductView = ({ product = {} }) => {
    if (Object.keys(product).length === 0) {
        return null;
    }
    return (
        <Link href={{
            pathname: `/products/details/[productid]`,
            query: { productid: product._id }
        }}>
            <div className={styles.product}>
                <Image src={`https://picsum.photos/180/180?${product._id}`} width={180} height={180} />
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