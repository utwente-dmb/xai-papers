import schema from "../db/schema.json"

const properties = schema.items.properties


// This creates an object with the schema.json enum as both keys and values. 
// The synstax is a bit weird, but this is what typescript would compile a type to.
// Because of the syntax it can be used to get the correct types using typeof (creating a normal object does not work)
export let Data: any
(function (Data) {
	properties["Type of Data"].items.enum.forEach((val) => {
		Data[val] = val
	})
})(Data || (Data = {}))

export let Explanation: any
(function (Explanation) {
	properties["Type of Explanation"].items.enum.forEach((val) => {
		Explanation[val] = val
	})
})(Explanation || (Explanation = {}))

export let Problem: any
(function (Problem) {
	properties["Type of Problem"].items.enum.forEach((val) => {
		Problem[val] = val
	})
})(Problem || (Problem = {}))

export let Model: any
(function (Model) {
	properties["Type of Model to be Explained"].items.enum.forEach((val) => {
		Model[val] = val
	})
})(Model || (Model = {}))

export let Task: any 
(function (Task) {
	properties["Type of Task"].items.enum.forEach((val) => {
		Task[val] = val
	})
})(Task || (Task = {}))

export let Method: any 
(function (Method) {
	properties["Method used to explain"].items.enum.forEach((val) => {
		Method[val] = val
	})
})(Method || (Method = {}))

export interface Paper {
    Title: string
    url: string
    Year: string
    Venue: VenueType
    Authors: Array<string>
    "Type of Data": Array<typeof Data>
    "Type of Problem": Array<typeof Problem>
    "Type of Model to be Explained": Array<typeof Model>
    "Type of Task": Array<typeof Task>
    "Type of Explanation": Array<typeof Explanation>
    "Method used to explain": Array<typeof Method>
    Abstract: string
    Comment?: string
    Date?: Date,
    IsOld?: boolean
}

export type VenueType = {
    isOld: boolean,
    value: Venue | string
}

export enum Venue {
    ACL = "ACL",
    ICDM = "ICDM",
    KDD = "KDD",
    SIGIR = "SIGIR",
    AAAI = "AAAI",
    NeurIPS = "NeurIPS",
    ICCV = "ICCV",
    ICLR = "ICLR",
    WWW = "WWW",
    IJCAI = "IJCAI",
    ICML = "ICML",
    CVPR = "CVPR",
    Other = "Other"
}

