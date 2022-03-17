import { useState } from "react"
import {
	Layout,
	Menu,
	PageHeader
} from "antd"
import {
	PlusCircleOutlined,
	DotChartOutlined,
	InfoCircleOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
} from "@ant-design/icons"
import "antd/dist/antd.css" 
import { Routes, Route, useNavigate } from "react-router-dom"
import { Papers, About, AddPaper } from "../pages"

const { Content, Sider } = Layout

const baseUrl = "/DMBLiteratureWebsite/"

function DefaultLayout() {

	const navigate = useNavigate()
	const [sideBarCollapsed, setSideBarCollapsed] = useState(true)

	const onItemClick = ({ key }: { key: string }) => {

		switch (key) {
		case "papers": 
			navigate(`${baseUrl}`)
			break
        
		case "add-paper":
			navigate(`${baseUrl}add-paper`)
			break
        
		case "about": 
			navigate(`${baseUrl}about`)
			break

		default: 
			navigate(`${baseUrl}`)
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
				<Menu mode="inline" onClick={onItemClick}>
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
				{/* Header */}
				<PageHeader style={{ top: 0, width: "100%", zIndex: 1}}>
					<div>
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
				</PageHeader>

				{/* Main Content */}
				<Content style={{ padding: "0 50px", marginTop: 20 }}>
					<Routes>
						<Route path={`${baseUrl}`} element={<Papers />}/>
						<Route path={`${baseUrl}add-paper`} element={<AddPaper />}/>
						<Route path={`${baseUrl}about`} element={<About />}/>
					</Routes>
				</Content>
			</Layout>
		</Layout>
	)
}

export default DefaultLayout