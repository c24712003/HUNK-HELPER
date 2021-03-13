export interface IOne{
    code: number,
    data: OneData
}

export interface OneData{
    id: string,
    tag: string,
    origin: string,
    content: string,
    datetime: string
}