import OrderCard from "../../components/OrderCard";

const OrderCategory = ({items}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-[90%] md:w-[80%] mx-auto max-w-[1440px]">
            {
                items.map(item => <OrderCard key={item._id} item={item} />)
            }
        </div>
    );
};

export default OrderCategory;