
const dev = {
    production: false,
    baseApiUrl: 'https://localhost:5000',
    authorityUrl: 'https://localhost:5000',
    clientId: 'react_admin',
    adminUrl: 'http://localhost:4200'
};


const prod = {
    production: true,
    baseApiUrl: 'https://localhost:5000',
    authorityUrl: 'https://localhost:5000',
    clientId: 'react_admin',
    adminUrl: 'http://localhost:4200'
};

const config = process.env.NODE_ENV === 'development'
    ? dev
    : prod;

export const env = {
    ...config
};