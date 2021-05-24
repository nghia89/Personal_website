export interface TreeCateItem {
    item: CategoryVM
    children: Array<TreeCateItem>
}

export interface CategoryVM {
    id: number
    name: string
    Description: string
    sortOrder: number
    parentId: number
    SortOrder: number
    image: string
    status: number
    seoAlias: string
    seoKeywords: string
    seoDescription: string
}