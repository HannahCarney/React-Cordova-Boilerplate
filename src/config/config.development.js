module.exports = {
    //application environment config goes here
    API_URL: 'https://my-api-integration.com',
    ROLLBAR: {
        accessToken: 'my-rollbar-access-token',
        enabled: true,
        payload: {environment: 'development'}
    }
};