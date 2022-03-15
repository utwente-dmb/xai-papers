import React from "react"
import KeepAlive, { useAliveController } from "react-activation"
import { Filters, Charts, Papers } from "../components"

function App() {
	const { refresh } = useAliveController()
	const [displayPapers, setDisplayPapers] = React.useState<boolean>(true)

	const changeContent = (checked: boolean) => {
		setDisplayPapers(checked)
		refresh("papers")
	}

	return (
		<KeepAlive name="papers">
			<Filters changeContent={changeContent} />
			{displayPapers ? <Papers /> : <Charts />}
		</KeepAlive>
	)
}

export default App
