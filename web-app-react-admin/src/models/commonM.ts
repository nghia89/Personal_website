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