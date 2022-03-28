// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { unmountComponentAtNode } from "react-dom"


let container: HTMLDivElement | null = null
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
global.matchMedia = global.matchMedia || function () {
	return {
		addListener: jest.fn(),
		removeListener: jest.fn(),
	}
}
  