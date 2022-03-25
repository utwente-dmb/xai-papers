import { Row, Select, Col, Radio, Slider, InputNumber } from "antd"
import { ConnectedChart, CirclePackingChart, GrowthLineChart, RaceChart, ResetData, Year } from "./charts"
import { useEffect, useState } from "react"
import { typeArray } from "../utils"

const { Option } = Select
const { Button, Group } = Radio

let firstYear: number
let lastYear: number

let sliderYear = 99999999999

function Chart(): JSX.Element {
	[firstYear, lastYear] = Year()

	const [chart, setChart] = useState("Connected Graph")

	const [type, setType] = useState("Type of Data")

	const [current, setCurrent] = useState(0)
	
	const timer = setTimeout(() => {
		console.log(current, sliderYear, firstYear)
		if (current < lastYear - firstYear && current < sliderYear - firstYear) {
			setCurrent(current + 1)
		}
	}, 1000)

	if (sliderYear == 99999999999) {
		sliderYear = lastYear
		clearTimeout(timer)
	}

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

	function HandleSlider(sliderValue: number) {
		sliderYear = sliderValue
		ResetData()
		setCurrent(0)
		clearTimeout(timer)
		console.log(sliderValue, sliderYear, firstYear, lastYear, current, sliderYear - firstYear)
	}

	// console.log(current, firstYear, lastYear)

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
				<Row>
					<Col span={12}>
						<Slider
							min={firstYear}
							max={lastYear}
							onChange={HandleSlider}
							tooltipVisible={true}
							defaultValue={sliderYear}
						/>
					</Col>
					<Col offset={8}>
						<Select defaultValue={type} style={{ width: 240 }} onChange={HandleChange}>
							{typeArray.map((elem: any) =>
								<Option key={elem} value={elem}>
									{elem}
								</Option>
							)}
						</Select>
					</Col>
				</Row>
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
