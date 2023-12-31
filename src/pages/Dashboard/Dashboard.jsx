import { DollarCircleOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getOrders, getRevenue, getInventory, getCustomers } from "../../API/db";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard() {
    const [orders, setOrders] = useState(0);
    const [inventory, setInventory] = useState(0);
    const [customers, setCustomers] = useState(0);
    const [revenue, setRevenue] = useState(0);

    useEffect(() => {
        getOrders().then(res => {
            setOrders(res.total)
            setRevenue(res.discountedTotal)
        })
        getInventory().then(res => { setInventory(res.total) })
        getCustomers().then(res => { setCustomers(res.total) })
    }, [])

    return (
        <>
            <Space size={20} direction="vertical" style={{paddingTop: 5}}>
                <Space direction="horizontal" className="dashboard-cards">
                    <DashboardCard icon={<ShoppingCartOutlined style={{ color: "green", backgroundColor: "rgba(0,255,0,0.25)", borderRadius: 20, fontSize: 24, padding: 8 }} />} title={"Orders"} value={orders} />
                    <DashboardCard icon={<ShoppingOutlined style={{ color: "blue", backgroundColor: "rgba(0,0,255,0.25)", borderRadius: 20, fontSize: 24, padding: 8 }} />} title={"Inventory"} value={inventory} />
                    <DashboardCard icon={<UserOutlined style={{ color: "purple", backgroundColor: "rgba(0,255,255,0.25)", borderRadius: 20, fontSize: 24, padding: 8 }} />} title={"Customers"} value={customers} />
                    <DashboardCard icon={<DollarCircleOutlined style={{ color: "red", backgroundColor: "rgba(255,0,0,0.25)", borderRadius: 20, fontSize: 24, padding: 8 }} />} title={"Revenue"} value={revenue} />
                </Space>
                <Space className="dashboard-orders-chart">
                    <RecentOrders />
                    <DashboardChart />
                </Space>
            </Space>
        </>
    )
}

function DashboardCard({ title, value, icon }) {
    return (
        <Card>
            <Space direction="horizontal">
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    )
}

function RecentOrders() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        getOrders().then((res) => {
            setDataSource(res.products.splice(0, 3))
            setLoading(false)
        })
    }, [])

    return (
        <div className="recent-orders">
            <Typography.Text strong>Recent Orders</Typography.Text>
            <Table
                columns={[
                    {
                        title: 'Title',
                        dataIndex: 'title'
                    },
                    {
                        title: 'Quantity',
                        dataIndex: 'quantity'
                    },
                    {
                        title: 'Price',
                        dataIndex: 'discountedPrice',
                        render: (value) => {
                            return <span>${value}</span>
                        }
                    },
                ]}
                loading={loading}
                dataSource={dataSource}
                pagination={false}
            ></Table>
        </div>
    )
}

function DashboardChart() {
    const [revenueData, setRevenueData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        getRevenue().then((res) => {
            const labels = res.carts.map(cart => {
                return `User-${cart.userId}`
            })
            const data = res.carts.map(cart => {
                return cart.discountedTotal
            })
            const dataSource = {
                labels,
                datasets: [
                    {
                        label: 'Revenue',
                        data: data,
                        backgroundColor: 'rgba(255, 0, 0, 1)',
                    }
                ],
            };

            setRevenueData(dataSource);
        })
    }, [])


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };


    return (
        <div className="chart-revenue">
            <Typography.Text strong>Order Revenue</Typography.Text>
            <Card>
                <Bar options={options} data={revenueData} />
            </Card>
        </div>
    );
}