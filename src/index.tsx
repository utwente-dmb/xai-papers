import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { store } from "./redux"
import { BrowserRouter } from "react-router-dom"
import { AliveScope } from "react-activation"
import { Provider } from "react-redux"
import { Layout } from "./pages"
import reportWebVitals from "./reportWebVitals"

ReactDOM.render(
	<React.StrictMode>
		<AliveScope>
			<Provider store={store}>
				<BrowserRouter>
					<Layout />
				</BrowserRouter>
			</Provider>
		</AliveScope>
	</React.StrictMode>,
	document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
