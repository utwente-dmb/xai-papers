import { createSlice } from '@reduxjs/toolkit'
import papers from '../../db/db.json'
import { Paper } from '../../types'

const initialState: Array<Paper> = papers

const papersSlice = createSlice({
    name: 'papers',
    initialState, 
    reducers: {}
})

export const papersReducer = papersSlice.reducer
export const papersActions = papersSlice.actions