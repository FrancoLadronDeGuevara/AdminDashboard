import { Menu } from "antd";
import {AppstoreOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SideMenu(){
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState('/');

    useEffect(()=>{
        const pathName = location.pathname;
        setSelectedKeys(pathName)

    }, [location.pathname])

    return(
        <div className="SideMenu">
            <Menu
            className="SideMenuVertical"
            mode="vertical"
            onClick={(item) =>{
                navigate(item.key)
            }}
            selectedKeys={[selectedKeys]}
            items={[
                {
                    label: "Dasboard",
                    icon:<AppstoreOutlined/>,
                    key: "/",
                },
                {
                    label: "Inventory",
                    icon:<ShopOutlined/>,
                    key: "/inventory",
                },
                {
                    label: "Orders",
                    icon: <ShoppingCartOutlined/>,
                    key: "/orders",
                },
                {
                    label: "Customers",
                    icon:<UserOutlined/>,
                    key: "/customers",
                },
            ]}>

            </Menu>
        </div>
    )
}