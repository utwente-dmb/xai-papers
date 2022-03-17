import { FilterValue } from "../types"

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