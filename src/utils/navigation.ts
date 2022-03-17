export const baseUrl = "/DMBLiteratureWebsite/"

export const pathMap: { [key: string]: string } = {
	[`${baseUrl}`]: "papers",
	[`${baseUrl}charts`]: "charts",
	[`${baseUrl}add-paper`]: "add-paper",
	[`${baseUrl}about`]: "about"
}

export const pathToPage = (path: string): string => {
	if (path in pathMap) {
		return pathMap[path]
	}
	return "papers"
}

export const pageToPath = (page: string): string => {
	for (const entry of Object.entries(pathMap)) {
		if (entry[1] === page) {
			return entry[0]
		}
	}
	return baseUrl
}