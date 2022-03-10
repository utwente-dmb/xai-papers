# DMB Literature Website
![Database validation](https://github.com/BorisGerretzen/DMBLiteratureWebsite/actions/workflows/main.yml/badge.svg)
![Database validation](https://github.com/BorisGerretzen/DMBLiteratureWebsite/actions/workflows/deploy.yml/badge.svg)\
This is a research paper visualisation website, hosted on Github pages. If you want your paper added to the database, follow the instructions below.

## Add a paper
To add a paper, follow these steps:
- Fork this repository by clicking the fork button in the top right.
- Edit the file ```src/db/db.json```, add your paper according to the schema specified in ```src/db/schema.json```.
- Create a new pull request from your forked repository to this one.
- When enough people approve your pull request and it passes the automated tests, it will be merged and your paper will show up on the website.


## Remove a paper
To remove a paper, follow these steps:
- Fork this repository by clicking the fork button in the top right.
- Edit the file ```src/db/db.json```, look for the paper you want to remove and remove the entire object from the file.
- Create a new pull request from your forked repository to this one.
- When enough people approve your pull request and it passes the automated tests, your paper will be removed.
