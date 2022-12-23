export default function Banner(){
    return(
        // <section className="h-96 relative bg-gray-600 mt-20">
        //     <div className="w-full h-full bg-cover bg-banner opacity-80"></div>
        //     <div className="absolute w-full top-44 text-center text-gray-50 drop-shadow-2xl">
        //         <h2 className="text-6xl">Shop with us</h2>
        //         <p className="text-2xl">Contemporaray Style, Designed to Last</p>
        //     </div>
        // </section>
        <section className="h-96 mt-48 mb-28 pl-10">
            <div className="w-8/12 h-full bg-cover bg-banner relative"></div>
            <div className="absolute w-full top-80 text-right right-52 text-gray-800 drop-shadow-2xl">
                 <h2 className="text-6xl text-bold">Shop with us</h2>
                 <p className="text-2xl">Contemporaray Style, Designed to Last</p>
            </div>
        </section>
    )
}