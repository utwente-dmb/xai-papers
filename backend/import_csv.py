import csv
import json
import model


def import_csv(csv_loc):
    # Read data
    rows = []

    # read csv to list of dicts
    with open(csv_loc, "r", encoding='utf-8-sig') as file:
        # dikke oneliner
        rows = [
            {k: v for k, v in row.items()}
            for row in csv.DictReader(file, skipinitialspace=True, delimiter=';')]

    objs = []
    paper_ids = []
    for row in rows:
        # If the paper id already exists
        if row["Paper-ID"] in paper_ids:
            idx = paper_ids.index(row["Paper-ID"])
            objs[idx].data_type.append(row["Type of Data"])
            objs[idx].problem_type.append(row["Type of Problem"])
            objs[idx].model_type.append(row["Type of Model to be Explained"])
            objs[idx].task_type.append(row["Type of Task"])
            objs[idx].explanation_type.append(row["Type of Explanation"])
            objs[idx].explanation_method.append(row["Method used to explain"])

        # If it doesnt exist
        else:
            # Create new object
            obj = model.Paper(
                paper_id=row["Paper-ID"],
                title=row["Title"],
                url=row["url"],
                year=int(row["Year"]),
                venue=row["Venue"],
                authors=row["Authors"].split(", "),
                data_type=[row["Type of Data"]],
                problem_type=[row["Type of Problem"]],
                model_type=[row["Type of Model to be Explained"]],
                task_type=[row["Type of Task"]],
                explanation_type=[row["Type of Explanation"]],
                explanation_method=[row["Method used to explain"]])

            # Save
            objs.append(obj)
            paper_ids.append(row["Paper-ID"])

    # Loop through the objects to remove duplicates in lists and to save them
    for obj in objs:
        obj.data_type = list(set(obj.data_type))
        obj.problem_type = list(set(obj.problem_type))
        obj.model_type = list(set(obj.model_type))
        obj.task_type = list(set(obj.task_type))
        obj.explanation_type = list(set(obj.explanation_type))
        obj.explanation_method = list(set(obj.explanation_method))
        obj.save()
