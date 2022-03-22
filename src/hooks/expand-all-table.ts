import { useLayoutEffect, useRef, useState } from "react"

export function useExpandingAllInTable(keys: any, keyName: any, defaultExpanded: any) {
	const [expandedKeys, setExpandedKeys] = useState(defaultExpanded ? keys : [])
	const lastExpandEventHandler = useRef<any>(null)
	const isAllExpanded = () => expandedKeys.length === keys.length

	function toggleRowExpanded(expanded: any, record: any) {
		if (expanded) {
			setExpandedKeys(expandedKeys.concat([record[keyName]]))
		} else {
			setExpandedKeys(expandedKeys.filter((item: any) => item !== record[keyName]))
		}
	}

	const toggleAllExpanded = () => {
		if (isAllExpanded()) {
			setExpandedKeys([])
		} else {
			setExpandedKeys(keys)
		}
	}
	const expandEventHandler = () => {
		toggleAllExpanded()
	}

	useLayoutEffect(() => {
		const element = document.getElementsByClassName(
			"expand-all"
		)[0]
		if (lastExpandEventHandler.current) {
			element.removeEventListener(
				"click",
				lastExpandEventHandler.current,
				false
			)
		}
		element.addEventListener("click", expandEventHandler, false)
		lastExpandEventHandler.current = expandEventHandler
	})
  
	return {
		isAllExpanded,
		expandedRowKeys: expandedKeys,
		onExpand: toggleRowExpanded,
		rowKey: keyName
	}
}