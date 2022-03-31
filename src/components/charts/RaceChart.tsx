import { ResponsiveBar } from "@nivo/bar"
import { useFilteredPapers } from "../../hooks"
import { Paper } from "../../types"
import { typeArray } from "../../utils"


function GenerateData(columnValue: string) {
	let textSize = 0

	const data: Array<{ id: string, value: number }> = []

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
	for (const [key, value] of Object.entries(count[columnValue])) {
		data.push({ id: key, value: value })
		if (key.length > textSize) {
			textSize = key.length
		}
	}
	return [data, textSize]
}

type BarChartProps = {
	type: string
}

let dataOld: any = {}
let year = 0
export function ResetData() {
	dataOld = {}
	year = 0
}

function RaceChart({ type }: BarChartProps) {
	const data: any = GenerateData(type as keyof Paper)
	console.log(data)

	return (
		<div style={{ height: "545px", width: "100%", marginTop: "30px" }}>
			<ResponsiveBar
				data={data[0]}
				layout="horizontal"
				margin={{ top: 26, right: 30, bottom: 36, left: data[1] * 5.8 }}
				indexBy="id"
				label={d => `${d.value}`}
				colors={{ scheme: "spectral" }}
				colorBy="indexValue"
				borderColor={{ from: "color", modifiers: [["darker", 2.6]] }}
				enableGridX
				enableGridY={false}
				axisBottom={{
					legend: "Papers",
					legendPosition: "middle",
					legendOffset: 30,
					tickSize: 0
				}}
				padding={0.3}
				labelTextColor={{ from: "color", modifiers: [["darker", 3]] }}
				isInteractive={false}
			/>
		</div>
	)
}

export default RaceChart
