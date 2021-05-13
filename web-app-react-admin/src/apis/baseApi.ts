import { env } from "@/environments/config";
import { GET, POST, PUT, DELETE } from "@/helpers/httpCommon";
import { PermissionRequest } from '@/models/index';

const baseApiMenu = 'users/';
const baseApiRoles = 'roles/';
const baseApiPermission = 'permissions/';
const baseApiFunctions = 'functions/';
const baseApiProduct = 'products/';
const baseApiUpload = 'uploadFiles/';

export const UploadImageForCKEditor = `${env.baseApiUrl}/api/${baseApiUpload}upload_image_ckeditor`;

export const apiUploadFile = {
    UploadImage: async (body: any) => { return await POST(`${baseApiUpload}upload_image`, body) }
}

export const apiUser = {
    getMenu: async () => { return await GET(`${baseApiMenu}menu`) },
    getUserPaging: async (param: string) => { return await GET(`${baseApiMenu}paging` + param) },
    getById: async (id: string) => { return await GET(`${baseApiMenu}` + id) },
    create: async (body: any) => { return await POST(`${baseApiMenu}`, body) },
    update: async (id: string, body: any) => { return await PUT(`${baseApiMenu}${id}`, body) },
    delete: async (id: string) => { return await DELETE(`${baseApiMenu}` + id) },
    addRoleToUser: async (body: any) => { return await POST(`${baseApiMenu}add_role_user`, body) }
}

export const apiRoles = {
    getAll: async () => { return await GET(`${baseApiRoles}getall`) },
    getUserPaging: async (param: string) => { return await GET(`${baseApiRoles}paging` + param) },
    getById: async (id: string) => { return await GET(`${baseApiRoles}` + id) },
    create: async (body: any) => { return await POST(`${baseApiRoles}`, body) },
    update: async (id: string, body: any) => { return await PUT(`${baseApiRoles}${id}`, body) },
    delete: async (id: string) => { return await DELETE(`${baseApiRoles}` + id) },
    updatePermissionByRole: async (roleId, body: Array<PermissionRequest>) => { return await PUT(`${baseApiRoles}${roleId}/permissions`, { Permissions: body }) }
}

export const apiPermission = {
    getPermission: async (roleId) => {
        return await GET(`${baseApiPermission}${roleId}`)
    }
}

export const apiFunction = {
    getAll: async () => { return await GET(`${baseApiFunctions}getall`) }
}

export const apiProduct = {
    getPaging: async (param: string) => { return await GET(`${baseApiProduct}paging` + param) },
    getById: async (id: string) => { return await GET(`${baseApiProduct}get/` + id) },
    create: async (body: any) => { return await POST(`${baseApiProduct}add`, body) },
    update: async (id: string, body: any) => { return await PUT(`${baseApiProduct}update/${id}`, body) },
    delete: async (id: string) => { return await DELETE(`${baseApiProduct}` + id) }
}

