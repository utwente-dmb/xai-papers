import { Table, Row, Button } from "antd"
import { useExpandingAllInTable, useFilteredPapers } from "../hooks"
import {TagList} from "../components"
import { Paper } from "../types"
import { getColor, typeArray, printNames } from "../utils"

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
		render: (_, row: Paper) => <>{row.Venue.value}</>,
		key: "venue",
		defaultSortOrder: "ascend",
		sorter: {
			compare: (a: Paper, b: Paper) => a.Venue.value.localeCompare(b.Venue.value),
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
	
	const allKeys = papersData.map((paper) => paper.key)
	const expandController = useExpandingAllInTable(allKeys, "key", false)

	return (
		<>
			<Button className="expand-all">
				Expand All Rows
			</Button>
			<Table
				style={{ marginTop: 10 }}
				columns={columns}
				dataSource={papersData}
				expandable={{ 
					expandRowByClick: true,
					expandedRowRender: (record) => (
						<>
							<Row gutter={[0, 4]}>
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
				className={
					expandController.isAllExpanded() ? "table-expanding-all" : ""
				}
				expandedRowKeys={expandController.expandedRowKeys}
				onExpand={expandController.onExpand}
				rowKey={expandController.rowKey}
			></Table>
		</>
	)
}

export default Papers