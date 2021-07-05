const system = '/systems/';
const product = '/products';
const systemConfig = '/setting/'
const settingPages = '/setting_page/'

export const PATH = {
  error401: '/error401',
  error403: '/error403',
  error503: '/error503',
  HOME: '/',
  Dashboard: '/dashboard',
  //#region  systems
  USER: `${system}users`,
  ROLE: `${system}roles`,
  PERMISSION: `${system}permissions`,
  ORG: `${system}org`,

  //#endregion

  //#region product
  PRODUCT: `${product}`,
  PRODUCT_CREATE: `${product}/product_create`,
  PRODUCT_DETAIL: `${product}/product_detail/`,
  PRODUCT_VARIANT: `${product}/variant_new/`,
  CATEGORIES: `${product}/categories`,
  PRODUCT_GROUP: `${product}/groups`,
  //#endregion


  //#region Setting
  SETTING_COLOR: `${systemConfig}colors`,
  SETTING_SIZE: `${systemConfig}sizes`,
  //#endregion

  //#region Setting PAGES 
  SETTINGCONFIG: `${settingPages}config/general`,
  SETTING_SLIDES: `${settingPages}slides`,
  SETTING_PAGES: `${settingPages}pages`,
  //#endregion

  LOGIN: '/login',
  AuthCallback: '/auth-callback'
}
