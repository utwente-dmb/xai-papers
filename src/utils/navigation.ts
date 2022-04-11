export const baseUrl = "/DMBLiteratureWebsite/"

export const pathMap: { [key: string]: string } = {
	[`${baseUrl}`]: "landing",
	[`${baseUrl}papers`]: "papers",
	[`${baseUrl}charts`]: "charts",
	[`${baseUrl}add-paper`]: "add-paper",
}

export const pathToPage = (path: string): string => {
	if (path in pathMap) {
		return pathMap[path]
	}
	return "landing"
}

export const pageToPath = (page: string): string => {
	for (const entry of Object.entries(pathMap)) {
		if (entry[1] === page) {
			return entry[0]
		}
	}
	return baseUrl
}

export const githubUrl = "https://www.github.com/BorisGerretzen/DMBLiteratureWebsite"