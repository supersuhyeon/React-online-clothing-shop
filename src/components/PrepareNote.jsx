
export default function PrepareNote({product: {image, title, description, category, price}}){

    return(
        <li className="rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105">
        <img className="w-full" src={image} alt={title} />
        <div className="mt-2 px-2 text-lg flex justify-between items-center">
            <h3 className="truncate">{title}</h3>
            <p className="text-brand">{`$${price}`}</p>
        </div>
        <p className="px-2 text-yellow-700">2022 Christmas 70% Gift Card</p>
        <p className="mb-2 px-2 text-gray-600">{category}</p>
    </li>
    )
}