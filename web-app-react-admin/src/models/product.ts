import { productQuantityVM } from "./productQuantity";

export interface ProductVM {
    id?: number
    name?: string
    title?: string
    image?: string
    price?: number
    code?: string
    originalPrice?: number
    description?: string
    content?: string
    ViewCount?: number
    tags?: string
    seoAlias?: string
    seoKeywords?: string
    seoDescription?: string
    productCategoryId?: number
    productCategoryName?: number
    status?: number
    productQuantity?: productQuantityVM[]
    productImages?: ProductImageVM[]
}

export interface ProductImageVM {
    id: number
    productId: number
    fileName: string
    path: string
    size: number
    extension: string
    type: string
    sortOrder: number
    caption: string
    createdBy: string
    updatedBy: string
    dateCreated: Date
    dateModified: Date
}