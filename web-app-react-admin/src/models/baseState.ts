export interface IBaseTable {
    page: number,
    pageSize: number,
    totalCount?: number,
    data: Array<any>
}
