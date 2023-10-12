import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesComponent } from './components/features/features.component';
import { WebAuthComponent } from './components/web-auth/web-auth.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { MediaCaptureComponent } from './components/media-capture/media-capture.component';
import { BarcodeDetectorComponent } from './components/barcode-detector/barcode-detector.component';
import { BackgroundSyncComponent } from './components/background-sync/background-sync.component';

const routes: Routes = [
  { path: '', component: FeaturesComponent },
  { path: 'web-auth', component: WebAuthComponent },
  { path: 'notifications', component: NotificationsComponent},
  { path: 'media-capture', component: MediaCaptureComponent},
  { path: 'barcode-detection', component: BarcodeDetectorComponent},
  { path: 'background-sync', component: BackgroundSyncComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }