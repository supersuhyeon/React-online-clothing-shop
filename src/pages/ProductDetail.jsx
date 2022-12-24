import { useState } from "react"
import { useLocation } from "react-router-dom"
import Button from "../components/ui/Button"
import useCart from '../hooks/useCart'
import cogoToast from 'cogo-toast';
import Footer from "../components/Footer";

export default function ProductDetail(){
    const {addOrUpdateItem} = useCart()

    const  {state:{product:{id, image, title, price, description, category, options, ogprice, sale, colors}}} = useLocation()
    const [selected, setSelected] = useState(options && options[0])
    const [color, setColor] = useState()
    const handleSelect = (e)=>{setSelected(e.target.value)}
    const handleColorClick = (e)=>{
       const colorName = e.target.value
        if(colorName){
            const colorNameUpper = colorName.toUpperCase()
            setColor(colorNameUpper)
        }return
    }
   
    const handleClick = ()=>{
    
        const productCase1 = {id, image, title, price, option: selected, quantity:1, color:color}
        const productCase2 = {...productCase1, ogprice, sale}
        const finalProduct = ogprice && sale ? productCase2 : productCase1

        if(color === undefined){
            cogoToast.error('please select the color')
        }

        addOrUpdateItem.mutate(finalProduct, {
            onSuccess: ()=>{
                cogoToast.success('added in your cart successfully!');
        }})
    }

    const [currentTab, setCurrentTab] = useState(0)
    const menuArr = [
        {name : 'DETAILS', content : `- Dry Clean \r\n - Made in Italy`},
        {name:'DELIVERY & PAYMENT', content: 'Shipping to: US \r\n Free returns on all orders. \r\n If something isn’t quite right, you have 30 days to send it back to us. \r\n We accept MasterCard, VISA, American Express, Discover, PayPal and Klarna' }
    ]
    const selectMenuHandler = (index) => {
        setCurrentTab(index)
    }
    return(
        <>
        <p className="mx-12 text-gray-700 mt-36">{category}</p>
        <section className="flex flex-col md:flex-row p-4">
            <img className="w-full px-4 basis-7/12" src={image} alt={title} />
            <div className="w-full basis-5/12 flex flex-col p-4">
                    <h2 className="text-3xl py-2 ">{title}</h2>
                    <div className={`${sale ? 'flex items-center':'none'}`}>
                    <p className={`${sale ? 'line-through mr-3 text-lg' : 'no-underline border-b border-gray-400 text-2xl'}  font-bold py-2`}>{`$${ sale ? ogprice : price }`}</p>
                    {sale ? <p className="font-bold text-brand text-2xl ">{`$${price}`}</p>: ''}
                    </div>
                    <p className="py-4 text-ml">{description}</p>

                    <div className="flex flex-col mb-6 mt-3">
                    <p className="text-sm mb-2">COLOR</p>
                    <div className="flex gap-2" onClick={handleColorClick}>{colors && colors.map((color,index)=>{return <button value={color} key={index} className={`bg-${color}-700 w-10 h-10 rounded-full border border-gray-100`}></button>})}
                        </div>
                    </div>
                
                    <div className="flex flex-col">
                        <label className="text-sm mb-2" htmlFor="select">SIZE</label>
                        <select className="p-2 flex-1 border border-gray-300 mb-10" id="select" onChange={handleSelect} value={selected}>
                            {options && options.map((option, index)=>{return <option key={index}>{option}</option>})}
                        </select>
                    </div>
                    <Button text="Add to Cart" onClick={handleClick}></Button>
                    <div className="mt-5 text-sm">
                        {menuArr.map((menu, index)=>{return <button key={index} onClick={()=> {return selectMenuHandler(index)}} className={`${currentTab === index ? 'underline' : 'no-underline'} mr-3`}>{menu.name}</button>})}
                    </div>
                    <div>
                        <div className="text-sm mt-2">{menuArr[currentTab].content.split('\r\n').map((item)=>{return <p key={item}>{item}</p>})}</div>
                    </div>
            </div>
        </section>
        <Footer></Footer>
        </>
    )
}