import { Row, Col } from "antd"
import { TestChart,CirclePackingChart,GrowthLineChart } from "."

function Charts(): JSX.Element {

	return (
		<div>
			<Row gutter={10}>
				<Col span={24}>
					<TestChart></TestChart>
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

export default Charts
