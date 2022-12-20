import useProducts from "../hooks/useProducts"
import ProductCard from "./ProductCard"

export default function Products(){
    const {productsQuery:{isLoading, error, data:products}} = useProducts()
    
    return(
        <>
        {isLoading && <p>Loading....</p>}
        {error && <p>something is wrong...</p>}
        <h2 className="text-2xl text-center p-20">There's more to explore</h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {products 
                && products.map((product)=>(
                <ProductCard key={product.id} product={product}></ProductCard>
                ))}
        </ul>
        </>
    )
}