import { render, unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"
import { Filters } from "../components"
import { Provider } from "react-redux"
import { store } from "../redux"
import "@testing-library/jest-dom"
import { prettyDOM } from "@testing-library/react"
import { Data, Explanation, Problem, Model, Task, Method } from "../types/paper"
import { brotliCompressSync } from "zlib"

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
	it("Checks filters", () => {
		// Render filters
		const filters = [Data, Explanation, Problem, Model, Task, Method]
		act(() => {
			render(<Provider store={store}><Filters /></Provider>, container)
		})

		// Get all the dropdowns and click them
		const allDropdowns = document.querySelectorAll(".ant-select-selection-overflow")
		act(() => {
			allDropdowns.forEach(elem => simulateMouseClick(elem))
		})

		// for each tag, click the corresponding entry in the dropdown and check if it appears in the input box
		Object.values(Data).forEach(element => {
			const btn = document.querySelector(`[title='${element}']`)
			expect(btn).not.toBeNull()
			act(() => {
				simulateMouseClick(btn)
			})
			expect(btn).toHaveAttribute("aria-selected", "true")
			const allTags = Array.from(document.querySelectorAll(".ant-select-selection-overflow-item > span > span")).map((elem) => elem.textContent)
			expect(allTags).toContain(element)
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
