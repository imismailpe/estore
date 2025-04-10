'use client'
import { useEffect, useState } from "react";
import ProductForm from "../../../components/productForm";
import { fetchData, getProductOptionObject, submitProduct } from "../../../utils/functions";
import styles from '../../../components/components.module.css';
const AddProduct = () => {
    const [loading, setloading] = useState(false);
    const [result, setresult] = useState('');
    const [categorylist, setcategorylist] = useState([]);
    const [productData, setProductData] = useState({
        name: '',
        category: '',
        options: [getProductOptionObject()]
    });
    const saveProductName = (value) => {
        let data = { ...productData };
        data.name = value;
        setProductData(data);
    }
    const saveProductCategory = (value) => {
        let data = { ...productData };
        data.category = value;
        setProductData(data);
    }
    const saveProductOptionValues = (id, field, value) => {
        let data = { ...productData };
        const editedOptionPosition = data.options.findIndex(item => item.id === id);
        let editedOption = data.options[editedOptionPosition];
        editedOption[field] = value;
        data.options.splice(editedOptionPosition, 1, editedOption);
        setProductData(data);
    }
    const removeProductOption = (id) => {
        if (productData.options.length > 1) {
            let data = { ...productData };
            data.options = data.options.filter(item => item.id !== id);
            setProductData(data);
        }
    }
    const addNewProductOption = () => {
        const newOption = getProductOptionObject();
        let data = { ...productData };
        data.options.push(newOption);
        setProductData(data);
    }
    const fetchCategories = async () => {
        setloading(true);
        const categories = await fetchData('/api/categories');
        setcategorylist(categories);
        saveProductCategory(categories[0]);
        setloading(false);
    }
    useEffect(() => {
        fetchCategories();
    }, []);
    const submitNewProduct = async (product) => {
        const result = await submitProduct(product);
        return result;
    }
    const handleSubmission = async () => {
        if (productData.name && productData.category) {
            setloading(true);
            setresult('');
            const result = await submitNewProduct(productData);
            const resp = await result.json();
            setresult(resp.message);
            setloading(false);
        }
    }
    return (
        <div>
            <h4>Add a product</h4>
            <div>{result}</div>
            <div className={styles.centerAligned}>
            <ProductForm
                loading={loading}
                saveProductName={saveProductName}
                saveProductCategory={saveProductCategory}
                categorylist={categorylist}
                productData={productData}
                addNewProductOption={addNewProductOption}
                removeProductOption={removeProductOption}
                saveProductOptionValues={saveProductOptionValues}
                handleSubmission={handleSubmission}
            />
            </div>
        </div>
    )
}
export default AddProduct;