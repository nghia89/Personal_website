interface IObject {
    id: string,
    name: string
}

interface IFunction {
    dashboard: string,
    role: string,
    user: string,
    permission: string,
    org: string
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
    org: 'SYSTEM_ORG'
}

export const functionRoot: Array<IObject> = [
    { id: 'CONTENT', name: 'Nội dung' },
    { id: 'SYSTEM', name: 'Hệ thống' },
    { id: 'DASHBOARD', name: 'Thống kê' }
]