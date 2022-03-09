import { createSlice } from '@reduxjs/toolkit'
import { Data, Explanation, Method, Model, Problem, Task } from '../../types'

type Filters = {
    data: Array<Data>
    problem: Array<Problem>
    model: Array<Model>
    task: Array<Task>
    explanation: Array<Explanation>
    method: Array<Method>
}

const initialState: Filters = {
    data: [],
    problem: [],
    model: [],
    task: [],
    explanation: [],
    method: [],
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {}
})

export const filtersReducer = filtersSlice.reducer
export const filtersActions = filtersSlice.actions