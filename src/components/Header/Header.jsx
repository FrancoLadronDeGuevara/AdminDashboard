import { Badge, Image, Space, Typography } from "antd";
import userImage from "../../assets/user.png";
import { BellFilled, MailOutlined } from "@ant-design/icons";

export default function Header() {
    return (
        <div className="Header">
            <Image width={40} src={userImage} />
            <Typography.Title>Admin Dashboard</Typography.Title>
            <Space>
                <Badge count={10} dot>
                    <MailOutlined style={{ fontSize: 24 }} />
                </Badge>
                <Badge count={20}>
                <BellFilled style={{ fontSize: 24 }} />
            </Badge>
        </Space>
        </div >
    )
}