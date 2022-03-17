export const baseUrl = "/DMBLiteratureWebsite/"

export const urlMap = {
	"papers": `${baseUrl}`,
	"add-paper": `${baseUrl}add-paper`,
	"about": `${baseUrl}about`,
}

export const pathToPage = (path: string): string => {
	for (const entry of Object.entries(urlMap)) {
		if (entry[1] === path) {
			return entry[0]
		}
	}
	return "papers"
}

export const pageToPath = (page: string): string => {
	for (const entry of Object.entries(urlMap)) {
		if (entry[0] === page) {
			return entry[1]
		}
	}
	return baseUrl
}