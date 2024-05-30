import { FaUtensils } from "react-icons/fa";
import SectionTitle from "../../components/SectionTitle";
import { toast } from "react-toastify";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddItems = () => {
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.recipeName.value;
        const category = form.category.value;
        const recipe = form.recipeDetails.value;
        const price = form.price.value;
        const image = form.image.files[0];
        const formData = new FormData();
        formData.append('image', image)

        try {
            const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_KEY}`, formData);
            const imageURL = data.data.display_url

            const item = {
                name,
                recipe,
                image: imageURL,
                category,
                price: parseFloat(price)
            }

            await axiosSecure.post('/menus', item)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            icon: "success",
                            title: `${name} is added to the menu`,
                            showConfirmButton: false,
                            timer: 3000
                        });
                    }
                    form.reset()
                })
        }
        catch (err) {
            toast.error(err.message)
        }
    }

    return (
        <div>
            <SectionTitle subHeading={"what's new?"} heading={"add anitem"}></SectionTitle>
            <div className="w-[90%] mx-auto">
                <form onSubmit={handleSubmit}>
                    <div className="bg-[#F3F3F3] space-y-3 md:space-y-5 p-2.5 md:p-5 lg:p-10">
                        <div>
                            <label className='text-xl font-medium' htmlFor='emailAddress'>
                                Recipe name
                            </label>
                            <input
                                required
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
                                    name='category'
                                    id='category'
                                    defaultValue='default'
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
                                className='block w-full px-4 py-5 mt-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
                                name='recipeDetails'
                                id='recipeDetails'
                            ></textarea>
                        </div>

                        <input type="file" name="image" className="file-input w-full max-w-xs" />

                        <div className='flex justify-end mt-6'>
                            <button className='flex text-xl items-center px-7 p-3.5 bg-gradient-to-r from-[#835D23] to-[#B58130] text-white font-semibold rounded-sm'>
                                Add Item  <FaUtensils />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItems;