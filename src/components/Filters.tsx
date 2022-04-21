import React from "react"
import { Col, Row, DatePicker, Input, Tooltip, Form, Radio, RadioChangeEvent, Button, Checkbox } from "antd"
import { InfoCircleOutlined } from "@ant-design/icons"
import { Data, Explanation, Method, Model, Problem, Task, SelectValue, Venue } from "../types"
import { filtersActions } from "../redux"
import { useAppDispatch, useAppSelector } from "../hooks"
import { fromSelectValue } from "../utils"
import Select from "./Select"
import Moment from "moment"
import { CheckboxChangeEvent } from "antd/lib/checkbox"

const { RangePicker } = DatePicker
const { Search } = Input

function Filters(): JSX.Element {

	const filters = useAppSelector((state) => state.filters)
	const dispatch = useAppDispatch()

	function handleDataChange(value: Array<SelectValue<typeof Data>>) {
		dispatch(filtersActions.setData(fromSelectValue(value)))
	}

	function handleProblemChange(value: Array<SelectValue<typeof Problem>>) {
		dispatch(filtersActions.setProblem(fromSelectValue(value)))
	}

	function handleModelChange(value: Array<SelectValue<typeof Model>>) {
		dispatch(filtersActions.setModel(fromSelectValue(value)))
	}

	function handleTaskChange(value: Array<SelectValue<typeof Task>>) {
		dispatch(filtersActions.setTask(fromSelectValue(value)))
	}

	function handleExplanationChange(value: Array<SelectValue<typeof Explanation>>) {
		dispatch(filtersActions.setExplanation(fromSelectValue(value)))
	}

	function handleMethodChange(value: Array<SelectValue<typeof Method>>) {
		dispatch(filtersActions.setMethod(fromSelectValue(value)))
	}

	function handleVenueChange(value: Array<SelectValue<Venue>>) {
		dispatch(filtersActions.setVenue(fromSelectValue(value)))
	}

	function handleFilterChange(event: RadioChangeEvent) {
		dispatch(filtersActions.changeState(event.target.value === "AND"))
	}

	function handleYearChange(value: any) {
		const startYear = value?.[0]?.year()
		const endYear = value?.[1]?.year()

		dispatch(filtersActions.setStartYear(startYear))
		dispatch(filtersActions.setEndYear(endYear))
	}

	function handleSearch(value: React.ChangeEvent<HTMLInputElement>) {
		dispatch(filtersActions.setSearch(value.currentTarget.value))
	}

	function handleShowOriginal(value: CheckboxChangeEvent) {
		dispatch(filtersActions.setShowOriginal(value.target.checked))
	}

	function handleShowNew(value: CheckboxChangeEvent) {
		dispatch(filtersActions.setShowNew(value.target.checked))
	}

	function handleReset() {
		dispatch(filtersActions.reset())
	}

	return (
		<Row gutter={[4, 4]} justify="center" style={{ marginBottom: 12 }}>
			{/* First row of the filters */}
			<Col span={8}>
				<Form.Item
					label="State of Filter"
					tooltip={{
						title: "AND selects papers with all of the selected types, OR selects papers with any of the selected types",
						icon: <InfoCircleOutlined />
					}}
				>
					<Radio.Group buttonStyle="solid" defaultValue={filters.filterStateAND ? "AND" : "OR"} onChange={handleFilterChange}>
						<Radio.Button value="AND">AND</Radio.Button>
						<Radio.Button value="OR">OR</Radio.Button>
					</Radio.Group>
				</Form.Item>
			</Col>
			
			{/* Reset Filters button */}
			<Col span={8}>
				<Button onClick={handleReset}>Reset Filters</Button>
			</Col>
			<Col span={4}>
				<Checkbox onChange={handleShowOriginal} checked={filters.showOriginal}>Show Original Papers</Checkbox>
			</Col>
			<Col span={4}>
				<Checkbox onChange={handleShowNew} checked={filters.showNew}>Show New Papers</Checkbox>
			</Col>

			{/* Second row */}
			<Select placeholder="Type of Data" enumerator={Data} handleChange={handleDataChange} value={filters.data} span={8} />
			<Select placeholder="Type of Problem" enumerator={Problem} handleChange={handleProblemChange} value={filters.problem} span={8} />
			<Select placeholder="Type of Model to be Explained" enumerator={Model} handleChange={handleModelChange} value={filters.model} span={8} />

			{/* Third row */}
			<Select placeholder="Type of Task" enumerator={Task} handleChange={handleTaskChange} value={filters.task} span={8} />
			<Select placeholder="Type of Explanation" enumerator={Explanation} handleChange={handleExplanationChange} value={filters.explanation} span={8} />
			<Select placeholder="Method used to explain" enumerator={Method} handleChange={handleMethodChange} value={filters.method} span={8} />

			{/* Fourth row */}
			<Select placeholder="Venue" enumerator={Venue} handleChange={handleVenueChange} value={filters.venue} span={8} />

			<Col span={8}>
				<RangePicker
					picker="year"
					onChange={handleYearChange}
					allowEmpty={[true, true]}
					value={[
						filters.startYear ? Moment([filters.startYear]) : null,
						filters.endYear ? Moment([filters.endYear]) : null
					]}
					defaultPickerValue={[
						Moment([2010]),
						Moment([2010])
					]}
					style={{
						width: "100%",
					}}
				></RangePicker>
			</Col>

			<Col span={8}>
				<Search
					placeholder="Search titles, venues, authors and abstracts"
					onChange={handleSearch}
					value={filters.search}
					suffix={
						<Tooltip title="Prefix with 'title:', 'venue:', 'author:' or 'abstract:' to only search in the respective field">
							<InfoCircleOutlined />
						</Tooltip>
					}
				/>
			</Col>
		</Row>
	)
}

export default Filters
