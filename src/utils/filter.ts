import { FilterValue } from "../types"

// Functions to switch from and to filterValues and the original values 
export function toFilterValue<T>(arr: Array<T>, type: string) {
	return arr.map((val) => ({
		label: val,
		value: `${type}+${val}`,
		key: val
	}))
} 

export function fromFilterValue<T>(arr: Array<FilterValue<T>>) {
	return arr.map((item) => item.label)
}