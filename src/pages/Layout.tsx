import { useState } from "react"
import {
	Layout,
	Menu
} from "antd"
import {
	PlusCircleOutlined,
	DotChartOutlined,
	InfoCircleOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
} from "@ant-design/icons"
import { Routes, Route, useNavigate } from "react-router-dom"
import { Papers, About, AddPaper } from "../pages"

const { Content, Sider } = Layout

function DefaultLayout() {

	const navigate = useNavigate()
	const [sideBarCollapsed, setSideBarCollapsed] = useState(true)

	const onItemClick = ({key}: {key: string}) => {

		switch (key) {
		case "papers": 
			navigate("/")
			break
        
		case "add-paper":
			navigate("/add-paper")
			break
        
		case "about": 
			navigate("/about")
			break

		default: 
			navigate("/")
		}
	}
	return (
		<Layout>
			{/* SideBar */}
			<Sider
				collapsible
				collapsed={sideBarCollapsed}
				onCollapse={(collapsed) => {
					setSideBarCollapsed(collapsed)
				}}
				style={{
					overflow: "auto",
					height: "100vh",
					position: "sticky",
					top: 0,
					left: 0,
				}}
				trigger={sideBarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
			>
				<Menu theme="dark" mode="inline" onClick={onItemClick}>
					<Menu.Item key="papers" icon={<DotChartOutlined />}>
                        Papers
					</Menu.Item>
					<Menu.Item key="add-paper" icon={<PlusCircleOutlined />}>
                        Add Paper
					</Menu.Item>
					<Menu.Item key="about" icon= {<InfoCircleOutlined/>}>
                        About
					</Menu.Item>
				</Menu>
			</Sider>

			<Layout>
				<Content style={{ padding: "0 50px", marginTop: 20 }}>
					<Routes>
						<Route path="/" element={<Papers />}/>
						<Route path="/add-paper" element={<AddPaper />}/>
						<Route path="/about" element={<About />}/>
					</Routes>
				</Content>
			</Layout>
		</Layout>
	)
}

export default DefaultLayout