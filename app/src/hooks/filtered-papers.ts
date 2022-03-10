import { useAppSelector } from './redux'
import { Filters } from '../redux/slices/filters'
import { Paper } from "../types";

const map: Record<keyof Filters, keyof Paper> = {
    data: 'Type of Data', 
    problem: 'Type of Problem', 
    model: 'Type of Model to be Explained',
    task: 'Type of Task',
    explanation: 'Type of Explanation',
    method: 'Method used to explain'
}

export function useFilteredPapers(): Array<Paper> {
    const { papers, filters } = useAppSelector((state) => state);

    const filteredPapers = papers.filter((paper) => {
        let noFilters = true

        for (const [filterKey, paperVal] of Object.entries(map)) {
            const filtersForKey = filters[filterKey as keyof Filters]
            if (filtersForKey.length > 0) {
                noFilters = false
            }
            for (const type of filtersForKey) {
                const paperTypes = paper[paperVal]
                if (Array.isArray(paperTypes) && paperTypes.some((el) => el === type)) {
                    return paper
                }
            }
        }

        return noFilters

    })

    return filteredPapers
}