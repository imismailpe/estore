import { useEffect, useRef, useState } from "react";
import { SpinnerDiamond } from 'spinners-react';
import { fetchData, submitCategory, submitCategoryDeletion } from "../../utils/functions";
import styles from './index.module.css';

const AddCategory = () => {
    const categoryNameRef = useRef(null);
    const [categorylist, setcategorylist] = useState([]);
    const [loading, setloading] = useState(false);
    const [result, setresult] = useState('');
    const fetchCategories = async () => {
        setloading(true);
        setcategorylist([]);
        const data = await fetchData('/api/categories');
        setcategorylist(data);
        setloading(false);
    }
    const deleteCategoryId = async (id) => {
        setloading(true);
        setresult('');
        const dataToDelete = {
            "_id": id
        }
        const result = await submitCategoryDeletion(dataToDelete);
        const resp = await result.json();
        setresult(resp.message);
        fetchCategories();
    }
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
            fetchCategories();
        }
    }
    useEffect(() => {
        fetchCategories();
    }, []);
    return (
        <div>
            <h4>Add a category</h4>
            <p>{result}</p>
            <form onSubmit={handleSubmission} className={styles.addCategoryForm}>
                <div>
                    <label htmlFor="categoryname">Name </label>
                    <input name="categoryname" type="text" ref={categoryNameRef} />
                </div>
                <div className={styles.centerAligned}><input type="submit" disabled={loading} /></div>
            </form>
            <hr />
            <div>Existing Categories</div>
            <div className={styles.categoryGrid}>
                {
                    loading ? <SpinnerDiamond size={50} thickness={180} speed={80} color="rgba(142, 172, 57, 1)" secondaryColor="rgba(0, 0, 0, 1)" />
                        : categorylist && categorylist.length === 0 ? <div>No Categories yet</div>
                            : categorylist && categorylist.map(category => {
                                return <div key={category._id} className={styles.deleteCategorySection}>
                                    <div>{category.name}</div>
                                    <div>
                                        <button onClick={(e) => deleteCategoryId(category._id)}>Delete</button>
                                    </div>
                                </div>
                            })
                }
            </div>
        </div>
    )
}
export default AddCategory;