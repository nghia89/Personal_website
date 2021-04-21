import { GET, POST, PUT, DELETE } from "@/helpers/httpCommon";
import { PermissionRequest } from '@/models/index';

const baseMenuApi = 'users/';
const baseRolesApi = 'roles/';
const basePermissionApi = 'permissions/';
const baseFunctionsApi = 'functions/';
const baseOrgApi = 'resourceOrganization/';

export const apiUser = {
    getMenu: async () => { return await GET(`${baseMenuApi}menu`) },
    getUserPaging: async (param: string) => { return await GET(`${baseMenuApi}paging` + param) },
    getById: async (id: string) => { return await GET(`${baseMenuApi}` + id) },
    create: async (body: any) => { return await POST(`${baseMenuApi}`, body) },
    update: async (id: string, body: any) => { return await PUT(`${baseMenuApi}${id}`, body) },
    delete: async (id: string) => { return await DELETE(`${baseMenuApi}` + id) },
    addRoleToUser: async (body: any) => { return await POST(`${baseMenuApi}add_role_user`, body) }
}

export const apiRoles = {
    getAll: async () => { return await GET(`${baseRolesApi}getall`) },
    getUserPaging: async (param: string) => { return await GET(`${baseRolesApi}paging` + param) },
    getById: async (id: string) => { return await GET(`${baseRolesApi}` + id) },
    create: async (body: any) => { return await POST(`${baseRolesApi}`, body) },
    update: async (id: string, body: any) => { return await PUT(`${baseRolesApi}${id}`, body) },
    delete: async (id: string) => { return await DELETE(`${baseRolesApi}` + id) },
    updatePermissionByRole: async (roleId, body: Array<PermissionRequest>) => { return await PUT(`${baseRolesApi}${roleId}/permissions`, { Permissions: body }) }
}

export const apiPermission = {
    getPermission: async (roleId) => {
        return await GET(`${basePermissionApi}${roleId}`)
    }
}

export const apiFunction = {
    getAll: async () => { return await GET(`${baseFunctionsApi}getall`) }
}

export const apiOrg = {
    getPaging: async (param: string) => { return await GET(`${baseOrgApi}paging` + param) },
    getById: async (id: string) => { return await GET(`${baseOrgApi}get/` + id) },
    create: async (body: any) => { return await POST(`${baseOrgApi}add`, body) },
    update: async (id: string, body: any) => { return await PUT(`${baseOrgApi}update/${id}`, body) },
    delete: async (id: string) => { return await DELETE(`${baseOrgApi}` + id) }
}

