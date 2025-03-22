'use client'
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchData } from "../../../utils/functions";
import styles from '../../../components/components.module.css';

const ProductDetails = (props) => {
    const router = useRouter();
    const productId = router.query.productid;
    const [loading, setloading] = useState(false);
    const [productData, setProductData] = useState({
        name: '',
        category: '',
        options: []
    });
    const [optionsAvailable, setOptionsAvailable] = useState({ colour: [], size: [] });
    const getOptions = (data) => {
        const optionsMap = {
            colour: [],
            size: [],
        };
        data.options && data.options.forEach(option => {
            if (!optionsMap['colour'].includes(option['colour'])) {
                optionsMap['colour'].push(option['colour'])
            }
            if (!optionsMap['size'].includes(option['size'])) {
                optionsMap['size'].push(option['size'])
            }
        });
        setOptionsAvailable(optionsMap);
    }
    const fetchProductDetails = async () => {
        setloading(true);
        const data = await fetchData('/api/products/' + productId);
        if (data.length > 0) {
            setProductData(data[0]);
        }
        setloading(false);
    }
    useEffect(() => {
        if (productId) {
            fetchProductDetails();
        }
    }, []);
    useEffect(() => {
        getOptions(productData);
    }, [productData]);
    return (
        <div className={styles.productDetailsContainer}>
            <div>{loading ? <div>Loading</div> : ''}</div>
            <div className={styles.productTitle}><h4>{productData.name}</h4></div>
            <Image src={`https://picsum.photos/800/400?${productData._id}`} width={800} height={400} />
            <div>Rs.{productData.options && productData.options.length > 0 ? productData.options[0].sellingPrice : ''}</div>
            <div>Available options:
                <div className={styles.featureName}>Colours:
                    {optionsAvailable.colour.map(item => <span key={item} className={styles.featureValue}>{item}</span>)}
                </div>
                <div className={styles.featureName}>Size:
                    {optionsAvailable.size.map(item => <span key={item} className={styles.featureValue}>{item}</span>)}
                </div>
            </div>

        </div >
    )
}
export default ProductDetails;