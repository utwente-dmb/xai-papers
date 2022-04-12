import { useState, useEffect } from "react"
import "antd/dist/antd.css"
import {
	Layout,
	Menu,
	Button,
} from "antd"
import {
	PlusCircleOutlined,
	DotChartOutlined,
	UnorderedListOutlined,
	LeftOutlined,
	RightOutlined,
	HomeOutlined
} from "@ant-design/icons"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { Papers, AddPaper, Charts, LandingPage } from "../pages"
import { pathToPage, pageToPath, Page, Path } from "../utils"

const { Content, Sider } = Layout
function DefaultLayout() {

	const location = useLocation()
	const navigate = useNavigate()

	const [sideBarCollapsed, setSideBarCollapsed] = useState(false)
	const [selectedKeys, setSelectedKeys] = useState<string[]>()

	useEffect(() => {
		setSelectedKeys([pathToPage(location.pathname as Path)])
	}, [])

	const customNavigate = ({ key }: { key: string }) => {
		window.scrollTo(0, 0)
		navigate(pageToPath(key as Page))
		setSelectedKeys([key])
	}

	const [showExplainableAIText, setShowExplainableAIText] = useState(false)

	useEffect(() => {
		if (!sideBarCollapsed) {
			setTimeout(() => {
				setShowExplainableAIText(!showExplainableAIText)
			}, 100)
		} else {
			setShowExplainableAIText(!showExplainableAIText)
		}
	}, [sideBarCollapsed])

	return (
		<Layout>
			{/* SideBar */}
			<Sider
				collapsible
				collapsed={sideBarCollapsed}
				style={{
					overflow: "auto",
					height: "100vh",
					position: "sticky",
					top: 0,
					left: 0,
				}}
				trigger={null}
				theme="light"
			>
				<Button 
					onClick={() => setSideBarCollapsed(!sideBarCollapsed)} 
					style={{width: "100%", height: 40}}
					icon={sideBarCollapsed ? <RightOutlined /> : <LeftOutlined />}	
				/>
				<Menu 
					mode="inline" 
					onClick={customNavigate}
					selectedKeys={selectedKeys}
				>
					<Menu.Item key="landing" icon={<HomeOutlined />}>Landing Page</Menu.Item>
					<Menu.Item key="papers" icon={<UnorderedListOutlined />}>Papers</Menu.Item>
					<Menu.Item key="charts" icon={<DotChartOutlined />}>Charts</Menu.Item>
					<Menu.Item key="add-paper" icon={<PlusCircleOutlined />}>Add Paper</Menu.Item>
				</Menu>
				{showExplainableAIText ? <div style={{marginTop: 12, marginLeft: 15}}>Overview of Methods on Explainable AI</div> : null}
			</Sider>

			<Layout>
				{/* Main Content */}
				<Content style={{ padding: "0 50px", marginTop: 20 }}>
					<Routes>
						<Route path={"/"} element={<LandingPage customNavigate={customNavigate} />}/>
						<Route path={"/papers"} element={<Papers />}/>
						<Route path={"/charts"} element={<Charts />}/>
						<Route path={"/add-paper"} element={<AddPaper />}/>
					</Routes>
				</Content>
			</Layout>
		</Layout>
	)
}

export default DefaultLayout