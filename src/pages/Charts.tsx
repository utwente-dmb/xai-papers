import { Filters } from "../components"
import { Row, Select, Col, Radio, RadioChangeEvent } from "antd"
import { ConnectedChart, CirclePackingChart, GrowthLineChart, BarChart } from "../components"
import React, { useState } from "react"
import { typeArray } from "../utils"
import { Paper } from "../types"

const { Option } = Select
const { Button, Group } = Radio

function App() {
	const [chart, setChart] = useState("Line Chart")
	const [type, setType] = useState<keyof Paper>("Type of Data")

	function HandleChartChange(e: RadioChangeEvent): void {
		setChart(e.target.value)
	}

	function HandleChange(value: keyof Paper) {
		setType(value)
	}

	const graphMap: {
		[key: string]: {
			withSelect: boolean,
			element: JSX.Element,
			description: string,
		}
	} = {
		"Line Chart": {
			withSelect: true,
			element: <GrowthLineChart type={type} />,
			description: "The line chart displays the increase in the number of papers on the subject of Explainable AI over time (accumulative). The filtering option on the right allows you to select a particular attribute so that its development over time can be observed. It should be noted that papers can have multiple labels within a category so the sum of labels is greater than the number of papers in the database.",
		},
		"Bar Chart": {
			withSelect: true,
			element: <BarChart type={type} />,
			description: "The bar chart shows the distribution of labels for a selected attribute. The attribute shown can be changed with the dropdown menu on the right. It should be noted that papers can have multiple labels within a category so the total length of all the bars can be greater than the number of papers in the database."
		},
		"Connected Graph": {
			withSelect: false,
			element: (<ConnectedChart />),
			description: "The connected graph below displays papers as nodes in a graph. Papers are connected when they have many labels from our categorization in common. Filtering options can be applied and the nodes can be clicked to reveal a link to the particular paper."
		},
		"Circle Packing": {
			withSelect: true,
			element: <CirclePackingChart type={type} />,
			description: "The circle packing chart clusters the papers on Explainable AI based on a specific attribute. Select an attribute on the right. Each of the circles can be hovered over to see the title of the paper and clicked on to go to the paper itself."
		},
	}
	return (
		<>
			<Filters />
			<>
				<Row justify="space-between" style={{ marginBottom: 12 }}>
					{/* Chart Select Buttons */}
					<Col span={12}>
						<Group defaultValue={chart} buttonStyle="solid" onChange={HandleChartChange}>
							{Object.keys(graphMap).map(elem =>
								<Button key={elem} value={elem}>
									{elem}
								</Button>)}
						</Group>
					</Col>
					
					{/* If the current chart uses the type of X data, also render a Select for that */}
					{graphMap[chart].withSelect
						? <Select defaultValue={type} style={{ width: 240 }} onChange={HandleChange}>
							{typeArray.map((elem: keyof Paper) =>
								<Option key={elem} value={elem}>
									{elem}
								</Option>
							)}
						</Select>
						: null}
				</Row>

				{/* Description of the chart */}
				<Row justify="center" style={{ marginBottom: 8 }}>
					<Col span={12}>
						{graphMap[chart].description}
					</Col>
				</Row>

				{/* The chart itself */}
				{graphMap[chart].element}

			</>
		</>
	)
}

export default App
