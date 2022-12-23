import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function GalleryImage(){
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
      };

    return(
        <div>
        <Slider className="p-20" {...settings}>
          <div className="h-96">
            <img src={process.env.PUBLIC_URL + '/images/gallery1.png'} alt="knitting" />
            <h3 className="font-semibold mb-2">THE UNBOXING LULU COLLECTION</h3>
            <p>Pureness as a conscious synthesis, the intentional removal of what exceeds.</p>
            <button className="text-sm underline mt-2">read more</button>
          </div>
          <div className="h-96">
          <img src={process.env.PUBLIC_URL + '/images/gallery2.png'}alt="" />
            <h3 className="font-semibold mb-2">LIGHTS OFF CAMPAIGN</h3>
            <p>Maison lulu turns lights off in its Worldwide boutiques continuing its conscious-driven journey</p>
            <button className="text-sm underline mt-2">read more</button>
          </div>
          <div>
          <img src={process.env.PUBLIC_URL + '/images/gallery3.png'} alt="" />
            <h3 className="font-semibold mb-2">MAISON LULU INTRODUCES THE NEW MAISON</h3>
            <p>lulu unveils a new concept for its stores worldwide, presenting an evolution of the brand towards an increasingly human-centric approach through a more intimate retail dimension.</p>
            <button className="text-sm underline mt-2">read more</button>
          </div>
          <div>
          <img src={process.env.PUBLIC_URL + '/images/gallery4.png'} alt="" />
            <h3 className="font-semibold mb-2">UNITE AND EMPOWER VOICES FOR THE LOVE OF WRITING</h3>
            <p>MAISON LULU RENEWS PARTNERSHIP WITH TOMI ADEYEMI’S THE WRITER’S RO ADMAP</p>
            <button className="text-sm underline mt-2">read more</button>
          </div>
          <div>
          <img src={process.env.PUBLIC_URL + '/images/gallery5.png'} alt="" />
            <h3 className="font-semibold mb-2">HAUTE COUTURE FALL/WINTER 2022-23</h3>
            <p>Beauty comes from harmony. It is not an aesthetic imposition, it does not obey rigid canons, nor fixed rules.</p>
            <button className="text-sm underline mt-2">read more</button>
          </div>
          <div>
          <img src={process.env.PUBLIC_URL + '/images/gallery6.png'} alt="" />
            <h3 className="font-semibold mb-2">LULU VINTAGE</h3>
            <p>The multiform universe of the Maison is composed of infinite constellations.</p>
            <button className="text-sm underline mt-2">read more</button>
          </div>
        </Slider>
        </div>
    )
}