import { Row, Select, Col, Radio, RadioChangeEvent } from "antd"
import { Filters } from "../components"
import { ConnectedChart, CirclePackingChart, GrowthLineChart, BarChart } from "../components/charts"
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
			description: "The line chart displays the increase in the number of papers on the subject of Explainable AI over time. The filtering option on the right allows you to select a particular attribute so that its development over time can be observed. It should be noted that papers can have multiple tags of the same attribute so the sum of tags is greater than the amount of papers in the database.",
		},
		"Bar Chart": {
			withSelect: true,
			element: <BarChart type={type} />,
			description: "The bar chart shows the distribution of tags for a selected attribute. The attribute shown can be changed with the dropdown menu on the right. It should be noted that papers can have multiple tags of the same attribute so the total amount of all the added bars will be greater than the amount of papers in the database."
		},
		"Connected Graph": {
			withSelect: false,
			element: (<ConnectedChart />),
			description: "The connected graph below displays all the papers in the research as nodes. The thickness of the edges is dependent upon the number of tag links that two papers have. Filtering options can be applied and the nodes can be clicked to reveal a link to the particular paper."
		},
		"Circle Packing": {
			withSelect: true,
			element: <CirclePackingChart type={type} />,
			description: "The circle packing chart displays the hierarchic organization which exists within the papers on Explainable AI. A specific attribute can be selected to show the distribution of tags associated with it. Each of the circles can be hovered over to see the title of the paper and clicked on to go to the paper itself."
		},
	}
	return (
		<>
			<Filters />
			<>
				<Row justify="space-between" style={{ marginBottom: 12 }}>
					<Col span={12}>
						<Group defaultValue={chart} buttonStyle="solid" onChange={HandleChartChange}>
							{Object.keys(graphMap).map(elem =>
								<Button key={elem} value={elem}>
									{elem}
								</Button>)}
						</Group>
					</Col>
					{graphMap[chart].withSelect
						? <Select defaultValue={type} style={{ width: 240 }} onChange={HandleChange}>
							{typeArray.map((elem: any) =>
								<Option key={elem} value={elem}>
									{elem}
								</Option>
							)}
						</Select>
						: null}
				</Row>

				<Row justify="center" style={{ marginBottom: 8 }}>
					<Col span={12}>
						{graphMap[chart].description}
					</Col>
				</Row>
				{graphMap[chart].element}


			</>
		</>
	)
}

export default App
