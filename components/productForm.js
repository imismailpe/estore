import { SpinnerDiamond } from 'spinners-react';
import ProductOptions from "./productOptions";
import styles from './components.module.css';

const ProductForm = (props) => {
    return (
        props.loading ? <SpinnerDiamond size={50} thickness={180} speed={80} color="rgba(142, 172, 57, 1)" secondaryColor="rgba(0, 0, 0, 1)" />
            : <div className={styles.addProductForm}>
                <div className={styles.inputSection}>
                    <label htmlFor="productname">Name</label>
                    <input name="productname" type="text" value={props.productData.name} onChange={e => props.saveProductName(e.target.value)} />
                </div>
                <div className={styles.inputSection}>
                    <label htmlFor="productcategory">Category</label>
                    <select name="productcategory" value={props.productData.category} onChange={e => props.saveProductCategory(e.target.value)} className={styles.productCategorySelect}>
                        {
                            props.categorylist.map(item => <option key={item._id} value={item.name}>{item.name}</option>)
                        }
                    </select>
                </div>
                <div className={styles.inputSection}>Product options <button onClick={props.addNewProductOption}> Add </button></div>
                <div className={styles.productOptionsContainer}>
                    {
                        props.productData.options.map(item => <ProductOptions key={item.id}
                            product={item}
                            removeProductOption={props.removeProductOption}
                            saveProductOptionValues={props.saveProductOptionValues}
                        />)
                    }
                </div>
                <div className={styles.inputSection}><button className={styles.submitButton} disabled={props.loading} onClick={props.handleSubmission}>Submit</button></div>
            </div>
    )
}
export default ProductForm;