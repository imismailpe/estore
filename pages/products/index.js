import { useEffect, useState } from "react";
import { SpinnerDiamond } from 'spinners-react';
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
                loading ? <SpinnerDiamond size={50} thickness={180} speed={80} color="rgba(142, 172, 57, 1)" secondaryColor="rgba(0, 0, 0, 1)" />
                    : <ProductList list={productlist} />
            }
        </div>
    )
}
export default Products;