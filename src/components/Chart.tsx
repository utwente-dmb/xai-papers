import { Row, Col, Radio } from "antd"
import { ConnectedChart, CirclePackingChart, GrowthLineChart } from "./charts"
import { useState } from "react"

const { Button, Group } = Radio

const graphTypes = ["Connected Graph", "Tableu", "LineChart"]

const graphMap: { [key: string]: JSX.Element} = {
	"Connected Graph": (<ConnectedChart />),
	"Tableau": (<CirclePackingChart />),
	"LineChart": (<GrowthLineChart />)
}

function Chart(): JSX.Element {
	const [type, setType] = useState(graphTypes[0])

	function HandleChange(e: any) {
		setType(e.target.value)
	}


	return (
		<>
			<Row gutter={10}>
				<Col span={24}>
					<Group defaultValue={graphTypes[0]} buttonStyle="solid" onChange={HandleChange}>
						{graphTypes.map(elem =>
							<Button key={elem} value={elem}>
								{elem}
							</Button>)}
					</Group>
				</Col>
			</Row>
			<Row gutter={10}>
				<Col span={24}>
					{graphMap[type]}
				</Col>
			</Row>
			
		</>
	)
}

export default Chart
