import { ResponsiveBar } from "@nivo/bar"
import { useFilteredPapers } from "../../hooks"
import { Paper } from "../../types"
import { NoDataChartText } from "./index"

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

function GenerateData(columnValue: keyof Paper) {
	let textSize = 0

	const data: Array<{ id: string, value: number }> = []

	const papers: Paper[] = useFilteredPapers()
	const dataRaw: { [key: string]: number } = {}

	papers.forEach((paper: Paper) => {
		const array = paper[columnValue]
		if (!Array.isArray(array)) return

		for (const elem of array) {
			if (dataRaw[elem]) {
				dataRaw[elem] += 1
			} else {
				dataRaw[elem] = 1
			}
		}
	})

	for (const [key, value] of Object.entries(dataRaw)) {
		data.push({ id: key, value: value })
		if (key.length > textSize) {
			textSize = key.length
		}
	}

	return { data, textSize }
}

type BarChartProps = {
	type: keyof Paper
}

function BarChart({ type }: BarChartProps) {
	const { data, textSize } = GenerateData(type)
	if (data.length < 1) {
		return (
			<NoDataChartText />
		)
	}
	return (
		<div style={{ height: "545px", width: "100%", marginTop: "30px" }}>
			<ResponsiveBar
				data={data}
				layout="horizontal"
				margin={{ top: 26, right: 30, bottom: 50, left: textSize * 10 + 5 }}
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
