import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { SpinnerDiamond } from 'spinners-react';
import ProductView from "../../../components/product";
import { fetchData, submitProductDeletion } from "../../../utils/functions";
import styles from '../../../components/components.module.css';

const UpdateProduct = () => {
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
            "_id": productId
        }
        const result = await submitProductDeletion(productToDelete);
        const resp = await result.json();
        setresult(resp.message);
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
                    loading ? <SpinnerDiamond size={50} thickness={180} speed={80} color="rgba(142, 172, 57, 1)" secondaryColor="rgba(0, 0, 0, 1)" />
                        : productlist && productlist.length === 0 ? <div>No Products yet</div>
                            : productlist && productlist.map(product => {
                                return <div key={product._id} className={styles.deleteSection}>
                                    <ProductView product={product} />
                                    <button className={styles.deleteButton} onClick={(e) => deleteProductId(product._id)}>Delete</button>
                                    <button className={styles.editButton}>
                                        <Link href={{
                                            pathname: `/products/update/[productid]`,
                                            query: { productid: product._id }
                                        }}
                                        >Edit</Link>
                                    </button>
                                </div>
                            })
                }
            </div>
        </Fragment>
    )
}
export default UpdateProduct;