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
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
