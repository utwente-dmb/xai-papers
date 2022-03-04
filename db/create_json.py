import csv
import json


def import_csv(csv_loc):
    # Read data
    rows = []

    # read csv to list of dicts
    with open(csv_loc, "r", encoding='utf-8-sig') as file:
        # dikke oneliner
        rows = [
            {k: v for k, v in row.items()}
            for row in csv.DictReader(file, skipinitialspace=True, delimiter=',')]

    objs = []
    paper_ids = []
    for row in rows:
        pass