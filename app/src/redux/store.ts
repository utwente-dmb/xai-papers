import { configureStore } from '@reduxjs/toolkit'
import { papersReducer } from './slices'

export const store = configureStore({
    reducer: {
        papers: papersReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch