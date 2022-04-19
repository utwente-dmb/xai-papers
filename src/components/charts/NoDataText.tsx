import { Row } from "antd"
//A function that returns a div with text stating that "No data available for the selected options."
function NoDataText() {
	return (<div style={{ height: "450px", width: "100%", marginTop: "20px" }}>
		<Row justify="center">
			<b>
				No data available for the selected options.
			</b>
		</Row>
	</div>)
}

export default NoDataText

