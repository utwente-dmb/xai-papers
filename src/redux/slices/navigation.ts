import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type Navigation = {
    selectedKeys: string[]
}

const initialState: Navigation = {
	selectedKeys: []
}

const navigationSlice = createSlice({
	name: "navigation",
	initialState,
	reducers: {
		setSelectedKeys(state, action: PayloadAction<string[]>) {
			state.selectedKeys = action.payload
		}
	}
})

export const navigationReducer = navigationSlice.reducer
export const navigationActions = navigationSlice.actions