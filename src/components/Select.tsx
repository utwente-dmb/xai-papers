import { useState } from "react"
import { Select, Col, Tag } from "antd"
import { Paper, FilterValue } from "../types"
import { fromFilterValue, getColor, toFilterValue } from "../utils"

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
    span?: number,
	maxTags?: number
  }

function Filter<T>({ placeholder, enumerator, handleChange, value, span, maxTags }: FilterProps<T> ): JSX.Element {

	const defaultValue = toFilterValue(value, placeholder)

	const [optionsSelected, setOptionsSelected] = useState<Array<T>>([])

	const onChange = (value: Array<FilterValue<T>>) => {
		handleChange(value)
		setOptionsSelected(fromFilterValue(value))
	}

	return (
		<Col span={span ?? 24}>
			<Select
				mode="multiple"
				style={{ width: "100%" }}
				placeholder={placeholder}
				defaultValue={defaultValue}
				onChange={onChange}
				labelInValue={true}
				tagRender={tagRender}
				allowClear
			>
				{Object.values(enumerator).map((item: string) => {
					maxTags = maxTags || 1000
					const isFull = optionsSelected.length >= maxTags
					const disabled = isFull && !optionsSelected.includes(item as unknown as T)

					return (
						<Option 
							value={`${placeholder}+${item}`} 
							key={item}
							disabled={disabled}
						>
							{item}
						</Option>
					)}
				)}
			</Select>
		</Col>
	)
}
export default Filter