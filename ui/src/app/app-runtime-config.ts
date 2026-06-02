export interface Auth0RuntimeConfig {
  domain: string;
  clientId: string;
  audience: string;
  redirectUri: string;
  logoutReturnTo: string;
}

export interface AppRuntimeConfig {
  auth0: Auth0RuntimeConfig;
}

const defaultRuntimeConfig: AppRuntimeConfig = {
  auth0: {
    domain: '',
    clientId: '',
    audience: 'https://webdevisfun.com/api',
    redirectUri: `${window.location.origin}/callback`,
    logoutReturnTo: window.location.origin,
  },
};

let runtimeConfig = defaultRuntimeConfig;

export async function loadAppRuntimeConfig(): Promise<void> {
  try {
    const response = await fetch('/app-config.json', { cache: 'no-store' });

    if (!response.ok) {
      return;
    }

    const config = (await response.json()) as Partial<AppRuntimeConfig>;
    runtimeConfig = {
      auth0: {
        ...defaultRuntimeConfig.auth0,
        ...config.auth0,
      },
    };

    runtimeConfig.auth0.redirectUri ||= defaultRuntimeConfig.auth0.redirectUri;
    runtimeConfig.auth0.logoutReturnTo ||= defaultRuntimeConfig.auth0.logoutReturnTo;
  } catch (error) {
    console.warn('Unable to load app-config.json. Falling back to default runtime config.', error);
  }
}

export function getAppRuntimeConfig(): AppRuntimeConfig {
  return runtimeConfig;
}
