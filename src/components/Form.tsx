import { Form, Input, InputNumber, Button, Col, Row } from "antd"
import { Problem, Method, Data, Task, Explanation, Model, FilterValue, Paper } from "../types"
import Select from "./Select"
import { fromFilterValue } from "../utils"
import { useAppDispatch, useAppSelector } from "../hooks"
import { formActions } from "../redux"
import { printNames } from "../utils/utils"
import TextArea from "antd/lib/input/TextArea"
import { useState, useEffect } from "react"

const { Item } = Form

const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 14,
	},
}


function AddPaperForm() {

	const dispatch = useAppDispatch()
	const form = useAppSelector((state) => state.form)
	const [json, setJson] = useState("")
	useEffect(() => {
		setJson(JSON.stringify(form, null, 2) + ",")
	}, [form])

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


	return (
		<Row>
			<Col span={12}>
				<Form {...layout} name="nest-messages">
					<Item label="Title"
					>
						<Input defaultValue={form.Title} onChange={handleChangeTitle} />
					</Item>
					<Item label="Doi">
						<Input defaultValue={form.url} onChange={handleChangeDoi} />
					</Item>
					<Item label="Year of Publication">
						<InputNumber defaultValue={parseInt(form.Year)} onChange={handleChangeYear} />
					</Item>

					<Item label="Authors" >
						<Input defaultValue={printNames(form.Authors)} onChange={handleChangeAuthors} />
					</Item>

					<Item label="Type of Data">
						<Select placeholder="Type of Data" enumerator={Data} handleChange={handleChangeData} value={form["Type of Data"]} />
					</Item>

					<Item label="Type of Problem">
						<Select placeholder="Type of Problem" enumerator={Problem} handleChange={handleChangeProblem} value={form["Type of Problem"]} />
					</Item>

					<Item label="Type of Model to be Explained">
						<Select placeholder="Type of Model to be Explained" enumerator={Model} handleChange={handleChangeModel} value={form["Type of Model to be Explained"]} />
					</Item>

					<Item label="Type of Task">
						<Select placeholder="Type of Task" enumerator={Task} handleChange={handleChangeTask} value={form["Type of Task"]} />
					</Item>

					<Item label="Type of Explanation">
						<Select placeholder="Type of Explanation" enumerator={Explanation} handleChange={handleChangeExplanation} value={form["Type of Explanation"]} />
					</Item>

					<Item label="Method used to explain">
						<Select placeholder="Method used to explain" enumerator={Method} handleChange={handleChangeMethod} value={form["Method used to explain"]} />
					</Item>
				</Form>
			</Col>
			<Col span={12}>
				<Item label="Your JSON">
					<TextArea value={json} autoSize />
				</Item>
			</Col>
		</Row>

	)
}

export default AddPaperForm
