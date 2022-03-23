export interface Paper {
    Title: string
    url: string
    Year: string
    Venue: VenueType
    Authors: Array<string>
    "Type of Data": Array<Data>
    "Type of Problem": Array<Problem>
    "Type of Model to be Explained": Array<Model>
    "Type of Task": Array<Task>
    "Type of Explanation": Array<Explanation>
    "Method used to explain": Array<Method>
}
type VenueType = {
    isOld: boolean,
    value: string
}
export enum Data {
    GraphData = "Graph data",
    Images = "Images",
    Other = "Other",
    TabularStructured = "Tabular / structured",
    Text = "Text",
    TimeSeries = "Time series",
    UserItemMatrix = "User-item matrix",
    Video = "Video",
    Any = "Any"
}

export enum Explanation {
    DecisionRules = "Decision Rules",
    DecisionTree = "Decision Tree",
    Disentanglement = "Disentanglement",
    FeatureImportance = "Feature Importance",
    FeaturePlot = "Feature plot",
    Graph = "Graph",
    Heatmap = "Heatmap",
    Localization = "Localization",
    Other = "Other",
    Prototypes = "Prototypes",
    RepresentationSynthesis = "Representation Synthesis",
    RepresentationVisualization = "Representation Visualization",
    Text = "Text",
    TimeSeries = "Time series",
    UserItemMatrix = "User-item matrix",
    WhiteBoxModel = "White-box model"
}

export enum Problem {
    ModelExplanation = "Model Explanation",
    ModelInspection = "Model Inspection",
    OutcomeExplanation = "Outcome Explanation",
    TransparentBoxDesign = "Transparent Box Design"
}

export enum Model {
    NeuralNetwork = "(Deep) Neural Network",
    ModelAgnostic = "Any (for a specific task); model-agnostic",
    Bayesian = "Bayesian or Hierarchical Network",
    LogisticRegression = "Logistic Regression",
    Other = "Other",
    SupportVectorMachine = "Support Vector Machine",
    TreeEnsemble = "Tree Ensemble"
}

export enum Task {
    AnomalyDetections = "Anomaly detection",
    Classification = "Classification",
    Clustering = "Clustering",
    Generation = "Generation",
    Other = "Other",
    PolicyLearning = "Policy learning",
    QuestionAnswering = "Question Answering",
    Recommendation = "Recommendation",
    Regression = "Regression",
    RepresntationLearning = "Representation learning",
    Retrieval = "Retrieval"
}

export enum Method {
    InterpretabilityPredictiveModel = "Interpretability built into the predictive model",
    PostHocExplanation = "Post-hoc explanation method",
    SupervisedExplanationTraining = "Supervised explanation training",
}

export enum Venue {
    ACL = "ACL",
    ICDM = "ICDM",
    KDD = "KDD",
    SIGIR = "SIGIR",
    AAAI = "AAAI",
    NeurIPS = "NeurIPS",
    ICCV = "ICCV",
    ICLR = "ICLR",
    WWW = "WWW",
    IJCAI = "IJCAI",
    ICML = "ICML",
    CVPR = "CVPR"
}

