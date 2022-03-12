import styles from './components.module.css';

const ProductOptions = (props) => {
    return (
        <div className={styles.productOptions}>
            <div className={styles.inputSection}>
                <label htmlFor="sku">SKU</label>
                <input name="sku" type="text" value={props.sku} onChange={e => props.saveProductOptionValues(props.id, 'sku', e.target.value)} />
            </div>
            <div className={styles.inputSection}>
                <label htmlFor="cost">Cost</label>
                <input name="cost" type="number" value={props.cost} onChange={e => props.saveProductOptionValues(props.id, 'cost', e.target.value)} />
            </div>
            <div className={styles.inputSection}>
                <label htmlFor="sellingprice">Selling price</label>
                <input name="sellingprice" type="number" value={props.sellingPrice} onChange={e => props.saveProductOptionValues(props.id, 'sellingPrice', e.target.value)} />
            </div>
            <div className={styles.inputSection}>
                <label htmlFor="mrp">MRP</label>
                <input name="mrp" type="number" value={props.mrp} onChange={e => props.saveProductOptionValues(props.id, 'mrp', e.target.value)}/>
            </div>
            <div className={styles.inputSection}>
                <label htmlFor="quantity">Quantity</label>
                <input name="quantity" type="number" value={props.quantity} onChange={e => props.saveProductOptionValues(props.id, 'quantity', e.target.value)}/>
            </div>
            <div className={styles.inputSection}>
                Delete this product option <button onClick={() => props.removeProductOption(props.id)}>Delete</button>
            </div>
        </div>
    )
}
export default ProductOptions;