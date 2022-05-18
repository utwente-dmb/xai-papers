import { Page, Path } from "../types"

// Github url that is used in hyperlinks
export const githubUrl = "https://www.github.com/utwente-dmb/xai-papers"

// Map between the different Paths and Pages defined in types/navigation
export const pathMap: { [key in Path]: Page } = {
	["/"]: "landing",
	["/papers"]: "papers",
	["/charts"]: "charts",
	["/add-paper"]: "add-paper",
}

// Functions to swap between pages and paths if necessary
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
