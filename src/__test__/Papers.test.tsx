import { render, unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"
import { Filters, Papers } from "../components"
import { Provider } from "react-redux"
import { papersActions, store } from "../redux"
import "@testing-library/jest-dom"
import { prettyDOM } from "@testing-library/react"
import { Data, Explanation, Problem, Model, Task, Method } from "../types/paper"
import { brotliCompressSync } from "zlib"
import { useFilteredPapers } from "../hooks"

let container: HTMLElement | null = null

const mouseClickEvents = ["mousedown", "click", "mouseup"]
function simulateMouseClick(element: any) {
	mouseClickEvents.forEach(mouseEventType =>
		element.dispatchEvent(
			new MouseEvent(mouseEventType, {
				view: window,
				bubbles: true,
				cancelable: true,
				buttons: 1
			})
		)
	)
}


describe("Test", () => {
	it("Checks filtered papers for tags", () => {
		// Render filters
		act(() => {
			render(<Provider store={store}><Filters /><Papers /></Provider>, container)
		})

		// Get all the dropdowns and click them
		const allDropdowns = document.querySelectorAll(".ant-select-selection-overflow")
		act(() => {
			allDropdowns.forEach(elem => simulateMouseClick(elem))
		})

		Object.values(Data).forEach(element => {
			// Get dropdown value of elem and click
			const btn = document.querySelector(`[title='${element}']`)
			expect(btn).not.toBeNull()
			act(() => {
				simulateMouseClick(btn)
			})

			// Check if click succesfull
			expect(btn).toHaveAttribute("aria-selected", "true")

			// Check if tag added to list of tags
			const allTags = Array.from(document.querySelectorAll(".ant-select-selection-overflow-item > span > span")).map((elem) => elem.textContent)
			expect(allTags).toContain(element)

			// Click on all paper rows
			document.querySelectorAll("tr").forEach(row => {
				act(() => {
					simulateMouseClick(row)
				})
			})

			// Check all expanded rows if the tags match the clicked tags
			document.querySelectorAll(".ant-table-expanded-row").forEach(expandedRow => {
				const paperTags = Array.from(expandedRow.querySelectorAll(".ant-tag")).map(tag => tag.innerHTML.includes(":") ? tag.innerHTML.split(": ")[1] : tag.innerHTML)
				const contained = allTags.every(tag => (tag !== null) ? paperTags.includes(tag) : false)
				expect(contained).toBeTruthy()
			})
		})
	})
})

beforeEach(() => {
	// setup a DOM element as a render target
	container = document.createElement("div")
	document.body.appendChild(container)
})

afterEach(() => {
	// cleanup on exiting
	if (container !== null) {
		unmountComponentAtNode(container)
		container.remove()
	}
	container = null
})
