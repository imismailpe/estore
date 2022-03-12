import ProductOptions from "./productOptions";
import styles from './components.module.css';

const ProductForm = (props) => {
    return (
        <div className={styles.addProductForm}>
            <div className={styles.inputSection}>
                <label htmlFor="productname">Name</label>
                <input name="productname" type="text" value={props.productName} onChange={e => props.setproductName(e.target.value)} />
            </div>
            <div className={styles.inputSection}>
                <label htmlFor="productcategory">Category</label>
                <select name="productcategory" value={props.productCategory} onChange={e => props.setproductCategory(e.target.value)} className={styles.productCategorySelect}>
                    {
                        props.categorylist.map(item => <option key={item._id} value={item.name}>{item.name}</option>)
                    }
                </select>
            </div>
            <div className={styles.inputSection}>Product options <button onClick={props.addNewProductOption}> Add </button></div>
            {
                props.productData.options.map(item => <ProductOptions key={item.id}
                    product={item}
                    removeProductOption={props.removeProductOption}
                    saveProductOptionValues={props.saveProductOptionValues}
                />)
            }
            <div className={styles.inputSection}><button className={styles.submitButton} disabled={props.loading} onClick={props.handleSubmission}>Submit</button></div>
        </div>
    )
}
export default ProductForm;