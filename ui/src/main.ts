import { bootstrapApplication } from '@angular/platform-browser';
import { loadAppRuntimeConfig } from './app/app-runtime-config';

loadAppRuntimeConfig()
  .then(async () => {
    const [{ App }, { appConfig }] = await Promise.all([
      import('./app/app'),
      import('./app/app.config'),
    ]);

    return bootstrapApplication(App, appConfig);
  })
  .catch((err) => console.error(err));
