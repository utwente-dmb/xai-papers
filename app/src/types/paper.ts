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

export type Data = 'Graph Data' | 'Images' | 'Other' | 'Tabular / structured' | 'Text' | 'Time series' | 'User-item matrix' | 'Video'
export type Explanation = 'Decision Rules' | 'Decision Tree' |'Disentanglement' | 'Feature Importance' | 'Feature Plot' | 'Graph' | 'Heatmap' | 'Localization' | 'Other' | 'Prototypes' | 'Representation Synthesis' | 'Representation Visualization' | 'Text' | 'Time series' | 'User-item matrix' | 'White-box model'
export type Problem = ''
export type Model = 'model'
export type Task = ''
export type Method = ''

