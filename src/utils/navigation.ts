import { Page, Path } from "../types"

export const pathMap: { [key in Path]: Page } = {
	["/"]: "landing",
	["/papers"]: "papers",
	["/charts"]: "charts",
	["/add-paper"]: "add-paper",
}

export const pathToPage = (path: Path): Page => {
	if (path in pathMap) {
		return pathMap[path]
	}
	return "landing"
}

export const pageToPath = (page: Page): Path => {
	for (const entry of Object.entries(pathMap)) {
		if (entry[1] === page) {
			return entry[0] as Path
		}
	}
	return "/"
}

export const githubUrl = "https://www.github.com/BorisGerretzen/DMBLiteratureWebsite"