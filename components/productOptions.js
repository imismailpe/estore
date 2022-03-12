import { useInputData } from "../hooks/hooks";
import styles from './components.module.css';

const ProductOptions = (props) => {
    const sku = useInputData('');
    const cost = useInputData('');
    const sellingPrice = useInputData('');
    const mrp = useInputData('');
    const quantity = useInputData('');
    const removeOptions = () => {
        props.removeProductOption(props.id);
    }
    const setValues = () => {
        const values = {
            id: props.id,
            sku: sku.value,
            cost: cost.value,
            sellingPrice: sellingPrice.value,
            mrp: mrp.value,
            quantity: quantity.value
        }
        props.saveProductOptionValues(values);
    }
    return (
        <div className={styles.productOptions}>
            <div className={styles.inputSection}>
                <label htmlFor="sku">SKU</label>
                <input name="sku" type="text" {...sku} />
            </div>
            <div className={styles.inputSection}>
                <label htmlFor="cost">Cost</label>
                <input name="cost" type="number" {...cost} />
            </div>
            <div className={styles.inputSection}>
                <label htmlFor="sellingprice">Selling price</label>
                <input name="sellingprice" type="number" {...sellingPrice} />
            </div>
            <div className={styles.inputSection}>
                <label htmlFor="mrp">MRP</label>
                <input name="mrp" type="number" {...mrp} />
            </div>
            <div className={styles.inputSection}>
                <label htmlFor="quantity">Quantity</label>
                <input name="quantity" type="number" {...quantity} />
            </div>
            <div className={styles.inputSection}>
                <button onClick={removeOptions}>Delete</button>
                <button onClick={setValues}>Save</button>
            </div>
        </div>
    )
}
export default ProductOptions;