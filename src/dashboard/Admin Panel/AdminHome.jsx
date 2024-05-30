import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaUsers, FaWallet } from "react-icons/fa";
import Loader from "../../components/Loader";
import { CiDeliveryTruck } from "react-icons/ci";
// chart
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Legend } from 'recharts';
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = [], isLoading } = useQuery({
        queryKey: ['admin-status'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/admin-status')
            return data
        }
    })

    const { data: chartData = [] } = useQuery({
        queryKey: ['order-status'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/order-status');
            return data;
        }
    })

    // pi chart data
    const pieChartData = chartData.map(data => {
        return { name: data.category, value: data.revenue }
    })

    // custom shape for the bar chart
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    // custom shape for pi chart
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    console.log(chartData)

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="p-5">
            <h2 className="text-4xl font-semibold">Hi, Welcome {user.displayName ? user.displayName + '!' : 'Back!'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[25px] mt-6">
                <div className="bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] flex justify-center items-center gap-5 p-10 rounded-lg">
                    <div className="text-white text-5xl">
                        <FaWallet />
                    </div>
                    <div className="flex flex-col ">
                        <h1 className="text-5xl text-white font-bold">{stats?.revenue}</h1>
                        <p className="text-2xl text-white ml-2">Revenue</p>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] flex justify-center items-center gap-5 p-10 rounded-lg">
                    <div className="text-white text-5xl">
                        <FaUsers />
                    </div>
                    <div className="flex flex-col ">
                        <h1 className="text-5xl text-white font-bold">{stats.users}</h1>
                        <p className="text-2xl text-white">Customers</p>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-[#FE4880] to-[#FECDE9] flex justify-center items-center gap-5 p-10 rounded-lg">
                    <div className="text-white text-5xl">
                        <FaWallet />
                    </div>
                    <div className="flex flex-col ">
                        <h1 className="text-5xl text-white font-bold">{stats.menuItems}</h1>
                        <p className="text-2xl text-white">Products</p>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-[#6AAEFF] to-[#B6F7FF] flex justify-center items-center gap-5 p-10 rounded-lg">
                    <div className="text-white text-5xl">
                        <CiDeliveryTruck />
                    </div>
                    <div className="flex flex-col ">
                        <h1 className="text-5xl text-white font-bold">{stats.orders}</h1>
                        <p className="text-2xl text-white ">Orders</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col-reverse md:flex-row justify-center items-center mt-10">
                <div>
                    <BarChart
                        width={500}
                        height={500}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div>
                    <PieChart width={400} height={400}>
                        <Legend></Legend>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;