import { useFilteredPapers } from "../../hooks"
import { ResponsiveLine } from "@nivo/line"
import { BasicTooltip } from "@nivo/tooltip"
import { useState } from "react"
import { Select, Col } from "antd"
import { typeArray } from "../../utils"

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

function GenerateData(col: string) {
	const papers: any = useFilteredPapers().reverse()

	const dataRaw: any = {}

	papers.forEach(function (value: any) {
		if (!dataRaw["Papers"]) {
			dataRaw["Papers"] = []
			dataRaw["Papers"].push({ x: value["Year"], y: 1 })
		}
		if (value["Year"] > dataRaw["Papers"][dataRaw["Papers"].length - 1]["x"]) {
			dataRaw["Papers"].push({ x: value["Year"], y: dataRaw["Papers"][dataRaw["Papers"].length - 1]["y"] + 1 })
		}
		else if (dataRaw["Papers"][dataRaw["Papers"].length - 1]["y"]) {
			dataRaw["Papers"][dataRaw["Papers"].length - 1]["y"] += 1
		}

		for (const elem of value[col]) {
			if (dataRaw[elem]) {
				if (value["Year"] > dataRaw[elem][dataRaw[elem].length - 1]["x"]) {
					dataRaw[elem].push({ x: value["Year"], y: dataRaw[elem][dataRaw[elem].length - 1]["y"] + 1 })
				}
				else if (dataRaw[elem][dataRaw[elem].length - 1]["y"]) {
					dataRaw[elem][dataRaw[elem].length - 1]["y"] += 1
				}
			} else {
				dataRaw[elem] = []
				dataRaw[elem].push({ x: value["Year"], y: 1, z: elem })
			}

		}
	})

	let dataFormated = []
	for (const [key, value] of Object.entries(dataRaw)) {
		dataFormated.push({ "id": key, "data": value, "label": "yabba" })
	}
	dataFormated = dataFormated.reverse()
	return dataFormated
}

type LineChartProps = {
	type: string
}

function GrowthLineChart({ type }: LineChartProps) {
	const data2: any = GenerateData(type)

	return (
		<div style={{ height: "450px", width: "100%", marginTop: "20px" }}>
			<ResponsiveLine
				data={data2}
				margin={{ top: 25, right: 200, bottom: 50, left: 60 }}
				xScale={{
					type: "time",
					format: "%Y",
					useUTC: false,
					precision: "year",
					min: "auto",
					max: "auto",
				}}
				colors={{ scheme: "accent" }}
				xFormat="time:%Y"
				yScale={{
					type: "linear",
					min: "auto",
					max: "auto",
				}}

				axisBottom={{
					format: "%Y",
					tickValues: "every year",
				}}
				pointSize={16}
				pointBorderWidth={1}
				pointBorderColor={{
					from: "color",
					modifiers: [["darker", 0.3]],
				}}
				curve={"monotoneX"}
				useMesh={true}
				enableSlices="x"
				pointLabelYOffset={-12}
				legends={
					[
						{
							anchor: "top-right",
							direction: "column",
							justify: false,
							translateX: 100,
							translateY: 0,
							itemsSpacing: 0,
							itemDirection: "left-to-right",
							itemWidth: 80,
							itemHeight: 20,
							itemOpacity: 0.75,
							symbolSize: 12,
							symbolShape: "circle",
							symbolBorderColor: "rgba(0, 0, 0, .5)",
							effects: [
								{
									on: "hover",
									style: {
										itemBackground: "rgba(0, 0, 0, .03)",
										itemOpacity: 1
									}
								}
							]
						}
					]
				}
			>
			</ResponsiveLine >
		</div >)
}

export default GrowthLineChart