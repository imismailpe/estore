import { useEffect, useState } from "react";
import { Fragment } from "react";
import { fetchData, submitCategoryDeletion } from "../../../utils/functions";
import styles from '../index.module.css';

const UpdateCategory = () => {
    const [categorylist, setcategorylist] = useState([]);
    const [loading, setloading] = useState(false);
    const [result, setresult] = useState('');
    const fetchProducts = async () => {
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
        fetchProducts();
    }
    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <Fragment>
            <div>{result}</div>
            <div className={styles.categoryGrid}>
                {
                    loading ? 'Loading..'
                        : categorylist.length === 0 ? <div>No Categories yet</div>
                            : categorylist.map(category => {
                                return <div key={category._id} className={styles.deleteSection} style={{ position: 'relative' }}>
                                    <div className={styles.categoryName}>{category.name}</div>
                                    <div className={styles.deleteButton}>
                                        <button onClick={(e) => deleteCategoryId(category._id)}>Delete</button>
                                    </div>
                                </div>
                            })
                }
            </div>
        </Fragment>
    )
}
export default UpdateCategory;