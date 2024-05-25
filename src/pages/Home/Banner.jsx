import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../assets/home/01.jpg'
import img2 from '../../assets/home/02.jpg'
import img3 from '../../assets/home/03.png'
import img4 from '../../assets/home/04.jpg'
import img5 from '../../assets/home/05.png'
import img6 from '../../assets/home/06.png'

const Banner = () => {
    return (
        <Carousel
            infiniteLoop={true}
            autoPlay={true}
        >
            <div className="max-h-screen]">
                <img src={img1} />
            </div>
            <div className="max-h-screen]">
                <img src={img2} />

            </div>
            <div className="max-h-screen]">
                <img src={img3} />
            </div>
            <div className="max-h-screen]">
                <img src={img4} />
            </div>
            <div className="max-h-screen]">
                <img src={img5} />
            </div>
            <div className="max-h-screen]">
                <img src={img6} />
            </div>
        </Carousel>
    );
};

export default Banner;