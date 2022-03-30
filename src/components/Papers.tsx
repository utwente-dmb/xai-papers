import { Table, Row, Button, Col } from "antd"
import { MinusOutlined, PlusOutlined } from "@ant-design/icons"
import { useExpandingAllInTable, useFilteredPapers } from "../hooks"
import {TagList} from "../components"
import { Paper } from "../types"
import { getColor, typeArray, printNames } from "../utils"

type Column<T> = {
	title: string | JSX.Element, 
	className?: string
	width?: number
	dataIndex?: string, 
	render?: (text: string, row: T) => React.ReactNode, 
	key?: string, 
	sorter?: {
		compare: (a: T, b: T) => number,
		multiple: number
	},
	defaultSortOrder?: "ascend" | "descend",
	RC_TABLE_INTERNAL_COL_DEFINE?: {
		className: string
		columnType: string
	}
}



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
			defaultSortOrder: "descend",
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

	return (
		<Row>
			<Col span={1}>
				<Button className="expand-all" style={{ marginTop: 25 }}>
					{expandController.isAllExpanded() ? <MinusOutlined/> : <PlusOutlined />}
				</Button>
			</Col>
			<Col span={23}>
				<Table
					style={{ marginTop: 10 }}
					columns={columns}
					dataSource={papersData}
					expandable={{ 
						expandRowByClick: true,
						expandedRowRender: (record) => (
							<>
								<Row gutter={[0, 4]}>
									{record.Abstract.length > 0 
										? <Col span={24}>
											{record.Abstract}
										</Col> 
										: null}
							
									<Col span={24}>
										<b>
										Authors: {printNames(record.Authors)}
										</b>
									</Col>
									<Col span={24}>
										{typeArray.map((type) => (
											<Tag record={record} type={type} key={typeArray.indexOf(type)}/>
										))}
									</Col>
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
					pagination={{
						defaultPageSize: 25, 
						position: ["bottomCenter"]
					}}
				></Table>
			</Col>
		</Row>
	)
}

export default Papers