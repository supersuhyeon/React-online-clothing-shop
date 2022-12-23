import Banner from "../components/Banner";
import Footer from "../components/Footer";
import GalleryImage from "../components/GalleryImage";
import Products from "../components/Products";
import Subscribe from "../components/Subscribe";

export default function Home(){
    return(
        <>
        <Banner></Banner>
        <Products></Products>
        <Subscribe></Subscribe>
        <GalleryImage></GalleryImage>
        <Footer></Footer>
        </>
    )
}