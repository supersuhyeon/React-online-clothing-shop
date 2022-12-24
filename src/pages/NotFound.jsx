import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function NotFound(){
    return(
<>
        <div className="w-full h-screen bg-cover bg-[url('../public/images/error.jpg')] relative"></div>
        <div className="w-300 h-300 absolute text-center top-80 left-0 right-0 bottom-0 m-auto">
         <h2 className="text-6xl font-bold">Something is broken</h2>
         <p className="mt-5">lulu is temporarily unavailable</p>
         <p className="mb-5">Our team has been notified and is looking into the issue</p>

         <Link to="/">
         <Button text="Back to lulu"></Button>
         </Link>
        </div>
</>
    )
}