import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Problem, Method, Data, Task, Explanation, Model, Paper, FilterValue, Venue } from "../../types"


const initialState: Paper = {
	Title: "",
	url: "",
	Year: "2020",
	Venue: {
		isOld: true,
		value: ""
	},
	Authors: [],
	"Type of Data": [],
	"Type of Problem": [],
	"Type of Model to be Explained": [],
	"Type of Task": [],
	"Type of Explanation": [],
	"Method used to explain": []
}

const formSlice = createSlice({
	name: "form",
	initialState,
	reducers: {
		setTitle(state, action: PayloadAction<string>) {
			state.Title = action.payload
		},
		setDoi(state, action: PayloadAction<string>) {
			state.url = action.payload
		},
		setYear(state, action: PayloadAction<number>) {
			state.Year = action.payload.toString()
		},
		setAuthors(state, action: PayloadAction<Array<string>>) {
			state.Authors = action.payload
		},
		setIsOldVenue(state, action: PayloadAction<boolean>) {
			state.Venue.isOld = action.payload
		},
		setVenue(state, action: PayloadAction<Venue | string>) {
			state.Venue.value = action.payload
		},
		setData(state, action: PayloadAction<Array<typeof Data>>) {
			state["Type of Data"] = action.payload
		},
		setProblem(state, action: PayloadAction<Array<typeof Problem>>) {
			state["Type of Problem"] = action.payload
		},
		setModel(state, action: PayloadAction<Array<typeof Model>>) {
			state["Type of Model to be Explained"] = action.payload
		},
		setTask(state, action: PayloadAction<Array<typeof Task>>) {
			state["Type of Task"] = action.payload
		},
		setExplanation(state, action: PayloadAction<Array<typeof Explanation>>) {
			state["Type of Explanation"] = action.payload
		},
		setMethod(state, action: PayloadAction<Array<typeof Method>>) {
			state["Method used to explain"] = action.payload
		},
	}
})

export const formReducer = formSlice.reducer
export const formActions = formSlice.actions
