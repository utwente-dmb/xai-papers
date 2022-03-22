import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Problem, Method, Data, Task, Explanation, Model, Paper, FilterValue, Venue } from "../../types"

type Form = {
	Title: string
	Doi: string
	Year: number
	Venue: string
	Authors: Array<string>
    "Type of Data": Array<Data>
    "Type of Problem": Array<Problem>
    "Type of Model": Array<Model>
    "Type of Task": Array<Task>
    "Type of Explanation": Array<Explanation>
	Method: Array<Method>
}

const initialState: Form = {
	Title: "",
	Doi: "",
	Year: 2020,
	Venue: "",
	Authors: [],
	"Type of Data": [],
	"Type of Problem": [],
	"Type of Model": [],
	"Type of Task": [],
	"Type of Explanation": [],
	Method: []
}

const formSlice = createSlice({
	name: "form",
	initialState,
	reducers: {
		setTitle(state, action: PayloadAction<string>) {
			state.Title = action.payload
		},
		setDoi(state, action: PayloadAction<string>) {
			state.Doi = action.payload
		},
		setYear(state, action: PayloadAction<number>) {
			state.Year = action.payload
		},
		setAuthors(state, action: PayloadAction<Array<string>>) {
			state.Authors = action.payload
		},
		setVenue(state, action: PayloadAction<Venue>) {
			state.Venue = action.payload
		},
		setData(state, action: PayloadAction<Array<Data>>) {
			state["Type of Data"] = action.payload
		},
		setProblem(state, action: PayloadAction<Array<Problem>>) {
			state["Type of Problem"] = action.payload
		},
		setModel(state, action: PayloadAction<Array<Model>>) {
			state["Type of Model"] = action.payload
		},
		setTask(state, action: PayloadAction<Array<Task>>) {
			state["Type of Task"] = action.payload
		},
		setExplanation(state, action: PayloadAction<Array<Explanation>>) {
			state["Type of Explanation"] = action.payload
		},
		setMethod(state, action: PayloadAction<Array<Method>>) {
			state.Method = action.payload
		},
	}
})

export const formReducer = formSlice.reducer
export const formActions = formSlice.actions
