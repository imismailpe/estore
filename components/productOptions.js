import styles from './components.module.css';

const ProductOptions = ({product, saveProductOptionValues, removeProductOption}) => {
    return (
        <div className={styles.productOptions}>
            <div className={styles.inputSection}>
                <label htmlFor="sku">SKU</label>
                <input name="sku" type="text" value={product.sku} onChange={e => saveProductOptionValues(product.id, 'sku', e.target.value)} />
            </div>
            <div className={styles.inputSection}>
                <label htmlFor="cost">Cost</label>
                <input name="cost" type="number" min={0} value={product.cost} onChange={e => saveProductOptionValues(product.id, 'cost', e.target.value)} />
            </div>
            <div className={styles.inputSection}>
                <label htmlFor="sellingprice">Selling price</label>
                <input name="sellingprice" type="number" min={0} value={product.sellingPrice} onChange={e => saveProductOptionValues(product.id, 'sellingPrice', e.target.value)} />
            </div>
            <div className={styles.inputSection}>
                <label htmlFor="mrp">MRP</label>
                <input name="mrp" type="number" min={0} value={product.mrp} onChange={e => saveProductOptionValues(product.id, 'mrp', e.target.value)}/>
            </div>
            <div className={styles.inputSection}>
                <label htmlFor="colour">Colour</label>
                <input name="colour" type="text" value={product.colour} onChange={e => saveProductOptionValues(product.id, 'colour', e.target.value)}/>
            </div>
            <div className={styles.inputSection}>
                <label htmlFor="size">Size</label>
                <input name="size" type="text" value={product.size} onChange={e => saveProductOptionValues(product.id, 'size', e.target.value)}/>
            </div>
            <div className={styles.inputSection}>
                <label htmlFor="quantity">Quantity</label>
                <input name="quantity" type="number" min={0} value={product.quantity} onChange={e => saveProductOptionValues(product.id, 'quantity', e.target.value)}/>
            </div>
            <div className={styles.inputSection}>
                Delete this product option <button onClick={() => removeProductOption(product.id)}>Delete</button>
            </div>
        </div>
    )
}
export default ProductOptions;