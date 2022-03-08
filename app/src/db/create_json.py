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
            for k, v in row.items():
                if k in array_columns:
                    v = [x.strip() for x in v.split(',')]
                obj[k] = v
            objs.append(obj)
    return objs

if __name__ == "__main__":
    data = import_csv("db.csv")
    with open("db.json", "w") as file:
        json.dump(data, file, indent=2)