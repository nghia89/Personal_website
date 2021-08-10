import { env } from "@/environments/config";
import { GET, POST, PUT, DELETE } from "@/helpers/httpCommon";
import { PermissionRequest } from '@/models/index';

const baseApiMenu = 'users/';
const baseApiRoles = 'roles/';
const baseApiPermission = 'permissions/';
const baseApiFunctions = 'functions/';
const baseApiProduct = 'products/';
const baseApiUpload = 'uploadFiles/';
const baseApiProductCategory = 'productCategory/';
const baseApiSystemConfig = 'systemConfig/';
const baseApiColor = 'color/';
const baseApiSize = 'size/';
const baseApiProductQuantity = 'productQuantity/';
const baseApiSlideShow = 'slideShow/'
const baseApiProductCollection = 'productCollections/'
const baseApiPageOther = 'pageOther/'
const baseApiCatalogOther = 'catalogOther/'
const baseApiAnnouncement = 'announcement/'

export const UploadImageForCKEditor = `${env.baseApiUrl}/api/${baseApiUpload}upload_image_ckeditor`;

export const apiUploadFile = {
    UploadImage: async (body: any) => { return await POST(`${baseApiUpload}upload_image`, body) },
    delete: async (body: any) => { return await POST(`${baseApiUpload}delete`, body) },
    UploadProductImage: async (id?: number, body?: any) => { return await POST(`${baseApiUpload}product/${id}/images`, body) }
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
    getAll: async () => { return await GET(`${baseApiFunctions}getall`) },
    getFuncRoot: async () => { return await GET(`${baseApiFunctions}funcroot`) }
}

export const apiColor = {
    getAll: async () => { return await GET(`${baseApiColor}getall`) },
    getById: async (id: number) => { return await GET(`${baseApiColor}` + id) },
    create: async (body: any) => { return await POST(`${baseApiColor}add`, body) },
    update: async (body: any) => { return await PUT(`${baseApiColor}update`, body) },
}

export const apiSize = {
    getAll: async () => { return await GET(`${baseApiSize}getall`) },
    getById: async (id: number) => { return await GET(`${baseApiSize}` + id) },
    create: async (body: any) => { return await POST(`${baseApiSize}add`, body) },
    update: async (body: any) => { return await PUT(`${baseApiSize}update`, body) },
}


export const apiProduct = {
    getPaging: async (param: string) => { return await GET(`${baseApiProduct}paging` + param) },
    getById: async (id: number) => { return await GET(`${baseApiProduct}get/` + id) },
    create: async (body: any) => { return await POST(`${baseApiProduct}add`, body) },
    update: async (body: any) => { return await PUT(`${baseApiProduct}update`, body) },
    productImageReorder: async (id?: number, body?: any) => { return await PUT(`${baseApiProduct}${id}/images/reorder`, body) },
    delete: async (id: number) => { return await DELETE(`${baseApiProduct}delete/` + id) },
    deleteImg: async (id?: number, imgId?: number) => { return await DELETE(`${baseApiProduct}delete/${id}/image/${imgId}`) },
    getGenarateCode: async (code: string) => { return await GET(`${baseApiProduct}generate_code/` + code) },
    getProductImages: async (id?: number) => { return await GET(`${baseApiProduct}${id}/images`) }
}

export const apiProductCategory = {
    getPaging: async (param: string) => { return await GET(`${baseApiProductCategory}paging` + param) },
    getById: async (id?: number) => { return await GET(`${baseApiProductCategory}` + id) },
    create: async (body: any) => { return await POST(`${baseApiProductCategory}add`, body) },
    update: async (body: any) => { return await PUT(`${baseApiProductCategory}update`, body) },
    delete: async (id: number) => { return await DELETE(`${baseApiProductCategory}` + id) },
    treeViewCate: async () => { return await GET(`${baseApiProductCategory}treeview`) }
}


export const apiSystemConfig = {
    create: async (body: any) => { return await POST(`${baseApiSystemConfig}add`, body) },
    update: async (body: any) => { return await PUT(`${baseApiSystemConfig}update`, body) },
    detail: async () => { return await GET(`${baseApiSystemConfig}get_by_first_system`) }
}

export const apiProductQuantity = {
    create: async (body: any) => { return await POST(`${baseApiProductQuantity}add`, body) },
    update: async (body: any) => { return await PUT(`${baseApiProductQuantity}update`, body) },
    updates: async (body: any) => { return await PUT(`${baseApiProductQuantity}updates`, body) },
    delete: async (id: number) => { return await DELETE(`${baseApiProductQuantity}delete/` + id) },
}

export const apiSlideShow = {
    getAll: async () => { return await GET(`${baseApiSlideShow}getall`) },
    create: async (body: any) => { return await POST(`${baseApiSlideShow}add`, body) },
    update: async (body: any) => { return await PUT(`${baseApiSlideShow}update`, body) },
    updates: async (body: any) => { return await PUT(`${baseApiSlideShow}updates`, body) },
    delete: async (id: number) => { return await DELETE(`${baseApiSlideShow}delete/` + id) },
    getById: async (id?: number) => { return await GET(`${baseApiSlideShow}` + id) },
}

export const apiProductCollection = {
    getAll: async () => { return await GET(`${baseApiProductCollection}getall`) },
    getPaging: async (param: string) => { return await GET(`${baseApiProductCollection}paging` + param) },
    create: async (body: any) => { return await POST(`${baseApiProductCollection}add`, body) },
    update: async (body: any) => { return await PUT(`${baseApiProductCollection}update`, body) },
    delete: async (id: number) => { return await DELETE(`${baseApiProductCollection}delete/` + id) },
    getById: async (id?: number) => { return await GET(`${baseApiProductCollection}` + id) },
}

export const apiPageOther = {
    getAll: async () => { return await GET(`${baseApiPageOther}getall`) },
    getPaging: async (param: string) => { return await GET(`${baseApiPageOther}paging` + param) },
    create: async (body: any) => { return await POST(`${baseApiPageOther}add`, body) },
    update: async (body: any) => { return await PUT(`${baseApiPageOther}update`, body) },
    delete: async (id: number) => { return await DELETE(`${baseApiPageOther}delete/` + id) },
    getById: async (id?: number) => { return await GET(`${baseApiPageOther}` + id) },
}

export const apiCatalogOther = {
    getAll: async () => { return await GET(`${baseApiCatalogOther}getall`) },
}

export const apiAnnouncement = {
    getPaging: async () => { return await GET(`${baseApiAnnouncement}paging`) },
    getCountUnRead: async () => { return await GET(`${baseApiAnnouncement}count_un_read`) },
}