import { Row } from "antd"

function NoDataChartText() {
	return (<div style={{ height: "450px", width: "100%", marginTop: "20px" }}>
		<Row justify="center">
			<b>
				No data available for the selected options.
			</b>
		</Row>
	</div>)
}

export default NoDataChartText

