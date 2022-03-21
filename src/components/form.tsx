import { useState } from "react"
import { Form, Input, InputNumber, Button } from "antd"
import { Url } from "url"

const layout = {
	labelCol: {
		span: 4,
	},
	wrapperCol: {
		span: 16,
	},
}
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
	required: "${label} is required!",
	types: {
		email: "${label} is not a valid email!",
		number: "${label} is not a valid number!",
	},
	number: {
		range: "${label} must be between ${min} and ${max}",
	},
}
/* eslint-enable no-template-curly-in-string */

type FormState = {
	name: string
	doi: string
	year: number
	venue: string
	authors: string
	type_of_problem: string
	type_of_model: string
	type_of_task: string
	type_of_expl: string
	method: string

}

function AddPaperForm() {
	const onFinish = (values: any) => {
		console.log(values)
	}
	const initialState = {
		name: "",
		doi: "",
		year: 0,
		venue: "",
		authors: "",
		type_of_problem: "",
		type_of_model: "",
		type_of_task: "",
		type_of_expl: "",
		method: ""





	}

	const [formState, setFormState] = useState<FormState>(initialState)



	function handleChangeDoi(value: string) {
		setFormState({ ...formState, doi: value })
	}
	function handleChangeYear(value: number) {
		setFormState({ ...formState, year: value })
	}
	function handleChangeVenue(value: string) {
		setFormState({ ...formState, venue: value })
	}
	function handleChangeAuthours(value: string) {
		setFormState({ ...formState, authors: value })
	}
	function handleChangeTypeofProblem(value: string) {
		setFormState({ ...formState, type_of_problem: value })
	}
	function handleChangeTypeofModel(value: string) {
		setFormState({ ...formState, type_of_model: value })
	}
	function handleChangeTypeofTask(value: string) {
		setFormState({ ...formState, type_of_task: value })
	}
	function handleChangeTypeofExplanation(value: string) {
		setFormState({ ...formState, type_of_expl: value })
	}



	return (
		<Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
			<Form.Item
				name={["paper", "title"]}
				label="Title"
				rules={[
					{

					},
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name={["paper", "doi"]}
				label="Doi"
				rules={[
					{

					},
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name={["paper", "year"]}
				label="Year of Publication"
				rules={[
					{
						type: "number",

					},
				]}
			>
				<InputNumber />
			</Form.Item>

			<Form.Item name={["paper", "venue"]} label="Venue">
				<Input />
			</Form.Item>
			<Form.Item name={["paper", "authours"]} label="Authours">
				<Input />
			</Form.Item>
			<Form.Item name={["paper", "type_of_data"]} label="Type of Data">
				<Input />
			</Form.Item>
			<Form.Item name={["paper", "type_of_problem"]} label="Type of Problem">
				<Input />
			</Form.Item>
			<Form.Item name={["paper", "type_of_model"]} label="Type of Model to be Explained">
				<Input />
			</Form.Item>
			<Form.Item name={["paper", ""]} label="Type of Task">
				<Input />
			</Form.Item>
			<Form.Item name={["paper", "venue"]} label="Type of Explanation">
				<Input />
			</Form.Item>
			<Form.Item name={["paper", "venue"]} label="Method used to explain">
				<Input />
			</Form.Item>
			<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	)
}

export default AddPaperForm