import { useLocation, useParams } from "react-router-dom"
import ProductCard from "../components/ProductCard"

export default function SaleProoducts(){

   const {gender} = useParams()
   const {state:{products}}= useLocation()
   console.log(products)
   
    return(

        <>
        { 
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
               {products 
                && products.map((product)=> {
                    if(product.category === 'Women' && gender === 'women'){
                         return <ProductCard key={product.id} product={product}></ProductCard>
                        }else if(product.category === 'Men' && gender === 'men'){
                            return <ProductCard key={product.id} product={product}></ProductCard>
                }
                })}
        </ul>
        }
        </>
    )
}