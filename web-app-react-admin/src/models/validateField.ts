export interface ValidateVm {
    name: string,
    mess: string
}

export const validateUserVm = [
    { name: 'firstName', mess: 'họ' },
    { name: 'lastName', mess: 'tên lót' },
    { name: 'dob', mess: 'ngày sinh' },
    { name: 'phoneNumber', mess: 'Số điện thoại' },
    { name: 'email', mess: 'email' },
] as Array<ValidateVm>

export const validateRoleVm = [
    { name: 'name', mess: 'Tên' },
    { name: 'description', mess: 'Mô tả' },
] as Array<ValidateVm>

export const validateOrgVm = [
    { name: 'name', mess: 'Tên' },
    { name: 'email', mess: 'Email' },
    { name: 'phone', mess: 'Số điện thoại' }
] as Array<ValidateVm>

export const validateProductVm = [
    { name: 'name', mess: 'tên sản phẩm' },
    { name: 'price', mess: 'giá sản phẩm' },
    { name: 'originalPrice', mess: 'giá gốc sản phẩm' },
] as Array<ValidateVm>

export const validateProductCateVm = [
    { name: 'name', mess: 'tên danh mục' },
    { name: 'code', mess: 'mã danh mục' },
] as Array<ValidateVm>