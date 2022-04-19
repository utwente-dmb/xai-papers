import { useFilteredPapers } from "../../hooks"
import { ResponsiveLine } from "@nivo/line"
import { Paper } from "../../types"
import { NoDataText } from "./index"
//Refer to https://nivo.rocks/line/

//Theme Variable, Changes the defualt values for the nivo graph
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

function GenerateData(col: keyof Paper) {
	//FilteredPapers is the list of papers that are available with the currently selected filtering options
	const papers: Paper[] = useFilteredPapers().sort((a, b) => a.Year.localeCompare(b.Year)) //Sort by year

	//Array used to generate the graph. Id is the tag, Data is an array in whic x is a string for year, y is a the number of papers with a tag
	const data: Array<{ id: string, data: Array<{ x: string, y: number }> }> = []

	const dataRaw: { [key: string]: Array<{ x: string, y: number }> } = {} //Used as it is easier to reference by key to change the values in the loop

	papers.forEach(function (paper: Paper) {
		if (dataRaw["Papers"]) {
			//Check if current Year is greater than last year in the array, if so add the new year
			if (paper["Year"] > dataRaw["Papers"][dataRaw["Papers"].length - 1]["x"]) {
				dataRaw["Papers"].push({ x: paper["Year"], y: dataRaw["Papers"][dataRaw["Papers"].length - 1]["y"] + 1 })
			}
			//Otherwise increase the number of tags for the year

			else if (dataRaw["Papers"][dataRaw["Papers"].length - 1]["y"]) {
				dataRaw["Papers"][dataRaw["Papers"].length - 1]["y"] += 1
			}
		}
		//if paper not in list create an array for papers

		else {
			dataRaw["Papers"] = []
			dataRaw["Papers"].push({ x: paper["Year"], y: 1 })
		}

		//Check if paper[columnValue] is an array, required by typescript as it is possible for paper[columnValue] to theoritically not be an array
		const array = paper[col]
		if (!Array.isArray(array)) return

		//Goes through all the tags in a category, and adds an object for each paper that has the tag
		for (const elem of array) {
			//Check if there is an object for a tag
			if (dataRaw[elem]) {
				//Check if current Year is greater than last year in the array, if so add the new year
				if (paper["Year"] > dataRaw[elem][dataRaw[elem].length - 1]["x"]) {
					dataRaw[elem].push({ x: paper["Year"], y: dataRaw[elem][dataRaw[elem].length - 1]["y"] + 1 })
				}
				//Otherwise increase the number of tags for the year
				else if (dataRaw[elem][dataRaw[elem].length - 1]["y"]) {
					dataRaw[elem][dataRaw[elem].length - 1]["y"] += 1
				}
			}
			//Check if there is an object for a tag, if not create an array 
			else {

				dataRaw[elem] = []
				dataRaw[elem].push({ x: paper["Year"], y: 1 })
			}

		}
	})
	//id is either the tag or the paper, value is the array containing year and associated values with year(basically the point on the plot)
	for (const [key, value] of Object.entries(dataRaw)) {
		data.push({ id: key, data: value })
	}

	return data

}

type LineChartProps = {
	type: keyof Paper
}

function GrowthLineChart({ type }: LineChartProps) {
	const data: Array<{ id: string, data: Array<{ x: string, y: number }> }> = GenerateData(type)

	//If no papers with selected filtering options then display appropaite information
	if (data.length < 1) {
		return (
			<NoDataText />
		)
	}
	return (
		//Parent div is required by nivo, the height would defines the size of the graph has to be greater than 0 for the graph to render
		<div style={{ height: "450px", width: "100%", marginTop: "20px" }}>
			<ResponsiveLine
				data={data}
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