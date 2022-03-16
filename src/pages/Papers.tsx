import React from "react"
import { Filters, Charts, Papers } from "../components"

function App() {
	const [displayPapers, setDisplayPapers] = React.useState<boolean>(true)

	const changeContent = (checked: boolean) => {
		setDisplayPapers(checked)
	}

	return (
		<>
			<Filters changeContent={changeContent} />
			{displayPapers ? <Papers /> : <Charts />}
		</>
	)
}

export default App
