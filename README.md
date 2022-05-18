# DMB Literature Website
![Database validation](https://github.com/utwente-dmb/xai-papers/actions/workflows/main.yml/badge.svg)
![Test](https://github.com/utwente-dmb/xai-papers/actions/workflows/test.yml/badge.svg)
![Database validation](https://github.com/utwente-dmb/xai-papers/actions/workflows/deploy.yml/badge.svg)
[![Check code cleanliness](https://github.com/utwente-dmb/xai-papers/actions/workflows/linter.yml/badge.svg)](https://github.com/utwente-dmb/xai-papers/actions/workflows/linter.yml)\
This is a research paper visualisation website, hosted on Github pages. If you want your paper added to the database, follow the instructions below.

## Add a paper
To add a paper, follow these steps:
- Fork this repository by clicking the fork button in the top right.
- Go to https://utwente-dmb.github.io/xai-papers/#/add-paper to generate a database entry.
- Edit the file ```src/db/db.json``` in your fork.
- After the final entry's '}' (and before the final ']') append the JSON code copied from the literature website.
- Commit the changes, The current naming convention for the commit is as follows, the title of the commit should remain "update db.json" and in the commit message please include the title, the link to the paper, and the authors of the paper you added.
- Create a new pull request from your forked repository to the main repository. 
- When enough people approve your pull request and it passes the automated tests, it will be merged and your paper will show up on the website.


## Remove a paper
To remove a paper, follow these steps:
- Fork this repository by clicking the fork button in the top right.
- Edit the file ```src/db/db.json```, look for the paper you want to remove and remove the entire object from the file.
- Commit the changes, The current naming convention for removals is as follows, the title should remain "update db.json" and in the commit message please specify why you want the entry removed from the database. 
- Create a new pull request from your forked repository to this one.
- When enough people approve your pull request and it passes the automated tests, your paper will be removed.

## Review a pull request
To review a pull request, follow these steps:
- Go to the pull request section of the main GitHub.
- Click a pull request that still requires reviews with "update db.json" as the title.
- Go to the Files Changed section of the pull request.
- Check if the entry into the database is correctly formatted and has the correct tags or that a valid reason for removal is provided.
- Click the review changes button, if everything is correct click approve, otherwise reject and provide an explanation why the proposed changes were rejected. 
