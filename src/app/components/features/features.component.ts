import { Component, OnInit } from '@angular/core';
import { Feature } from 'src/app/interfaces/feature.interface';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {

  public featureList: Feature[] = [
    {name:'Web Authentication',icon:'fingerprint', routerUrl:'web-auth'},
    {name:'Notifications', icon:'notifications', routerUrl:'notifications'},
    {name:'Media capture', icon:'perm_media', routerUrl:'media-capture'},
    {name:'Background Sync', icon:'sync', routerUrl:'background-sync'},
    // {name:'Barcode detection', iconUrl:'assets/icons/barcode-scan-icon.svg', routerUrl:'barcode-detection'},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
