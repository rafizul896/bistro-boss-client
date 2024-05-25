import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const { data: cart = [],refetch } = useQuery({
        queryKey: ['cart',user?.email],
        queryFn: async () => {
            try {
                const { data } = await axiosSecure.get(`/carts?email=${user?.email}`);
                return data
            }
            catch (err) {
                console.log(err?.message)
            }
        }
    })
    return { cart,refetch }
};

export default useCart;