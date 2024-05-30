import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import SectionTitle from "../../components/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaRegEdit, FaUtensils } from "react-icons/fa";
import useMenu from "../../hooks/useMenu";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import { Fragment, useState } from "react";

const ManageItems = () => {
    const [showModal, setShowModal] = useState(false);
    const [updateMenu, setUpdateMenu] = useState([]);
    const axiosSecure = useAxiosSecure();
    const { menu, refetch, isLoading } = useMenu();

    const { _id, category, name, price, recipe } = updateMenu;

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

    const handleUpdate = async e => {
        e.preventDefault();
        const form = e.target;
        const name = form.recipeName.value;
        const category = form.category.value;
        const recipe = form.recipeDetails.value;
        const price = form.price.value;

        const item = {
            name,
            recipe,
            category,
            price: parseFloat(price)
        }

        try {
            const { data } = await axiosSecure.patch(`/menus/${_id}`, item)
            console.log(data)
            if (data?.modifiedCount > 0) {
                Swal.fire({
                    title: "Success",
                    text: "Your file has updated successfuly",
                    icon: "success",
                });
                refetch()
                setShowModal(!showModal)
            }
            if (data?.modifiedCount === 0) {
                toast.error('You have not changed any filds')
            }
        }
        catch (err) {
            toast.error(err.message)
        }

    }

    if (isLoading) return <Loader />

    return (
        <Fragment>
            <div>
                <Modal isVisible={showModal} showModal={showModal} setShowModal={setShowModal}>
                    <form onSubmit={handleUpdate}>
                        <div className="bg-[#F3F3F3] space-y-3 md:space-y-5 p-2.5 md:p-5 lg:p-10">
                            <div>
                                <label className='text-xl font-medium' htmlFor='emailAddress'>
                                    Recipe name
                                </label>
                                <input
                                    required
                                    defaultValue={name}
                                    type='text'
                                    name='recipeName'
                                    placeholder="Recipe name"
                                    className='block w-full p-3 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className='flex flex-col gap-2 '>
                                    <label className='text-xl font-medium' htmlFor='category'>
                                        Category
                                    </label>
                                    <select
                                        defaultValue={category}
                                        name='category'
                                        id='category'
                                        className='border p-3 rounded-md bg-white border-gray-200  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                    >
                                        <option value=''>Category</option>
                                        <option value='salad'>Salad</option>
                                        <option value='pizza'>Pizza</option>
                                        <option value='soup'>Soups</option>
                                        <option value='dessert'>Desserts</option>
                                        <option value='drinks'>Drinks</option>
                                        <option value='popular'>Popular</option>
                                        <option value='offered'>Offered</option>
                                    </select>
                                </div>

                                <div>
                                    <label className='text-xl font-medium' htmlFor='emailAddress'>
                                        Price
                                    </label>
                                    <input
                                        required
                                        defaultValue={price}
                                        id='price'
                                        type='text'
                                        placeholder="Price"
                                        name='price'
                                        className='block w-full p-3 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='text-xl font-medium' htmlFor='description'>
                                    Recipe Details
                                </label>
                                <textarea
                                    defaultValue={recipe}
                                    className='block w-full px-4 py-5 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                    name='recipeDetails'
                                    id='recipeDetails'
                                ></textarea>
                            </div>

                            <div className='flex justify-end mt-6'>
                                <button className='flex text-xl items-center px-7 p-3.5 bg-gradient-to-r from-[#835D23] to-[#B58130] text-white font-semibold rounded-sm'>
                                    Add Item  <FaUtensils />
                                </button>
                            </div>
                        </div>
                    </form>
                </Modal>
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
                                            <button
                                                onClick={() => {
                                                    setShowModal(!showModal)
                                                    setUpdateMenu(item)
                                                }} className="p-2 pl-3 pb-2.4 rounded-[5px] text-xl bg-[#d1a054] text-white"><FaRegEdit /></button>
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
        </Fragment>
    );
};

export default ManageItems;