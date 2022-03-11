import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react"
import { fetchData, submitProduct } from "../../../utils/functions";
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
    const [productlist, setproductlist] = useState([]);
    const fetchProducts = async () => {
        setloading(true);
        setproductlist([]);
        const data = await fetchData('/api/products' + productId);
        setproductlist(data);
        productNameRef.current.value = '';
        productMrpRef.current.value = 1;
        productQuantiryRef.current.value = 1;
        productCostRef.current.value = 1;
        productSellingpriceRef.current.value = 1;
        setloading(false);
    }

    const fetchCategories = async () => {
        setloading(true);
        const categories = await fetchData('/api/categories');
        setcategorylist(categories);
        setloading(false);
    }
    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);
    const submitProductUpdate = async (product) => {
        const result = await submitProduct(product);
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
                name,
                mrp,
                category,
                quantity,
                cost,
                sellingPrice
            }
            const result = await submitProductUpdate(updatedProduct);
            if (result.ok) {
                productNameRef.current.value = '';
                productMrpRef.current.value = 1;
                productQuantiryRef.current.value = 1;
                productCostRef.current.value = 1;
                productSellingpriceRef.current.value = 1;
                setresult('Updated product successfully.');
            }
            else{
                setresult(result.error);
            }
            setloading(false);
        }
    }
    return (
        <div>
            <h4>Update a product</h4>
            <p>{result}</p>
            <form onSubmit={handleSubmission} className={styles.addProductForm}>
                <div>
                    <label htmlFor="productname">Name</label>
                    <input name="productname" type="text" ref={productNameRef} />
                </div>
                <div>
                    <label htmlFor="productcategory">Category</label>
                    <select name="productcategory" ref={productCategoryRef} className={styles.productCategorySelect}>
                        {
                            categorylist.map(item => <option key={item.id} value={item.id}>{item.name}</option>)
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor="productcost">Cost</label>
                    <input name="productcost" type="number" ref={productCostRef} />
                </div>
                <div>
                    <label htmlFor="productsellingprice">Selling price</label>
                    <input name="productsellingprice" type="number" ref={productSellingpriceRef} />
                </div>
                <div>
                    <label htmlFor="productmrp">MRP</label>
                    <input name="productmrp" type="number" ref={productMrpRef} />
                </div>
                <div>
                    <label htmlFor="productqty">Quantity</label>
                    <input name="productqty" type="number" ref={productQuantiryRef} />
                </div>
                <input type="submit" disabled={loading} />
            </form>
        </div>
    )
}
export default EditProduct;