import { Avatar, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { getCustomers } from "../../API/db";

export default function Customers(){
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    useEffect(()=>{
        setLoading(true);

        getCustomers().then((res)=>{
            setDataSource(res.users)
            setLoading(false);
        })
    }, [])

    return(
        <Space size={20} direction="vertical">
            <Table columns={[
                {
                    title: 'Photo',
                    dataIndex: 'image',
                    render: (link) =>{
                        return <Avatar src={link}/>
                    }
                },
                {
                    title: 'First Name',
                    dataIndex: 'firstName'
                },
                {
                    title: 'Lastname',
                    dataIndex: 'lastName'
                },
                {
                    title: 'Email',
                    dataIndex: 'email'
                },
                {
                    title: 'Phone',
                    dataIndex: 'phone'
                },
                {
                    title: 'Address',
                    dataIndex: 'address',
                    render: (address)=>{
                        return <span>{address.address}, {address.city}</span>
                    }
                },
                ]}
                dataSource={dataSource}
                loading={loading}
                pagination={{
                    pageSize:5
                }}
                >

            </Table>
        </Space>
    )
}