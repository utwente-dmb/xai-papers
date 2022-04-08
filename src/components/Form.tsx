import { Form, Input, InputNumber, Button, Col, Row, Collapse, notification } from "antd"
import { Problem, Method, Data, Task, Explanation, Model, FilterValue, Venue } from "../types"
import Select from "./Select"
import { fromFilterValue } from "../utils"
import { useAppDispatch, useAppSelector } from "../hooks"
import { formActions } from "../redux"
import { printNames } from "../utils/utils"
import React, { useState, useEffect } from "react"
import { InfoCircleOutlined } from "@ant-design/icons"

const { Item } = Form
const { TextArea } = Input
const { Panel } = Collapse

const explanationPictureUrl = process.env.PUBLIC_URL + "/explanation_types_examples/"

type TypeOfExplanationProps = {
	name: string,
	description: string,
	imageUrl?: string
}

function TypeOfExplanation({ name, description, imageUrl }: TypeOfExplanationProps) {
	return (
		<>
			<p style={{margin: 0}}><i>{name}</i>, {description}</p>
			{imageUrl ? <Collapse style={{marginBottom: 10}}>
				<Panel header="Example" key="1">
					<img src={`${explanationPictureUrl}${imageUrl}`} style={{width: "100%"}}/>
				</Panel>
			</Collapse> : null}
			
		</>
	)
}

function AddPaperForm() {

	const dispatch = useAppDispatch()
	const form = useAppSelector((state) => state.form)
	const [json, setJson] = useState("")
	useEffect(() => {
		setJson(JSON.stringify(form, null, 2) + ",")
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
	const venue = venueValue ? [venueValue] : []

	return (
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
									imageUrl="decision_rules_139.PNG"
								/>

								<TypeOfExplanation 
									name="Decision Tree"
									description="Rooted graph with conditional statement at each node, e.g. ProtoTree [19]."
									imageUrl="decision_tree_179.png"
								/>

								<TypeOfExplanation 
									name="Disentanglement"
									description="Disentangled representation, where each disjoint feature might have a semantic meaning. E.g. InfoGAN [5]."
									imageUrl="disentanglement_44.PNG"
								/>

								<TypeOfExplanation 
									name="Feature Importance"
									description="Set of 1-dimensional non-binary values/scores to indicate feature relevance, feature contribution or attribution. A feature is not necessarily an input feature to predictive model &#55349;&#56403; , but it should be a feature in the explanation. Examples include SHAP[18] and importance scores by LIME[23]."
									imageUrl="feature_importance_212.PNG"
								/>

								<TypeOfExplanation 
									name="Feature Plot"
									description="Plot or figure showing relations or interactions between features or between feature(s) and outcome. Examples include Partial Dependence Plot[7], Individual Conditional Expectation plot[9] and Feature Auditing[1]."
									imageUrl="feature_plot_82.PNG"
								/>
					
								<TypeOfExplanation 
									name="Graph"
									description="Graphical network structure with nodes and edges, e.g. Abstract Policy Graph[28], Knowledge Graph[32], Flow Graph[25] and Finite State Automata[11]."
									imageUrl="graph_252.PNG"
								/>

								<TypeOfExplanation 
									name="Heatmap"
									description="Map with at least 2 dimensions visually highlighting non-binary feature attribution, activation, sensitivity, attention or saliency. Includes attention maps[26], perturbation masks [6] and Layer-Wise Relevance Propagation [2]."
									imageUrl="heatmap_222.PNG"
								/>

								<TypeOfExplanation 
									name="Localization"
									description="Binary feature importance. Features can be any type of covariate used in the explanation, such as words, tabular features, or bounding boxes. Examples include binary maps with image patches[23], segmentation[12] and bounding boxes[33]."
									imageUrl="Localization_212.PNG"
								/>

								<TypeOfExplanation 
									name="Prototypes"
									description="(Parts of) Representative examples, including concepts[15], influential training instances[10], prototypical parts [4, 19], nearest neighbors and criticisms[14]."
									imageUrl="prototypes_125.PNG"
								/>

								<TypeOfExplanation 
									name="Representation Synthesis"
									description="Artificially produced visualization to explain representations of the predictive model. Examples include generated data samples[27], Activation Maximization[20] and feature visualization[21]."
									imageUrl="representation_synthesis_180.PNG"
								/>

								<TypeOfExplanation 
									name="Representation Visualization"
									description="Charts or plots to visualize representations of the predictive model, including visualizations of dimensionality reduction with scatter plots[30], visual cluster analysis[17] and Principal Component Analysis."
									imageUrl="representation_visualization_259.PNG"
								/>

								<TypeOfExplanation 
									name="Text"
									description="Textual explanation via natural language [3, 22]."
									imageUrl="text_208.PNG"
								/>

								<TypeOfExplanation 
									name="White-box Model"
									description="Intrinsically interpretable models (excluding decision rules). Predictive model &#55349;&#56403; is interpretable and therefore acts as explanation. Examples include a scoring sheet[29] and linear regression. Decision Rules and Decision Trees do not fall into this category, since they are categories on their own."
									imageUrl="white_box_model_258.PNG"
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

	)
}

export default AddPaperForm
