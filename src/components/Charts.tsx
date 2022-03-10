import { Row, Col} from "antd"
import TestChart from "./TestChart"

function Charts(): JSX.Element {
  
	return (
		<Row gutter={10}>
			<Col span={24}>
				<TestChart></TestChart>
			</Col>
		</Row>
	)
}

export default Charts
