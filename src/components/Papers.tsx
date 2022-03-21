import { Table, Row } from "antd"
import { useFilteredPapers } from "../hooks"
import {TagList} from "../components"
import { Paper } from "../types"
import { getColor, typeArray } from "../utils"
import { printNames } from "../utils/utils"

type Column<T> = {
	title: string, 
	dataIndex: string, 
	render?: (text: string, row: T) => React.ReactNode, 
	key: string, 
	sorter?: {
		compare: (a: T, b: T) => number,
		multiple: number
	},
	defaultSortOrder?: "ascend" | "descend"
}

const columns: Array<Column<Paper>> = [
	{
		title: "Title",
		dataIndex: "Title",
		render: (text: string, row: Paper) => <a href={row.url} target="_blank" rel="noreferrer">{text}</a>,
		key: "title",
		defaultSortOrder: "ascend",
		sorter: {
			compare: (a: Paper, b: Paper) => a.Title.localeCompare(b.Title),
			multiple: 1
		}
	},
	{
		title: "Venue",
		dataIndex: "Venue",
		key: "venue",
		defaultSortOrder: "ascend",
		sorter: {
			compare: (a: Paper, b: Paper) => a.Venue.localeCompare(b.Venue),
			multiple: 2
		}
	},
	{
		title: "Year",
		dataIndex: "Year",
		key: "year",
		defaultSortOrder: "ascend",
		sorter: {
			compare: (a: Paper, b: Paper) => a.Year.localeCompare(b.Year),
			multiple: 3
		}
	},
	{
		title: "Author",
		key: "author",
		dataIndex: "Author",
	},
]

function Tag({ record, type }: { record: Paper, type: keyof Paper}) {

	return (
		<TagList TagData={record[type] as string[]} Color={getColor(type)}></TagList>
	)
}

function Papers(): JSX.Element {

	const filteredPapers = useFilteredPapers()

	const papersData = filteredPapers.map((paper) => ({
		...paper,
		key: filteredPapers.indexOf(paper),
		Author: [paper.Authors[0] + " et al."],
	}))

	return (
		<Table
			style={{ marginTop: 10 }}
			columns={columns}
			dataSource={papersData}
			expandable={{ 
				expandRowByClick: true,
				expandedRowRender: (record) => (
					<>
						<Row>
							Authors: {printNames(record.Authors)}
						</Row>
						<Row>
							{typeArray.map((type) => (
								<Tag record={record} type={type} key={typeArray.indexOf(type)}/>
							))}
						</Row>
					</>
				),
			}}
		></Table>
	)
}

export default Papers