import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

if ('serviceWorker' in navigator && environment.production) {
  navigator.serviceWorker.register('./ngsw-worker.js',{scope: '/demo-pwa/'})
    .then(registration => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(error => {
      console.error('Service Worker registration failed:', error);
    });

  navigator.serviceWorker.register('./background-sync-sw.js',{scope: '/demo-pwa/'})
    .then(registration => {
      console.log('Background Service Worker registered with scope:', registration.scope);
    })
    .catch(error => {
      console.error('Background Service Worker registration failed:', error);
    });
}