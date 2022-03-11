import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react"
import { fetchData, submitProduct, submitProductUpdate } from "../../../utils/functions";
import styles from '../index.module.css';

const EditProduct = () => {
    const router = useRouter();
    const productId = router.query.productid;
    const productNameRef = useRef(null);
    const productMrpRef = useRef(null);
    const productCostRef = useRef(null);
    const productSellingpriceRef = useRef(null);
    const productCategoryRef = useRef(null);
    const productQuantiryRef = useRef(null);
    const [loading, setloading] = useState(false);
    const [result, setresult] = useState('');
    const [categorylist, setcategorylist] = useState([]);
    const fetchProductToUpdate = async () => {
        setloading(true);
        const data = await fetchData('/api/products/' + productId);
        if (data.length > 0) {
            productNameRef.current.value = data[0].name;
            productMrpRef.current.value = data[0].mrp;
            productQuantiryRef.current.value = data[0].quantity;
            productCostRef.current.value = data[0].cost;
            productSellingpriceRef.current.value = data[0].sellingPrice;
            productCategoryRef.current.value = data[0].category;
        }
        setloading(false);
    }

    const fetchCategories = async () => {
        setloading(true);
        const categories = await fetchData('/api/categories');
        setcategorylist(categories);
        setloading(false);
    }
    useEffect(() => {
        if(productId){
            fetchProductToUpdate();
            fetchCategories();    
        }
    }, []);
    const handleProductUpdate = async (product) => {
        const result = await submitProductUpdate(product);
        return result;
    }
    const handleSubmission = async (event) => {
        event.preventDefault();
        const name = productNameRef.current.value;
        const mrp = productMrpRef.current.value;
        const category = productCategoryRef.current.value;
        const quantity = productQuantiryRef.current.value;
        const cost = productCostRef.current.value;
        const sellingPrice = productSellingpriceRef.current.value;
        if (name && mrp && category && quantity && sellingPrice && cost) {
            setloading(true);
            setresult('');
            const updatedProduct = {
                _id: productId,
                name,
                mrp,
                category,
                quantity,
                cost,
                sellingPrice
            }
            const result = await handleProductUpdate(updatedProduct);
            const resp = await result.json();
            setresult(resp.message);
            setloading(false);
        }
    }
    return (
        <div>
            <h4>Update a product</h4>
            <p>{result}</p>
            <form onSubmit={handleSubmission} className={styles.addProductForm}>
                <div className={styles.inputSection}>
                    <label htmlFor="productname">Name</label>
                    <input name="productname" type="text" ref={productNameRef} />
                </div>
                <div className={styles.inputSection}>
                    <label htmlFor="productcategory">Category</label>
                    <select name="productcategory" ref={productCategoryRef} className={styles.productCategorySelect}>
                        {
                            categorylist.map(item => <option key={item._id} value={item.name}>{item.name}</option>)
                        }
                    </select>
                </div>
                <div className={styles.inputSection}>
                    <label htmlFor="productcost">Cost</label>
                    <input name="productcost" type="number" ref={productCostRef} />
                </div>
                <div className={styles.inputSection}>
                    <label htmlFor="productsellingprice">Selling price</label>
                    <input name="productsellingprice" type="number" ref={productSellingpriceRef} />
                </div>
                <div className={styles.inputSection}>
                    <label htmlFor="productmrp">MRP</label>
                    <input name="productmrp" type="number" ref={productMrpRef} />
                </div>
                <div className={styles.inputSection}>
                    <label htmlFor="productqty">Quantity</label>
                    <input name="productqty" type="number" ref={productQuantiryRef} />
                </div>
                <input type="submit" disabled={loading} />
            </form>
        </div>
    )
}
export default EditProduct;