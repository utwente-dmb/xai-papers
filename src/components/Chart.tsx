import { Row, Select, Col, Radio } from "antd"
import { ConnectedChart, CirclePackingChart, GrowthLineChart, RaceChart, ResetData, firstYear, lastYear } from "./charts"
import { useEffect, useState } from "react"
import { typeArray } from "../utils"

const { Option } = Select
const { Button, Group } = Radio

function Chart(): JSX.Element {
	const [chart, setChart] = useState("Connected Graph")

	const [type, setType] = useState("Type of Data")

	const [current, setCurrent] = useState(0)
	const timer = setTimeout(() => {
		if (current < lastYear - firstYear) {
			setCurrent(current + 1)
		}
	}, 1000)

	function HandleChartChange(e: any) {
		setChart(e.target.value)
		ResetData()
		setCurrent(0)
		clearTimeout(timer)
	}

	function HandleChange(value: string) {
		setType(value)
		ResetData()
		setCurrent(0)
		clearTimeout(timer)
	}
	console.log(current, firstYear, lastYear)

	const graphMap: { [key: string]: JSX.Element } = {
		"Connected Graph": (<ConnectedChart />),
		"Tableau": (
			<>
				<Col offset={20}>
					<Select defaultValue={type} style={{ width: 240 }} onChange={HandleChange}>
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
					<Select defaultValue={type} style={{ width: 240 }} onChange={HandleChange}>
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
					<Select defaultValue={type} style={{ width: 240 }} onChange={HandleChange}>
						{typeArray.map((elem: any) =>
							<Option key={elem} value={elem}>
								{elem}
							</Option>
						)}
					</Select>
				</Col>
				<RaceChart type={type} current={current} />
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
