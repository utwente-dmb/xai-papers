import { Row, Col, Typography } from "antd"
import { FilterOutlined, FileAddOutlined, CheckCircleOutlined } from "@ant-design/icons"
import { githubUrl } from "../utils"

const { Title, Text } = Typography

type IconStuffProps = {
	Icon: any
	text: string
	description: JSX.Element
}

function IconStuff({ Icon, text, description }: IconStuffProps) {

	return (
		<Col span={8} style={{ alignContent: "center" }}>
			<Row justify="center">
				<Icon style={{fontSize: 50, color: "blue"}}/>
			</Row>
			<Row justify="center">
				<Title style={{fontSize: 30 }}>
					{text}
				</Title>
			</Row>
			<Text>
				{description}
			</Text>
		</Col>
	)
}

function LandingPage() {

	return (
		<>
			<Row justify="center" style={{marginBottom: 20}}>
				<Title>
					A Living and Curated Collection of Explainable AI Methods
				</Title>
				<Text>
				Interactively browse and contribute to a curated
				categorization of papers on explainable AI. The initial dataset was
				collected and labelled by 
					<a href="https://arxiv.org/abs/2201.08164" target="_blank" rel="noreferrer">
						&nbsp;Nauta et al. (2022)
					</a> 
					, but we invite
				the community to keep this a living and curated collection of explainable AI methods. Contribute by adding papers and reviewing suggestions from others!
				</Text>
			</Row>
			<Row>
				<IconStuff 
					Icon={FilterOutlined} 
					text="Browse and Explore" 
					description={
						<>
						Quickly find relevant XAI papers by 
							<a href="">
							&nbsp;filtering and searching&nbsp;
							</a>
							in the dataset, using our categorization scheme. Prefer visuals? Use our 
							<a href="">
								&nbsp;charts page&nbsp;
							</a>
							for interactive graphs.
						</>
					}
				/>
				<IconStuff 
					Icon={FileAddOutlined} 
					text="Contribute and Categorize" 
					description={
						<>
							Make this a living collection by 
							<a href="">
								&nbsp;adding papers&nbsp;
							</a>
							to this collection! Label the paper using our categorization
							scheme and 
							<a href={githubUrl} target="_blank" rel="noreferrer">
							&nbsp;make a pull request
							</a>
							.
						</>
					}
				/>
				<IconStuff 
					Icon={CheckCircleOutlined} 
					text="Review and Verify" 
					description={
						<>
							Help curating this dataset by 
							<a href={`${githubUrl}/pulls`} target="_blank" rel="noreferrer">	
								&nbsp;reviewing pull requests&nbsp;
							</a>
							for new papers. A paper with 3 positive reviews will be
							automatically added to our collection.
						</>
					}
				/>

			</Row>
		</>
	)
}

export default LandingPage