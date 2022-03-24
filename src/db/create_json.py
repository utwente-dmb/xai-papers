import csv
import json
from urllib.parse import urlparse
from urllib.request import urlopen
import time
array_columns = {"Authors", "Type of Data", "Type of Problem", "Type of Model to be Explained", "Type of Task", "Type of Explanation", "Method used to explain"}

def import_csv(csv_loc):
    with open(csv_loc, "r", encoding='utf-8-sig') as file:
        # dikke oneliner
        rows = [
            {k: v for k, v in row.items()}
            for row in csv.DictReader(file, skipinitialspace=True, delimiter=',')]

        # Loop through and split some strings into lists
        objs = []
        num_rows = len(rows)
        ctr = 1
        for row in rows:
            obj = {}
            print(f"({ctr}/{num_rows})\t{row['Title']}")
            ctr = ctr + 1
            for key, value in row.items():
                if key in array_columns:
                    value = [x.strip() for x in value.split(',')]
                elif key == "Venue":
                    obj[key] = {}
                    obj[key]["isOld"] = True
                    obj[key]["value"] = value
                    continue
                obj[key] = value

            url = obj["url"]
            url_parsed = urlparse(url)
            abstract = ""
            if url_parsed.netloc == "doi.org":
                doi = url_parsed.path[1:]
                url = f"https://api.semanticscholar.org/graph/v1/paper/DOI:{doi}?fields=abstract"
                with urlopen(url) as response:
                    response_json = json.loads(response.read())
                    if response_json["abstract"] is not None:
                        abstract = response_json["abstract"]
                time.sleep(3)
            obj["Abstract"] = abstract
            objs.append(obj)

    return objs

if __name__ == "__main__":
    data = import_csv("db.csv")
    with open("db2.json", "w") as file:
        json.dump(data, file, indent=2)