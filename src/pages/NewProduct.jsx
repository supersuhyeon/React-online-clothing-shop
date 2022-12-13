import { useState } from "react";
import { addNewProduct } from "../api/firebase";
import { uploadImage } from "../api/uploader";
import Button from "../components/ui/Button";

export default function NewProduct(){
    const [product, setProduct] = useState({})
    const [file, setFile] = useState()

    const [isUploading, setIsUploading] = useState(false)
    const [success, setSuccess] = useState()

    const handleSubmit = (e)=>{
        e.preventDefault();
        setIsUploading((isUploading)=>{return !isUploading}) //버튼 비활성화
        uploadImage(file) //add a file in cloudnary
        .then(url => {
            console.log(url)
            addNewProduct(product, url).then(setSuccess('you added a new product successfully!')); //새로운 제품 등록 성공
            setTimeout(() => {
                setSuccess(null)
            }, 4000);
            //firebase에 새로운 제품을 추가한다
        }).finally(()=>{return setIsUploading((isUploading)=>{return !isUploading})})
        
    }
    const handleChange = (e)=>{
        const {name, value, files} = e.target
        console.log(e.target.files)
        console.log(e.target.value)
        console.log(e.target.name)
        if(name === 'file'){
            setFile(files && files[0])
            return
        }
        setProduct((product)=>({...product, [name]:value}))
    }

    return(
        <section className='w-full text-center'>
            <h2 className='text-2xl font-bold my-4'>Add a new product</h2>
            {success && <p className='my-2'>✅ {success}</p>}
            {file && <img className='w-96 mx-auto mb-2' src={URL.createObjectURL(file)} alt="local file"></img>}
            <form className="flex flex-col px-12" onSubmit = {handleSubmit}>
                <input type="file" accept='image/*' name="file" required={true} onChange={handleChange}></input>
                <input type="text" name="title" value={product.title ?? ''} placeholder="product name" required={true} onChange={handleChange}/>
                <input type="number" name="price" value={product.price ?? ''} placeholder="price" required={true} onChange={handleChange} />
                <input type="text" name="category" value={product.category ?? ''} placeholder="category" required={true} onChange={handleChange}/>
                <input type="text" name="description" value={product.description ?? ''} placeholder="description" required={true} onChange={handleChange}/>
                <input type="text" name="options" value={product.options ?? ''} placeholder="options(use this to divide(,))" required={true} onChange={handleChange}/>
                <Button text={isUploading ? 'uploading...' : 'add a product'} disabled={isUploading}></Button>
                {/* isUploading이 true인 경우에 버튼을 disabled시켜준다. product.title의 값은 여기의 value값이다 */}
            </form>

        </section>
    )
}