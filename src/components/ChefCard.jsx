const ChefCard = ({ item }) => {
    const { name, recipe, image } = item;
    return (
        <div className="card-compact bg-base-100 shadow-xl rounded-0 max-w-96 transition-all hover:scale-[1.025] hover:shadow-2xl">
            <img className="w-full" src={image} alt="Shoes" />
            <div className="card-body items-center">
                <h2 className="card-title ">{name}</h2>
                <p className="text-center">{recipe.slice(0,60)}...</p>
                <div className="card-actions mt-2">
                    <button className="bg-[#1F2937] text-[#BB8506] px-7 py-2.5 rounded-lg font-medium">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default ChefCard;