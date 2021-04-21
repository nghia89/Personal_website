const system = '/systems/';


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

  LOGIN: '/login',
  AuthCallback: '/auth-callback'
}
