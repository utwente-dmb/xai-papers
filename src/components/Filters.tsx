import React from "react"
import { Select, Col, Row, DatePicker, Input, Switch, Tag, Tooltip } from "antd"
import { InfoCircleOutlined } from "@ant-design/icons"
import { Data, Explanation, Method, Model, Paper, Problem, Task, FilterValue, Venue } from "../types"
import { filtersActions } from "../redux"
import { useAppDispatch, useAppSelector } from "../hooks"
import { getColor, toFilterValue, fromFilterValue } from "../utils"
import Moment from "moment"
  
const { RangePicker } = DatePicker
const { Search } = Input
const { Option } = Select

type TagRenderProps<T> = {
	label: T
	closable: boolean
	value: string
	onClose: () => void
}

function tagRender<T>({ label, closable, onClose, value }: TagRenderProps<T>) {
	const color = getColor(value.split("+")[0] as keyof Paper)
	return (
		<Tag
			color={color}
			closable={closable}
			onClose={onClose}
			style={{ marginRight: 3}}
		>
			{label}
		</Tag>
	)
}

type FilterProps<T> = {
	placeholder: string, 
	enumerator: Record<number, string>,
	handleChange: (val: Array<FilterValue<T>>) => void,
	value: Array<T>
  }

function Filter<T>({ placeholder, enumerator, handleChange, value }: FilterProps<T> ): JSX.Element {

	const defaultValue = toFilterValue(value, placeholder)

	return (
		<Col span={8}>
			<Select
				mode="multiple"
				style={{ width: "100%" }}
				placeholder={placeholder}
				defaultValue={defaultValue}
				onChange={handleChange}
				labelInValue={true}
				tagRender={tagRender}
				allowClear
			>
				{Object.values(enumerator).map((item: string) => (
					<Option value={`${placeholder}+${item}`} key={item}>{item}</Option>
				))}
			</Select>
		</Col>
	)
}


function Filters(): JSX.Element {

	const filters = useAppSelector((state) => state.filters)
	const dispatch = useAppDispatch()

	function handleDataChange(value: Array<FilterValue<Data>>) { 
		dispatch(filtersActions.setData(fromFilterValue(value)))
	}

	function handleProblemChange(value: Array<FilterValue<Problem>>) { 
		dispatch(filtersActions.setProblem(fromFilterValue(value)))
	}
  
	function handleModelChange(value: Array<FilterValue<Model>>) { 
		dispatch(filtersActions.setModel(fromFilterValue(value)))
	}

	function handleTaskChange(value: Array<FilterValue<Task>>) {
		dispatch(filtersActions.setTask(fromFilterValue(value)))
	}

	function handleExplanationChange(value: Array<FilterValue<Explanation>>) {
		dispatch(filtersActions.setExplanation(fromFilterValue(value)))
	}

	function handleMethodChange(value: Array<FilterValue<Method>>) {
		dispatch(filtersActions.setMethod(fromFilterValue(value)))
	}

	function handleVenueChange(value: Array<FilterValue<Venue>>) {
		dispatch(filtersActions.setVenue(fromFilterValue(value)[0]))
	}

	function handleFilterSwitch(checked: boolean) {
		dispatch(filtersActions.changeState(checked))
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
		<Row gutter={4}>
			<Filter placeholder="Type of Data" enumerator={Data} handleChange={handleDataChange} value={filters.data}/>
			<Filter placeholder="Type of Problem" enumerator={Problem} handleChange={handleProblemChange} value={filters.problem}/>
			<Filter placeholder="Type of Model to be Explained" enumerator={Model} handleChange={handleModelChange} value={filters.model}/>
			<Filter placeholder="Type of Task" enumerator={Task} handleChange={handleTaskChange} value={filters.task}/>
			<Filter placeholder="Type of Explanation" enumerator={Explanation} handleChange={handleExplanationChange} value={filters.explanation}/>
			<Filter placeholder="Method used to explain" enumerator={Method} handleChange={handleMethodChange} value={filters.method}/>
			<Filter placeholder="Venue" enumerator={Venue} handleChange={handleVenueChange} value={filters.venue ? [filters.venue] : []}/>
			<Col span={8}>
				<RangePicker 
					picker="year" 
					onPanelChange={handleYearChange} 
					allowEmpty={[true, true]}
					defaultValue={[
						filters.startYear ? Moment([filters.startYear]) : null, 
						filters.endYear ? Moment([filters.endYear]) : null
					]}
				></RangePicker>
			</Col>

			<Col span={6}>
				<Search 
					placeholder="Search titles, authors and venues" 
					onSearch={handleSearch} 
					defaultValue={filters.search} 
					suffix={
						<Tooltip title="Prefix with 'author:', 'venue:' or 'title:' to only search in the respective field">
							<InfoCircleOutlined />
						</Tooltip>
					}
				/>
			</Col>

			<Switch checkedChildren="AND" unCheckedChildren="OR" defaultChecked onChange={handleFilterSwitch}/>
		</Row>
	)
}

export default Filters
