import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import papers from '../../db/db.json'
import type { RootState } from '../store'

interface PapersState {

}

const initialState: PapersState = papers

const papersSlice = createSlice({
    name: 'papers',
    initialState, 
    reducers: {}
})

export const papersReducer = papersSlice.reducer
export const papersActions = papersSlice.actions