import Banner from "./Banner";
import Category from "./Category";
import ChefRecommends from "./ChefRecommends";
import Featured from "./Featured";
import PopularMenu from "./PopularMenu";
import Testimonials from "./Testimonials";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div className="w-[90%] md:w-[90%] lg:w-[80%] mx-auto max-w-[1440px] pb-10">
            <Category></Category>
            <PopularMenu></PopularMenu>
            <ChefRecommends></ChefRecommends>
            <Featured></Featured>
            <Testimonials></Testimonials>
            </div>
        </div>
    );
};

export default Home;