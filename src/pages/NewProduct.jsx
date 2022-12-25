import { useState } from "react";
import { uploadImage } from "../api/uploader";
import Button from "../components/ui/Button";
import useProducts from "../hooks/useProducts";
import cogoToast from 'cogo-toast';

export default function NewProduct(){
    const [product, setProduct] = useState({})
    const [file, setFile] = useState()
    const [isUploading, setIsUploading] = useState(false)
    const [checkedBox, setCheckedBox] = useState(true)
    const [discount, setDiscount] = useState(0)
    const { addProduct} = useProducts()

    const handleSubmit = (e)=>{
        e.preventDefault();
        setIsUploading((isUploading)=>{return !isUploading}) //버튼 비활성화
        uploadImage(file) //add a file in cloudnary
        .then(url => {
            console.log(url)
            addProduct.mutate({product,url}, {onSuccess: ()=>{
                cogoToast.loading('adding new product...').then(() => {
                    cogoToast.success('New product added successfully!');
                  });
            }})
        }).finally(()=>{return setIsUploading((isUploading)=>{return !isUploading})})
        console.log(product)
        
    }

    const handleCheckedbox = (e)=>{
        setCheckedBox((checkedBox)=>{return !checkedBox})
        console.log(checkedBox)
        const strBox = checkedBox.toString()
        if(checkedBox){
            setProduct((product)=>({...product, sale:strBox}))
            return
        }else if(!checkedBox){
            setProduct((product)=>({...product}))
        }
    }

    const handleChange = (e)=>{
        const {name, value, files} = e.target

        if(name === 'ogprice'){
            const percentage = value * 40/100
            const resultValue = Math.ceil(value - percentage)
            setDiscount(resultValue)
            
        }

        if(name === 'file'){
            setFile(files && files[0])
            return
        }
        setProduct((product)=>({...product, [name]:value}))
    }



    return(
        <section className='w-full text-center mt-44'>
            <h2 className='text-2xl font-bold my-4'>Add a new product</h2>
            {file && <img className='w-96 mx-auto mb-2' src={URL.createObjectURL(file)} alt="local file"></img>}
            <form className="flex flex-col px-12" onSubmit = {handleSubmit}>
                <input type="file" accept='image/*' name="file" required={true} onChange={handleChange}></input>
                <input type="text" name="title" value={product.title ?? ''} placeholder="product name" required={true} onChange={handleChange}/>

                <div className="flex py-3">
                    <input className="mr-2" type="checkbox" name="sale" value={product.sale} id={product.id} onChange={handleCheckedbox}/>
                    <label htmlFor={product.id}>Sale item (40%OFF)</label>
                </div>

                {!checkedBox && <input type="number" name="ogprice" value={product.ogprice ?? ''} placeholder="original price" onChange={handleChange}></input>}
                {!checkedBox && <p className="flex text-sm text-brand">💡 Final price is {discount}</p>}
                <input type="number" name="price" value={product.price ?? ''} placeholder="price" required={true} onChange={handleChange} />
                <input type="text" name="category" value={product.category ?? ''} placeholder="category" required={true} onChange={handleChange}/>
                <input type="text" name="description" value={product.description ?? ''} placeholder="description" required={true} onChange={handleChange}/>
                <input type="text" name="colors" value={product.colors ?? ''} placeholder="colors (seperated by commas(,))" required={true} onChange={handleChange}/>
                <input type="text" name="options" value={product.options ?? ''} placeholder="options (seperated by commas(,))" required={true} onChange={handleChange}/>
                <Button text={isUploading ? 'uploading...' : 'add a product'} disabled={isUploading}></Button>
                {/* isUploading이 true인 경우에 버튼을 disabled시켜준다. product.title의 값은 여기의 value값이다 */}
            </form>

        </section>
    )
}