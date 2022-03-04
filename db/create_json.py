import csv
import json


def import_csv(csv_loc):
    # read csv to list of dicts
    with open(csv_loc, "r", encoding='utf-8-sig') as file:
        # dikke oneliner
        rows = [
            {k: v for k, v in row.items()}
            for row in csv.DictReader(file, skipinitialspace=True, delimiter=',')]
        objs = []
        for row in rows:
            obj = {}
            for k, v in row.items():
                if ',' in v:
                    v = [x.strip() for x in v.split(',')]
                obj[k] = v
            objs.append(obj)
    return objs

if __name__ == "__main__":
    data = import_csv("db.csv")
    with open("db.json", "w") as file:
        json.dump(data, file, indent=2)