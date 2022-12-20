import { useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import Button from "./ui/Button";

export default function Sales(){

    const {productsQuery:{ data:products}} = useProducts()
    const navigate = useNavigate()
    const handleSaleWomen = ()=>{
        navigate(`/sale/women`, {state: {products}})
    }

    const handleSaleMen = ()=>{
        navigate(`/sale/men`, {state: {products}})
    }

    return(
        <>
        <div className="flex p-20 items-center justify-between lg:flex-row sm:flex-col md: flex-col gap-3">
            <h2 className="text-6xl font-semibold">Sale</h2>
            <div className="flex flex-col gap-2">
                <Button onClick={handleSaleWomen} text="SHOP WOMEN"></Button>
                <Button onClick={handleSaleMen} text="SHOP MEN"></Button>
            </div>
            <h2 className="text-3xl">Up to 50% off</h2>
        </div>
        </>
    )
}