import { useAppSelector } from "./redux"
import { Filters } from "../redux/slices/filters"
import { Paper, VenueType } from "../types"
import { enumKeyMap } from "../utils"

export function useFilteredPapers(): Array<Paper> {
	const { papers, filters } = useAppSelector((state) => state)

	const filteredPapers = papers.filter((paper) => { 
		// New/Original Papers check
		if (!filters.showOriginal && typeof paper.Date === "undefined") {
			return false
		}
		if (!filters.showNew && typeof paper.Date !== "undefined") {
			return false
		}

		// Search Query check
		let noFilters = true
		let toAdd = true

		let search = filters.search.toLowerCase().trim()
		if (search.length > 0) {
			let proceed = false
			const [searchAuthor, searchTitle, searchVenue, searchAbstract] = [0, 1, 2, 3]
			let searches = [true, true, true, true]

			if (search.startsWith("author:")) {
				search = search.substring(7).trim()
				searches = [true, false, false, false]
			} else if (search.startsWith("title:")) {
				search = search.substring(6).trim()
				searches = [false, true, false, false]
			} else if (search.startsWith("venue:")) {
				search = search.substring(6).trim()
				searches = [false, false, true, false]
			} else if (search.startsWith("abstract:")) {
				search = search.substring(9).trim()
				searches = [false, false, false, true]
			}

			const author = paper.Authors.some((author) => author.toLowerCase().includes(search))
			const title = paper.Title.toLowerCase().includes(search)
			const venue = paper.Venue.value.toLowerCase().includes(search)
			const abstract = paper.Abstract.toLowerCase().includes(search)

			if (searches[searchAuthor]) {
				proceed = proceed || author
			}
			if (searches[searchTitle]) {
				proceed = proceed || title
			}
			if (searches[searchVenue]) {
				proceed = proceed || venue
			}
			if (searches[searchAbstract]) {
				proceed = proceed || abstract
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
		for (const [filterKey, paperVal] of Object.entries(enumKeyMap)) {
			const filtersForKey = filters[filterKey as keyof Filters]
			const paperTypes = paper[paperVal]

			if (!Array.isArray(filtersForKey)) continue

			if (filterKey === "venue" ) {
				if (filtersForKey.length > 0 
					&& !filtersForKey.some((el) => {
						const venueType = paperTypes as VenueType
						if (el === "Other") {
							return !venueType.isOld
						} else {
							return el === venueType.value
						}
					})
				) {
					return false
				} else {
					continue
				}
			}

			if (filtersForKey.length > 0) {
				noFilters = false
			}

			for (const type of filtersForKey) {

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
