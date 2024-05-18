const OrderCard = ({item}) => {
    const { name, recipe, image,price } = item;
    return (
        <div className="relative card-compact bg-[#F3F3F3] shadow-xl rounded-0 max-w-96 transition-all hover:scale-[1.025] hover:shadow-2xl pb-5">
            <img className="w-full" src={image} alt="Shoes" />
            <div className="p-2 bg-black absolute top-4 right-4 text-white font-medium">
                <p>${price}</p>
            </div>
            <div className="card-body items-center">
                <h2 className="card-title ">{name}</h2>
                <p className="text-center">{recipe.slice(0,60)}...</p>
                <div className="card-actions mt-2">
                    <button className="border-b-2 rounded-lg border-b-[#BB8506] hover:bg-[#1F2937] text-[#BB8506] px-7 py-2.5 font-medium">ADD TO CART</button>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;