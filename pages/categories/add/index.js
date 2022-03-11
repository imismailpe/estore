import { useRef, useState } from "react"
import { submitCategory } from "../../../utils/functions";
import styles from '../../products/index.module.css';

const AddCategory = () => {
    const categoryNameRef = useRef(null);
    const [loading, setloading] = useState(false);
    const [result, setresult] = useState('');

    const submitNewCategory = async (category) => {
        const result = await submitCategory(category);
        return result;
    }
    const handleSubmission = async (event) => {
        event.preventDefault();
        const name = categoryNameRef.current.value;
        if (name) {
            setloading(true);
            setresult('');
            const newCategory = {
                name,
            }
            const result = await submitNewCategory(newCategory);
            if (result.ok) {
                categoryNameRef.current.value = '';
            }
            const resp = await result.json();
            setresult(resp.message);
            setloading(false);
        }
    }
    return (
        <div>
            <h4>Add a category</h4>
            <p>{result}</p>
            <form onSubmit={handleSubmission} className={styles.addProductForm}>
                <div>
                    <label htmlFor="productname">Name</label>
                    <input name="productname" type="text" ref={categoryNameRef} />
                </div>
                <input type="submit" disabled={loading} />
            </form>
        </div>
    )
}
export default AddCategory;