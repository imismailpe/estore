import { useEffect, useRef, useState } from "react";
import ProductOptions from "../../../components/productOptions";
import { fetchData, submitProduct } from "../../../utils/functions";
import styles from '../index.module.css';

const AddProduct = () => {
    const productNameRef = useRef(null);
    const productCategoryRef = useRef(null);
    const [loading, setloading] = useState(false);
    const [result, setresult] = useState('');
    const [categorylist, setcategorylist] = useState([]);
    const [productData, setProductData] = useState({
        name: '',
        category: '',
        options: []
    });
    const getProductOptionObject = () => {
        return {
            id: crypto.randomUUID(),
            sku: 'ABC',
            cost: 90,
            sellingPrice: 95,
            mrp: 100,
            quantity: 1
        }
    }
    const saveProductOptionValues = (values) => {
        let data = { ...productData };
        const optionExists = data.options.some(item => item.id === values.id);
        if (optionExists) {
            const existingOptionPosition = data.options.findIndex(item => item.id === values.id);
            data.options.splice(existingOptionPosition, 1, values);
        }
        else {
            data.options.push(values);
        }
        setProductData(data);
    }
    const removeProductOption = (id) => {
        let data = { ...productData };
        data.options = data.options.filter(item => item.id !== id);
        setProductData(data);
    }
    const addNewProductOption = () => {
        const newOption = getProductOptionObject();
        saveProductOptionValues(newOption);
    }
    const fetchCategories = async () => {
        setloading(true);
        const categories = await fetchData('/api/categories');
        setcategorylist(categories);
        setloading(false);
    }
    useEffect(() => {
        fetchCategories();
        return () => {
            productNameRef.current = null;
            productCategoryRef.current = null;
        }
    }, []);
    const submitNewProduct = async (product) => {
        const result = await submitProduct(product);
        return result;
    }
    const handleSubmission = async () => {
        console.log(" handleSubmission event ")
        const name = productNameRef.current.value;
        const category = productCategoryRef.current.value;
        if (name && category) {
            setloading(true);
            setresult('');
            const newProduct = {
                name,
                category,
                options: [...productData.options]
            }
            console.log("submitting", newProduct);
            const result = await submitNewProduct(newProduct);
            if (result.ok) {
                productNameRef.current.value = '';
            }
            const resp = await result.json();
            setresult(resp.message);
            setloading(false);
        }
    }
    return (
        <div>
            <h4>Add a product</h4>
            <p>{result}</p>
            <div className={styles.addProductForm}>
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
                <button className={styles.submitButton} disabled={loading} onClick={handleSubmission}>Submit</button>
                <div>Add product options <button onClick={addNewProductOption}> + </button></div>
                {
                    productData.options.map(item => <ProductOptions key={item.id} id={item.id} removeProductOption={removeProductOption} saveProductOptionValues={saveProductOptionValues} />)
                }
            </div>
        </div>
    )
}
export default AddProduct;