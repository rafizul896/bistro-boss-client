import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useCart from "../hooks/useCart";

const OrderCard = ({ item }) => {
    const { name, recipe, image, price, } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const {refetch} = useCart();

    const handleAddToCart = async (food) => {
        if (user && user?.email) {
            const cartItem = {
                menuId: food._id,
                email: user.email,
                name,
                image,
                price
            }
            try {
                const { data } = await axiosSecure.post('/carts', cartItem)
                if (data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: `${name} added`,
                        showConfirmButton: false,
                        timer: 3000
                      });
                }
                refetch()
            }
            catch (err) {
                console.log(err?.message)
                toast.error(err?.message,{
                    position: 'top-center'
                })
            }
        }
        else {
            Swal.fire({
                title: "You are not Logged In",
                text: "Please login to add to the cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, I will login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: location.pathname })
                }
            });
        }

    }
    return (
        <div className="relative card-compact bg-[#F3F3F3] shadow-xl rounded-0 max-w-96 transition-all hover:scale-[1.025] hover:shadow-2xl pb-5">
            <img className="w-full" src={image} alt="Shoes" />
            <div className="p-2 bg-black absolute top-4 right-4 text-white font-medium">
                <p>${price}</p>
            </div>
            <div className="card-body items-center">
                <h2 className="card-title ">{name}</h2>
                <p className="text-center">{recipe.slice(0, 60)}...</p>
                <div className="card-actions mt-2">
                    <button onClick={() => handleAddToCart(item)} className="border-b-2 rounded-lg border-b-[#BB8506] hover:bg-[#1F2937] text-[#BB8506] px-7 py-2.5 font-medium">ADD TO CART</button>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;