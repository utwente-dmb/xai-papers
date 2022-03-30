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

function Year() {
	const papers: Array<Paper> = useFilteredPapers().sort((a, b) => a.Year.localeCompare(b.Year))
	firstYear = parseInt(papers[0]["Year"])
	lastYear = parseInt(papers[papers.length - 1]["Year"])
	return [firstYear, lastYear]
}

function Chart(): JSX.Element {
 
	[firstYear, lastYear] = Year()

	const [chart, setChart] = useState("Connected Graph")

	const [type, setType] = useState("Type of Data")

	const [current, setCurrent] = useState(0)

	const timer = setTimeout(() => {
		console.log(current, sliderYear, firstYear, lastYear)
		const diff = sliderYear - firstYear
		if (current < diff - 1 && sliderYear != lastYear) {
			setCurrent(current + 1)
			chartUpdateSpeed = 1
		} else if (current < diff && sliderYear != lastYear) {
			setCurrent(current + 1)
			chartUpdateSpeed = 1
		} else if (current < diff && sliderYear === lastYear) {
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

	const graphMap: { [key: string]: {
		withSelect: boolean,
		element: JSX.Element,
		description: string,
	} } = {
		"Connected Graph": {
			withSelect: false,
			element: (<ConnectedChart />),
			description: "Connected Graph Description"
		},
		"Circle Packing": {
			withSelect: true,
			element: <CirclePackingChart type={type} />,
			description: "Circle Packing Description"
		},
		"Line Chart": {
			withSelect: true,
			element: <GrowthLineChart type={type} />,
			description: "The line chart below displays the increase in the number of papers on the subject of Explainable AI over time. The filtering option on the right allows you to select a particular tag and see the developments over time associated with that specific tag.",
		},
		"Race Chart": {
			withSelect: true,
			element: (
				<>
					<Col span={12}>
						<Slider
							min={firstYear}
							max={lastYear}
							onChange={HandleSlider}
							tooltipVisible={true}
							tooltipPlacement="bottom"
							defaultValue={sliderYear}
						/>
					</Col>
					<RaceChart type={type} current={current} />
				</>
			),
			description: "The race chart below is an interactive graph which shows the the increase in the number of papers over time. A specific tag can be selected on the right along with using the slider on the left to get insight on a particular year"
		}
	}
	return (
		<>
			<Row justify="space-between" style={{marginBottom: 12}}>
				<Col span={12}>
					<Group defaultValue={"Connected Graph"} buttonStyle="solid" onChange={HandleChartChange}>
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
			
			<Row justify="center">
				<Col span={12}>
					{graphMap[chart].description}
				</Col>
			</Row>
			{graphMap[chart].element}


		</>
	)
}

export default Chart
