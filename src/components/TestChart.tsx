import React from "react"
import Graphin, { GraphinData, IG6GraphEvent } from "@antv/graphin"
import { useFilteredPapers } from "../hooks"
import { INode, NodeConfig } from "@antv/g6"
import { message } from "antd"
import { Paper } from "../types/paper"

function CreateGraphData() {
	const papers = useFilteredPapers()
	const nodes: any = []
	const edges: any = []
	const requiredNodes: Array<Paper> = []
	const minimumSimilarityForEdge = 5
	const similarityColumns: Array<keyof Paper> = ["Type of Data", "Type of Problem", "Type of Model to be Explained", "Type of Task", "Type of Explanation", "Method used to explain"]

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

		// similarity += paper1["Type of Data"].filter(v1 => paper2["Type of Data"].includes(v1)).length;
		// similarity += paper1["Type of Problem"].filter(v1 => paper2["Type of Problem"].includes(v1)).length;
		// similarity += paper1["Type of Model to be Explained"].filter(v1 => paper2["Type of Model to be Explained"].includes(v1)).length;
		// similarity += paper1["Type of Task"].filter(v1 => paper2["Type of Task"].includes(v1)).length;
		// similarity += paper1["Type of Explanation"].filter(v1 => paper2["Type of Explanation"].includes(v1)).length;
		// similarity += paper1["Method used to explain"].filter(v1 => paper2["Method used to explain"].includes(v1)).length;

		if (similarity > minimumSimilarityForEdge) {
			// Add either paper to node list, if it doesnt exist already
			// if (!requiredNodes.includes(paper1)) {
			// 	requiredNodes.push(paper1);
			// }
			// if (!requiredNodes.includes(paper2)) {
			// 	requiredNodes.push(paper2);
			// }

			// Create edge and add to edge list
			const edge = {
				source: paper1.url,
				target: paper2.url,
				style: {
					keyshape: {
						endArrow: false,
						type: "line",
						poly: {
							distance: 600-5*similarity,
						},
					}
				}
			}
			edges.push(edge)
		}
	})

	// Loop over all papers that require nodes and create them
	papers.forEach(function (paper) {
		nodes.push({
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
		})
	})

	const graphData: GraphinData = {
		nodes: nodes,
		edges: edges
	}

	console.log(graphData)
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

Graphin.registerBehavior("sampleBehavior", {
	getEvents() {
		return {
			"node:click": "onClick",
		}
	},
	onClick(evt: IG6GraphEvent) {
		const node = evt.item as INode
		const model = node.getModel() as NodeConfig
		message.info(model.id)
		// window.open(model.id,"_blank")?.focus();
	},
})


function TestChart() {
	const data3 = CreateGraphData()
	return (
		<div className="TestChart">
			<Graphin data={data3} layout={
				{
					type: "force",
					maxIteration: 1000,
					//unitRadius: 100,
					preventOverlap: true,
					nodeSpacing: 100,
					nodeSize: 10,
					strictRadial: false,
					workerEnabled: true,
					gpuEnabled: true,
				}} defaultNode={defaultNode} modes={{ default: ["sampleBehavior", "drag-canvas", "zoom-canvas"] }} />
		</div>
	)
}

export default TestChart
