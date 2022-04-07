import { Table, Row, Button, Col, Tag } from "antd"
import { MinusOutlined, PlusOutlined } from "@ant-design/icons"
import { useExpandingAllInTable, useFilteredPapers } from "../hooks"
import {TagList} from "../components"
import { Paper } from "../types"
import { getColor, typeArray, printNames, enumKeyMap, capitalize, reverseObject } from "../utils"

const reverseEnumKeyMap = reverseObject(enumKeyMap)

type Column<T> = {
	title: string | JSX.Element, 
	width?: number
	dataIndex?: string, 
	render?: (text: string, row: T) => React.ReactNode, 
	key?: string, 
	sorter?: {
		compare: (a: T, b: T) => number,
		multiple: number
	},
	defaultSortOrder?: "ascend" | "descend"
}

function CustomTag({ record, type }: { record: Paper, type: keyof Paper}) {
	const tagType = reverseEnumKeyMap[type]
	const data = (record[type] as string[]).map((item: string) => `${capitalize(tagType)} : ${item}`)

	return (
		<TagList TagData={data} Color={getColor(type)}></TagList>
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
			render: (text: string, row: Paper) => {
				console.log("Row", row.IsOld)
				return (
					<>
						<a href={row.url} target="_blank" rel="noreferrer">
							{text}
						</a>
						{row.IsOld 
							? <Tag style={{marginLeft: 5}} color="blue">Original</Tag> 
							: null}
					</>
				)},
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
		<>
			<Row justify="space-between">
				<Button className="expand-all" >
					{expandController.isAllExpanded() ? <MinusOutlined/> : <PlusOutlined />}
				</Button>
				<Button>
					<a href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(filteredPapers))}`} 
						download="FilteredList.json"
					>
						Export Filtered List as JSON
					</a>
				</Button>
			</Row>
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
										<CustomTag record={record} type={type} key={typeArray.indexOf(type)}/>
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

		</>
	)
}

export default Papers