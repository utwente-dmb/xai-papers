import { Row, Col, Radio } from "antd"
import { ConnectedChart, CirclePackingChart, GrowthLineChart } from "./charts"
import { useState } from "react"

const { Button, Group } = Radio

const graphTypes = ["Connected Graph", "Tableu", "LineChart"]

function Chart(): JSX.Element {
	const [type, setType] = useState(graphTypes[0])

	function HandleChange(e: any) {
		console.log(e.target.value)
		setType(e.target.value)
	}

	function ReturnGraph():JSX.Element {
		switch (type) {
			
		case graphTypes[0]: {
			return (<ConnectedChart />)
			break
		}
		case graphTypes[1]: {
			return (<CirclePackingChart />)
			break
		}
		case graphTypes[2]: {
			return (<GrowthLineChart />)
			break
		}
		default:{
			return(<ConnectedChart />)
			break
		}
		}
	}

	return (
		<div>
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
					<ReturnGraph/>
				</Col>
			</Row>
			{/* <Row>
				<CirclePackingChart></CirclePackingChart>
			</Row>
			<Row>
				<GrowthLineChart></GrowthLineChart>
			</Row> */}
		</div>
	)
}

export default Chart
