import { useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'

const Testimonials = () => {
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])

    return (
        <div className="md:px-3">
            <SectionTitle
                subHeading={'What Our Clients Say'}
                heading={'TESTIMONIALS'}
            ></SectionTitle>
            <Swiper 
            navigation={true}
             loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false
              }}
              modules={[Navigation,Autoplay,Pagination]}
               className="mySwiper">
                {
                    reviews.map(review => <SwiperSlide key={review._id}>
                        <div className="px-4 md:px-10 flex flex-col justify-center items-center text-center space-y-3">
                            <Rating
                            style={{maxWidth: 180}}
                            value={review.rating}
                            readOnly
                            />
                            <p className="px-5">{review.details}</p>
                            <h1 className="text-2xl text-[#CD9003]">{review.name}</h1>

                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Testimonials;