export const env = {
    production: true,
    msalConfig: {
        auth: {
            clientId: '<CLIENT_ID>',
            authority: 'https://login.microsoftonline.com/TENANT_ID',
            redirectUri: 'http://localhost:4200'
        },
    },
    apiConfig: {
        scopes: ['api://API_CLIENT_ID/.default']
    },
    myFinanceApiUrl: 'https://localhost:5242/api'
}