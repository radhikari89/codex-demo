export const environment = {
  auth0: {
    domain: '',
    clientId: '',
    audience: 'https://webdevisfun.com/api',
    redirectUri: `${window.location.origin}/callback`,
    logoutReturnTo: window.location.origin,
  },
};
