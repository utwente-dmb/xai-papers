import { Row, Col, Radio } from "antd"
import { ConnectedChart, CirclePackingChart, GrowthLineChart } from "./charts"
import { useState } from "react"

const { Button, Group } = Radio

const graphMap: { [key: string]: JSX.Element} = {
	"Connected Graph": (<ConnectedChart />),
	"Tableau": (<CirclePackingChart />),
	"LineChart": (<GrowthLineChart />)
}

function Chart(): JSX.Element {
	const [chart, setChart] = useState("Connected Graph")

	function HandleChartChange(e: any) {
		setChart(e.target.value)
	}

	return (
		<>
			<Row gutter={10}>
				<Col span={24}>
					<Group defaultValue={"Connected Graph"} buttonStyle="solid" onChange={HandleChartChange}>
						{Object.keys(graphMap).map(elem =>
							<Button key={elem} value={elem}>
								{elem}
							</Button>)}
					</Group>
				</Col>
			</Row>
			<Row gutter={10}>
				<Col span={24}>
					{graphMap[chart]}
				</Col>
			</Row>
		</>
	)
}

export default Chart
