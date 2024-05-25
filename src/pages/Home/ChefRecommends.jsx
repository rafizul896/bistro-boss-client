import { useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import ChefCard from "../../components/ChefCard";

const ChefRecommends = () => {
    const [menu,setMenu] = useState([]);
    useEffect(()=>{
        fetch('menu.json')
        .then(res => res.json())
        .then(data => {
            const popularItems = data.filter(item => item.category === 'pizza').slice(0,3);
            setMenu(popularItems)
        })
    },[])
    return (
        <section>
            <SectionTitle
            subHeading={"Should Try"}
            heading={'CHEF RECOMMENDS'}
            ></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-10">
                {menu.map(item => <ChefCard key={item.name} item={item}/>)}
            </div>
        </section>
    );
};

export default ChefRecommends;