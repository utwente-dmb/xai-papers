import { Row, Col } from "antd"
import { ConnectedChart, CirclePackingChart, GrowthLineChart } from "./charts"

function Chart(): JSX.Element {

	return (
		<div>
			<Row gutter={10}>
				<Col span={24}>
					<ConnectedChart></ConnectedChart>
				</Col>
			</Row>
			<Row>
				<CirclePackingChart></CirclePackingChart>
			</Row>
			<Row>
				<GrowthLineChart></GrowthLineChart>
			</Row>
		</div>
	)
}

export default Chart
