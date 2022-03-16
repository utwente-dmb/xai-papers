import React from "react"
import { Select, Col, Row, DatePicker, Input, Switch, Tag } from "antd"
import { Data, Explanation, Method, Model, Problem, Task } from "../types"
import { filtersActions } from "../redux"
import { useAppDispatch, useAppSelector } from "../hooks"
import { getColor } from "../utils"
  
const { RangePicker } = DatePicker
const { Search } = Input
const { Option } = Select

type Value<T> = {
	value: string
	label: T
}

function toValue<T>(arr: Array<T>, value: string): Array<Value<T>> {
	return arr.map((item) => ({
		label: item,
		value
	}))
}

function fromValue<T>(arr: Array<Value<T>>): Array<T> {
	return arr.map((item) => item.label)
}

type FilterProps<T> = {
  placeholder: string, 
  enumerator: Record<number, string>,
  handleChange: (val: Array<T>, arg?: any) => void,
  value: any
}

type TagRenderProps<T> = {
	label: T
	closable: boolean
	value: any
	onClose: () => void
}

function tagRender<T>({ label, closable, onClose, value }: TagRenderProps<T>) {
	console.log("Tag", label, value)
	const color = getColor(value.split("+")[1])

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

	const val = toValue(value, placeholder)
	const values = toValue(Object.values(enumerator), placeholder)

	return (
		<Col span={8}>
			<Select
				mode="multiple"
				style={{ width: "100%" }}
				placeholder={placeholder}
				defaultValue={value}
				// value={val}
				onChange={handleChange}
				onDeselect={() => {console.log("deselect")}} // This only exists to fix the removal of tags
				labelInValue={true}
				tagRender={tagRender}
				allowClear
			>
				{values.map((item: Value<string>, index: number) => (
					<Option value={`${item.label}+${item.value}`} key={index}>{item.label}</Option>
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

	function handleDataChange(value: Array<Value<Data>>) { 
		console.log("Data", value)
		dispatch(filtersActions.setData(fromValue(value)))
	}

	function handleProblemChange(value: Array<Value<Problem>>) { 
		dispatch(filtersActions.setProblem(fromValue(value)))
	}
  
	function handleModelChange(value: Array<Value<Model>>) { 
		dispatch(filtersActions.setModel(fromValue(value)))
	}

	function handleTaskChange(value: Array<Value<Task>>) {
		dispatch(filtersActions.setTask(fromValue(value)))
	}

	function handleExplanationChange(value: Array<Value<Explanation>>) {
		dispatch(filtersActions.setExplanation(fromValue(value)))
	}

	function handleMethodChange(value: Array<Value<Method>>) {
		dispatch(filtersActions.setMethod(fromValue(value)))
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
