import { Form, Input, InputNumber, Button } from "antd"
import { Problem, Method, Data, Task, Explanation, Model, FilterValue } from "../types"
import Select from "./Select"
import { fromFilterValue } from "../utils"
import { useAppDispatch, useAppSelector } from "../hooks"
import { formActions } from "../redux"
import { printNames } from "../utils/utils"

const { Item } = Form

const layout = {
	labelCol: {
		span: 4,
	},
	wrapperCol: {
		span: 8,
	},
}


function AddPaperForm() {

	const dispatch = useAppDispatch()
	const form = useAppSelector((state) => state.form)

	function handleChangeTitle(event: React.FormEvent<HTMLInputElement>) {
		dispatch(formActions.setTitle(event.currentTarget.value))
	}

	function handleChangeDoi(event: React.FormEvent<HTMLInputElement>) {
		dispatch(formActions.setDoi(event.currentTarget.value))
	}

	function handleChangeYear(value: number) {
		dispatch(formActions.setYear(value))
	}

	function handleChangeAuthors(event: React.FormEvent<HTMLInputElement>) {
		const authors = event.currentTarget.value.split(",").map((author) => author.trim())
		console.log("Authors", authors)
		dispatch(formActions.setAuthors(authors))
	}

	function handleChangeData(value: Array<FilterValue<Data>>) { 
		dispatch(formActions.setData(fromFilterValue(value)))
	}

	function handleChangeProblem(value: Array<FilterValue<Problem>>) { 
		dispatch(formActions.setProblem(fromFilterValue(value)))
	}
  
	function handleChangeModel(value: Array<FilterValue<Model>>) { 
		dispatch(formActions.setModel(fromFilterValue(value)))
	}

	function handleChangeTask(value: Array<FilterValue<Task>>) {
		dispatch(formActions.setTask(fromFilterValue(value)))
	}

	function handleChangeExplanation(value: Array<FilterValue<Explanation>>) {
		dispatch(formActions.setExplanation(fromFilterValue(value)))
	}

	function handleChangeMethod(value: Array<FilterValue<Method>>) {
		dispatch(formActions.setMethod(fromFilterValue(value)))
	}

	const onSubmit = (values: any) => {
		console.log(values)
	}



	return (
		<Form {...layout} name="nest-messages" onFinish={onSubmit} >
			<Item name={["paper", "Title"]} label="Title"
			>
				<Input defaultValue={form.Title} onChange={handleChangeTitle}/>
			</Item>
			<Item name={["paper", "Doi"]} label="Doi"
			>
				<Input defaultValue={form.Doi} onChange={handleChangeDoi}/>
			</Item>
			<Item name={["paper", "year"]} label="Year of Publication">
				<InputNumber defaultValue={form.Year} onChange={handleChangeYear}/>
			</Item>

			<Item name="authors" label="Authors" >
				<Input defaultValue={printNames(form.Authors)} onChange={handleChangeAuthors}/>
			</Item>

			<Item label="Type of Data">
				<Select placeholder="Type of Data" enumerator={Data} handleChange={handleChangeData} value={form["Type of Data"]}/>
			</Item>

			<Item label="Type of Problem">
				<Select placeholder="Type of Problem" enumerator={Problem} handleChange={handleChangeProblem} value={form["Type of Problem"]}/>
			</Item>

			<Item label="Type of Model to be Explained">
				<Select placeholder="Type of Model to be Explained" enumerator={Model} handleChange={handleChangeModel} value={form["Type of Model"]}/>
			</Item>

			<Item label="Type of Task">
				<Select placeholder="Type of Task" enumerator={Task} handleChange={handleChangeTask} value={form["Type of Task"]} />
			</Item>

			<Item label="Type of Explanation">
				<Select placeholder="Type of Explanation" enumerator={Explanation} handleChange={handleChangeExplanation} value={form["Type of Explanation"]}/>
			</Item>

			<Item label="Method used to explain">
				<Select placeholder="Method used to explain" enumerator={Method} handleChange={handleChangeMethod} value={form.Method}/>
			</Item>

			<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	)
}

export default AddPaperForm