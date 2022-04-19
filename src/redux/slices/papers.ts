import { createSlice } from "@reduxjs/toolkit"
import { Paper } from "../../types"
import { isPaper } from "../../utils"
import papers from "../../db/db.json" // Loading the papers from the db.json

const initialState: Array<Paper> = []

// Go through the papers, fix the date if necessary and assert that they are actually Papers according to the isPaper function
papers.forEach((json) => {
	const paper = json as Paper
	if (typeof paper.Date === "string") {
		paper.Date = new Date(paper.Date)
	}
	if (isPaper(paper)) {
		initialState.push(paper)
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