import React from "react"
import { Select, Col, Row, DatePicker, Input, Switch } from "antd"
import { Data, Explanation, Method, Model, Problem, Task } from "../types"
import { filtersActions } from "../redux"
import { useAppDispatch } from "../hooks"
  
const { RangePicker } = DatePicker
const { Search } = Input

type FilterProps<T> = {
  placeholder: string, enumerator: Record<number, string>, handleChange: (val: Array<T>) => void
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

	return (
		<Row justify="end" gutter={4} style={{ marginTop: 10 }}>
			<Filter placeholder="Type of Data" enumerator={Data} handleChange={handleDataChange}/>
			<Filter placeholder="Type of Problem" enumerator={Problem} handleChange={handleProblemChange} />
			<Filter placeholder="Type of Model to be Explained" enumerator={Model} handleChange={handleModelChange} />
			<Filter placeholder="Type of Task" enumerator={Task} handleChange={handleTaskChange} />
			<Filter placeholder="Type of Explanation" enumerator={Explanation} handleChange={handleExplanationChange} />
			<Filter placeholder="Method used to explain" enumerator={Method} handleChange={handleMethodChange} />

			<Switch checkedChildren="Papers" unCheckedChildren="Graphs" defaultChecked onChange={handleContentChange} />
			<Switch checkedChildren="AND" unCheckedChildren="OR" defaultChecked onChange={handleFilterSwitch}/>

			<Col>
				<RangePicker></RangePicker>
			</Col>

			<Col>
				<Search placeholder="input search text" style={{ width: 200 }} />
			</Col>
		</Row>
	)
}

export default Filters
