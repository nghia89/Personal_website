import { createBrowserHistory } from 'history';

export default createBrowserHistory();


// const isTest = process.env.NODE_ENV === "test";

// export const history = isTest
//   ? createMemoryHistory({ initialEntries: [Urls.Home] })
//   : createBrowserHistory();