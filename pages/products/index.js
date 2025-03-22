import { useEffect, useState } from "react";
import ProductList from "../../components/productsList";
import { fetchData } from "../../utils/functions";
import styles from '../../components/components.module.css';

const Products = () => {
    const [productlist, setproductlist] = useState([]);
    const [loading, setloading] = useState(false);
    const fetchProducts = async () => {
        setloading(true);
        const data = await fetchData('/api/products');
        setproductlist(data);
        setloading(false);
    }
    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <div className={styles.productGrid}>
            {
                loading ? <div>Loading</div>
                    : <ProductList list={productlist} />
            }
        </div>
    )
}
export default Products;