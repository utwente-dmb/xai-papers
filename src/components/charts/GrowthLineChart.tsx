import { useFilteredPapers } from "../../hooks"
import { ResponsiveLine, Line } from "@nivo/line"
import { Col } from "antd"

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
function GenerateData() {
	const papers: any = useFilteredPapers().reverse()
	console.log(papers)
	const dataRaw: any = {}
	let currentYear = "1900"

	const col = "Type of Data"

	papers.forEach(function (value: any) {
		for (const elem of value[col]) {
			currentYear = value["Year"]
			if (dataRaw[elem]) {
				if (dataRaw[elem][dataRaw[elem].length - 1]["x"]) {
					dataRaw[elem][dataRaw[elem].length - 1]["y"] += 1
				}
			} else {
				dataRaw[elem] = []
				dataRaw[elem].push({ x: currentYear, y: 1 })
			}
			if (value["Year"] > dataRaw[elem][dataRaw[elem].length - 1]["x"]) {
				dataRaw[elem].push({ x: currentYear, y: dataRaw[elem][dataRaw[elem].length - 1]["y"] + 1 })
			}
		}
	})

	const dataFormated = []
	for (const [key, value] of Object.entries(dataRaw)) {
		dataFormated.push({ "id": key, "data": value })
	}
	console.log(dataFormated)
	return dataFormated
}

function GrowthLineChart() {
	const data2: any = GenerateData()
	return (
		<div style={{
			height: "450px",
			width:"500px",
		}}>
			<ResponsiveLine data={data2}
				xScale={{
					type: "time",
					format: "%Y",
					useUTC: false,
					precision: "year",
				}}
				xFormat="time:%Y"
				yScale={{
					type: "linear",
				}}
				axisLeft={{
					legend: "linear scale",
					legendOffset: 12,
				}}
				axisBottom={{
					format: "%b %d",
					tickValues: "every 365 days",
					legend: "time scale",
				}}
				enablePointLabel={true}
				pointSize={16}
				pointBorderWidth={1}
				pointBorderColor={{
					from: "color",
					modifiers: [["darker", 0.3]],
				}}
				useMesh={true}
				enableSlices={false} 
			>
			</ResponsiveLine>
		</div >)
}

export default GrowthLineChart