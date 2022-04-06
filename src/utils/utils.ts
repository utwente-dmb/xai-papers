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

