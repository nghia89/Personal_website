import { ColorVM, SizeVM } from './index'
export interface productQuantityVM {
    id?: number
    productId?: number
    name?: string
    sku?: string
    sizeId?: number
    colorId?: number
    quantity?: number
    price?: number
    quantitySold?: string
    imageUrl?: string
    allowPurchaseWhenSoldOut?: boolean
    optionVariant?: string
    optionVariantColor?: string
    optionVariantSize?: string
    optionVariantName?: string
    color?: ColorVM,
    size?: SizeVM,


    groupId?: number
}