const system = '/systems/';
const content = '/contents/';


export const PATH = {
  error401: '/error401',
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

  LOGIN: '/login',
  AuthCallback: '/auth-callback'
}
