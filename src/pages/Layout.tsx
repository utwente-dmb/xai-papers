import { useState, useEffect } from "react"
import "antd/dist/antd.css"
import {
	Layout,
	Menu,
	PageHeader,
	Button,
	Row
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
import { pathToPage, pageToPath, baseUrl } from "../utils"

const { Content, Sider } = Layout
function DefaultLayout() {

	const location = useLocation()
	const navigate = useNavigate()

	const [sideBarCollapsed, setSideBarCollapsed] = useState(false)
	const [selectedKeys, setSelectedKeys] = useState<string[]>()

	useEffect(() => {
		setSelectedKeys([pathToPage(location.pathname)])
	}, [])

	const onItemClick = ({ key }: { key: string }) => {
		navigate(pageToPath(key))
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
					onClick={onItemClick}
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
				{/* Header
				<PageHeader style={{ top: 0, width: "100%", zIndex: 1}}>
					<div>
						<Row>
							<img src={process.env.PUBLIC_URL + "/UT_Logo_Horizontal_Black.png"}/>
							<img src={process.env.PUBLIC_URL + "/IKIM_Logo.png"}/>
						</Row>
						<p>
							Dataset collected by Nauta et al. as described in
							<br/>
							<a href="https://arxiv.org/abs/2201.08164" target="_blank" rel="noreferrer">
								&quot;From Anecdotal Evidence to Quantitative Evaluation Methods: A Systematic Review on Evaluating Explainable AI&quot;
							</a>
							<small>
								&ensp;(preprint, 2022)
							</small>
							<br/>
							<small>
								This dataset contains papers on explainable AI published in 2014-2020 at conferences AAAI, IJCAI, NeurIPS, ICML, ICLR, CVPR, ICCV, ACL, WWW, ICDM, KDD and SIGIR
							</small>
						</p>
					</div>
				</PageHeader> */}

				{/* Main Content */}
				<Content style={{ padding: "0 50px", marginTop: 20 }}>
					<Routes>
						<Route path={`${baseUrl}`} element={<LandingPage />}/>
						<Route path={`${baseUrl}papers`} element={<Papers />}/>
						<Route path={`${baseUrl}charts`} element={<Charts />}/>
						<Route path={`${baseUrl}add-paper`} element={<AddPaper />}/>
					</Routes>
				</Content>
			</Layout>
		</Layout>
	)
}

export default DefaultLayout