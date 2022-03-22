import { useState } from "react"
import { ResponsiveCirclePackingCanvas } from "@nivo/circle-packing"
import { useFilteredPapers } from "../../hooks"
import { Paper } from "../../types"
import { typeArray } from "../../utils"
import { Select, Col } from "antd"

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

let data: {
	name: string,
	children: Array<{
		name: string,
		value: number
	}>
} = {
	name: "root",
	children: [

	]
}

function GenerateData(columnValue: string) {
	const papers: Paper[] = useFilteredPapers()
	const count: { [key: string]: { [key: string]: number } } = {
		"Type of Data": {},
		"Type of Problem": {},
		"Type of Model to be Explained": {},
		"Type of Task": {},
		"Type of Explanation": {},
		"Method used to explain": {}
	}

	papers.forEach(function (value: any) {
		for (const col of typeArray) {
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


function CirclePackingChart() {
	const [type, setType] = useState("Type of Data")

	function handleChange(value: string) {
		setType(value)
	}

	data = GenerateData(type)
	return (
		<div style={{ height: "450px", width: "100%", marginTop: "20px" }}>
			<Col offset={20}>
				<Select defaultValue={type} style={{ width: 240 }} onChange={handleChange}>
					{typeArray.map(elem =>
						<Option key={elem} value={elem}>
							{elem}
						</Option>
					)}
				</Select>
			</Col>
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
			/>
		</div>
	)
}

export default CirclePackingChart