import { useQuery } from "@tanstack/react-query"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { FaEquals } from "react-icons/fa"
import { getCart } from '../api/firebase'
import CartItem from "../components/CartItem"
import PriceCard from "../components/PriceCard"
import Button from "../components/ui/Button"
import { useAuthContext } from '../context/AuthContext'


const SHIPPING = 3000

export default function Mycart(){

    const {user:{uid}} = useAuthContext()
    const {isLoading, data:products} = useQuery(['carts'], ()=>{return getCart(uid)})
    if(isLoading) return <p>Loading...</p>
    const hasProducts = products && products.length > 0 //true
    const totalPrice = products && products.reduce((prev, current)=> {return prev + parseInt(current.price) * current.quantity}, 0)

    return(
        <section className="flex flex-col p-8">
            <p className="text-2xl text-center font-bold pb-4 border-b border-gray-300">My cart</p>
            {!hasProducts && <p>there is no product in your cart</p>}
            {hasProducts && <>
            
            <ul className="border-b border-gray-300 mb-8 p-4 px-8">
                {products && products.map((product)=>{return <CartItem key={product.id} product={product} uid={uid}></CartItem>})}
            </ul>
            
            <div className="flex justify-between items-center px-2 md:px-8 lg:px-16 mb-6">
                <PriceCard text="Total Products Price" price={totalPrice}></PriceCard>
                <BsFillPlusCircleFill className="shrink-0"></BsFillPlusCircleFill>
                <PriceCard text="Shipping fee" price={SHIPPING}></PriceCard>
                <FaEquals className="shrink-0"></FaEquals>
                <PriceCard text="Total Order Price" price={totalPrice+SHIPPING}></PriceCard>
            </div>
            <Button text="Ready to order"></Button>
            </>}
        </section>
       
    )
}