import { Form, Input, InputNumber, Button } from "antd"

const layout = {
	labelCol: {
		span: 8,
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

function AddPaperForm() {
	const onFinish = (values: any) => {
		console.log(values)
	}

	return (
		<Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
			<Form.Item
				name={["paper", "title"]}
				label="Title"
				rules={[
					{
						required: true,
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
						type: "email",
					},
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name={["paper", "age"]}
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
			<Form.Item name={["paper", "Authours"]} label="Authours">
				<Input />
			</Form.Item>
			<Form.Item name={["paper", "venue"]} label="Type of Data">
				<Input />
			</Form.Item>
			<Form.Item name={["paper", "venue"]} label="Type of Problem">
				<Input />
			</Form.Item>
			<Form.Item name={["paper", "venue"]} label="Type of Model to be Explained">
				<Input />
			</Form.Item>
			<Form.Item name={["paper", "venue"]} label="Type of Task">
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