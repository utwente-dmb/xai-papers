import { Select, Col, Tag } from "antd"
import { Paper, SelectValue } from "../types"
import { getColor, toSelectValue } from "../utils"

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
	handleChange: ((val: Array<SelectValue<T>>) => void) | ((val?: SelectValue<T>) => void), // Non-Array val type is for if single is true
	value: Array<T>
    span?: number, // Span means the width for ant design. span of 24 means a width of 100%
	single?: boolean // If single is true, the select will only allow a single value to be selected.
  }

function CustomSelect<T>({ placeholder, enumerator, handleChange, value, span, single }: FilterProps<T> ): JSX.Element {
	const defaultValue = toSelectValue(value, placeholder)

	return (
		<Col span={span ?? 24}>
			<Select
				mode={single ? undefined : "multiple"}
				style={{ width: "100%" }}
				placeholder={placeholder}
				value={defaultValue}
				onChange={handleChange as any}
				labelInValue={true}
				tagRender={tagRender}
				allowClear
			>
				{Object.values(enumerator).map((item: string) => {
					return (
						<Option 
							value={`${placeholder}+${item}`} 
							key={item}
						>
							{item}
						</Option>
					)}
				)}
			</Select>
		</Col>
	)
}
export default CustomSelect