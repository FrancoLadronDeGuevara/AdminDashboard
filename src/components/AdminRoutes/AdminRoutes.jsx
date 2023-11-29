import { Routes, Route } from "react-router-dom";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Inventory from "../../pages/Inventory/Inventory";
import Orders from "../../pages/Orders/Orders";
import Customers from "../../pages/Customers/Customers";

export default function AdminRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Dashboard/>}></Route>
            <Route path="/inventory" element={<Inventory/>}></Route>
            <Route path="/orders" element={<Orders/>}></Route>
            <Route path="/customers" element={<Customers/>}></Route>
        </Routes>
    )
}