export interface IObjectSelect {
    value: string,
    label: string
}

interface IObject {
    id: string,
    name: string
}

interface IFunction {
    dashboard: string,
    role: string,
    user: string,
    permission: string,
    product: string,
    category: string
}

interface ICommand {
    view: string,
    create: string,
    update: string,
    delete: string,
}

export const commandId: ICommand = { view: 'VIEW', create: 'CREATE', delete: 'DELETE', update: 'UPDATE' }


export const commandCode: Array<IObject> = [
    { id: commandId.view, name: 'Xem' },
    { id: commandId.create, name: 'Thêm' },
    { id: commandId.update, name: 'Sửa' },
    { id: commandId.delete, name: 'Xoá' }
]

export const functionId: IFunction =
{
    dashboard: 'DASHBOARD',
    permission: 'SYSTEM_PERMISSION',
    role: 'SYSTEM_ROLE',
    user: 'SYSTEM_USER',
    product: 'CONTENT_PRODUCT',
    category: 'CONTENT_CATEGORY'
}

export const functionRoot: Array<IObject> = [
    { id: 'CONTENT', name: 'Nội dung' },
    { id: 'SYSTEM', name: 'Hệ thống' },
    { id: 'DASHBOARD', name: 'Thống kê' }
]

export const OptionVariant: Array<IObjectSelect> = [
    { value: "color", label: 'Màu sắc' },
    { value: "size", label: 'kích thước' },
    { value: "name", label: 'Tiêu đề' }
]