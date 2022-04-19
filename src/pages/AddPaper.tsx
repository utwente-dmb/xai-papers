import { Form, Input, InputNumber, Button, Col, Row, Collapse, notification, Image } from "antd"
import { Problem, Method, Data, Task, Explanation, Model, FilterValue, Venue } from "../types"
import { Select } from "../components"
import { fromFilterValue } from "../utils"
import { useAppDispatch, useAppSelector } from "../hooks"
import { formActions } from "../redux"
import { printNames } from "../utils/utils"
import React, { useState, useEffect } from "react"
import { InfoCircleOutlined } from "@ant-design/icons"

const { Item } = Form
const { TextArea } = Input
const { Panel } = Collapse

type TypeOfExplanationProps = {
	name: string,
	description: string,
	imageUrl?: string // In this case, imageUrl should be inside the explanation_types_examples folder
}

// if imageUrl is given, it will render a panel with the image.
function TypeOfExplanation({ name, description, imageUrl }: TypeOfExplanationProps) {
	const imageCitation = imageUrl ? imageUrl.split(".")[0].split("_") : undefined
	const citation = imageCitation?.[imageCitation?.length - 1]
	return (
		<>
			<p style={{ margin: 0 }}><i>{name}</i>, {description}</p>
			{imageUrl ? <Collapse style={{ marginBottom: 10 }}>
				<Panel header={`Example taken from [${citation}]`} key="1">
					<Image src={`${process.env.PUBLIC_URL + "/explanation_types_examples/"}${imageUrl}`} style={{width: "100%"}}/>
				</Panel>
			</Collapse> : null}
			
		</>
	)
}

function AddPaper() {

	const dispatch = useAppDispatch()
	const form = useAppSelector((state) => state.form)
	const [json, setJson] = useState("")
	useEffect(() => {
		setJson("," + JSON.stringify(form, null, 2))
	}, [form])

	function handleChangeTitle(event: React.FormEvent<HTMLInputElement>) {
		dispatch(formActions.setTitle(event.currentTarget.value))
	}

	function handleChangeDoi(event: React.FormEvent<HTMLInputElement>) {
		dispatch(formActions.setDoi(event.currentTarget.value))
	}

	function handleChangeYear(value: number) {
		dispatch(formActions.setYear(value))
	}

	function handleChangeAuthors(event: React.FormEvent<HTMLInputElement>) {
		const authors = event.currentTarget.value.split(",").map((author) => author.trim())
		dispatch(formActions.setAuthors(authors))
	}

	function handleChangeVenueDropdown(value?: FilterValue<Venue>) {
		const newVenue = value?.label ?? ""
		if (newVenue === "Other") {
			dispatch(formActions.setIsOldVenue(false))
			dispatch(formActions.setVenue(""))
		} else {
			dispatch(formActions.setIsOldVenue(true))
			dispatch(formActions.setVenue(newVenue))
		}
	}

	function handleChangeVenueInput(event: React.FormEvent<HTMLInputElement>) {
		const venue = event.currentTarget.value
		dispatch(formActions.setVenue(venue))
	}

	function handleChangeData(value: Array<FilterValue<typeof Data>>) {
		dispatch(formActions.setData(fromFilterValue(value)))
	}

	function handleChangeProblem(value: Array<FilterValue<typeof Problem>>) {
		dispatch(formActions.setProblem(fromFilterValue(value)))
	}

	function handleChangeModel(value: Array<FilterValue<typeof Model>>) {
		dispatch(formActions.setModel(fromFilterValue(value)))
	}

	function handleChangeTask(value: Array<FilterValue<typeof Task>>) {
		dispatch(formActions.setTask(fromFilterValue(value)))
	}

	function handleChangeExplanation(value: Array<FilterValue<typeof Explanation>>) {
		dispatch(formActions.setExplanation(fromFilterValue(value)))
	}

	function handleChangeMethod(value: Array<FilterValue<typeof Method>>) {
		dispatch(formActions.setMethod(fromFilterValue(value)))
	}

	function handleChangeAbstract(value: React.ChangeEvent<HTMLTextAreaElement>) {
		dispatch(formActions.setAbstract(value.currentTarget.value))
	}

	function handleChangeComment(value: React.ChangeEvent<HTMLTextAreaElement>) {
		dispatch(formActions.setComment(value.currentTarget.value))
	}

	function copyJsonToClipboard() {
		navigator.clipboard.writeText(json)
		notification.open({
			message: "Successfully copied JSON to clipboard",
			duration: 1.5
		})
	}

	const venueValue = form.Venue.value as Venue
	const venue = form.Venue.isOld ? [venueValue] : ["Other" as Venue]

	return (
		<div className="addpaper" >
			<h2>Paper Submission</h2>
			<p>The original paper already includes classification of over 300 research papers. Of course this list is not exhaustive and therefore we would like to ask the wider research community to aid in extending the original research.</p>

			<p>You can contribute to this project by going to the project&rsquo;s <a href="https://github.com/BorisGerretzen/DMBLiteratureWebsite/blob/master/src/db/db.json" target="_blank" rel="noreferrer" >GitHub</a>. This page shows the current contents of the database. To add a new entry simply fork the project and append the db.json file using the following template.</p>
			
			<Row>
				<Col span={16}>
					<Form labelCol={{span: 6}} wrapperCol={{span: 16}}>
						<Item label="Title" tooltip={{ 
							title: "Title of the paper in English",
							icon: <InfoCircleOutlined/>
						}} required >
							<Input placeholder="Title" defaultValue={form.Title} onChange={handleChangeTitle} />
						</Item>
 
						<Item label="Doi-url" required>
							<Input placeholder="Doi-url" defaultValue={form.url} onChange={handleChangeDoi} />
						</Item>

						<Item label="Year of Publication" required >
							<InputNumber defaultValue={parseInt(form.Year)} onChange={handleChangeYear} />
						</Item>

						<Item label="Authors" tooltip={{ 
							title: "Firstname Lastname, all names should be separated by a comma",
							icon: <InfoCircleOutlined/>
						}} required >
							<Input placeholder="Authors" defaultValue={printNames(form.Authors)} onChange={handleChangeAuthors} />
						</Item>

						<Item label="Venue"  required >
							<Select placeholder="Venue" enumerator={Venue} handleChange={handleChangeVenueDropdown} value={venue} single />
						</Item>
						{!form.Venue.isOld 
							? <Item label="Venue" tooltip={{ 
								title: "Please use an abbreviation of the complete Venue name similar to the predefined venues.",
								icon: <InfoCircleOutlined/>
							}}>
								<Input placeholder="Venue" onChange={handleChangeVenueInput} value={form.Venue.value} /> 
							</Item>
							: null
						}

						<Item label="Type of Data" tooltip={{
							title: "What Datatypes the model in the paper uses. A combination of multiple flags is possible.",
							icon: <InfoCircleOutlined/>
						}} required >
							<Select placeholder="Type of Data" enumerator={Data} handleChange={handleChangeData} value={form["Type of Data"]} />
						</Item>

						<Item label="Type of Problem" required >
							<Select placeholder="Type of Problem" enumerator={Problem} handleChange={handleChangeProblem} value={form["Type of Problem"]} />
							<Collapse>
								<Panel header="Info" key="1">
									<p>What type of problems a XAI method can solve are solved in the paper. With at least one of the following flags. These four problem types are based on the taxonomy of Guidotti et. al.[8]</p>

									<p><i>Model Explanation</i>, globally explaining model &#55349;&#56403; through an interpretable, predictive model.</p>

									<p><i>Model Inspection</i>, globally explaining some specific property of model &#55349;&#56403; or its prediction.</p>

									<p><i>Outcome Explanation</i>, explaining an outcome/prediction of &#55349;&#56403; on a particular input instance.</p>

									<p><i>Transparent Box Design</i>, the explanation method is an interpretable model (i.e., &#55349;&#56402; = &#55349;&#56403; ) also making the predictions.</p>
								</Panel>
							</Collapse>
						</Item>

						<Item label="Type of Model to be Explained" tooltip={{
							title: "What type of AI model is used in the paper. A combination of multiple flags is possible.",
							icon: <InfoCircleOutlined/>
						}} required >
							<Select placeholder="Type of Model to be Explained" enumerator={Model} handleChange={handleChangeModel} value={form["Type of Model to be Explained"]} />
						</Item>

						<Item label="Type of Task" tooltip={{
							title: "What is the task of the AI model in the paper. A combination of multiple flags is possible.",
							icon: <InfoCircleOutlined/>
						}} required >
							<Select placeholder="Type of Task" enumerator={Task} handleChange={handleChangeTask} value={form["Type of Task"]} />
						</Item>

						<Item label="Method used to explain" required >
							<Select placeholder="Method used to explain" enumerator={Method} handleChange={handleChangeMethod} value={form["Method used to explain"]} />
							<Collapse>
								<Panel header="Info" key="1">
									<p>What method is used to explain the AI model. <br/>
										<i>Post-hoc Explanation Method</i>, Post-hoc explanation methods (also called reverse engineering): explain an already trained predictive model.</p>

									<p><i>Built-in Interpretability</i>, Interpretability built into the predictive model, such as white-box models, attention mechanisms or interpretability constraints (e.g. sparsity) included in the training process of the predictive model.</p>

									<p><i>Supervised Explanation Training</i>, where a ground-truth explanation is provided in order to train the model to output an explanation.</p>

								</Panel>
							</Collapse>
						</Item>

						<Item label="Type of Explanation" required >
							<Select placeholder="Type of Explanation" enumerator={Explanation} handleChange={handleChangeExplanation} value={form["Type of Explanation"]} />
							<Collapse>
								<Panel header="Info" key="1">
									<p>What type of explanation is used to explain the AI model. A combination of multiple flags is possible.</p>
									<TypeOfExplanation 
										name="Decision Rules"
										description="Logical rules, including decision sets[16], anchors[24], decision tables[13] and programs[31]."
										imageUrl="decision_rules_16.PNG"
									/>

									<TypeOfExplanation 
										name="Decision Tree"
										description="Rooted graph with conditional statement at each node, e.g. ProtoTree [19]."
										imageUrl="decision_tree_19.png"
									/>

									<TypeOfExplanation 
										name="Disentanglement"
										description="Disentangled representation, where each disjoint feature might have a semantic meaning. E.g. InfoGAN [5]."
										imageUrl="disentanglement_5.PNG"
									/>

									<TypeOfExplanation 
										name="Feature Importance"
										description="Set of 1-dimensional non-binary values/scores to indicate feature relevance, feature contribution or attribution. A feature is not necessarily an input feature to predictive model &#55349;&#56403; , but it should be a feature in the explanation. Examples include SHAP[18] and importance scores by LIME[23]."
										imageUrl="feature_importance_22.PNG"
									/>

									<TypeOfExplanation 
										name="Feature Plot"
										description="Plot or figure showing relations or interactions between features or between feature(s) and outcome. Examples include Partial Dependence Plot[7], Individual Conditional Expectation plot[9] and Feature Auditing[1]."
										imageUrl="feature_plot_9.PNG"
									/>
					
									<TypeOfExplanation 
										name="Graph"
										description="Graphical network structure with nodes and edges, e.g. Abstract Policy Graph[28], Knowledge Graph[32], Flow Graph[25] and Finite State Automata[11]."
										imageUrl="graph_27.PNG"
									/>

									<TypeOfExplanation 
										name="Heatmap"
										description="Map with at least 2 dimensions visually highlighting non-binary feature attribution, activation, sensitivity, attention or saliency. Includes attention maps[26], perturbation masks [6] and Layer-Wise Relevance Propagation [2]."
										imageUrl="heatmap_25.PNG"
									/>

									<TypeOfExplanation 
										name="Localization"
										description="Binary feature importance. Features can be any type of covariate used in the explanation, such as words, tabular features, or bounding boxes. Examples include binary maps with image patches[23], segmentation[12] and bounding boxes[33]."
										imageUrl="Localization_22.PNG"
									/>

									<TypeOfExplanation 
										name="Prototypes"
										description="(Parts of) Representative examples, including concepts[15], influential training instances[10], prototypical parts [4, 19], nearest neighbors and criticisms[14]."
										imageUrl="prototypes_14.PNG"
									/>

									<TypeOfExplanation 
										name="Representation Synthesis"
										description="Artificially produced visualization to explain representations of the predictive model. Examples include generated data samples[27], Activation Maximization[20] and feature visualization[21]."
										imageUrl="representation_synthesis_33.PNG"
									/>

									<TypeOfExplanation 
										name="Representation Visualization"
										description="Charts or plots to visualize representations of the predictive model, including visualizations of dimensionality reduction with scatter plots[30], visual cluster analysis[17] and Principal Component Analysis."
										imageUrl="representation_visualization_29.PNG"
									/>

									<TypeOfExplanation 
										name="Text"
										description="Textual explanation via natural language [3, 22]."
										imageUrl="text_21.PNG"
									/>

									<TypeOfExplanation 
										name="White-box Model"
										description="Intrinsically interpretable models (excluding decision rules). Predictive model &#55349;&#56403; is interpretable and therefore acts as explanation. Examples include a scoring sheet[29] and linear regression. Decision Rules and Decision Trees do not fall into this category, since they are categories on their own."
										imageUrl="white_box_model_28.PNG"
									/>

									<TypeOfExplanation 
										name="Other"
										description="Explanation that do not fit any other category."
									/>

								</Panel>
							</Collapse>
						</Item>

						<Item label="Abstract" tooltip={{ 
							title: "Abstract is optional, but highly recommended",
							icon: <InfoCircleOutlined/>
						}}>
							<TextArea placeholder="Abstract" defaultValue={form["Abstract"]} onChange={handleChangeAbstract} autoSize />
						</Item>

						<Item label="Comment" tooltip={{ 
							title: "Used to indicate that your paper needs to have a new tag for example",
							icon: <InfoCircleOutlined/>
						}}>
							<TextArea placeholder="Comment" defaultValue={form?.Comment} onChange={handleChangeComment} autoSize />
						</Item>
					</Form>
				</Col>
				<Col span={8}>
					<Item label="Your JSON">
						<TextArea value={json} autoSize />
						<Button onClick={copyJsonToClipboard}>Copy To Clipboard</Button>
					</Item>
				</Col>
			</Row>

			<h2>References</h2>

			<p style={{margin: 0}}>[1] Philip Adler, Casey Falk, Sorelle A Friedler, Tionney Nix, Gabriel Rybeck, Carlos Scheidegger, Brandon Smith, and Suresh Venkatasubramanian. Auditing black-box models for indirect influence. Knowledge and Information Systems, 54(1):95&ndash;122, 2018.</p>
			<p style={{margin: 0}}>[2] Sebastian Bach, Alexander Binder, Gr&eacute;goire Montavon, Frederick Klauschen, Klaus-Robert M&uuml;ller, and Wojciech Samek. On pixel-wise explanations for non-linear classifier decisions by layer-wise relevance propagation. PLOS ONE, 10(7):1&ndash;46, 07 2015.</p>
			<p style={{margin: 0}}>[3] Oana-Maria Camburu, Tim Rockt&auml;schel, Thomas Lukasiewicz, and Phil Blunsom. e-snli: Natural language inference with natural language explanations. In Samy Bengio, Hanna M. Wallach, Hugo Larochelle, Kristen Grauman, Nicol&ograve; Cesa-Bianchi, and Roman Garnett, editors, Advances in Neural Information Processing Systems 31: Annual Conference on Neural Information Processing Systems 2018, NeurIPS 2018, December 3-8, 2018, 36 Nauta et al. Montr&eacute;al, Canada, pages 9560&ndash;9572, 2018.</p>
			<p style={{margin: 0}}>[4] Chaofan Chen, Oscar Li, Daniel Tao, Alina Barnett, Cynthia Rudin, and Jonathan Su. This looks like that: Deep learning for interpretable image recognition. In Hanna M. Wallach, Hugo Larochelle, Alina Beygelzimer, Florence d&rsquo;Alch&eacute;-Buc, Emily B. Fox, and Roman Garnett, editors, Advances in Neural Information Processing Systems 32: Annual Conference on Neural Information Processing Systems 2019, NeurIPS 2019, December 8-14, 2019, Vancouver, BC, Canada, pages 8928&ndash;8939, 2019.</p>
			<p style={{margin: 0}}>[5] Xi Chen, Yan Duan, Rein Houthooft, John Schulman, Ilya Sutskever, and Pieter Abbeel. Infogan: Interpretable representation learning by information maximizing generative adversarial nets. In Daniel D. Lee, Masashi Sugiyama, Ulrike von Luxburg, Isabelle Guyon, and Roman Garnett, editors, Advances in Neural Information Processing Systems 29: Annual Conference on Neural Information Processing Systems 2016, December 5-10, 2016, Barcelona, Spain, pages 2172&ndash;2180, 2016.</p>
			<p style={{margin: 0}}>[6] Ruth C. Fong and Andrea Vedaldi. Interpretable explanations of black boxes by meaningful perturbation. In IEEE International Conference on Computer Vision, ICCV 2017, Venice, Italy, October 22-29, 2017, pages 3449&ndash;3457. IEEE Computer Society, 2017.</p>
			<p style={{margin: 0}}>[7] Jerome H. Friedman. Greedy function approximation: A gradient boosting machine. The Annals of Statistics, 29(5):1189&ndash;1232, 2001.</p>
			<p style={{margin: 0}}>[8] Riccardo Guidotti, Anna Monreale, Salvatore Ruggieri, Franco Turini, Fosca Giannotti, and Dino Pedreschi. A survey of methods for explaining black box models. ACM computing surveys (CSUR), 51(5):1&ndash;42, 2018.</p>
			<p style={{margin: 0}}>[9] Alex Goldstein, Adam Kapelner, Justin Bleich, and Emil Pitkin. Peeking inside the black box: Visualizing statistical learning with plots of individual conditional expectation. Journal of Computational and Graphical Statistics, 24(1):44&ndash;65, 2015.</p>
			<p style={{margin: 0}}>[10] Xiaochuang Han, Byron C. Wallace, and Yulia Tsvetkov. Explaining black box predictions and unveiling data artifacts through influence functions. In Dan Jurafsky, Joyce Chai, Natalie Schluter, and Joel R. Tetreault, editors, Proceedings of the 58th Annual Meeting of the Association for Computational Linguistics, ACL 2020, Online, July 5-10, 2020, pages 5553&ndash;5563. Association for Computational Linguistics, 2020.</p>
			<p style={{margin: 0}}>[11] Bo-Jian Hou and Zhi-Hua Zhou. Learning with interpretable structure from gated rnn. IEEE Transactions on Neural Networks and Learning Systems, 31(7):2267&ndash;2279, 2020.</p>
			<p style={{margin: 0}}>[12] Lukas Hoyer, Mauricio Munoz, Prateek Katiyar, Anna Khoreva, and Volker Fischer. Grid saliency for context explanations of semantic segmentation. In Hanna M. Wallach, Hugo Larochelle, Alina Beygelzimer, Florence d&rsquo;Alch&eacute;-Buc, Emily B. Fox, and Roman Garnett, editors, Advances in Neural Information Processing Systems 32: Annual Conference on Neural Information Processing Systems 2019, NeurIPS 2019, December 8-14, 2019, Vancouver, BC, Canada, pages 6459&ndash;6470, 2019.</p>
			<p style={{margin: 0}}>[13] Johan Huysmans, Karel Dejaeger, Christophe Mues, Jan Vanthienen, and Bart Baesens. An empirical evaluation of the comprehensibility of decision table, tree and rule based predictive models. Decision Support Systems, 51(1):141&ndash;154, April 2011.</p>
			<p style={{margin: 0}}>[14] Been Kim, Oluwasanmi Koyejo, and Rajiv Khanna. Examples are not enough, learn to criticize! criticism for interpretability. In Daniel D. Lee, Masashi Sugiyama, Ulrike von Luxburg, Isabelle Guyon, and Roman Garnett, editors, Advances in Neural Information Processing Systems 29: Annual Conference on Neural Information Processing Systems 2016, December 5-10, 2016, Barcelona, Spain, pages 2280&ndash;2288, 2016.</p>
			<p style={{margin: 0}}>[15] Been Kim, Martin Wattenberg, Justin Gilmer, Carrie J. Cai, James Wexler, Fernanda B. Vi&eacute;gas, and Rory Sayres. Interpretability beyond feature attribution: Quantitative testing with concept activation vectors (TCAV). In Jennifer G. Dy and Andreas Krause, editors, Proceedings of the 35th International Conference on Machine Learning, ICML 2018, Stockholmsm&auml;ssan, Stockholm, Sweden, July 10-15, 2018, volume 80 of Proceedings of Machine Learning Research, pages 2673&ndash;2682. PMLR, 2018.</p>
			<p style={{margin: 0}}>[16] Himabindu Lakkaraju, Stephen H. Bach, and Jure Leskovec. Interpretable decision sets: A joint framework for description and prediction. In Balaji Krishnapuram, Mohak Shah, Alexander J. Smola, Charu C. Aggarwal, Dou Shen, and Rajeev Rastogi, editors, Proceedings of the 22nd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining, San Francisco, CA, USA, August 13-17, 2016, pages 1675&ndash;1684. ACM, 2016.</p>
			<p style={{margin: 0}}>[17] Haoyu Liu, Fenglong Ma, Yaqing Wang, Shibo He, Jiming Chen, and Jing Gao. Lp-explain: Local pictorial explanation for outliers. In Claudia Plant, Haixun Wang, Alfredo Cuzzocrea, Carlo Zaniolo, and Xindong Wu, editors, 20th IEEE International Conference on Data Mining, ICDM 2020, Sorrento, Italy, November 17-20, 2020, pages 372&ndash;381. IEEE, 2020.</p>
			<p style={{margin: 0}}>[18] Scott M. Lundberg and Su-In Lee. A unified approach to interpreting model predictions. In Isabelle Guyon, Ulrike von Luxburg, Samy Bengio, Hanna M. Wallach, Rob Fergus, S. V. N. Vishwanathan, and Roman Garnett, editors, Advances in Neural Information Processing Systems 30: Annual Conference on Neural Information Processing Systems 2017, December 4-9, 2017, Long Beach, CA, USA, pages 4765&ndash;4774, 2017.</p>
			<p style={{margin: 0}}>[19] Meike Nauta, Ron van Bree, and Christin Seifert. Neural prototype trees for interpretable fine-grained image recognition. In 2021 IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), pages 14928&ndash;14938, 2021. Anh Nguyen, Alexey Dosovitskiy, Jason Yosinski, Thomas Brox, and Jeff Clune. Synthesizing the preferred inputs for neurons in neural networks via deep generator networks. In D. Lee, M. Sugiyama, U. Luxburg, I. Guyon, and R. Garnett, editors, Advances in Neural Information Processing Systems, volume 29. Curran Associates, Inc., 2016.</p>
			<p style={{margin: 0}}>[20] Chris Olah, Alexander Mordvintsev, and Ludwig Schubert. Feature visualization. Distill, 2017. https://distill.pub/2017/feature-visualization.</p>
			<p style={{margin: 0}}>[21] Nazneen Fatema Rajani, Bryan McCann, Caiming Xiong, and Richard Socher. Explain yourself! leveraging language models for commonsense reasoning. In Anna Korhonen, David R. Traum, and Llu&iacute;s M&agrave;rquez, editors, Proceedings of the 57th Conference of the Association for Computational Linguistics, ACL 2019, Florence, Italy, July 28- August 2, 2019, Volume 1: Long Papers, pages 4932&ndash;4942. Association for Computational Linguistics, 2019.</p>
			<p style={{margin: 0}}>[22] Marco T&uacute;lio Ribeiro, Sameer Singh, and Carlos Guestrin. &quot;why should I trust you?&quot;: Explaining the predictions of any classifier. In Balaji Krishnapuram, Mohak Shah, Alexander J. Smola, Charu C. Aggarwal, Dou Shen, and Rajeev Rastogi, editors, Proceedings of the 22nd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining, San Francisco, CA, USA, August 13-17, 2016, pages 1135&ndash;1144. ACM, 2016.</p>
			<p style={{margin: 0}}>[23] Marco T&uacute;lio Ribeiro, Sameer Singh, and Carlos Guestrin. Anchors: High-precision model-agnostic explanations. In Sheila A. McIlraith and Kilian Q. Weinberger, editors, Proceedings of the Thirty-Second AAAI Conference on Artificial Intelligence, (AAAI-18), the 30th innovative Applications of Artificial Intelligence (IAAI-18), and the 8th AAAI Symposium on Educational Advances in Artificial Intelligence (EAAI-18), New Orleans, Louisiana, USA, February 2-7, 2018, pages 1527&ndash;1535. AAAI Press, 2018.</p>
			<p style={{margin: 0}}>[24] Raif M. Rustamov and James T. Klosowski. Interpretable graph-based semi-supervised learning via flows. In Sheila A. McIlraith and Kilian Q. Weinberger, editors, Proceedings of the Thirty-Second AAAI Conference on Artificial Intelligence, (AAAI-18), the 30th innovative Applications of Artificial Intelligence (IAAI-18), and the 8th AAAI Symposium on Educational Advances in Artificial Intelligence (EAAI-18), New Orleans, Louisiana, USA, February 2-7, 2018, pages 3976&ndash;3983. AAAI Press, 2018.</p>
			<p style={{margin: 0}}>[25] Ramprasaath R. Selvaraju, Michael Cogswell, Abhishek Das, Ramakrishna Vedantam, Devi Parikh, and Dhruv Batra. Grad-cam: Visual explanations from deep networks via gradient-based localization. In IEEE International Conference on Computer Vision, ICCV 2017, Venice, Italy, October 22-29, 2017, pages 618&ndash;626. IEEE Computer Society, 2017.</p>
			<p style={{margin: 0}}>[26] Sumedha Singla, Brian Pollack, Junxiang Chen, and Kayhan Batmanghelich. Explanation by progressive exaggeration. In 8th International Conference on Learning Representations, ICLR 2020, Addis Ababa, Ethiopia, April 26-30, 2020. OpenReview.net, 2020.</p>
			<p style={{margin: 0}}>[27] Nicholay Topin and Manuela Veloso. Generation of policy-level explanations for reinforcement learning. In The Thirty-Third AAAI Conference on Artificial Intelligence, AAAI 2019, The Thirty-First Innovative Applications of Artificial Intelligence Conference, IAAI 2019, The Ninth AAAI Symposium on Educational Advances in Artificial Intelligence, EAAI 2019, Honolulu, Hawaii, USA, January 27 - February 1, 2019, pages 2514&ndash;2521. AAAI Press, 2019.</p>
			<p style={{margin: 0}}>[28] Berk Ustun and Cynthia Rudin. Optimized risk scores. In Proceedings of the 23rd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining, KDD &rsquo;17, page 1125&ndash;1134, New York, NY, USA, 2017. Association for Computing Machinery</p>
			<p style={{margin: 0}}>[29] Laurens van der Maaten and Geoffrey Hinton. Visualizing data using t-sne. Journal of Machine Learning Research, 9(86):2579&ndash;2605, 2008</p>
			<p style={{margin: 0}}>[30] Ramakrishna Vedantam, Karan Desai, Stefan Lee, Marcus Rohrbach, Dhruv Batra, and Devi Parikh. Probabilistic neural symbolic models for interpretable visual question answering. In Kamalika Chaudhuri and Ruslan Salakhutdinov, editors, Proceedings of the 36th International Conference on Machine Learning, ICML 2019, 9-15 June 2019, Long Beach, California, USA, volume 97 of Proceedings of Machine Learning Research, pages 6428&ndash;6437. PMLR, 2019.</p>
			<p style={{margin: 0}}>[31] Xiang Wang, Dingxian Wang, Canran Xu, Xiangnan He, Yixin Cao, and Tat-Seng Chua. Explainable reasoning over knowledge graphs for recommendation. In The Thirty-Third AAAI Conference on Artificial Intelligence, AAAI 2019, The Thirty-First Innovative Applications of Artificial Intelligence Conference, IAAI 2019, The Ninth AAAI Symposium on Educational Advances in Artificial Intelligence, EAAI 2019, Honolulu, Hawaii, USA, January 27 - February 1, 2019, pages 5329&ndash;5336. AAAI Press, 2019.</p>
			<p style={{margin: 0}}>[32] Quanshi Zhang, Ruiming Cao, Ying Nian Wu, and Song-Chun Zhu. Growing interpretable part graphs on convnets via multi-shot learning. In Satinder P. Singh and Shaul Markovitch, editors, Proceedings of the Thirty-First AAAI Conference on Artificial Intelligence, February 4-9, 2017, San Francisco, California, USA, pages 2898&ndash;2906. AAAI Press, 2017.</p>
			<p style={{margin: 0}}>[33] Anh Nguyen, Alexey Dosovitskiy, Jason Yosinski, Thomas Brox, and Jeff Clune. Synthesizing the preferred inputs for neurons in neural networks via deep generator networks. In D. Lee, M. Sugiyama, U. Luxburg, I. Guyon, and R. Garnett, editors, Advances in Neural Information Processing Systems, volume 29. Curran Associates, Inc., 2016.</p>
		</div>
	)
}

export default AddPaper