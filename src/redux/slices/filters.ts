import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Data, Explanation, Method, Model, Problem, Task, Venue } from "../../types"

export type Filters = {
    data: Array<Data>
    problem: Array<Problem>
    model: Array<Model>
    task: Array<Task>
    explanation: Array<Explanation>
    method: Array<Method>
	venue: Array<Venue>
	startYear?: number
	endYear?: number
	search: string
    filterStateAND: boolean
}

const initialState: Filters = {
	data: [],
	problem: [],
	model: [],
	task: [],
	explanation: [],
	method: [],
	venue: [],
	startYear: undefined,
	endYear: undefined,
	search: "",
	filterStateAND: true
}

const filtersSlice = createSlice({
	name: "filters",
	initialState,
	reducers: { 
		reset() {
			return initialState 
		},
		setData(state, action: PayloadAction<Array<Data>>) {
			state.data = action.payload
		},
		setProblem(state, action: PayloadAction<Array<Problem>>) {
			state.problem = action.payload
		},
		setModel(state, action: PayloadAction<Array<Model>>) {
			state.model = action.payload
		},
		setTask(state, action: PayloadAction<Array<Task>>) {
			state.task = action.payload
		},
		setExplanation(state, action: PayloadAction<Array<Explanation>>) {
			state.explanation = action.payload
		},
		setMethod(state, action: PayloadAction<Array<Method>>) {
			state.method = action.payload
		},
		setVenue(state, action: PayloadAction<Array<Venue>>) {
			state.venue = action.payload
		},
		changeState(state, action: PayloadAction<boolean>) {
			state.filterStateAND = action.payload
		},
		setStartYear(state, action: PayloadAction<number | undefined>) {
			state.startYear = action.payload
		},
		setEndYear(state, action: PayloadAction<number | undefined>) {
			state.endYear = action.payload
		},
		setSearch(state, action: PayloadAction<string>) {
			state.search = action.payload
		}
	}
})

export const filtersReducer = filtersSlice.reducer
export const filtersActions = filtersSlice.actions