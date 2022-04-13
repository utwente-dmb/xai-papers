import { createSlice } from "@reduxjs/toolkit"
import { Paper } from "../../types"
import { isPaper } from "../../utils"
import papers from "../../db/db.json"

const initialState: Array<Paper> = []

papers.forEach((json) => {

	if (isPaper(json)) {
		initialState.push(json)
	} else {
		console.log(json, " is not a paper and was excluded fromt the list")
	}
})

const papersSlice = createSlice({
	name: "papers",
	initialState, 
	reducers: {}
})

export const papersReducer = papersSlice.reducer
export const papersActions = papersSlice.actions