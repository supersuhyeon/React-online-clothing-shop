import {BsFillPencilFill} from 'react-icons/bs'
import {IoIosArrowDown} from 'react-icons/io'
import { Link } from 'react-router-dom'
import User from './User'
import Button from './ui/Button'
import { useAuthContext } from '../context/AuthContext'
import CartStatus from './CartStatus'
import Sidebar from './Sidebar'
import { useState } from 'react'
import MiniBanner from './MiniBanner'

const STYLING = 'flex h-20 justify-between border-b border-gray-300 p-2 fixed  left-0 right-0 z-40 bg-white'

export default function Navbar(){

    const {user, login, logout} = useAuthContext()
    const [toggleSidebar, setToggleSidebar] = useState(false)
    const [close, setClose] = useState(true)
    const handleDelete = ()=>{
        return setClose((close)=>{return !close})
    }

    return(
        <>
       {close && <MiniBanner handleDelete={handleDelete}></MiniBanner>}
        <header className={ close ? `top-10 ${STYLING}`  : `top-0 ${STYLING}` }>
            <Link to="/" className='flex items-center text-3xl text-brand'>
            <p>lulu</p>
            </Link>

            <ul className='flex shrink-0 px-5 pt-5 gap-5 cursor-pointer'>
                <Link to="/">
                    <li>Home</li>
                </Link>
               <li className='flex flex-col items-center' onClick={()=>{setToggleSidebar((toggle)=>{return !toggle})}}>Shop
                <p><IoIosArrowDown></IoIosArrowDown></p>
                </li> 
               <li>Magazine</li> 
               <li>Contact</li> 
            </ul>
          
            <nav className='flex items-center gap-4 font-semibold'>
                {/* <Link to="/products">Products</Link> */}
                {user &&  <Link to="/cart"><CartStatus></CartStatus></Link>}
                {user && user.isAdmin && (<Link to="/products/new" className='text-2xl'>
                    <BsFillPencilFill/>
                </Link>)}
                {user && <User user={user}></User>}
                {!user && <Button text={"Login"} onClick={login}></Button>}
                {user && <Button text={"Logout"} onClick={logout}></Button>}
            </nav>
        </header>
        <Sidebar toggle={toggleSidebar} close={close}></Sidebar>
        </>
    )
}