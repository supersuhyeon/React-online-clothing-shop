import useProducts from "../hooks/useProducts"
import ProductCard from "./ProductCard"
import ReactLoading from 'react-loading';
import PrepareNote from "./PrepareNote";

export default function Products(){
    const {productsQuery:{isLoading, error, data:products}} = useProducts()
    
    return(
        <>
        {isLoading && 
            <div className="flex flex-col items-center justify-center p-10 gap-3">
                <ReactLoading className="mr-3" type={'spin'} color={'#F96162'}></ReactLoading>
                <p>Loading new arrivals...</p>
            </div>
            }
        {error && <p>something is wrong...</p>}
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {products 
                && products.map((product)=>{

                if(product.category === 'Gift'){
                    return <PrepareNote key={product.id} product={product}></PrepareNote>
                }
                 return <ProductCard key={product.id} product={product}></ProductCard>
               })}
        </ul>
        </>
    )
}