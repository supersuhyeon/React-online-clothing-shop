import { useState } from "react"
import { useLocation } from "react-router-dom"
import Button from "../components/ui/Button"
import useCart from '../hooks/useCart'
import cogoToast from 'cogo-toast';

export default function ProductDetail(){
    const {addOrUpdateItem} = useCart()

    const  {state:{product:{id, image, title, price, description, category, options, ogprice, sale}}} = useLocation()
    const [selected, setSelected] = useState(options && options[0])
    const handleSelect = (e)=>{setSelected(e.target.value)}
   
    const handleClick = ()=>{
    
        const productCase1 = {id, image, title, price, option: selected, quantity:1}
        const productCase2 = {...productCase1, ogprice, sale}
        const finalProduct = ogprice && sale ? productCase2 : productCase1

        addOrUpdateItem.mutate(finalProduct, {
            onSuccess: ()=>{
                cogoToast.success('added in your cart successfully!');
        }})
    }

    return(
        <>
        <p className="mx-12 mt-4 text-gray-700">{category}</p>
        <section className="flex flex-col md:flex-row p-4">
            <img className="w-full px-4 basis-7/12" src={image} alt={title} />
            <div className="w-full basis-5/12 flex flex-col p-4">
                    <h2 className="text-3xl font-bold py-2 ">{title}</h2>
                    <div className={`${sale ? 'flex items-center':'none'}`}>
                    <p className={`${sale ? 'line-through mr-3 text-lg' : 'no-underline border-b border-gray-400 text-2xl'}  font-bold py-2 `}>{`$${ sale ? ogprice : price }`}</p>
                    {sale ? <p className="font-bold text-brand text-2xl ">{`$${price}`}</p>: ''}
                    </div>
                    <p className="py-4 text-lg">{description}</p>
                    <div className="flex items-center">
                        <label className="text-brand font-bold" htmlFor="select">size:</label>
                        <select className="p-2 m-4 flex-1 border-2 border-dashed border-brand" id="select" onChange={handleSelect} value={selected}>
                            {options && options.map((option, index)=>{return <option key={index}>{option}</option>})}
                        </select>
                    </div>
                    <Button text="Add Cart" onClick={handleClick}></Button>
            </div>
        </section>
        </>
    )
}