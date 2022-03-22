import { Col, Row, DatePicker, Input, Tooltip, Switch } from "antd"
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
		dispatch(filtersActions.setVenue(fromFilterValue(value)))
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
		<Row gutter={[2, 2]} justify="center">
			<Col span={24} flex="center">
				<Switch checkedChildren="AND" unCheckedChildren="OR" defaultChecked onChange={handleFilterSwitch}/>
				<Tooltip title="State of the Filter: AND selects only papers with all of the selected types, OR selects all papers with any of the selected types">
					<InfoCircleOutlined />
				</Tooltip>
			</Col>

			<Select placeholder="Type of Data" enumerator={Data} handleChange={handleDataChange} value={filters.data}  span={8}/>
			<Select placeholder="Type of Problem" enumerator={Problem} handleChange={handleProblemChange} value={filters.problem}  span={8}/>
			<Select placeholder="Type of Model to be Explained" enumerator={Model} handleChange={handleModelChange} value={filters.model}  span={8}/>
			<Select placeholder="Type of Task" enumerator={Task} handleChange={handleTaskChange} value={filters.task}  span={8}/>
			<Select placeholder="Type of Explanation" enumerator={Explanation} handleChange={handleExplanationChange} value={filters.explanation}  span={8}/>
			<Select placeholder="Method used to explain" enumerator={Method} handleChange={handleMethodChange} value={filters.method}  span={8}/>
			<Select placeholder="Venue" enumerator={Venue} handleChange={handleVenueChange} value={filters.venue}  span={8}/>
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

			<Col span={8}>
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


		</Row>
	)
}

export default Filters
