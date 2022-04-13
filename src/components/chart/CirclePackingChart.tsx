import { ResponsiveCirclePackingCanvas, ComputedDatum } from "@nivo/circle-packing"
import React from "react"
import { useFilteredPapers } from "../../hooks"
import { Paper } from "../../types"
import { NoDataChartText } from "./index"

const theme = {
	"textColor": "#ffffff",
	"fontSize": 20,
}

let data: {
	name: string,
	children: Array<Record<string, unknown>>
} = {
	name: "",
	children: [

	]
}

function GenerateData(columnValue: keyof Paper) {
	const papers: Paper[] = useFilteredPapers()
	const dataRaw: {
		[key: string]: Array<{ name: string, value: number, url: string }>
	} = {}

	papers.forEach(function (paper: Paper) {
		const array = paper[columnValue]
		if (!Array.isArray(array)) return

		for (const elem of array) {
			if (dataRaw[elem]) {
				dataRaw[elem].push({ name: paper.Title, value: 1, url: paper.url })
			} else {
				dataRaw[elem] = []
				dataRaw[elem].push({ name: paper.Title, value: 1, url: paper.url })

			}
		}
	})

	data["children"] = []
	for (const [key, value] of Object.entries(dataRaw)) {
		data["children"].push({ name: key, children: value })
	}
	console.log(data)
	console.log(dataRaw)

	return data
}

type LineChartProps = {
	type: keyof Paper
}


function CirclePackingChart({ type }: LineChartProps) {

	function HandleClick(e: ComputedDatum<
		{ name: string, children: Record<string, unknown>[], url?: string }>
	) {
		console.log(e)
		if ("url" in e.data) {
			window.open(e.data.url, "_blank")
		}
	}

	data = GenerateData(type)

	if (data["children"].length < 1) {
		return (
			<NoDataChartText />
		)
	}
	return (
		<div style={{ height: "900px", width: "100%", marginTop: "20px" }}>
			<ResponsiveCirclePackingCanvas
				data={data}
				margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
				id="name"
				colors={["#f0f2f5", "#1890ff", "#d8e6f3"]} //Change colors of the graph from here, order is parent to children
				childColor={{
					from: "color",
					modifiers: [
						[
							"brighter",
							3
						]
					]
				}}
				labelsSkipRadius={40}
				labelsFilter={label => ((label.label.toString().length / label.node.radius) < 0.35) && !(label.label === "root")}
				padding={5}
				leavesOnly={false}
				enableLabels={true}
				label="id"
				labelTextColor={{
					from: "color",
					modifiers: [
						[
							"darker",
							3
						]
					]
				}}
				borderColor={{
					from: "color",
					modifiers: [
						[
							"darker",
							3
						]
					]
				}}
				tooltip={({ id }) => (id.length > 1) ? (
					<div
						style={{
							padding: 5,
							background: "#ffffff",
						}}
					>
						<strong>
							{id}
						</strong>
					</div>
				) : <></>
				}
				animate={false}
				onClick={HandleClick}
				theme={theme}
			/>
		</div>
	)
}

export default CirclePackingChart