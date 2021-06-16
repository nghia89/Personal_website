import { ColorVM, SizeVM } from './index'
export interface productQuantityVM {
    id?: number
    productId?: number
    name?: string
    sku?: string
    sizeId?: number
    colorId?: number
    quantity?: number
    quantitySold?: string
    imageUrl?: string
    allowPurchaseWhenSoldOut?: string
    optionVariant?: string
    color?: ColorVM,
    size?: SizeVM
}