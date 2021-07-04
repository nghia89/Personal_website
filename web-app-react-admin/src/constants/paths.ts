const system = '/systems/';
const content = '/contents/';
const systemConfig = '/setting/'
const settingPages = '/setting_page/'

export const PATH = {
  error401: '/error401',
  error503: '/error503',
  HOME: '/',
  Dashboard: '/dashboard',
  //#region  systems
  USER: `${system}users`,
  ROLE: `${system}roles`,
  PERMISSION: `${system}permissions`,
  ORG: `${system}org`,

  //#endregion

  //#region Content
  PRODUCT: `${content}product`,
  PRODUCT_CREATE: `${content}product_create`,
  PRODUCT_DETAIL: `${content}product_detail/`,
  PRODUCT_VARIANT: `${content}variant_new/`,
  CATEGORIES: `${content}categories`,
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
