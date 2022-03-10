import { useEffect, useRef, useState } from "react"
import { fetchData, submitProduct } from "../../../utils/functions";
import styles from '../index.module.css';

const AddProduct = () => {
    const productNameRef = useRef(null);
    const productMrpRef = useRef(null);
    const productCategoryRef = useRef(null);
    const [loading, setloading] = useState(false);
    const [result, setresult] = useState('');
    const [categorylist, setcategorylist] = useState([]);
    const fetchCategories = async () => {
        setloading(true);
        const categories = await fetchData('/api/categories');
        setcategorylist(categories);
        setloading(false);
    }
    useEffect(() => {
        fetchCategories();
    }, []);
    const submitNewProduct = async (product) => {
        const result = await submitProduct(product);
        return result;
    }
    const handleSubmission = async (event) => {
        event.preventDefault();
        const name = productNameRef.current.value;
        const mrp = productMrpRef.current.value;
        const category = productCategoryRef.current.value;
        if (name && mrp && category) {
            setloading(true);
            setresult('');
            const newProduct = {
                name,
                mrp,
                category,
            }
            const result = await submitNewProduct(newProduct);
            if (result.ok) {
                productNameRef.current.value = '';
                productMrpRef.current.value = 0;
            }
            setloading(false);
            setresult('Added product successfully.');
        }
    }
    return (
        <div>
            <h4>Add a product</h4>
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
                    <label htmlFor="productmrp">MRP</label>
                    <input name="productmrp" type="number" ref={productMrpRef} />
                </div>
                <input type="submit" disabled={loading} />
            </form>
        </div>
    )
}
export default AddProduct;