import { Space, Table } from "antd";
import { useEffect, useState } from "react";
import { getOrders } from "../../API/db";


export default function Orders() {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        setLoading(true);

        getOrders().then((res) => {
            setDataSource(res.products);
            setLoading(false)
        })
    }, [])


    return (
        <Space size={20} direction="vertical">
            <Table columns={[
                {
                    title:"Title",
                    dataIndex:"title"
                },
                {
                    title:"Quantity",
                    dataIndex:"quantity"
                },
                {
                    title:"Price",
                    dataIndex:"discountedPrice",
                    render: (value)=>{
                        return <span><del>${value}</del></span>
                    }
                },
                {
                    title:"With Discounted Price",
                    dataIndex:"price",
                    render: (value)=>{
                        return <span>${value}</span>
                    }
                },
                {
                    title:"Total",
                    dataIndex:"total",
                    render: (value)=>{
                        return <span>${value}</span>
                    }
                },
            ]}
            dataSource={dataSource}
            loading={loading}
            >

            </Table>
        </Space>
    )
}