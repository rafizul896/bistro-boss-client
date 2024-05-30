import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle";
import Loader from "../../../components/Loader";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments, isLoading } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/payments/${user.email}`)
            return data;
        }
    })
    console.log(payments);

    if (isLoading) {
        return <Loader />
    }
    return (
        <div>
            <SectionTitle subHeading={'At a Glance!'} heading={'payment history'}></SectionTitle>
            <div className=" w-[90%] mx-auto">
                <div className="uppercase text-xl md:text-2xl font-semibold">
                    <h1>total payments: {payments.length}</h1>
                </div>
                <div className="overflow-x-auto mt-5">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-[#D1A054] text-white text-base">
                            <tr>
                                <th></th>
                                <th>Email</th>
                                <th>Transaction Id</th>
                                <th>TOTAL PRICE</th>
                                <th>PAYENT DATE</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row  */}
                            {
                                payments.map((payment, indx) => <tr key={payment._id}>
                                    <th>
                                        {indx + 1}
                                    </th>
                                    <td>
                                        <h3>{payment.email}</h3>
                                    </td>
                                    <td>
                                        <h3>{payment.transactionId}</h3>
                                    </td>
                                    <td>
                                        <h3>{payment.price}</h3>
                                    </td>
                                    <td>
                                        <h3>{new Date(payment.date).toLocaleDateString()}</h3>
                                    </td>
                                    <td>
                                        <h3>{payment.status}</h3>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;