import { Row, Col, Typography } from "antd"
import { FilterOutlined, FileAddOutlined, CheckCircleOutlined } from "@ant-design/icons"
import { githubUrl, pageToPath } from "../utils"

const { Title, Text } = Typography

const citation = ` @article{nauta2022anecdotal,
	title = { From Anecdotal Evidence to Quantitative Evaluation Methods: A Systematic Review on Evaluating Explainable AI },
		author = { Nauta, Meike and Trienes, Jan and Pathak, Shreyasi and Nguyen, Elisa and Peters, Michelle and Schmitt, Yasmin and Schl{
	\\"o}tterer, J{\\"o}rg and van Keulen, Maurice and Seifert, Christin},
		journal = { arXiv preprint arXiv: 2201.08164 },
			year = { 2022}
	} `

type TextIconProps = {
	Icon: any
	text: string
	description: JSX.Element
}

function TextIcon({ Icon, text, description }: TextIconProps) {

	return (
		<Col span={7} style={{ alignContent: "center" }}>
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

type TextImageProps = {
	textAlignment?: "left" | "right"
	text: string
	description: JSX.Element | string
	imageUrl: string
} 

function TextWithImage({ textAlignment = "left", text, description, imageUrl }: TextImageProps) {
	const imagePart = (
		<Col span={10}>
			<Row justify="center">
				<img src={`${process.env.PUBLIC_URL}${imageUrl}`} height="250"/>
			</Row>
		</Col>
	)

	const textPart = (
		<Col span={10} >
			<Row justify="center" align="middle">
				<>
					<Title style={{fontSize: 30}}>
						{text}
					</Title>
					<Text>
						{description}
					</Text>
				</>
			</Row>
		</Col>
	)
	
	return (
		<Row justify="center" style={{width: "100%", marginTop: 50}}>
			{textAlignment === "left" ? textPart : imagePart}
			{textAlignment === "left" ? imagePart : textPart}
		</Row>
	)
}

function LandingPage() {

	return (
		<>
			<Row justify="center" style={{marginBottom: 50}}>
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
			<Row style={{marginBottom: 50}} justify="space-between">
				<TextIcon 
					Icon={FilterOutlined} 
					text="Browse and Explore" 
					description={
						<>
						Quickly find relevant XAI papers by 
							<a href={`#${pageToPath("papers")}`}>
							&nbsp;filtering and searching&nbsp;
							</a>
							in the dataset, using our categorization scheme. Prefer visuals? Use our 
							<a href={`#${pageToPath("charts")}`}>
								&nbsp;charts page&nbsp;
							</a>
							for interactive graphs.
						</>
					}
				/>
				<TextIcon 
					Icon={FileAddOutlined} 
					text="Contribute and Categorize" 
					description={
						<>
							Make this a living collection by 
							<a href={`#${pageToPath("add-paper")}`}>
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
				<TextIcon 
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
			<TextWithImage 
				text="Initial Collection and Categorization"
				description={
					<>
					All papers in this collection are categorized along the scheme as presented by
						<a href="https://arxiv.org/abs/2201.08164" target="_blank" rel="noreferrer">
						&nbsp;Nauta et al. (2022)
						</a>. 
					The initial collection contains categorization of papers on explainable AI published in 2014-2020 at conferences AAAI,
					IJCAI, NeurIPS, ICML, ICLR, CVPR, ICCV, ACL, WWW, ICDM, KDD and SIGIR.
					</>
				}
				imageUrl="/protocol_categories.png"
			/>
			<TextWithImage 
				textAlignment="right"
				text="A Living Collection"
				description={
					<> 
					We invite the community to extend the initial paper collection by adding new papers. Anyone can contribute by adding a new paper as follows: Categorize the paper
					and use our website to generate a database entry. Create a pull request on our project’s 
						<a href={githubUrl} target="_blank" rel="noreferrer">
							&nbsp;Github page
						</a> and append the generated entry to our
					database. Some automated tests check whether the new database entry is in the right format, but that shouldn’t be any problem with our 
						<a href={`#${pageToPath("add-paper")}`}>
								&nbsp;generation tool
						</a>.
					</>
				}
				imageUrl="/protocol_categories.png"
			/>
			<TextWithImage 
				text="A Curated Collection"
				description={
					<> 
					To maintain a certain degree of quality, we invite the XAI community to review pull requests of others. Is the suggested paper indeed on explainable AI and is the
					categorization correct? Leave a review on our project’s 
						<a href={githubUrl} target="_blank" rel="noreferrer">
							&nbsp;Github page
						</a>. With three positive reviews (or one positive review of an admin), the pull request is
					automatically merged and the paper is added to the collection! 
					</>
				}
				imageUrl="/protocol_categories.png"
			/>
			<Row style={{marginTop: 35}}>
				This website is based on the data collected by Meike Nauta, Jan Trienes, Shreyasi Pathak, Elisa Nguyen, Michelle Peters, Yasmin Schmitt, Jörg Schlötterer, Maurice van Keulen, Christin Seifert as described in
				<a href="https://arxiv.org/abs/2201.08164" target="_blank" rel="noreferrer">
					&quot;From Anecdotal Evidence to Quantitative Evaluation Methods: A Systematic Review on Evaluating Explainable AI&quot;
				</a>
				<small>
					&ensp;(preprint, 2022)
				</small>
				<br/>
				We thank Abdullah Qazi, Boris Gerretzen, Frans Schooltink, Gies den Broeder and Ramish Bhutto for helping us with the development of this website. 
				<br/>
				<br/>
			</Row>
			<Title level={4}>
				Citation
			</Title>
			<Text>
				If you found this resource helpful, please cite our work:
				<pre>{citation}</pre>
			</Text>
			<Row justify="center">
				<img src={process.env.PUBLIC_URL + "/UT_Logo_Horizontal_Black.png"} height="80"/>
				<img src={process.env.PUBLIC_URL + "/IKIM_Logo.png"} height="80"/>
			</Row>
		</>
	)
}

export default LandingPage