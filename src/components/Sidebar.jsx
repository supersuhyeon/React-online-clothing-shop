import { useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";

const styling = 'flex justify-center items-center gap-4 bg-white fixed top-0 left-0 right-0 h-16 z-40 cursor-pointer'

export default function Sidebar({toggle}){

    const {productsQuery:{ data:products}} = useProducts()
    const navigate = useNavigate()
    const handleSaleWomen = ()=>{
        navigate(`/sale/women`, {state: {products}})
    }

    const handleSaleMen = ()=>{
        navigate(`/sale/men`, {state: {products}})
    }
    
    return(
        <div className={ toggle ? `${styling} transition ease-in-out delay-150 translate-y-20` : `${styling} transition ease-in-out delay-150 translate-y-0` }>
            <p onClick={handleSaleWomen}>Women</p>
            <p onClick={handleSaleMen}>Men</p>
            <p>Accessary</p>
            <p>Shoes</p>
        </div>
    )
}