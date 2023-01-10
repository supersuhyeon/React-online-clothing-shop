import {RiCloseFill} from 'react-icons/ri'

export default function MiniBanner({handleDelete}){

    return(
        <div className="flex items-center fixed top-0 right-0 left-0 h-10 text-white text-xs z-40 bg-red-700 font-bold">
            <p className='grow items-center text-center underline'>SALE : NOW UP TO 40% OFF</p>
        <p className='text-2xl text-right mr-3' onClick={handleDelete}><RiCloseFill></RiCloseFill></p>
      </div>
    )
}