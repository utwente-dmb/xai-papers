import { Paper, Data, Problem, Model, Task, Explanation, Method } from "../types"

export function isPaper(paper: any): paper is Paper {
    return "Paper-ID" in paper 
        && "url" in paper 
        && "Title" in paper 
        && "Year" in paper 
        && "Venue" in paper 
        && "Authors" in paper 
        && "Type of Data" in paper
        && isEnumArray(Data)(paper['Type of Data'])
        && "Type of Problem" in paper
        && isEnumArray(Problem)(paper['Type of Problem'])
        && "Type of Model to be Explained" in paper
        && isEnumArray(Model)(paper['Type of Model to be Explained'])
        && "Type of Task" in paper
        && isEnumArray(Task)(paper['Type of Task'])
        && "Type of Explanation" in paper
        && isEnumArray(Explanation)(paper['Type of Explanation'])
        && "Method used to explain" in paper
        && isEnumArray(Method)(paper['Method used to explain'])
        && "Should the paper be included?" in paper
        && "Should the paper be included with filter?" in paper
}

export const isEnumArray = <T>(e: T) => (data: Array<any>): data is Array<T> => {
    let isTrue = true
    data.forEach((d) => {
        if (!isSomeEnum(e)(d)) {
            isTrue = false
        }
    })
    return isTrue
}

export const isSomeEnum = <T>(e: T) => (token: any): token is T[keyof T] =>
    Object.values(e).includes(token as T[keyof T]);