import { Helmet } from "react-helmet";
import Cover from "../Shared/Cover";
import menuIMG from "../../assets/menu/banner3.jpg"
import dessertIMG from "../../assets/menu/dessert-bg.jpeg"
import pizzaIMG from "../../assets/menu/pizza-bg.jpg"
import saladIMG from "../../assets/menu/salad-bg.jpg"
import soupsIMG from "../../assets/menu/soup-bg.jpg"
import useMenu from "../../hooks/useMenu";
import SectionTitle from "../../components/SectionTitle";
import MenuCategory from "./MenuCategory";

const Menu = () => {
    const { menu } = useMenu();
    const offered = menu.filter(item => item.category === 'offered');
    const dessert = menu.filter(item => item.category === 'dessert');
    const soups = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');

    return (
        <div className="pb-20">
            {/* title */}
            <Helmet>
                <title>
                    Menu || Bistro Boss
                </title>
            </Helmet>
            {/* main */}
            <Cover img={menuIMG} title={"Our menu"}></Cover>
            <SectionTitle
                subHeading={"Don't miss"}
                heading={"TODAY'S OFFER"}
            ></SectionTitle>
            <MenuCategory items={offered}></MenuCategory>
            <MenuCategory items={dessert} image={dessertIMG} title={'desserts'}></MenuCategory>
            <MenuCategory items={pizza} image={pizzaIMG} title={'pizza'}></MenuCategory>
            <MenuCategory items={salad} image={saladIMG} title={'salad'}></MenuCategory>
            <MenuCategory items={soups} image={soupsIMG} title={'soups'}></MenuCategory>
        </div>
    );
};

export default Menu;