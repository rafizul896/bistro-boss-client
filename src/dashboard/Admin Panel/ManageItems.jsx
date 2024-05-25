import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import SectionTitle from "../../components/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaRegEdit } from "react-icons/fa";
import useMenu from "../../hooks/useMenu";
import Loader from "../../components/Loader";

const ManageItems = () => {
    const axiosSecure = useAxiosSecure();
    const { menu, refetch,isLoading } = useMenu();

    const handleDelete = (id) => {
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
                    const { data } = await axiosSecure.delete(`/menus/${id}`)
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

    if(isLoading) return <Loader/>

    return (
        <div>
            <SectionTitle subHeading={'Hurry Up!'} heading={"manage all items"}></SectionTitle>
            <div className=" w-[90%] mx-auto">
                <div className="uppercase text-xl md:text-2xl font-semibold flex justify-between items-center">
                    <h1>total orders: {menu.length}</h1>
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
                                <th>Edit</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row  */}
                            {
                                menu.map((item, indx) => <tr key={item._id}>
                                    <td className="font-semibold">{indx + 1}</td>
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
                                        <button onClick={() => handleDelete(item._id)} className="p-2 pl-3 pb-2.4 rounded-[5px] text-xl bg-[#d1a054] text-white"><FaRegEdit /></button>
                                    </th>
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

export default ManageItems;