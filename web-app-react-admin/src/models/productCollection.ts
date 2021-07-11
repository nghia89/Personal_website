import { ProductVM } from "./product";


export interface ProductCollectionVM {
    id?: number
    name?: string
    title?: string
    description?: string
    sortOrder?: number
    images?: string
    status?: number
    dateApply?: string
    seoAlias?: string
    seoKeywords?: string
    seoDescription?: string
    productAndCollection?: ProductAndCollectionVM[]
}

export interface ProductAndCollectionVM {
    productId?: number
    productVM?: ProductVM
    productCollectionId?: number
}