import useProducts from "../hooks/useProducts"
import ProductCard from "./ProductCard"
import ReactLoading from 'react-loading';
import PrepareNote from "./PrepareNote";
import { useState } from "react";

export default function Products(){
    const {productsQuery:{isLoading, error, data:products}} = useProducts()
    const options = ['Featured','Low to High', 'High to Low']
    const [sorted, setSorted] = useState()

    const handleSorted = (e)=>{
        setSorted(e.target.value)
    }

    const productsNewArr = products && products.map((product)=>{return {...product}})

    if(sorted === 'Featured'){
        console.log('hello')
    }else if(sorted === 'Low to High'){
        products && productsNewArr.sort((a,b)=>{return a.price - b.price})
    }else if(sorted === 'High to Low'){
        products && productsNewArr.sort((a,b)=>{return b.price - a.price})
    }
   

    return(
        <>
        {isLoading && 
            <div className="flex flex-col items-center justify-center p-10 gap-3">
                <ReactLoading className="mr-3" type={'spin'} color={'#F96162'}></ReactLoading>
                <p>Loading new arrivals...</p>
            </div>
            }
        {error && <p>something is wrong...</p>}

        <div className="flex justify-end mt-32 pr-5">
            <p className="font-semibold mr-5 border-b-2 border-brand">All Items({products && products.length})</p>
            <label htmlFor="sort" className="font-semibold mr-2">Sort by</label>
            <select id="sort" className="text-sm" name="sort" value={sorted} onChange={handleSorted}>
                {options.map((option, index)=>{return <option key={index} value={option}>{option}</option>})}
            </select>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {products 
                && productsNewArr.map((product)=>{

                if(product.category === 'Gift'){
                    return <PrepareNote key={product.id} product={product}></PrepareNote>
                }
                 return <ProductCard key={product.id} product={product}></ProductCard>
               })}
        </ul>
        </>
    )
}