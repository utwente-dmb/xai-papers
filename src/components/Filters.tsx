import React from "react"
import { Select, Col, Row, DatePicker, Input, Switch } from "antd"
import { Data, Explanation, Method, Model, Problem, Task } from "../types"
import { filtersActions } from "../redux"
import { useAppDispatch, useAppSelector } from "../hooks"
  
const { RangePicker } = DatePicker
const { Search } = Input

type FilterProps<T> = {
  placeholder: string, 
  enumerator: Record<number, string>,
  handleChange: (val: Array<T>) => void,
  defaultValue: Array<T>
}

function Filter<T>({placeholder, enumerator, handleChange}: FilterProps<T> ): JSX.Element {

	return (
		<Col span={4}>
			<Select
				mode="multiple"
				style={{ width: "100%" }}
				placeholder={placeholder}
				defaultValue={[]}
				onChange={handleChange}
				optionLabelProp="label"
			>
				{Object.values(enumerator).map((item: string, index: number) => (
					<Select value={item} key={index}>{item}</Select>
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
		<Row justify="end" gutter={4} style={{ marginTop: 10 }}>
			<Filter placeholder="Type of Data" enumerator={Data} handleChange={handleDataChange} defaultValue={filters.data}/>
			<Filter placeholder="Type of Problem" enumerator={Problem} handleChange={handleProblemChange} defaultValue={filters.problem}/>
			<Filter placeholder="Type of Model to be Explained" enumerator={Model} handleChange={handleModelChange} defaultValue={filters.model}/>
			<Filter placeholder="Type of Task" enumerator={Task} handleChange={handleTaskChange} defaultValue={filters.task}/>
			<Filter placeholder="Type of Explanation" enumerator={Explanation} handleChange={handleExplanationChange} defaultValue={filters.explanation}/>
			<Filter placeholder="Method used to explain" enumerator={Method} handleChange={handleMethodChange} defaultValue={filters.method}/>

			<Switch checkedChildren="Papers" unCheckedChildren="Graphs" defaultChecked onChange={handleContentChange} />
			<Switch checkedChildren="AND" unCheckedChildren="OR" defaultChecked onChange={handleFilterSwitch}/>

			<Col>
				<RangePicker picker="year" onPanelChange={handleYearChange} ></RangePicker>
			</Col>

			<Col>
				<Search style={{ width: 200 }} placeholder="Search titles and authors" onSearch={handleSearch} />
			</Col>
		</Row>
	)
}

export default Filters
