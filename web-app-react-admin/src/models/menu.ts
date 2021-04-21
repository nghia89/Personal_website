export interface TreeItem {
    item: MenuVM
    children: Array<TreeItem>
}

export interface MenuVM {
    id: string
    name: string
    url: string
    sortOrder: number
    parentId: string
    icon: string
}