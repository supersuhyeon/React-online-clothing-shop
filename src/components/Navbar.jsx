import {BsFillPencilFill} from 'react-icons/bs'
import {AiOutlineInfoCircle} from 'react-icons/ai'
import {GrLocation} from 'react-icons/gr'
import {IoIosArrowDown,IoMdClose} from 'react-icons/io'
import {FiMenu} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import User from './User'
import Button from './ui/Button'
import { useAuthContext } from '../context/AuthContext'
import CartStatus from './CartStatus'
import Sidebar from './Sidebar'
import { useState } from 'react'
import MiniBanner from './MiniBanner'
import { useResponsiveContext } from '../context/ResponsiveContext'

const STYLING = 'flex h-20 justify-between border-b border-gray-300 p-2 fixed left-0 right-0 z-40 bg-white'

export default function Navbar(){

    const {user, login, logout} = useAuthContext()
    const [toggleSidebar, setToggleSidebar] = useState(false)
    const [toggleSidebar2, setToggleSidebar2] = useState(false)
    const [close, setClose] = useState(true)
    const [mobileToggle, setMobileToggle] = useState(false)
    const {Desktop, DesktopBelowDevice} = useResponsiveContext()

    const handleDelete = ()=>{
        return setClose((close)=>{return !close})
    }
   

    const handleToggleCheck = (prop)=>{
        console.log(prop)
        setMobileToggle((mobileToggle)=>{return !mobileToggle})
    }

    const handleBtnCheck = ()=>{
        setMobileToggle((mobileToggle)=>{return !mobileToggle})
    }

    if(mobileToggle){
        document.body.style.overflow = "hidden";
    }else if(!mobileToggle){
        document.body.style.overflowX = "hidden";
        document.body.style.overflowY = "unset";
    }

    return(
        <>
       {close && <MiniBanner handleDelete={handleDelete}></MiniBanner>}
        <header className={ close ? `top-10 ${STYLING}`  : `top-0 ${STYLING}` }>


        <Desktop>
        <ul className='flex items-center shrink-0 px-5 gap-5 cursor-pointer'>
                <Link to="/" className='text-3xl text-brand'>
                <p className='font-semibold mr-3'>lulu</p>
                </Link>

                <ul className='flex items-center gap-5 text-sm'>
                <Link to="/">
                    <li>Home</li>
                </Link>
               <li className='flex flex-col items-center pt-4' onClick={()=>{setToggleSidebar((toggle)=>{return !toggle})}}>Shop
                <p><IoIosArrowDown></IoIosArrowDown></p>
                </li> 
               <li>Magazine</li> 
               <li>Contact</li> 
                </ul>
                
            </ul>
            <Sidebar toggle={toggleSidebar} close={close}></Sidebar>
            <nav className='flex items-center gap-4 text-sm font-semibold'>
                {/* <Link to="/products">Products</Link> */}
                {user &&  <Link to="/cart"><CartStatus></CartStatus></Link>}
                {user && user.isAdmin && (<Link to="/products/new" className='text-2xl'>
                    <BsFillPencilFill/>
                </Link>)}
                {user && <User user={user}></User>}
                {!user && <Button text={"Login"} onClick={login}></Button>}
                {user && <Button text={"Logout"} onClick={logout}></Button>}
            </nav>
        </Desktop>
        
        <DesktopBelowDevice>
            <button onClick={handleBtnCheck}>
                 <FiMenu className='text-3xl mt-1 ml-1'></FiMenu>
            </button>
            {mobileToggle && <div className='fixed z-50 top-0 bottm-0 right-0 left-0 w-full h-full bg-white '>
                <Link to="/" className='text-3xl text-brand'>
                <p className='p-2 font-semibold mr-3' onClick={handleToggleCheck}>lulu</p>
                </Link>
                <ul className='absolute w-full top-14 text-lg'>
                    <Link to="/">
                         <li className='p-3 border-t border-gray-300 hover:text-brand' onClick={handleToggleCheck}>Home</li>
                    </Link>
                    <li className='flex items-center justify-between p-3 border-t border-gray-300 hover:text-brand' onClick={()=>{setToggleSidebar2((toggle)=>{return !toggle})}}>
                        <p>Shop</p>
                        <p><IoIosArrowDown></IoIosArrowDown></p>
                    </li>
                   {toggleSidebar2 && <Sidebar toggleCheck={handleToggleCheck} toggle2={toggleSidebar2} close={close}></Sidebar>}
                    <li className='p-3 border-t border-gray-300 hover:text-brand'>Magazine</li>
                    <li className='p-3 border-t border-b border-gray-300 hover:text-brand'>Contact</li>
                     <ul className='p-3 text-sm'>
                    <li className='flex items-center '>
                        <AiOutlineInfoCircle className='mr-1'></AiOutlineInfoCircle>
                        <p>Customer Service</p>
                        </li>
                    <li className='flex items-center '>
                        <GrLocation className='mr-1'></GrLocation>
                        <p>Shipping to : United States</p>
                        </li>
                     </ul>
                </ul>

                <button className='absolute top-2 right-2 text-2xl' onClick={handleToggleCheck}>
                    <IoMdClose></IoMdClose>
                </button>
            </div>}
            <nav className='flex items-center gap-4 text-sm font-semibold'>
                {/* <Link to="/products">Products</Link> */}
                {user &&  <Link to="/cart"><CartStatus></CartStatus></Link>}
                {user && user.isAdmin && (<Link to="/products/new" className='text-2xl'>
                    <BsFillPencilFill/>
                </Link>)}
                {user && <User user={user}></User>}
                {!user && <Button text={"Login"} onClick={login}></Button>}
                {user && <Button text={"Logout"} onClick={logout}></Button>}
            </nav>
        </DesktopBelowDevice>
          

        </header>
        
        </>
    )
}