import React from "react"
import "antd/dist/antd.dark.css"
import {
	Layout,
} from "antd"
import { Link } from "react-router-dom"
import { Filters, SideBar, Charts, Papers } from "../components"

const {  Content } = Layout

function App() {
  
	return (
		<>
			<nav>
				<Link to="/about">About</Link>
			</nav>
			<Charts />
			<Filters />
			<Papers />

		</>
	)
}

export default App
