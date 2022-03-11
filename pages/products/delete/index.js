import { useEffect, useState } from "react";
import { Fragment } from "react";
import { fetchData, submitProductDeletion } from "../../../utils/functions";
import styles from '../index.module.css';
import ProductView from "../product";

const DeleteProduct = () => {
    const [productlist, setproductlist] = useState([]);
    const [loading, setloading] = useState(false);
    const [result, setresult] = useState('');
    const fetchProducts = async () => {
        setloading(true);
        setproductlist([]);
        const data = await fetchData('/api/products');
        setproductlist(data);
        setloading(false);
    }
    const deleteProductId = async (productId) => {
        setloading(true);
        setresult('');
        const productToDelete = {
            id: productId
        }
        const result = await submitProductDeletion(productToDelete);
        if (result.ok) {
            setresult('Deleted successfully');
        }
        else{
            setresult(result.error);
        }
        fetchProducts();
    }
    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <Fragment>
            <div>{result}</div>
            <div className={styles.productGrid}>
                {
                    loading ? 'Loading..'
                        : productlist.map(product => {
                            return <div key={product._id} className={styles.deleteSection} style={{ position: 'relative' }}>
                                <ProductView product={product} />
                                <div className={styles.deleteButton}>
                                    <button onClick={(e) => deleteProductId(product._id)}>Delete</button>
                                </div>
                            </div>
                        })
                }
            </div>
        </Fragment>
    )
}
export default DeleteProduct;