export interface ITableHead {
    name: string,
    fieldName: string,
    type: 'date' | 'dateTime' | 'stt' | 'status' | 'image'
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
    { name: 'Ảnh', fieldName: 'image', type: 'image' },
    { name: 'Tên sản phẩm', fieldName: 'name' },
    { name: 'Mã SP', fieldName: 'code' },
    { name: 'Loại', fieldName: 'productCategoryName' },
    { name: 'Ngày tạo', fieldName: 'dateCreated', type: 'date' },
    { name: 'Trạng thái', fieldName: 'status', type: 'status' },
] as Array<ITableHead>;

export const tableHeadRoleToFunc = [
    { name: 'Tên', fieldName: 'name' },
    { name: 'Mô tả', fieldName: 'description' },
] as Array<ITableHead>;


export const tableHeadCategory = [
    { name: 'stt', fieldName: 'stt', type: 'stt' },
    { name: 'Tên', fieldName: 'name' },
    { name: 'Trạng thái', fieldName: 'status', type: 'status' },
] as Array<ITableHead>;

export const tableHeadColor = [
    { name: 'stt', fieldName: 'stt', type: 'stt' },
    { name: 'Tên', fieldName: 'name' }
] as Array<ITableHead>;

export const tableHeadSize = [
    { name: 'stt', fieldName: 'stt', type: 'stt' },
    { name: 'Tên', fieldName: 'name' }
] as Array<ITableHead>;