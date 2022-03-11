import { Table } from "antd"
import { useFilteredPapers } from "../hooks"
import {TagList} from "../components"
import { Paper } from "../types"

const columns = [
	{
		title: "Title",
		dataIndex: "Title",
		render: (text:string, row:Paper) => <a href={row.url} target="_blank" rel="noreferrer">{text}</a>,
		key: "title",
	},
	{
		title: "Venue",
		dataIndex: "Venue",
		key: "venue",
	},
	{
		title: "Year",
		dataIndex: "Year",
		key: "year",
	},
	{
		title: "Authors",
		key: "authors",
		dataIndex: "Authors",
	},
]

function Papers(): JSX.Element {

	const filteredPapers = useFilteredPapers()

	const papersData = filteredPapers.map((paper) => ({
		...paper,
		key: filteredPapers.indexOf(paper),
		Authors: [paper.Authors[0] + " et al."],
	}))

	return (
		<Table
			style={{ marginTop: 10 }}
			columns={columns}
			dataSource={papersData}
			expandable={{
				expandedRowRender: (record) => (
					<><a href={record.url} style={{ margin: 0 }}>
						{record.url}
					</a>
					<TagList TagData={record["Type of Data"]} Color="Magenta"></TagList>
					<TagList TagData={record["Type of Problem"]} Color="Green"></TagList>
					<TagList TagData={record["Type of Model to be Explained"]} Color="Blue"></TagList>
					<TagList TagData={record["Type of Task"]} Color="Orange"></TagList>
					<TagList TagData={record["Type of Explanation"]} Color="Red"></TagList>
					<TagList TagData={record["Method used to explain"]} Color="Brown"></TagList></>
				),
			}}
		></Table>
	)
}

export default Papers