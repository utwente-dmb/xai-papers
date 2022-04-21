import { SelectValue } from "../types"

// Functions to switch from and to filterValues and the original values 
export function toSelectValue<T>(arr: Array<T>, type: string) {
	return arr.map((val) => ({
		label: val,
		value: `${type}+${val}`,
		key: val
	}))
} 

export function fromSelectValue<T>(arr: Array<SelectValue<T>>) {
	return arr.map((item) => item.label)
}