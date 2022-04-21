import Graphin, { GraphinData, IG6GraphEvent, IUserEdge, IUserNode, Behaviors } from "@antv/graphin"
import { useFilteredPapers } from "../../hooks"
import { INode, NodeConfig } from "@antv/g6"
import { message } from "antd"
import { Paper } from "../../types"
import { typeArray } from "../../utils"
import { NoDataText } from "./index" 

const { ZoomCanvas, DragCanvas, ClickSelect } = Behaviors

function CreateGraphData() {
	const papers = useFilteredPapers()
	const nodes: Array<IUserNode> = []
	const edges: Array<IUserEdge> = []
	// const requiredNodes: Array<Paper> = []
	const minimumSimilarityForEdge = 5
	const similarityColumns: Array<keyof Paper> = typeArray

	// Get all pairs of papers
	const pairs: Array<Array<number>> = []
	for (let i = 0; i < papers.length; i++) {
		for (let j = i + 1; j < papers.length; j++) {
			pairs.push([i, j])
		}
	}

	pairs.forEach(function (pair) {
		const paper1: Paper = papers[pair[0]]
		const paper2: Paper = papers[pair[1]]
		let similarity = 0
		for (const col of similarityColumns) {
			const paperVal = paper1[col]
			if (!Array.isArray(paperVal)) continue

			similarity += paperVal.filter((v1) => {
				const paper2Val = paper2[col]
				return Array.isArray(paper2Val) && paper2Val.some((el) => el === v1)
			}).length
		}

		if (similarity > minimumSimilarityForEdge) {
			// Add either paper to node list, if it doesnt exist already

			// Create edge and add to edge list
			const edge = {
				source: paper1.url,
				target: paper2.url,
				style: {
					keyshape: {
						endArrow: {path:"123"},//Pointless variable that is required by the library
						type: "line",
						poly: {
							distance: 600 - 5 * similarity,
						},
						lineWidth: 1 + similarity * 0.5,
						opacity: (1 + similarity) / 50,
						stroke: "1",
						fill: "#ffffff"
					}
				}
			}
			edges.push(edge)
		}
	})

	// Loop over all papers that require nodes and create them
	papers.forEach(function (paper) {
		const node = {
			id: paper.url,
			label: { value: paper.Authors[0] + "et al" },
			size: 150,
			style: {
				keyshape: {
					// size: 80,
					stroke: "red",
					fill: "red",
					fillOpacity: 0.2,
				},
				label: { value: paper.Authors[0] + " et al" },
			}
		}
		nodes.push(node)
	})

	const graphData: GraphinData = {
		nodes: nodes,
		edges: edges
	}

	return graphData
}

const defaultNode = {
	type: "graphin-circle",
	Style: {
		keyshape: {
			fill: "#000",
			stroke: "#000",
			fillOpacity: 0.1,
			// size: 30,
		},
		label: {
			visible: true,
		},
	},
}

Graphin.registerBehavior("openPaperOnClick", {
	getEvents() {
		return {
			"node:click": "onClick",
		}
	},
	onClick(evt: IG6GraphEvent) {
		const node = evt.item as INode
		const model = node.getModel() as NodeConfig
		message.info({
			content: (<a href={model.id} target="_blank" rel="noreferrer">{model.id}</a>)
		})
		// window.open(model.id,"_blank")?.focus()
	},
})


function ConnectedChart() {
	const data: GraphinData = CreateGraphData()

	if (data.nodes.length < 1) {
		return (
			<NoDataText />
		)
	}

	return (
		<div className="TestChart">
			<Graphin 
				data={data} 
				layout={
					{
						type: "force",
						maxIteration: 1000,
						//unitRadius: 100,
						preventOverlap: true,
						nodeSpacing: 100,
						nodeSize: 10,
						strictRadial: false,
						gpuEnabled: true,
					}} 
				defaultNode={defaultNode} 
				modes={{ default: ["openPaperOnClick"] }}>
				<ZoomCanvas enableOptimize/>
				<DragCanvas />
			</Graphin>
		</div>
	)
}

export default ConnectedChart
