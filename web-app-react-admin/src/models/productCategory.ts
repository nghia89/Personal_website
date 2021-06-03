export interface TreeCateItem {
    item: CategoryVM
    children: Array<TreeCateItem>
}

export interface CategoryVM {
    id: number
    name: string
    description: string
    sortOrder: number
    parentId: number
    image: string
    status: number
    seoAlias: string
    seoKeywords: string
    seoDescription: string
}