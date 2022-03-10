import React from "react"
import ReactDOM from "react-dom"
import Graphin, { Utils } from "@antv/graphin"


const data = Utils.mock(13).circle().graphin()

function TestChart() {
	console.log(data)

	return (
		<div className="TestChart">
			<Graphin data={data} layout={{ name: "concentric" }} />
		</div>
	)
}
export default TestChart
