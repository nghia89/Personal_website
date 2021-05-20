export interface ITableHead {
    name: string,
    fieldName: string,
    type: 'date' | 'dateTime' | 'stt' | 'status'
}


export const tableHeadUser = [
    { name: 'stt', fieldName: 'stt', type: 'stt' },
    { name: 'Tên', fieldName: 'fullName' },
    { name: 'Email', fieldName: 'email' },
    { name: 'Số điện thoại', fieldName: 'phoneNumber' },
    { name: 'Ngày sinh', fieldName: 'dob', type: 'date' },
    { name: 'ngày tạo', fieldName: 'dateCreated', type: 'date' }
] as Array<ITableHead>;

export const tableHeadRole = [
    { name: 'stt', fieldName: 'stt', type: 'stt' },
    { name: 'Tên', fieldName: 'name' },
    { name: 'Mô tả', fieldName: 'description' },
] as Array<ITableHead>;


export const tableHeadProduct = [
    { name: 'Ảnh', fieldName: 'image' },
    { name: 'Tên sản phẩm', fieldName: 'name' },
    { name: 'Loại', fieldName: 'productCategoryName' },
    { name: 'Ngày tạo', fieldName: 'dateCreated', type: 'date' },
    { name: 'Trạng thái', fieldName: 'status' },
] as Array<ITableHead>;

export const tableHeadRoleToFunc = [
    { name: 'Tên', fieldName: 'name' },
    { name: 'Mô tả', fieldName: 'description' },
] as Array<ITableHead>;


export const tableHeadCategory = [
    { name: 'stt', fieldName: 'stt', type: 'stt' },
    { name: 'Tên', fieldName: 'fullName' },
    { name: 'Trạng thái', fieldName: 'status' },
] as Array<ITableHead>;