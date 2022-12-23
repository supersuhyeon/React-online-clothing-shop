import {BsFillPencilFill} from 'react-icons/bs'
import {IoIosArrowDown} from 'react-icons/io'
import { Link } from 'react-router-dom'
import User from './User'
import Button from './ui/Button'
import { useAuthContext } from '../context/AuthContext'
import CartStatus from './CartStatus'
import Sidebar from './Sidebar'
import { useState } from 'react'

export default function Navbar(){

    const {user, login, logout} = useAuthContext()
    const [toggleSidebar, setToggleSidebar] = useState(false)

    return(
        <>
        <header className='flex h-20 justify-between border-b border-gray-300 p-2 fixed top-0 left-0 right-0 z-50 bg-white'>
            <Link to="/" className='flex items-center text-4xl text-brand'>
            <h1>lulu</h1>
            </Link>

            <ul className='flex shrink-0 px-5 pt-5 gap-5 cursor-pointer'>
                <Link to="/">
                    <li>Home</li>
                </Link>
               <li className='flex flex-col items-center' onClick={()=>{setToggleSidebar((toggle)=>{return !toggle})}}>Shop
                <p><IoIosArrowDown></IoIosArrowDown></p>
                </li> 
               <li>blog</li> 
               <li>contact</li> 
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
        <Sidebar toggle={toggleSidebar}></Sidebar>
        </>
    )
}