import { MdAdminPanelSettings, MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import SectionTitle from "../../components/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import { FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Cart = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            try {
                const { data } = await axiosSecure.get('/users')
                return data;
            }
            catch (err) {
                console.log(err?.message)
            }
        }
    })

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
                    const { data } = await axiosSecure.delete(`/users/${id}`)
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

    const handleMakeAdmin = (user) => {
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
                    const { data } = await axiosSecure.patch(`/users/admin/${user._id}`)
                    console.log(data);
                    if (data.modifiedCount > 0) {
                        Swal.fire({
                            title: "Success",
                            text: `${user.name} is an Admin Now!`,
                            icon: "success"
                        });
                    }
                    refetch()
                }
                catch (err) {
                    toast.error(err?.message)
                }
            }
        });
    }

    return (
        <div>
            <SectionTitle subHeading={'How many??'} heading={"MANAGE ALL USERS"}></SectionTitle>
            <div className=" w-[90%] mx-auto">
                <div className="uppercase text-xl md:text-2xl font-semibold">
                    <h1>total users: {users.length}</h1>
                </div>
                <div className="overflow-x-auto mt-5">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-[#D1A054] text-white text-base">
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row  */}
                            {
                                users.map((user, indx) => <tr key={user._id}>
                                    <td>{indx + 1}</td>
                                    <td>
                                        <h3>{user.name}</h3>
                                    </td>
                                    <td>
                                        <h3>{user.email}</h3>
                                    </td>
                                    <td>
                                        {
                                            user?.role === 'admin' ?
                                                <button className="p-2 rounded-[5px] text-xl bg-[#d1a054] text-white"> <MdAdminPanelSettings /></button>
                                                :
                                                <button onClick={() => handleMakeAdmin(user)} className="p-2 rounded-[5px] text-xl bg-[#d1a054] text-white"><FaUsers /></button>
                                        }
                                    </td>
                                    <th>
                                        <button onClick={() => handleDelete(user._id)} className="p-2 rounded-[5px] text-xl bg-[#B91C1C] text-white"><MdDelete /></button>
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