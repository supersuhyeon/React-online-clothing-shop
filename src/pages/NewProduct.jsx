import { useState } from "react";
import { uploadImage } from "../api/uploader";
import Button from "../components/ui/Button";

export default function NewProduct(){
    const [product, setProduct] = useState({})
    const [file, setFile] = useState()

    const handleSubmit = (e)=>{
        e.preventDefault();
        uploadImage(file)
        .then(url => {
            console.log(url)
            //firebase에 새로운 제품을 추가한다
        })
        //제품의 사진을 클라우디너리에 업로드하고 url획득
        
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
        <section>
            {file && <img src={URL.createObjectURL(file)} alt="local file"></img>}
            <form onSubmit = {handleSubmit}>
                <input type="file" accept='image/*' name="file" required={true} onChange={handleChange}></input>
                <input type="text" name="title" value={product.title ?? ''} placeholder="product name" required={true} onChange={handleChange}/>
                <input type="number" name="price" value={product.price ?? ''} placeholder="price" required={true} onChange={handleChange} />
                <input type="text" name="category" value={product.category ?? ''} placeholder="category" required={true} onChange={handleChange}/>
                <input type="text" name="description" value={product.description ?? ''} placeholder="description" required={true} onChange={handleChange}/>
                <input type="text" name="options" value={product.options ?? ''} placeholder="options(use this to divide(,))" required={true} onChange={handleChange}/>
                <Button text={'Add'}>add</Button>
            </form>

        </section>
    )
}