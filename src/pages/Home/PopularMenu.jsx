import SectionTitle from "../../components/SectionTitle";
import MenuItem from "../Shared/MenuItem";
import useMenu from "../../hooks/useMenu";

const PopularMenu = () => {
    const {menu} = useMenu();
    const popular = menu.filter(item => item.category === 'popular');
    return (
        <div>
            <section>
                <SectionTitle
                    subHeading={'Check it out'}
                    heading={'FROM OUR MENU'}
                ></SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {
                        popular.map(item => <MenuItem key={item._id} item={item} />)
                    }
                </div>
            </section>
        </div>
    );
};

export default PopularMenu;