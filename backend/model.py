from random import choice
import mongoengine as me

settings = {
    "data_type_choices": {
        "User-item matrix",
        "Text",
        "Images",
        "Tabular / structured",
        "Graph data",
        "Any",
        "Other",
        "Time series",
        "Video"
    },

    "problem_type_choices": {
        "Outcome Explanation",
        "Model Inspection",
        "Transparent Box Design",
        "Model Explanation",
    },

    "model_type_choices": {
        "(Deep) Neural Network",
        "Other",
        "Any (for a specific task); model-agnostic",
        "Tree Ensemble",
        "Logistic Regression",
        "Bayesian or Hierarchical Network",
        "Support Vector Machine"
    },

    "task_type_choices": {
        "Recommendation",
        "Question Answering",
        "Classification",
        "Representation learning",
        "Anomaly detection",
        "Policy learning",
        "Retrieval",
        "Regression",
        "Clustering",
        "Other",
        "Generation",
    },

    "explanation_type_choices": {
        "Disentanglement",
        "Feature Importance",
        "Localization",
        "Representation Synthesis",
        "Representation Visualization",
        "Feature plot",
        "Heatmap",
        "Decision Tree",
        "Graph",
        "Text",
        "Other",
        "Decision Rules",
        "Prototypes",
        "White-box model"
    },

    "explanation_method_choices": {
        "Post-hoc explanation method",
        "Post-hoc explanation method",
        "Supervised explanation training",
        "Interpretability built into the predictive model"
    }
}


class Paper(me.Document):
    # General information
    paper_id = me.StringField(required=True)
    title = me.StringField(Required=True)
    url = me.URLField(Required=True)
    year = me.IntField(Required=True)
    venue = me.StringField(Required=True)
    authors = me.ListField()

    # AI stuff
    data_type = me.ListField(choices=settings["data_type_choices"])
    problem_type = me.ListField(choices=settings["problem_type_choices"])
    model_type = me.ListField(choices=settings["model_type_choices"])
    task_type = me.ListField(choices=settings["task_type_choices"])
    explanation_type = me.ListField(choices=settings["explanation_type_choices"])
    explanation_method = me.ListField(choices=settings["explanation_method_choices"])
