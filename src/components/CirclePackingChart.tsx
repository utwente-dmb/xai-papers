import { ResponsiveCirclePackingCanvas } from "@nivo/circle-packing"
import { useFilteredPapers } from "../hooks"
import { Paper } from "../types"
import { Select } from "antd"
import { Col } from "antd"

const { Option } = Select

const theme = {
	"background": "#000000",
	"textColor": "#ffffff",
	"fontSize": 14,
	"tooltip": {
		"container": {
			"background": "#000000",
			"color": "#f4ebeb",
			"fontSize": 12
		},
		"basic": {},
		"chip": {},
		"table": {},
		"tableCell": {},
		"tableCellValue": {}
	}
}

let data: any = {
	"name": "root",
	"children": [

	]
}

const columns: Array<keyof Paper> = ["Type of Data", "Type of Problem", "Type of Model to be Explained", "Type of Task", "Type of Explanation", "Method used to explain"]

function GenerateData(columnValue: string) {
	const papers: any = useFilteredPapers()
	const count: any = {
		"Type of Data": {}, "Type of Problem": {}, "Type of Model to be Explained": {}, "Type of Task": {}, "Type of Explanation": {},
		"Method used to explain": {}
	}

	papers.forEach(function (value: any) {
		for (const col of columns) {
			for (const elem of value[col]) {
				if (count[col][elem]) {
					count[col][elem] += 1
				} else {
					count[col][elem] = 1
				}
			}
		}
	})
	data["children"] = []
	for (const [key, value] of Object.entries(count[columnValue])) {
		data["children"].push({ name: key, value: value })
	}

	return data
}

function handleChange(value: any) {
	// const acsd = GenerateData(value)
}

function SelectForChart() {
	const options = columns.map(elem =>
		<Option key={elem} value={elem}>
			{elem}
		</Option>)
	return (
		<Select defaultValue="Type of Data" style={{ width: 240 }} onChange={handleChange}>
			{options}
		</Select>)
}

function CirclePackingChart() {
	data = GenerateData("Type of Data")
	return (
		<Col span={24} style={{
			height: "500px",
			width: "500px",
		}}>
			<SelectForChart></SelectForChart>

			<ResponsiveCirclePackingCanvas
				data={data}
				margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
				id="name"
				colors={{ scheme: "spectral" }}
				colorBy="id"
				childColor={{
					from: "color",
					modifiers: [
						[
							"darker",
							3
						]
					]
				}}
				padding={1}
				leavesOnly={true}
				enableLabels={true}
				label="id"
				labelTextColor={{
					from: "color",
					modifiers: [
						[
							"darker",
							2.4
						]
					]
				}}
				borderColor={{
					from: "color",
					modifiers: [
						[
							"darker",
							0.3
						]
					]
				}}
				animate={false}
				theme={theme}
			/>
		</Col>
	)
}

export default CirclePackingChart