import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { RiDeleteBin5Fill} from "react-icons/ri";
import useCart from "../hooks/useCart";

const ICON_CLASS = 'className="transition-all cursor-pointer hover:text-brand hover:scale-105 mx-1'

export default function CartItem({product, product : {id, image, option, price, quantity, title, sale, ogprice}}){


    const {addOrUpdateItem, removeItem} = useCart()

    const handleMinus = ()=>{
        if(quantity < 2) return;
        addOrUpdateItem.mutate({...product, quantity: quantity - 1})
    }

    const handlePlus = ()=>{
        addOrUpdateItem.mutate({...product, quantity: quantity + 1})
    }

    const handleDelete = ()=>{
        removeItem.mutate(id)
    }


    return(
        <li className="flex justify-between my-2 items-center">
            <img className="w-24 md:w-48 rounded-lg" src={image} alt={title} />
            <div className="flex flex-1 justify-between ml-4">
                <div className="basis-3/5">
                    <p className="text-lg">{title}</p>
                    <p className="font-semibold text-brand">{`Option : ${option}`}</p>
                    <div className={`${sale ? 'flex items-center':'none'}`}>
                    <p className={`${sale ? 'line-through mr-3' : 'no-underline'}`}>{`$${ sale ? ogprice : price }`}</p>
                    {sale ? <p className="font-bold text-brand ">{`$${price}`}</p>: ''}
                    </div>
                </div>
                <div className="text-2xl flex items-center">
                    <AiOutlineMinusSquare className={ICON_CLASS} onClick={handleMinus}></AiOutlineMinusSquare>
                    <span>{quantity}</span>
                    <AiOutlinePlusSquare className={ICON_CLASS} onClick={handlePlus}></AiOutlinePlusSquare>
                    <RiDeleteBin5Fill className={ICON_CLASS} onClick={handleDelete}></RiDeleteBin5Fill>
                </div>
            </div>
        </li>
    )
}