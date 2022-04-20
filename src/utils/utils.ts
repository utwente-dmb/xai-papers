// General utility functions
export const isEnumArray = <T>(e: T) => (data: Array<T>): data is Array<T> => {
	let isTrue = true
	data.forEach((d) => {
		if (!isSomeEnum(e)(d)) {
			console.log(`${d} is not part of given enum`)
			isTrue = false
		}
	})
	return isTrue
}

export const isSomeEnum = <T>(e: T) => (token: any): token is T[keyof T] =>
	Object.values(e).includes(token as T[keyof T])

export function printNames(names: string[]): string {
	let string = ""
	names.forEach((author) => { 
		string += names.indexOf(author) !== names.length - 1 
			? author + ", "
			: author 
	})
	return string
}

export function reverseObject(object: any) : any {
	return Object.fromEntries(Object.entries(object).map(a => a.reverse()))
}

export function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

