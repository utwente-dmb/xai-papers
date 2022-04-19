import { ResponsiveCirclePackingCanvas, ComputedDatum } from "@nivo/circle-packing"
import React from "react"
import { useFilteredPapers } from "../../hooks"
import { Paper } from "../../types"
import { NoDataText } from "./index"

//Refer to https://nivo.rocks/circle-packing/

//Theme Variable, Changes the defualt values for the nivo graph
const theme = {
	"textColor": "#ffffff",
	"fontSize": 20,
}

function GenerateData(columnValue: keyof Paper) {
	//FilteredPapers is the list of papers that are available with the currently selected filtering options
	const papers: Paper[] = useFilteredPapers()

	const data: {
		name: string,
		children: Array<Record<string, unknown>>
	} = {
		name: "",
		children: [

		]
	}//Array used to generate the graph

	const dataRaw: {
		[key: string]: Array<{ name: string, value: number, url: string }>
	} = {}//Used as it is easier to reference by key to change the values in the loop

	//Loop that iterates through all the (filtered) papers
	papers.forEach(function (paper: Paper) {
		//Check if paper[columnValue] is an array, required by typescript as it is possible for paper[columnValue] to theoritically not be an array
		const array = paper[columnValue]
		if (!Array.isArray(array)) return

		//Goes through all the tags in a category, and adds an object for each paper that has the tag
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
	//Creates children for the CirclePackingChart(Order of creation from parent to child: Root -> Tag -> Paper)
	for (const [key, value] of Object.entries(dataRaw)) {
		data["children"].push({ name: key, children: value })
	}

	return data
}

type LineChartProps = {
	type: keyof Paper
}


function CirclePackingChart({ type }: LineChartProps) {
	//Function that opens a the url for a clicked paper
	const data = GenerateData(type)

	function HandleClick(e: ComputedDatum<
		{ name: string, children: Record<string, unknown>[], url?: string }>
	) {
		if ("url" in e.data) {
			window.open(e.data.url, "_blank")
		}
	}

	//If no papers with selected filtering options then display appropaite information
	if (data["children"].length < 1) {
		return (
			<NoDataText />
		)
	}
	return (
		//Parent div is required by nivo, the height would defines the size of the graph has to be greater than 0 for the graph to render
		<div style={{ height: "900px", width: "100%", marginTop: "20px" }}>
			<ResponsiveCirclePackingCanvas
				data={data}
				margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
				id="name"
				colors={["#f0f2f5", "#1890ff", "#d8e6f3"]} //Change colors of the graph from here, order is parent to children
				labelsSkipRadius={40}
				labelsFilter={label => ((label.label.toString().length / label.node.radius) < 0.35) && !(label.label === "root") && !("url" in label.node.data)}
				padding={5}
				leavesOnly={false}
				enableLabels={true}
				label="id"
				//Changes the default tooltip behaviour
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