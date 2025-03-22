'use client'
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"
import ProductForm from "../../../../components/productForm";
import { fetchData, getProductOptionObject, submitProductUpdate } from "../../../../utils/functions";
// import styles from '../../../../components/components.module.css';

const EditProduct = () => {
    const params = useSearchParams();
    const productId = params.get("productid");
    const [loading, setloading] = useState(false);
    const [result, setresult] = useState('');
    const [categorylist, setcategorylist] = useState([]);    
    const [productData, setProductData] = useState({
        name: '',
        category: '',
        options: []
    });
    const saveProductName = (value) => {
        let data = {...productData};
        data.name = value;
        setProductData(data);
    }
    const saveProductCategory = (value) => {
        let data = {...productData};
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
    const fetchProductToUpdate = async () => {
        setloading(true);
        const data = await fetchData('/api/products/' + productId);
        if (data.length > 0) {
            setProductData(data[0]);
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
        if (productId) {
            fetchProductToUpdate();
            fetchCategories();
        }
    }, []);
    const handleProductUpdate = async (product) => {
        const result = await submitProductUpdate(product);
        return result;
    }
    const handleSubmission = async () => {
        if (productData.name && productData.category) {
            setloading(true);
            setresult('');
            const result = await handleProductUpdate(productData);
            const resp = await result.json();
            setresult(resp.message);
            setloading(false);
        }
    }
    return (
        <div>
            <h4>Update a product</h4>
            <p>{result}<span>{loading ? 'Loading..' : ''}</span></p>
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
    )
}
export default EditProduct;