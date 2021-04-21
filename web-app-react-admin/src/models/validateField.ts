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