import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import "./styles.scss";

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
