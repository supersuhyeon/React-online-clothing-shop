import Button from "./ui/Button";

export default function Footer(){
    return(
        <div className="mt-20 border-t border-gray-300 mb-10">
            <div className="flex gap-10 p-4 text-sm justify-between mt-10">
            <ul className="flex flex-col gap-2">
                <li>Contact Us</li>
                <li>Delivery Information</li>
                <li>Returns & Refunds</li>
                <li>Store Locator</li>
                <li>Payment</li>
                <li>FAQs</li>
                <li>Size Guide</li>
                <li>Privacy Notice</li>
            </ul>

            <ul className="flex flex-col gap-2">
                <li>Sustainability</li>
                <li>lulu x california dream</li>
                <li>Suppliers List</li>
                <li>Product Care</li>
                <li>About lulu</li>
                <li>Careers</li>
                <li>Press</li>
            </ul>

            <ul className="flex flex-col gap-2">
                <li>Facebook</li>
                <li>Pinterest</li>
                <li>Instagram</li>
                <li>Spotify</li>
            </ul>

            <div className="flex flex-col gap-2">
            <p>10% off your first Order.</p>
            <Button text="SUBSCRIBE"></Button>
            </div>
            </div>
        </div>
    )
}