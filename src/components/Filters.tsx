import React from "react"
import { Select, Col, Row, DatePicker, Input, Switch, Tag } from "antd"
import { Data, Explanation, Method, Model, Paper, Problem, Task } from "../types"
import { filtersActions } from "../redux"
import { useAppDispatch, useAppSelector } from "../hooks"
import { getColor } from "../utils"
  
const { RangePicker } = DatePicker
const { Search } = Input
const { Option } = Select

type FilterProps<T> = {
  placeholder: string, 
  enumerator: Record<number, string>,
  handleChange: (val: Array<T>) => void,
  value: Array<T>
}

type TagRenderProps<T> = {
	label: T
	closable: boolean
	value: string
	onClose: () => void
}

function tagRender<T>({ label, closable, onClose, value }: TagRenderProps<T>) {
	const color = getColor(value.split("-")[0] as keyof Paper)
	return (
		<Tag
			color={color}
			closable={closable}
			onClose={onClose}
			style={{ marginRight: 3 }}
		>
			{label}
		</Tag>
	)
}

function Filter<T>({ placeholder, enumerator, handleChange, value }: FilterProps<T> ): JSX.Element {

	return (
		<Col span={8}>
			<Select
				mode="multiple"
				style={{ width: "100%" }}
				placeholder={placeholder}
				defaultValue={value}
				value={value}
				onChange={handleChange}
				labelInValue={true}
				tagRender={tagRender}
				allowClear
			>
				{Object.values(enumerator).map((item: string, index: number) => (
					<Option value={`${placeholder}-${item}`} key={index}>{item}</Option>
				))}
			</Select>
		</Col>
	)
}

type FiltersProps = {
	changeContent: (val: boolean) => void
}

function Filters({ changeContent }: FiltersProps): JSX.Element {

	const filters = useAppSelector((state) => state.filters)
	const dispatch = useAppDispatch()

	function handleDataChange(value: Array<Data>) { 
		console.log("Data", value)
		dispatch(filtersActions.setData(value))
	}

	function handleProblemChange(value: Array<Problem>) { 
		dispatch(filtersActions.setProblem(value))
	}
  
	function handleModelChange(value: Array<Model>) { 
		dispatch(filtersActions.setModel(value))
	}

	function handleTaskChange(value: Array<Task>) {
		dispatch(filtersActions.setTask(value))
	}

	function handleExplanationChange(value: Array<Explanation>) {
		dispatch(filtersActions.setExplanation(value))
	}

	function handleMethodChange(value: Array<Method>) {
		dispatch(filtersActions.setMethod(value))
	}

	function handleFilterSwitch(checked: boolean) {
		dispatch(filtersActions.changeState(checked))
	}

	function handleContentChange(checked: boolean) {
		changeContent(checked)
	}

	function handleYearChange(value: any) {
		const startYear = value[0]?.year()
		const endYear = value[1]?.year()

		dispatch(filtersActions.setStartYear(startYear))
		dispatch(filtersActions.setEndYear(endYear))
	}

	function handleSearch(value: string) {
		dispatch(filtersActions.setSearch(value))
	}

	return (
		<Row justify="end" gutter={4}>
			<Filter placeholder="Type of Data" enumerator={Data} handleChange={handleDataChange} value={filters.data}/>
			<Filter placeholder="Type of Problem" enumerator={Problem} handleChange={handleProblemChange} value={filters.problem}/>
			<Filter placeholder="Type of Model to be Explained" enumerator={Model} handleChange={handleModelChange} value={filters.model}/>
			<Filter placeholder="Type of Task" enumerator={Task} handleChange={handleTaskChange} value={filters.task}/>
			<Filter placeholder="Type of Explanation" enumerator={Explanation} handleChange={handleExplanationChange} value={filters.explanation}/>
			<Filter placeholder="Method used to explain" enumerator={Method} handleChange={handleMethodChange} value={filters.method}/>

			<Switch checkedChildren="Papers" unCheckedChildren="Graphs" defaultChecked onChange={handleContentChange} />
			<Switch checkedChildren="AND" unCheckedChildren="OR" defaultChecked onChange={handleFilterSwitch}/>

			<Col>
				<RangePicker picker="year" onPanelChange={handleYearChange} ></RangePicker>
			</Col>

			<Col>
				<Search style={{ width: 200 }} placeholder="Search titles and authors" onSearch={handleSearch} defaultValue={filters.search} />
			</Col>
		</Row>
	)
}

export default Filters
