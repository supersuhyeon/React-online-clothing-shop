import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../api/firebase"
import ProductCard from "./ProductCard"

export default function Products(){
    const {isLoading, error, data: products} = useQuery(['products'], getProducts)

    return(
        <>
        {console.log(products)}
        {isLoading && <p>Loading....</p>}
        {error && <p>something is wrong...</p>}
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {products 
                && products.map((product)=>(
                <ProductCard key={product.id} product={product}></ProductCard>
                ))}
        </ul>
        </>
    )
}