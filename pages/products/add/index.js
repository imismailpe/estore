import { useEffect, useState } from "react";
import ProductForm from "../../../components/productForm";
import { fetchData, getProductOptionObject, submitProduct } from "../../../utils/functions";
const AddProduct = () => {
    const [productName, setproductName] = useState('');
    const [productCategory, setproductCategory] = useState('');
    const [loading, setloading] = useState(false);
    const [result, setresult] = useState('');
    const [categorylist, setcategorylist] = useState([]);
    const [productData, setProductData] = useState({
        name: '',
        category: '',
        options: [getProductOptionObject()]
    });
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
        setloading(false);
    }
    useEffect(() => {
        fetchCategories();
    }, []);
    const submitNewProduct = async (product) => {
        console.log("product", product)
        const result = await submitProduct(product);
        return result;
    }
    const handleSubmission = async () => {
        const name = productName;
        const category = productCategory;
        if (name && category) {
            setloading(true);
            setresult('');
            const newProduct = {
                name,
                category,
                options: [...productData.options]
            }
            const result = await submitNewProduct(newProduct);
            const resp = await result.json();
            setresult(resp.message);
            setloading(false);
        }
    }
    return (
        <div>
            <h4>Add a product</h4>
            <p>{result}</p>
            <ProductForm
                loading={loading}
                productName={productName}
                setproductName={setproductName}
                productCategory={productCategory}
                setproductCategory={setproductCategory}
                productCategory={productCategory}
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
export default AddProduct;