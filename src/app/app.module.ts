import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeaturesComponent } from './components/features/features.component';
import { FeatureCardComponent } from './components/feature-card/feature-card.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {MatIconModule} from '@angular/material/icon';
import { WebAuthComponent } from './components/web-auth/web-auth.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { AppRoutingModule } from './app-routing.module';
import { BackButtonComponent } from './components/back-button/back-button.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { initializeApp } from "firebase/app";
import {ClipboardModule} from '@angular/cdk/clipboard';
import { BarcodeDetectorComponent } from './components/barcode-detector/barcode-detector.component';
import { MediaCaptureComponent } from './components/media-capture/media-capture.component';
import { BarcodeScannerLivestreamModule } from "ngx-barcode-scanner";
import { ZXingScannerModule } from '@zxing/ngx-scanner';

initializeApp(environment.firebaseConfig);


@NgModule({
  declarations: [
    AppComponent,
    FeaturesComponent,
    FeatureCardComponent,
    WebAuthComponent,
    NotificationsComponent,
    BackButtonComponent,
    BarcodeDetectorComponent,
    MediaCaptureComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ClipboardModule,
    BarcodeScannerLivestreamModule,
    ZXingScannerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
