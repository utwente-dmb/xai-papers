import { ResponsiveBar } from "@nivo/bar"
import { useFilteredPapers } from "../../hooks"
import { Paper } from "../../types"
import { typeArray } from "../../utils"

const theme = {
	"axis": {
		"legend": {
			"text": {
				"fontSize": 18,
				"fill": "#333333",
			}
		},
		"ticks": {
			"text": {
				"fontSize": 17,
				"fill": "#333333"
			}
		}
	},

}

function GenerateData(columnValue: string) {
	let textSize = 0

	const data: Array<{ id: string, value: number }> = []

	const papers: Paper[] = useFilteredPapers()
	const count: { [key: string]: { [key: string]: number } } = {}

	papers.forEach(function (value: any) {
		for (const col of typeArray) {
			if (!(col in count)) {
				count[col] = {}
			}
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

function BarChart({ type }: BarChartProps) {
	const data: any = GenerateData(type as keyof Paper)
	console.log(data)

	return (
		<div style={{ height: "545px", width: "100%", marginTop: "30px" }}>
			<ResponsiveBar
				data={data[0]}
				layout="horizontal"
				margin={{ top: 26, right: 30, bottom: 50, left: data[1] * 9 }}
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
					legendOffset: 40,
					tickSize: 0
				}}
				padding={0.3}
				labelTextColor={{ from: "color", modifiers: [["darker", 3]] }}
				theme={theme}
			/>
		</div>
	)
}

export default BarChart
