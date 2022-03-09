import { useState } from "react";
import {
    Layout,
    Menu,
  } from "antd";
import {
PlusCircleOutlined,
DotChartOutlined,
MenuFoldOutlined,
MenuUnfoldOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

function SideBar(): JSX.Element {

    const [collapsed, setCollapsed] = useState(true);

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(collapsed, type) => {
                console.log(
                    "Ah, so this gets logged in the browser console using F12",
                    collapsed,
                    type
                );
                setCollapsed(collapsed);
            }}
            style={{
            overflow: "auto",
            height: "100vh",
            position: "sticky",
            top: 0,
            left: 0,
            }}
            trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        >
            <Menu theme="dark" mode="inline">
            <Menu.Item key="1" icon={<PlusCircleOutlined />}>
                Add Paper
            </Menu.Item>
            <Menu.Item key="2" icon={<DotChartOutlined />}>
                Charts
            </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default SideBar