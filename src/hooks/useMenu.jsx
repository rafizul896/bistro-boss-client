import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useMenu = () => {
    const axiosSecure = useAxiosSecure();

    const { data: menu = [], refetch, isLoading } = useQuery({
        queryKey: ['menus'],
        queryFn: async () => {
            try {
                const { data } = await axiosSecure.get('/menus')
                return data;
            }
            catch (err) {
                console.log(err.message)
            }
        }
    })
    return { menu, refetch, isLoading };
};

export default useMenu;