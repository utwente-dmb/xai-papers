import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { store } from "./redux"
import { HashRouter } from "react-router-dom"
import { Provider } from "react-redux"
import reportWebVitals from "./reportWebVitals"
import { useState, useEffect } from "react"
import "antd/dist/antd.css"
import {
	Layout,
	Menu,
	Button,
	Typography
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
import { Papers, AddPaper, Charts, Home } from "./pages"
import { Page, Path } from "./types"
import { pathToPage, pageToPath } from "./utils"

const { Content, Sider } = Layout
const { Text } = Typography

ReactDOM.render(
	// <React.StrictMode>
	<Provider store={store}>
		<HashRouter >
			<DefaultLayout />
		</HashRouter>
	</Provider>
	// </React.StrictMode>
	,
	document.getElementById("root")
)

function DefaultLayout() {

	const location = useLocation()
	const navigate = useNavigate()

	const [sideBarCollapsed, setSideBarCollapsed] = useState(false)
	const [selectedKeys, setSelectedKeys] = useState<Page[]>()

	useEffect(() => {
		setSelectedKeys([pathToPage(location.pathname as Path)])
	}, [location.pathname])

	const onClickMenuItem = ({ key }: { key: string }) => {
		window.scrollTo(0, 0)
		navigate(pageToPath(key as Page))
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
					onClick={onClickMenuItem}
					selectedKeys={selectedKeys}
				>
					<Menu.Item key="landing" icon={<HomeOutlined />}>Home</Menu.Item>
					<Menu.Item key="papers" icon={<UnorderedListOutlined />}>Papers</Menu.Item>
					<Menu.Item key="charts" icon={<DotChartOutlined />}>Charts</Menu.Item>
					<Menu.Item key="add-paper" icon={<PlusCircleOutlined />}>Add Paper</Menu.Item>
				</Menu>
					
				{showExplainableAIText 
					? <Text style={{ left: 15, color: "dodgerblue", position: "absolute", bottom: 15}}>Overview of Methods on Explainable AI</Text> 
					: null}

			</Sider>

			<Layout>
				{/* Main Content */}
				<Content style={{ padding: "0 50px", marginTop: 20 }}>
					<Routes>
						<Route path={"/"} element={<Home />}/>
						<Route path={"/papers"} element={<Papers />}/>
						<Route path={"/charts"} element={<Charts />}/>
						<Route path={"/add-paper"} element={<AddPaper />}/>
					</Routes>
				</Content>
			</Layout>
		</Layout>
	)
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
