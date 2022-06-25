export interface message{
    message: string
    translation: string
}

export interface categoryDataset{
    id: number
    category: string
    messages: message[]
}