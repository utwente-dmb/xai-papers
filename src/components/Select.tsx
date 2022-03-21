import { Select, Col, Tag } from "antd"
import { Paper, FilterValue } from "../types"
import { getColor, toFilterValue } from "../utils"

const { Option } = Select

type TagRenderProps<T> = {
	label: T
	closable: boolean
	value: string
	onClose: () => void
}

function tagRender<T>({ label, closable, onClose, value }: TagRenderProps<T>) {
	const color = getColor(value.split("+")[0] as keyof Paper)
	return (
		<Tag
			color={color}
			closable={closable}
			onClose={onClose}
			style={{ marginRight: 3}}
		>
			{label}
		</Tag>
	)
}


type FilterProps<T> = {
	placeholder: string, 
	enumerator: Record<number, string>,
	handleChange: (val: Array<FilterValue<T>>) => void,
	value: Array<T>
    span?: number
  }

function Filter<T>({ placeholder, enumerator, handleChange, value, span }: FilterProps<T> ): JSX.Element {

	const defaultValue = toFilterValue(value, placeholder)

	return (
		<Col span={span ?? 24}>
			<Select
				mode="multiple"
				style={{ width: "100%" }}
				placeholder={placeholder}
				defaultValue={defaultValue}
				onChange={handleChange}
				labelInValue={true}
				tagRender={tagRender}
				allowClear
			>
				{Object.values(enumerator).map((item: string) => (
					<Option value={`${placeholder}+${item}`} key={item}>{item}</Option>
				))}
			</Select>
		</Col>
	)
}
export default Filter