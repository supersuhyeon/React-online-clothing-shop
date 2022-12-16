import {useQuery,useMutation, useQueryClient} from '@tanstack/react-query'
import { getProducts, addNewProduct } from "../api/firebase"

export default function useProducts(){
    const queryClient = useQueryClient()
    const productsQuery = useQuery(['products'], getProducts, {staleTime: 1000 * 60}) //{isLoading, error, data:products}
    const addProduct = useMutation(({product, url})=> addNewProduct(product, url),{ //어떤 함수를 인자로 받아서 변경할건지
        onSuccess: ()=>{queryClient.invalidateQueries(['products'])} // 성공적으로 되면 invalidate캐시를 할것.
    })
    return {productsQuery, addProduct}
}