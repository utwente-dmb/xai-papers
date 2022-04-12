import React from "react"
import { Col, Row, DatePicker, Input, Tooltip, Form, Radio, RadioChangeEvent, Button } from "antd"
import { InfoCircleOutlined } from "@ant-design/icons"
import { Data, Explanation, Method, Model, Problem, Task, FilterValue, Venue } from "../types"
import { filtersActions } from "../redux"
import { useAppDispatch, useAppSelector } from "../hooks"
import { fromFilterValue } from "../utils"
import Select from "./Select"
import Moment from "moment"

const { RangePicker } = DatePicker
const { Search } = Input

function Filters(): JSX.Element {

	const filters = useAppSelector((state) => state.filters)
	const dispatch = useAppDispatch()

	function handleDataChange(value: Array<FilterValue<typeof Data>>) {
		dispatch(filtersActions.setData(fromFilterValue(value)))
	}

	function handleProblemChange(value: Array<FilterValue<typeof Problem>>) {
		dispatch(filtersActions.setProblem(fromFilterValue(value)))
	}

	function handleModelChange(value: Array<FilterValue<typeof Model>>) {
		dispatch(filtersActions.setModel(fromFilterValue(value)))
	}

	function handleTaskChange(value: Array<FilterValue<typeof Task>>) {
		dispatch(filtersActions.setTask(fromFilterValue(value)))
	}

	function handleExplanationChange(value: Array<FilterValue<typeof Explanation>>) {
		dispatch(filtersActions.setExplanation(fromFilterValue(value)))
	}

	function handleMethodChange(value: Array<FilterValue<typeof Method>>) {
		dispatch(filtersActions.setMethod(fromFilterValue(value)))
	}

	function handleVenueChange(value: Array<FilterValue<Venue>>) {
		dispatch(filtersActions.setVenue(fromFilterValue(value)))
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

	function handleReset() {
		dispatch(filtersActions.reset())
	}

	return (
		<Row gutter={[4, 4]} justify="center" style={{ marginBottom: 12 }}>
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
			<Col span={16}>
				<Button onClick={handleReset}>Reset Filters</Button>
			</Col>

			<Select placeholder="Type of Data" enumerator={Data} handleChange={handleDataChange} value={filters.data} span={8} />
			<Select placeholder="Type of Problem" enumerator={Problem} handleChange={handleProblemChange} value={filters.problem} span={8} />
			<Select placeholder="Type of Model to be Explained" enumerator={Model} handleChange={handleModelChange} value={filters.model} span={8} />
			<Select placeholder="Type of Task" enumerator={Task} handleChange={handleTaskChange} value={filters.task} span={8} />
			<Select placeholder="Type of Explanation" enumerator={Explanation} handleChange={handleExplanationChange} value={filters.explanation} span={8} />
			<Select placeholder="Method used to explain" enumerator={Method} handleChange={handleMethodChange} value={filters.method} span={8} />
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
