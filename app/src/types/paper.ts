export interface Paper {
    'Paper-ID': string
    Title: string
    url: string
    Year: string
    Venue: string
    Authors: Array<string>
    'Type of Data': Array<string>
    'Type of Problem': Array<string>
    'Type of Model to be Explained': Array<string>
    'Type of Task': Array<string>
    'Type of Explanation': Array<string>
    'Method used to explain': Array<string>
    'Should the paper be included?': string
    'Should the paper be included with filter?': string
}