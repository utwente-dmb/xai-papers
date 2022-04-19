import { ResponsiveBar } from "@nivo/bar"
import { useFilteredPapers } from "../../hooks"
import { Paper } from "../../types"
import { NoDataText } from "./index"
//Refer to https://nivo.rocks/bar/ for further information

//Theme Variable, Changes the defualt values for the nivo graph

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

//Function that loops over all the filtered papers and generated appropiate data that is then used by the graph
function GenerateData(columnValue: keyof Paper) {
	//FilteredPapers is the list of papers that are available with the currently selected filtering options
	const papers: Paper[] = useFilteredPapers() 

	let textSize = 0 //Used to change the margin on the graph, changed(increased) based on the longest string for bar name

	const data: Array<{ id: string, value: number }> = [] //Array used to generate the graph

	const dataRaw: { [key: string]: number } = {} //Used as it is easier to reference by key to change the values in the loop

	//Loop that iterates through all the (filtered) papers
	papers.forEach((paper: Paper) => {
		//Check if paper[columnValue] is an array, required by typescript as it is possible for paper[columnValue] to theoritically not be an array
		const array = paper[columnValue]
		if (!Array.isArray(array)) return
		
		//Goes through all the tags in a category, and increases the value for the tag

		for (const elem of array) {
			if (dataRaw[elem]) {
				dataRaw[elem] += 1
			} else {
				dataRaw[elem] = 1
			}
		}
	})


	//Changes the format to be more appropiate for nivo
	for (const [key, value] of Object.entries(dataRaw)) {
		data.push({ id: key, value: value })
		
		//Changed(increased) based on the longest string for bar name

		if (key.length > textSize) {
			textSize = key.length
		}
	}

	return { data, textSize }
}

type BarChartProps = {
	//type of category on which graph is created
	type: keyof Paper
}

function BarChart({ type }: BarChartProps) {
	const { data, textSize } = GenerateData(type)
	//If no papers with selected filtering options then display appropaite information
	if (data.length < 1) {
		return (
			<NoDataText/>
		)
	}
	return (
		//Parent div is required by nivo, the height would defines the size of the graph has to be greater than 0 for the graph to render
		<div style={{ height: "545px", width: "100%", marginTop: "30px" }}> 
			<ResponsiveBar
				data={data}
				margin={{ top: 26, right: 30, bottom: 50, left: textSize * 10 + 5 }}
				layout="horizontal"
				indexBy="id"
				label={d => `${d.value}`}
				colors={{ scheme: "spectral" }}
				colorBy="indexValue"
				enableGridX
				enableGridY={false}
				axisBottom={{
					legend: "Papers",
					legendPosition: "middle",
					legendOffset: 40,
					tickSize: 0
				}}
				padding={0.3}
				theme={theme}
			/>
		</div>
	)
}

export default BarChart
