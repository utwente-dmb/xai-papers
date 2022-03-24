import { ResponsiveBar } from "@nivo/bar"
import { typeArray } from "../../utils"
import { useFilteredPapers } from "../../hooks"
import { Bar } from "@nivo/bar"
import { useEffect, useState } from "react"
import { Paper } from "../../types"

let firstYear: number
let lastYear: number

function GenerateData(col: keyof Paper, year: number) {
	const papers: Array<Paper> = useFilteredPapers().sort((a, b) => a.Year.localeCompare(b.Year))
	firstYear = parseInt(papers[0]["Year"])
	lastYear = parseInt(papers[papers.length - 1]["Year"])
	year = firstYear + year
	const data: any = {}

	papers.forEach((paper: Paper) => {
		const paperYear = parseInt(paper["Year"])
		if (!("Papers" in data) && paperYear === year) {
			data["Papers"] = 1
		}
		else if (paperYear == year) {
			data["Papers"] = data["Papers"] + 1
		}

		if (Array.isArray(paper[col])) {
			for (const elem of paper[col] as any[]) {
				if (!(elem in data) && paperYear == year) {
					data[elem] = 1
				}
				else if (paperYear == year) {
					data[elem] = data[elem] + 1
				}
			}
		}

	})
	return data
}

type LineChartProps = {
	type: string
}

let dataOld: any = {}
export function ResetData(){
	dataOld = {}
}

function RaceChart({ type }: LineChartProps) {
	const [current, setCurrent] = useState(0)

	useEffect(() => {
		const timer = setTimeout(() => {
			if (current < lastYear) {
				setCurrent(current + 1)
			}
		}, 4000)
		return () => clearTimeout(timer)
	}, [current, setCurrent])

	const dataCurrent: any = GenerateData(type as keyof Paper, current)

	for (const [key, value] of Object.entries(dataCurrent)) {
		if (dataOld[key]) {
			dataOld[key] = dataOld[key] + dataCurrent[key]
		} else {
			dataOld[key] = dataCurrent[key]
		}
	}

	let dataFormated: any = []
	for (const [key, value] of Object.entries(dataOld)) {
		dataFormated.push({ "id": key, "value": value })
	}

	dataFormated = dataFormated.sort((a: any, b: any) => a.value - b.value)

	return (
		<div style={{ height: "450px", width: "100%", marginTop: "20px" }}>
			<ResponsiveBar
				data={dataFormated}
				layout="horizontal"
				margin={{ top: 26, right: 120, bottom: 26, left: 60 }}
				indexBy="id"
				keys={["value"]}
				colors={{ scheme: "spectral" }}
				colorBy="indexValue"
				borderColor={{ from: "color", modifiers: [["darker", 2.6]] }}
				enableGridX
				enableGridY={false}
				axisTop={{
					format: "~s",
				}}
				axisBottom={{
					format: "~s",
				}}
				axisLeft={null}
				padding={0.3}
				labelTextColor={{ from: "color", modifiers: [["darker", 1.4]] }}
				legends={[
					{
						dataFrom: "indexes",
						anchor: "bottom-right",
						direction: "column",
						justify: false,
						translateX: 120,
						translateY: 0,
						itemsSpacing: 2,
						itemWidth: 100,
						itemHeight: 20,
						itemDirection: "left-to-right",
						itemOpacity: 0.85,
						symbolSize: 20,
						effects: [
							{
								on: "hover",
								style: {
									itemOpacity: 1
								}
							}
						]
					}
				]}
			/>
		</div>
	)
}

export default RaceChart
