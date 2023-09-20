import { Component, OnInit } from '@angular/core';
import { WebAuthService } from 'src/app/services/web-auth.service';

@Component({
  selector: 'app-web-auth',
  templateUrl: './web-auth.component.html',
  styleUrls: ['./web-auth.component.scss']
})
export class WebAuthComponent implements OnInit {

  constructor(private webAuthService: WebAuthService) { }

  public isRegistered: boolean = localStorage.getItem('credential') !== null;
  public isAuthenticated: boolean = false;
  public isRemoved: boolean = false;

  ngOnInit(): void {
  }

  async onRegisterClick(): Promise<void> {
    this.isRegistered = await this.webAuthService.register();
  }

  async onAuthenticateClick(): Promise <void> {
    this.isAuthenticated = await this.webAuthService.authenticate()
  }

  onRemoveCredentialsClick(): void {
    this.webAuthService.removeCredential();
    this.isRegistered = false;
    this.isAuthenticated = false;
    this.isRemoved = true;
  }

}
