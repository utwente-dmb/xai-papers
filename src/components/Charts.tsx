import { Layout, Row, Col} from "antd"
import TestChart from "./TestChart"

function Charts(): JSX.Element {
 
	return (
		<Row gutter={10}>
			<Col span={5}>
				<TestChart></TestChart>
			</Col> 
			<Col span={5}>
				<TestChart></TestChart>
			</Col>
			<Col span={14}>
				<TestChart></TestChart>
			</Col>
		</Row>
	)
}

export default Charts