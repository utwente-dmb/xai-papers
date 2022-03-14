import {
	Layout,
} from "antd"
import {  Routes, Route } from "react-router-dom"
import { Filters, SideBar } from "../components"
import { Papers, About, Charts } from "../pages"

const { Content } = Layout

function DefaultLayout() {

	return (
		<Layout>
			<SideBar />
			<Layout>
				<Content style={{ padding: "0 50px", marginTop: 20 }}>
					<Routes>
						<Route path="/" element={<Papers />}/>
						<Route path="/charts" element={<Charts />}/>
						<Route path="/about" element={<About />}/>
					</Routes>
				</Content>
			</Layout>
		</Layout>
	)
}

export default DefaultLayout