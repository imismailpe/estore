import { useEffect, useState } from "react";
import { fetchData } from "../../utils/functions";
import styles from './index.module.css';
import ProductList from "./productsList";

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
                loading ? <p>Loading..</p>
                    : <ProductList list={productlist} />
            }
        </div>
    )
}
export default Products;