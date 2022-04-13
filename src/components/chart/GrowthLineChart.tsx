import { useFilteredPapers } from "../../hooks"
import { ResponsiveLine } from "@nivo/line"
import { Paper } from "../../types"


const theme = {
	"axis": {
		"ticks": {
			"text": {
				"fontSize": 16,
				"fill": "#333333"
			}
		}
	},

}

function GenerateData(col: string) {
	const papers: Paper[] = useFilteredPapers().sort((a, b) => a.Year.localeCompare(b.Year))
	const dataRaw: any = {}

	papers.forEach(function (paper: any) {
		if (dataRaw["Papers"]) {
			if (paper["Year"] > dataRaw["Papers"][dataRaw["Papers"].length - 1]["x"]) {
				dataRaw["Papers"].push({ x: paper["Year"], y: dataRaw["Papers"][dataRaw["Papers"].length - 1]["y"] + 1 })
			}
			else if (dataRaw["Papers"][dataRaw["Papers"].length - 1]["y"]) {
				dataRaw["Papers"][dataRaw["Papers"].length - 1]["y"] += 1
			}
		}
		else {
			dataRaw["Papers"] = []
			dataRaw["Papers"].push({ x: paper["Year"], y: 1 })
		}

		for (const elem of paper[col]) {
			if (dataRaw[elem]) {
				if (paper["Year"] > dataRaw[elem][dataRaw[elem].length - 1]["x"]) {
					dataRaw[elem].push({ x: paper["Year"], y: dataRaw[elem][dataRaw[elem].length - 1]["y"] + 1 })
				}
				else if (dataRaw[elem][dataRaw[elem].length - 1]["y"]) {
					dataRaw[elem][dataRaw[elem].length - 1]["y"] += 1
				}
			} else {
				dataRaw[elem] = []
				dataRaw[elem].push({ x: paper["Year"], y: 1, z: elem })
			}

		}
	})

	let dataFormated = []
	for (const [key, value] of Object.entries(dataRaw)) {
		dataFormated.push({ "id": key, "data": value, })
	}
	dataFormated = dataFormated.reverse()
	return dataFormated
}

type LineChartProps = {
	type: string
}

function GrowthLineChart({ type }: LineChartProps) {
	const data2: any = GenerateData(type as keyof Paper)

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
				theme={theme}
				legends={
					[
						{
							anchor: "top-right",
							toggleSerie: true,
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