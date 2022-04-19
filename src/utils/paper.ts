import { Filters } from "../redux/slices/filters"
import { Paper, Data, Problem, Model, Task, Explanation, Method, Venue } from "../types"
import { isSomeEnum, isEnumArray } from "./utils"

// Function that checks if an object is of type Paper. 
// Uses typescript typeguards to ensure that objects that pass the checks are actually given type Paper
export function isPaper(paper: any): paper is Paper {
	return "url" in paper 
        && "Title" in paper 
        && "Year" in paper 
        && "Venue" in paper 
		&& (paper["Venue"]["isOld"] && isSomeEnum(Venue)(paper["Venue"]["value"]) || !paper["Venue"]["isOld"])
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

// Array of the type of X, used throughout the project for consistency
export const typeArray: (keyof Paper)[] = ["Type of Data", "Type of Problem", "Type of Model to be Explained", "Type of Task", "Type of Explanation", "Method used to explain"]

// Map from name of type object to type of X string
export const enumKeyMap: Record<keyof Omit<Filters, "filterStateAND" | "startYear" | "endYear" | "search" >, keyof Paper> = {
	data: "Type of Data", 
	problem: "Type of Problem", 
	model: "Type of Model to be Explained", 
	task: "Type of Task",
	explanation: "Type of Explanation",
	method: "Method used to explain",
	venue: "Venue",
}

// returns the dedicated color to the given type of X/Venue given. Colors are 
export const getColor = (type: keyof Paper) => {
	switch (type) {
	case "Type of Data":
		return "magenta"
        
	case "Type of Problem":
		return "green"

	case "Type of Model to be Explained":
		return "geekblue"

	case "Type of Task": 
		return "orange"

	case "Type of Explanation": 
		return "red"

	case "Method used to explain": 
		return "purple"

	case "Venue": 
		return "cyan"
                
	default:
		return "gold"
	}
}
