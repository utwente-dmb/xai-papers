export function printNames(names: string[]): string {
	let string = ""
	names.forEach((author) => { 
		string += names.indexOf(author) !== names.length - 1 
			? author + ", "
			: author 
	})
	return string
}