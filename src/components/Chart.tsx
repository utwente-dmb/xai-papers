import { Row, Select, Col, Radio } from "antd"
import { ConnectedChart, CirclePackingChart, GrowthLineChart, RaceChart, ResetData } from "./charts"
import { useState } from "react"
import { typeArray } from "../utils"

const { Option } = Select
const { Button, Group } = Radio

function Chart(): JSX.Element {
	const [chart, setChart] = useState("Connected Graph")

	function HandleChartChange(e: any) {
		setChart(e.target.value)
		ResetData()
	}

	const [type, setType] = useState("Type of Data")

	function handleChange(value: string) {
		setType(value)
		ResetData()
	}

	const graphMap: { [key: string]: JSX.Element } = {
		"Connected Graph": (<ConnectedChart />),
		"Tableau": (
			<>
				<Col offset={20}>
					<Select defaultValue={type} style={{ width: 240 }} onChange={handleChange}>
						{typeArray.map((elem: any) =>
							<Option key={elem} value={elem}>
								{elem}
							</Option>
						)}
					</Select>
				</Col>
				<CirclePackingChart type={type} />
			</>
		),
		"LineChart": (
			<>
				<Col offset={20}>
					<Select defaultValue={type} style={{ width: 240 }} onChange={handleChange}>
						{typeArray.map((elem: any) =>
							<Option key={elem} value={elem}>
								{elem}
							</Option>
						)}
					</Select>
				</Col>
				<GrowthLineChart type={type} />
			</>
		),
		"RaceChart": (
			<>
				<Col offset={20}>
					<Select defaultValue={type} style={{ width: 240 }} onChange={handleChange}>
						{typeArray.map((elem: any) =>
							<Option key={elem} value={elem}>
								{elem}
							</Option>
						)}
					</Select>
				</Col>
				<RaceChart type={type} />
			</>
		)
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
