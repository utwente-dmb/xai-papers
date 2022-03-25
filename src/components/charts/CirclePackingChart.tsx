import { useState } from "react"
import { ResponsiveCirclePackingCanvas } from "@nivo/circle-packing"
import { useFilteredPapers } from "../../hooks"
import { Paper } from "../../types"
import { typeArray } from "../../utils"
import { Select, Col } from "antd"

const { Option } = Select

const theme = {
	"textColor": "#ffffff",
	"fontSize": 16,
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

type LineChartProps = {
	type: string
}


function CirclePackingChart({ type }: LineChartProps) {
	data = GenerateData(type)
	return (
		<div style={{ height: "600px", width: "100%", marginTop: "20px" }}>
			<ResponsiveCirclePackingCanvas
				data={data}
				margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
				id="name"
				colors={{ scheme: "pastel2" }}
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
				labelsSkipRadius={40}
				labelsFilter={label =>  ((label.label.toString().length /label.node.radius) < 0.35)}
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
		</div>
	)
}

export default CirclePackingChart