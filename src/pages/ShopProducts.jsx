import { useLocation, useParams } from "react-router-dom"
import Footer from "../components/Footer"
import PrepareNote from "../components/PrepareNote"
import ProductCard from "../components/ProductCard"

export default function ShopProducts(){

   const {items} = useParams()
   const {state:{products}}= useLocation()
   console.log(products)
   console.log(items)
   
    return(

        <>
        { 
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 mt-36">
               {products 
                && products.map((product) => {
                    if(product.category === 'Women' && items === 'women'){
                         return (<ProductCard key={product.id} product={product}></ProductCard>)
                        }else if(product.category === 'Men' && items === 'men'){
                            return (<ProductCard key={product.id} product={product}></ProductCard>)
                        }
                        else if(product.sale === true && items === 'saleItems'){
                               return (<ProductCard key={product.id} product={product}></ProductCard>)
                            }else if(product.category === 'Gift' && items === 'gift'){
                                return(<PrepareNote key={product.id} product={product}></PrepareNote>)
                            }
                            
                            return null
                        
                })}
        </ul>
        }
        <Footer></Footer>
        </>
    )
}