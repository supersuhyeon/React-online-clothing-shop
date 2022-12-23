import CartItem from "../components/CartItem"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { FaEquals } from "react-icons/fa"
import PriceCard from "../components/PriceCard"
import Button from "../components/ui/Button"
import useCart from "../hooks/useCart"


const SHIPPING = 10

export default function Mycart(){

    const {
        cartQuery: { isLoading, data: products },
      } = useCart();
    
      if (isLoading){return <p>Loading...</p>;}
    
      const hasProducts = products && products.length > 0;
      const totalPrice =
        products &&
        products.reduce(
          (prev, current) => prev + parseInt(current.price) * current.quantity,
          0
        );

    return(
        <section className="flex flex-col p-8 mt-32">
            <p className="text-2xl text-center font-bold pb-4 border-b border-gray-300">My cart</p>
            {!hasProducts && <p>there is no product in your cart</p>}
            {hasProducts && (
            <> 
            <ul className="border-b border-gray-300 mb-8 p-4 px-8">
               {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} />
               ))}
            </ul>
            
            <div className="flex justify-between items-center px-2 md:px-8 lg:px-16 mb-6">
                <PriceCard text="Total Products Price" price={totalPrice}></PriceCard>
                <BsFillPlusCircleFill className="shrink-0"></BsFillPlusCircleFill>
                <PriceCard text="Shipping fee" price={SHIPPING}></PriceCard>
                <FaEquals className="shrink-0"></FaEquals>
                <PriceCard text="Total Order Price" price={totalPrice+SHIPPING}></PriceCard>
            </div>
            <Button text="Ready to order"></Button>
            </>
            )}
        </section>
       
    )
}