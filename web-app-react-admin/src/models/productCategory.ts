export interface TreeCateItem {
    item: TreeCategoryVM
    children: Array<TreeCateItem>
}

export interface CategoryVM {
    id?: number
    name?: string
    description?: string
    sortOrder?: number
    parentId?: number
    Images?: string
    status?: number
    seoAlias?: string
    seoKeywords?: string
    seoDescription?: string
    code?: string
}

export interface TreeCategoryVM {
    id: number
    name: string
    description: string
    sortOrder: number
    parentId: number
    Images: string
    status: number
    seoAlias: string
    seoKeywords: string
    seoDescription: string
    code?: string
}