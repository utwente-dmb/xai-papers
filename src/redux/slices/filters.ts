import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Data, Explanation, Method, Model, Problem, Task } from "../../types"

export type Filters = {
    data: Array<Data>
    problem: Array<Problem>
    model: Array<Model>
    task: Array<Task>
    explanation: Array<Explanation>
    method: Array<Method>
    filterStateOR: boolean
}

const initialState: Filters = {
	data: [],
	problem: [],
	model: [],
	task: [],
	explanation: [],
	method: [],
	filterStateOR: true
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
		changeState(state, action: PayloadAction<boolean>) {
			state.filterStateOR = action.payload
		}
	}
})

export const filtersReducer = filtersSlice.reducer
export const filtersActions = filtersSlice.actions