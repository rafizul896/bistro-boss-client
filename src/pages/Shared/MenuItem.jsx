const MenuItem = ({ item }) => {
    const { name, recipe, image, price } = item;
    return (
        <div className="flex gap-2 lg:gap-4 items-center lg:items-start">
            <div className="md:h-full md:py-1">
                <img className="w-[130px] h-[60px] md:h-full object-cover rounded-b-full rounded-tr-full" src={image} alt="" />
            </div>
            <div className="flex">
                <div>
                    <h3 className="uppercase md:text-xl font-medium">{name}---<span className="hidden lg:inline">--------</span></h3>
                    <p className="text-sm lg:text-base">{recipe}</p>
                </div>
                <p className="text-[#BB8506] md:text-xl font-semibold">${price}</p>
            </div>
        </div>
    );
};

export default MenuItem;