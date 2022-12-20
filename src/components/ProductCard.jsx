import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function ProductCard({product ,product: { id,image, title, category, price, sale , ogprice}}){
    const navigate = useNavigate()
    // const savedprice = price * (40 / 100)
    // const resultPrice = price - savedprice


    return(
        <li onClick={()=>{navigate(`/products/${id}`, {state: {product:product}})}} className="rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105">
            <img className="w-full" src={image} alt={title} />
            <div className="mt-2 px-2 text-lg flex justify-between items-center">
                <h3 className="truncate">{title}</h3>
                <p className={`${sale ? 'line-through' : 'no-underline'}`}>{`$${ sale ? ogprice : price }`}</p>
                
            </div>
            {sale? 
                <div className="px-2">
                <p className="font-bold text-brand text-lg">{`$${price}`}</p>
                <span className="text-yellow-700">Online exclusive 40% off</span>
                </div>
            : ''}
            
            <p className="mb-2 px-2 text-gray-600">{category}</p>
        </li>
    )
}