import { useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";

export default function Sidebar({toggle, close, toggle2, toggleCheck}){

    const styling = close ? 'flex justify-center items-center gap-4 bg-amber-50 fixed left-0 right-0 h-16 z-30 cursor-pointer top-10'  : 'flex justify-center items-center gap-4 bg-amber-50 fixed left-0 right-0 h-16 z-30 cursor-pointer top-0'

    const {productsQuery:{ data:products}} = useProducts()
    const navigate = useNavigate()
    const handleWomen = ()=>{
        navigate(`/product/women`, {state: {products}})
        toggleCheck(false)
    }

    const handleMen = ()=>{
        navigate(`/product/men`, {state: {products}})
        toggleCheck(false)
    }

    const handleSale = ()=>{
        navigate(`/product/saleItems`, {state: {products}})
        toggleCheck(false)
    }

    const handleGift = ()=>{
        navigate(`/product/gift`, {state: {products}})
        toggleCheck(false)
    }
    
    return(
        <>
        { toggle && <div className={ toggle ? `${styling} transition ease-in-out delay-150 translate-y-20` : `${styling} transition ease-in-out delay-150 translate-y-0` }>
            <p onClick={handleWomen}>Women</p>
            <p onClick={handleMen}>Men</p>
            <p onClick={handleSale}>Sale Items</p>
            <p onClick={handleGift}>Gift</p>
        </div>}

        {
            toggle2 && 
            <ul className="p-5 text-base">
                <li className="mb-2 hover:text-brand" onClick={handleWomen}>- Women</li>
                <li className="mb-2 hover:text-brand" onClick={handleMen}>- Men</li>
                <li className="mb-2 hover:text-brand" onClick={handleSale}>- Sale Items</li>
                <li className="mb-2 hover:text-brand" onClick={handleGift}>- Gift</li>
            </ul>
        }
        </>

    )
}