import { Row, Select, Col, Radio } from "antd"
import { ConnectedChart, CirclePackingChart, GrowthLineChart, RaceChart, ResetData } from "./chart"
import { useState } from "react"
import { typeArray } from "../utils"

const { Option } = Select
const { Button, Group } = Radio

function Chart(): JSX.Element {


	const [chart, setChart] = useState("Line Chart")

	const [type, setType] = useState("Type of Data")

	function HandleChartChange(e: any) {
		setChart(e.target.value)
		ResetData()
	}

	function HandleChange(value: string) {
		setType(value)
		ResetData()
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
			description: "The line chart below displays the increase in the number of papers on the subject of Explainable AI over time. The filtering option on the right allows you to select a particular tag and see the developments over time associated with that specific tag.",
		},
		"Bar Chart": {
			withSelect: true,
			element: <RaceChart type={type} />,
			description: "The bar chart shows the distribution of tags"
		},
		"Connected Graph": {
			withSelect: false,
			element: (<ConnectedChart />),
			description: "The connected graph below displays all the papers in the research as nodes. The thickness of the edges is dependent upon the number of tag links that two papers have. Filtering options can be applied and the nodes can be clicked to reveal a link to the particular paper."
		},
		"Circle Packing": {
			withSelect: true,
			element: <CirclePackingChart type={type} />,
			description: "The circle packing chart below displays the hierarchic organization which exists within the papers on Explainable AI. A specific tag can be selected to show the distribution that occurs for that tag. Each of the circles can be hovered over and clicked on to display more information"
		},
	}
	return (
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
	)
}

export default Chart
