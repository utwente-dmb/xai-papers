import csv
import json

array_columns = {"Authors", "Type of Data", "Type of Problem", "Type of Model to be Explained", "Type of Task", "Type of Explanation", "Method used to explain"}

def import_csv(csv_loc):
    with open(csv_loc, "r", encoding='utf-8-sig') as file:
        # dikke oneliner
        rows = [
            {k: v for k, v in row.items()}
            for row in csv.DictReader(file, skipinitialspace=True, delimiter=',')]

        # Loop through and split some strings into lists
        objs = []
        for row in rows:
            obj = {}
            for key, value in row.items():
                if key in array_columns:
                    value = [x.strip() for x in value.split(',')]
                elif key == "Venue":
                    obj[key] = {}
                    obj[key]["isOld"] = True
                    obj[key]["value"] = value
                    continue
                obj[key] = value
            objs.append(obj)
    return objs

if __name__ == "__main__":
    data = import_csv("db.csv")
    with open("db2.json", "w") as file:
        json.dump(data, file, indent=2)