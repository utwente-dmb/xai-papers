import { Row, Select, Col, Radio, Slider, InputNumber } from "antd"
import { ConnectedChart, CirclePackingChart, GrowthLineChart, RaceChart, ResetData } from "./charts"
import { useEffect, useState } from "react"
import { typeArray } from "../utils"
import { useFilteredPapers } from "../hooks"
import { Paper } from "../types"

const { Option } = Select
const { Button, Group } = Radio

let firstYear: number
let lastYear: number

let sliderYear = 99999999999
let chartUpdateSpeed = 1
function Chart(): JSX.Element {
	function Year() {
		const papers: Array<Paper> = useFilteredPapers().sort((a, b) => a.Year.localeCompare(b.Year))
		firstYear = parseInt(papers[0]["Year"])
		lastYear = parseInt(papers[papers.length - 1]["Year"])
		return [firstYear, lastYear]
	} 
	[firstYear, lastYear] = Year()

	const [chart, setChart] = useState("Connected Graph")

	const [type, setType] = useState("Type of Data")

	const [current, setCurrent] = useState(0)

	const timer = setTimeout(() => {
		console.log(current, sliderYear, firstYear, lastYear)
		if (current < (sliderYear - firstYear) - 1 && sliderYear != lastYear) {
			setCurrent(current + 1)
			chartUpdateSpeed = 1000
		}
		else if (current < (sliderYear - firstYear) && sliderYear != lastYear) {
			setCurrent(current + 1)
			chartUpdateSpeed = 1000
		}

		else if (current < (sliderYear - firstYear) && sliderYear === lastYear) {
			setCurrent(current + 1)
			chartUpdateSpeed = 1000
		}
		console.log(chartUpdateSpeed)
	}, chartUpdateSpeed)

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

	const graphMap: { [key: string]: {
		withSelect: boolean,
		element: JSX.Element
	} } = {
		"Connected Graph": {
			withSelect: false,
			element: (<ConnectedChart />)
		},
		"Tableau": {
			withSelect: true,
			element: <CirclePackingChart type={type} />
		},
		"LineChart": {
			withSelect: true,
			element: <GrowthLineChart type={type} />
		},
		"RaceChart": {
			withSelect: true,
			element: (
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
					</Row>
					<RaceChart type={type} current={current} />
				</>
			)}
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
					{graphMap[chart].withSelect 
						? <Col offset={20}>
							<Select defaultValue={type} style={{ width: 240 }} onChange={HandleChange}>
								{typeArray.map((elem: any) =>
									<Option key={elem} value={elem}>
										{elem}
									</Option>
								)}
							</Select>
						</Col> 
						: null}
					{graphMap[chart].element}
				</Col>
			</Row>
		</>
	)
}

export default Chart
