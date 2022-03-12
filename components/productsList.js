import ProductView from "./product";

const ProductList = ({ list = [] }) => {
    if(list.length === 0){
        return(
            <p>No Products</p>
        )
    }
    return (
        list.map(product => {
            return <ProductView key={product._id} product={product} />
        })
    )
}
export default ProductList;