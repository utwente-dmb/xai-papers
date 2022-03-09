import { useAppSelector } from './redux'
import { Paper } from "../types";


export function useFilteredPapers(): Array<Paper> {
    const { papers, filters } = useAppSelector((state) => state);

    console.log("Filters", filters)

    const filteredPapers = papers.filter((paper) => {
      return paper
    })

    return filteredPapers
}