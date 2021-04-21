export interface PermissionVM {
    id?: string,
    name?: string,
    parentId?: string,
    hasCreate?: boolean,
    hasUpdate?: boolean,
    hasDelete?: boolean,
    hasView?: boolean
}

export interface PermissionRequest {
    FunctionId: string
    CommandId: string
}