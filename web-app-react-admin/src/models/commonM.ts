export interface IBaseParams {
    page: number,
    pageSize: number,
    query?: string,
    totalCount?: number
}


export interface IBreadcrumbs {
    name: string,
    path?: string
}

export interface Attachments {
    id?: number
    path: string
    size?: number
    fileName?: string
    extension?: string
    type?: string
}