export default function Banner(){
    return(

        <section className="lg:w-8/12 h-96 mt-48 mb-28 lg:pl-10 md:w-full md:pl-0">
            <div className="w-full h-full bg-cover bg-banner relative"></div>
            <div className="absolute w-full top-80 lg:text-right lg:right-52 text-gray-800 drop-shadow-2xl text-center">
                 <h2 className="text-bold text-4xl">Shop with us</h2>
                 <p className="text-2xl">Contemporaray Style, Designed to Last</p>
            </div>
        </section>
    )
}