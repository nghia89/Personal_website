const system = '/systems/';
const content = '/contents/';
const systemconfig = '/setting/'

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
  PRODUCT_CREATE: `${content}product-create`,
  PRODUCT_DETAIL: `${content}product-detail/`,
  CATEGORIES: `${content}categories`,
  //#endregion


  //#region Setting
  SETTINGCONFIG: `${systemconfig}config/general`,
  SETTING_COLOR: `${systemconfig}colors`,
  SETTING_SIZE: `${systemconfig}sizes`,
  //#endregion

  LOGIN: '/login',
  AuthCallback: '/auth-callback'
}
