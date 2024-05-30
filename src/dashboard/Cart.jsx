import { MdDelete } from "react-icons/md";
import SectionTitle from "../components/SectionTitle";
import useCart from "../hooks/useCart";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Cart = () => {
    const axiosSecure = useAxiosSecure()
    const { cart, refetch } = useCart();

    const handleDelete = (id) => {
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await axiosSecure.delete(`/carts/${id}`)
                    refetch()
                    if (data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                }
                catch (err) {
                    toast.error(err?.message, {
                        position: "top-center"
                    })
                }

            }
        });

    }
    return (
        <div>
            <SectionTitle subHeading={'My Aart'} heading={"WANNA ADD MORE?"}></SectionTitle>
            <div className=" w-[90%] mx-auto">
                <div className="uppercase text-xl md:text-2xl font-semibold flex justify-between items-center">
                    <h1>total orders: {cart.length}</h1>
                    <h1>total price: ${cart.reduce((acc, curr) => acc + curr.price, 0)}</h1>
                    {cart.length ?
                        <Link to='/dashboard/payment'>
                            <button className="px-4 pt-.5 pb-2 rounded-md bg-[#d1a054] text-white">pay</button>
                        </Link>
                        :
                        <button disabled className="cursor-not-allowed px-4 pt-.5 pb-2 rounded-md bg-[#d1a054] text-white">pay</button>
                    }
                </div>
                <div className="overflow-x-auto mt-5">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-[#D1A054] text-white text-base">
                            <tr>
                                <th></th>
                                <th>Item Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row  */}
                            {
                                cart.map((item, indx) => <tr key={item._id}>
                                    <td>{indx + 1}</td>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <h3>{item.name}</h3>
                                    </td>
                                    <td>{item.price}</td>
                                    <th>
                                        <button onClick={() => handleDelete(item._id)} className="p-2 rounded-[5px] text-xl bg-[#B91C1C] text-white"><MdDelete /></button>
                                    </th>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Cart;