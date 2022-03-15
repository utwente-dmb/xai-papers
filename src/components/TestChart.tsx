<<<<<<< HEAD
import React from "react";
import Graphin, { GraphinData, IG6GraphEvent } from "@antv/graphin";
import { useFilteredPapers } from "../hooks";
import { INode, NodeConfig } from "@antv/g6";
import { message } from "antd";
import { Paper } from "../types/paper";

function CreateGraphData() {
	const papers = useFilteredPapers();
	const nodes: any = [];
	const edges: any = [];
	const requiredNodes: Array<Paper> = [];
	const minimumSimilarityForEdge = 5;
	const similarityColumns: Array<keyof Paper> = ["Type of Data", "Type of Problem", "Type of Model to be Explained", "Type of Task", "Type of Explanation", "Method used to explain"];

	// Get all pairs of papers
	const pairs: Array<Array<number>> = [];
	for (let i = 0; i < papers.length; i++) {
		for (let j = i + 1; j < papers.length; j++) {
			pairs.push([i, j]);
		}
	}

	pairs.forEach(function (pair) {
		const paper1: Paper = papers[pair[0]];
		const paper2: Paper = papers[pair[1]];
		let similarity = 0;
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
			edges.push(edge);
		}
	});

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
		});
	});
=======
import React from "react"
import ReactDOM from "react-dom"
import Graphin, { GraphinData, Utils, IG6GraphEvent } from "@antv/graphin"
import { useFilteredPapers } from "../hooks"
import { GraphinNode } from "@antv/graphin/lib/typings/type"
import { INode, NodeConfig } from "@antv/g6"
import { message } from "antd"

const data = {
	nodes: [
		{ id: "node0", label: { value: "12" }, size: 50 },
		{ id: "node2", size: 50 },
	],
	edges: [{ source: "node0", target: "node2" }],
}

const data2 = {
	nodes: [
		{ id: "node0", size: 50 },
		{ id: "node1", size: 30 },
		{ id: "node2", size: 30 },
		{ id: "node3", size: 30 },
		{ id: "node4", size: 30, isLeaf: true },
		{ id: "node5", size: 30, isLeaf: true },
		{ id: "node6", size: 15, isLeaf: true },
		{ id: "node7", size: 15, isLeaf: true },
		{ id: "node8", size: 15, isLeaf: true },
		{ id: "node9", size: 15, isLeaf: true },
		{ id: "node10", size: 15, isLeaf: true },
		{ id: "node11", size: 15, isLeaf: true },
		{ id: "node12", size: 15, isLeaf: true },
		{ id: "node13", size: 15, isLeaf: true },
		{ id: "node14", size: 15, isLeaf: true },
		{ id: "node15", size: 15, isLeaf: true },
		{ id: "node16", size: 15, isLeaf: true },
	],
	edges: [
		{ source: "node0", target: "node1" },
		{ source: "node0", target: "node2" },
		{ source: "node0", target: "node3" },
		{ source: "node0", target: "node4" },
		{ source: "node0", target: "node5" },
		{ source: "node1", target: "node6" },
		{ source: "node1", target: "node7" },
		{ source: "node2", target: "node8" },
		{ source: "node2", target: "node9" },
		{ source: "node2", target: "node10" },
		{ source: "node2", target: "node11" },
		{ source: "node2", target: "node12" },
		{ source: "node2", target: "node13" },
		{ source: "node3", target: "node14" },
		{ source: "node3", target: "node15" },
		{ source: "node3", target: "node16" },
	],
}



const nodeStateStyles = {
	status: {
		hover: {
			label: {
				visible: true,
			},
		},
	},
}

function CreateGraphData() {
	const papers = useFilteredPapers()
	const nodes: any = []
	const edges: any = []

	const edgeString: any = []

	let similarity = 0
	const minimumSimilarityForEdge = 2
	const minimumDistance = 5

	papers.forEach(function (value1, index) {
		nodes.push({ id: value1.url, label: { value: value1.Authors[0] + "et al" }, size: 150 })
		nodes[index].style = {
			keyshape: {
				size: 80,
				stroke: "red",
				fill: "red",
				fillOpacity: 0.2,
			},
			label: { value: value1.Authors[0] + " et al" },
		}
	})

	papers.forEach(function (value1, index) {
		papers.forEach(function (value2) {
			if (value1 != value2) {
				const typeOfDataSimilarity = value1["Type of Data"].filter(v1 => value2["Type of Data"].includes(v1)).length
				console.log(typeOfDataSimilarity)
				similarity = typeOfDataSimilarity


				if (similarity > minimumSimilarityForEdge) {
					const edgeToBeCreated = {
						source: value1.url,
						target: value2.url,
						style: {
							keyshape: {
								endArrow: false,
								type: "poly",
								poly: {
									distance: similarity,
								},
							}
						}
					}

					const edgeToBeCreatedOpposite = {
						source: value2.url,
						target: value1.url,
						style: {
							keyshape: {
								endArrow: false,
								type: "poly",
								poly: {
									distance: similarity,
								},
							}
						}
					}

					if (!edgeString.includes(JSON.stringify(edgeToBeCreatedOpposite))) {
						edgeString.push(JSON.stringify(edgeToBeCreated))
						edges.push(edgeToBeCreated)
					}
					else {
						console.log("edge already exists")
					}
				}
			}
		})
	})
>>>>>>> master

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
<<<<<<< HEAD
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
=======
			<Graphin data={data3} layout={{ type: "gForce" }} defaultNode={defaultNode} modes={{ default: ["sampleBehavior","drag-canvas","zoom-canvas"] }} />
>>>>>>> master
		</div>
	)
}

export default TestChart
