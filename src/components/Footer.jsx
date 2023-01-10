import Button from "./ui/Button";
import {BsFillArrowUpSquareFill} from 'react-icons/bs'
import { useState } from "react";


export default function Footer(){

    const [scrollCheck, setScrollCheck] = useState(false)

    const handleClickUp = ()=>{
        window.scrollTo({
            top: 0,
            behavior:'smooth'
        })
    }

   window.addEventListener('scroll',()=>{
        if(window.scrollY > 2000){
            setScrollCheck(true)
        }else{
            setScrollCheck(false)
        }
   })

    return(
        <div className="mt-20 border-t border-gray-300 mb-10">
            <div className="flex gap-10 p-4 text-sm justify-between mt-10">
            <ul className="flex flex-col gap-2">
                <li>Contact Us</li>
                <li>Delivery Information</li>
                <li>Returns & Refunds</li>
                <li>Store Locator</li>
                <li>Payment</li>
                <li>FAQs</li>
                <li>Size Guide</li>
                <li>Privacy Notice</li>
            </ul>

            <ul className="flex flex-col gap-2">
                <li>Sustainability</li>
                <li>lulu x california dream</li>
                <li>Suppliers List</li>
                <li>Product Care</li>
                <li>About lulu</li>
                <li>Careers</li>
                <li>Press</li>
            </ul>

            <ul className="flex flex-col gap-2">
                <li>Facebook</li>
                <li>Pinterest</li>
                <li>Instagram</li>
                <li>Spotify</li>
            </ul>

            <div className="flex flex-col gap-2">
            <p>10% off your first Order.</p>
            <Button text="SUBSCRIBE"></Button>
            </div>
            </div>

           {scrollCheck &&  <button className="fixed bottom-10 right-10 text-4xl z-50 text-brand" onClick={handleClickUp}>
               <BsFillArrowUpSquareFill></BsFillArrowUpSquareFill> 
            </button>}
        </div>
    )
}