import { Link } from "react-router-dom";
import Cover from "../Shared/Cover";
import MenuItem from "../Shared/MenuItem";

const MenuCategory = ({ items, title, image }) => {
    return (
        <div>
            {title && <Cover img={image} title={title}></Cover>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[90%] md:w-[90%] lg:w-[80%] mx-auto max-w-[1440px] py-14">
                {
                    items.map(item => <MenuItem key={item._id} item={item} />)
                }
            </div>
            <Link to={`/order/${title}`} className="flex justify-center mb-10">
                <button className="font-lg font-medium uppercase border-b-2 border-gray-400 rounded-lg px-7 py-4 hover:bg-[#1f2937] hover:text-[#BB8506]">ORDER YOUR FAVOURITE FOOD</button>
            </Link>
        </div>
    );
};

export default MenuCategory;