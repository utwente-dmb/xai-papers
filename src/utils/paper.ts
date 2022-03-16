import { Paper, Data, Problem, Model, Task, Explanation, Method } from "../types"

export function isPaper(paper: any): paper is Paper {
	return "url" in paper 
        && "Title" in paper 
        && "Year" in paper 
        && "Venue" in paper 
        && "Authors" in paper 
        && "Type of Data" in paper
        && isEnumArray(Data)(paper["Type of Data"])
        && "Type of Problem" in paper
        && isEnumArray(Problem)(paper["Type of Problem"])
        && "Type of Model to be Explained" in paper
        && isEnumArray(Model)(paper["Type of Model to be Explained"])
        && "Type of Task" in paper
        && isEnumArray(Task)(paper["Type of Task"])
        && "Type of Explanation" in paper
        && isEnumArray(Explanation)(paper["Type of Explanation"])
        && "Method used to explain" in paper
        && isEnumArray(Method)(paper["Method used to explain"])
}

export const isEnumArray = <T>(e: T) => (data: Array<T>): data is Array<T> => {
	let isTrue = true
	data.forEach((d) => {
		if (!isSomeEnum(e)(d)) {
			isTrue = false
		}
	})
	return isTrue
}

export const isSomeEnum = <T>(e: T) => (token: any): token is T[keyof T] =>
	Object.values(e).includes(token as T[keyof T])

export const typeArray: (keyof Paper)[] = ["Type of Data", "Type of Problem", "Type of Model to be Explained", "Type of Task", "Type of Explanation", "Method used to explain"]
export const enumArray = [Data, Problem, Model, Task, Explanation, Method]

export const getColor = (type: keyof Paper) => {
	switch (type) {
	case "Type of Data":
		return "magenta"
        
	case "Type of Problem":
		return "green"

	case "Type of Model to be Explained":
		return "blue"

	case "Type of Task": 
		return "orange"

	case "Type of Explanation": 
		return "red"

	case "Method used to explain": 
		return "purple"
                
	default:
		return "gold"
	}
}

// export const getColor = <T>(label: T) => {
// 	let color = "gold"
// 	if (Object.values(Data).includes(label as unknown as Data)) {
// 		color = "magenta"
// 	} else if (Object.values(Problem).includes(label as unknown as Problem)) {
// 		color = "green"
// 	} else if (Object.values(Model).includes(label as unknown as Model)) {
// 		color = "blue"
// 	} else if (Object.values(Task).includes(label as unknown as Task)) {
// 		color = "orange"
// 	} else if (Object.values(Explanation).includes(label as unknown as Explanation)) {
// 		color = "red"
// 	} else if (Object.values(Method).includes(label as unknown as Method)) {
// 		color = "purple"
// 	}
// 	return color
// }