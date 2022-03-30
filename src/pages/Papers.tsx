import { Typography } from "antd"
const { Paragraph } = Typography
import {
	MailOutlined
} from "@ant-design/icons"
import { Filters, Papers } from "../components"

const citation = ` @article{nauta2022anecdotal,
	title = { From Anecdotal Evidence to Quantitative Evaluation Methods: A Systematic Review on Evaluating Explainable AI },
		author = { Nauta, Meike and Trienes, Jan and Pathak, Shreyasi and Nguyen, Elisa and Peters, Michelle and Schmitt, Yasmin and Schl{
	\\"o}tterer, J{\\"o}rg and van Keulen, Maurice and Seifert, Christin},
		journal = { arXiv preprint arXiv: 2201.08164 },
			year = { 2022}
	} `
	

function App() {

	return (
		<div className="about">
			<div className="container">
				<div className="row align-items-center my-5">
					
					<div className="col-lg-7">
						{/* <img src="images/logo-university-of-twente.png" width="50" height="50"> </img> */}

						<h1> Purpose </h1>
						<p>
						The researchers of the Data Management and Biometrics department at
						the University of Twente in collaboration with University of
						Duisburg-Essen conducted a
						large-scale literature review on
						Explainable Artificial intelligence. This website provides an
						interactive way to explore the dataset and results.
						</p>
						<p></p>
					</div>
					
					<div className="col-lg-5">
						<h1 className="font-weight-light">Abstract</h1>
						<p>
							The rising popularity of explainable artificial intelligence (XAI)
							to understand high-performing black boxes, also raised the
							question of how to evaluate explanations of machine learning (ML)
							models. While interpretability and explainability are often
							presented as a subjectively validated binary property, we consider
							it a multi-faceted concept. We identify 12 conceptual properties,
							such as Compactness and Correctness, that should be evaluated for
							comprehensively assessing the quality of an explanation. Our
							so-called Co-12 properties serve as categorization scheme for
							systematically reviewing the evaluation practice of more than 300
							papers published in the last 7 years at major AI and ML
							conferences that introduce an XAI method. We find that 1 in 3
							papers evaluate exclusively with anecdotal evidence, and 1 in 5
							papers evaluate with users. We also contribute to the call for
							objective, quantifiable evaluation methods by presenting an
							extensive overview of quantitative XAI evaluation methods. This
							systematic collection of evaluation methods provides researchers
							and practitioners with concrete tools to thoroughly validate,
							benchmark and compare new and existing XAI methods. This also
							opens up opportunities to include quantitative metrics as
							optimization criteria during model training in order to optimize
							for accuracy and interpretability simultaneously.
						</p>
					</div>

					<Filters/>
					<Papers />

					<div className="col-lg-5">
						<h1 className="font-weight-light">Contributions</h1>
						<p> Do you want to get involved in the research or have any questions? Please feel free to email us here <a href="mailto:m.nauta@utwente.nl">
							{<MailOutlined />}  </a>
						</p>

					</div>
					<div className="col-lg-5">
						<h1 className="font-weight-light">Citation</h1>
						<p> If you found this resource helpful, please cite our work:</p>
					</div>
					<Paragraph>
						<pre>{citation}</pre>
					</Paragraph>
				</div>
			</div>
			{/* <div className="site-card-wrapper">
				<Row gutter={16}>
					<Col span={8}>
						<Card title="Card title" bordered={true}>
							Card content
						</Card>
					</Col>
					<Col span={8}>
						<Card title="Card title" bordered={true}>
							Get in Touch
						</Card>
					</Col>
					<Col span={8}>
						<Card title="Card title" bordered={true}>
							Card content
						</Card>
					</Col>
				</Row>
			</div> */}
		</div>
	)
}

export default App
