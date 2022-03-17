import { useAppSelector } from "./redux"
import { Filters } from "../redux/slices/filters"
import { Paper } from "../types"

const map: Record<keyof Omit<Filters, "filterStateAND" | "startYear" | "endYear" | "search" >, keyof Paper> = {
	data: "Type of Data", 
	problem: "Type of Problem", 
	model: "Type of Model to be Explained", 
	task: "Type of Task",
	explanation: "Type of Explanation",
	method: "Method used to explain",
	venue: "Venue",
}

export function useFilteredPapers(): Array<Paper> {
	const { papers, filters } = useAppSelector((state) => state)

	const filteredPapers = papers.filter((paper) => { 
		let noFilters = true
		let toAdd = true

		// Search Query check
		let search = filters.search.toLowerCase().trim()
		if (search.length > 0) {
			let proceed = false
			let searchAuthor = true
			let searchTitle = true
			let searchVenue = true

			if (search.startsWith("author:")) {
				search = search.substring(7).trim()
				searchTitle = false
				searchVenue = false
			} else if (search.startsWith("title:")) {
				search = search.substring(6).trim()
				searchAuthor = false
				searchVenue = false
			} else if (search.startsWith("venue:")) {
				search = search.substring(6).trim()
				searchAuthor = false
				searchTitle = false
			}

			const author = paper.Authors.some((author) => author.toLowerCase().includes(search))
			const title = paper.Title.toLowerCase().includes(search)
			const venue = paper.Venue.toLowerCase().includes(search)

			if (searchAuthor) {
				proceed = proceed || author
			}
			if (searchTitle) {
				proceed = proceed || title
			}
			if (searchVenue) {
				proceed = proceed || venue
			}

			if (!proceed) return false
		}

		// Year Check
		if (typeof filters.startYear !== "undefined" && parseInt(paper.Year) < filters.startYear) {
			return false
		}
		if (typeof filters.endYear !== "undefined" && parseInt(paper.Year) > filters.endYear) {
			return false
		}

		// Type Filters Check
		for (const [filterKey, paperVal] of Object.entries(map)) {
			const filtersForKey = filters[filterKey as keyof Filters]
			if (!Array.isArray(filtersForKey)) continue
			
			if (filtersForKey.length > 0) {
				noFilters = false
			}

			for (const type of filtersForKey) {
				const paperTypes = paper[paperVal]

				if (!Array.isArray(paperTypes) && type === paperTypes) {
					return true
				}

				if (filters.filterStateAND) {
					if (!Array.isArray(paperTypes) || !paperTypes.some((el) => el === type)) {
						toAdd = false
					}
				} else {
					if (Array.isArray(paperTypes) && paperTypes.some((el) => el === type)) {
						return true
					}
				}


			}
		}

		return filters.filterStateAND ? toAdd : noFilters
	})

	return filteredPapers
}
