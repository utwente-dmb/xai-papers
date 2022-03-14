import React from "react"
import { Filters, Charts, Papers } from "../components"

function App() {
	
	const [displayPapers, setDisplayPapers] = React.useState<boolean>(true)

	return (
		<>
			<Filters changeContent={setDisplayPapers} />
			{displayPapers ? <Papers /> : <Charts />}
		</>
	)
}

export default App
