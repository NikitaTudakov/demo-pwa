import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebAuthService {

  constructor() { }

  public  apiUrl = environment.apiUrl;
  public hasCredential = localStorage.getItem('credential') !== null;


  async register(): Promise<boolean> {
    try {
      const {registrationOptions, session } = await (await fetch(`${this.apiUrl}/registration-options`, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })).json();
      
      registrationOptions.challenge = new Uint8Array(registrationOptions.challenge.data);
      registrationOptions.user.id = new Uint8Array(registrationOptions.user.id.data);
      registrationOptions.user.name = 'pwa@example.com';
      registrationOptions.user.displayName = 'What PWA Can Do Today';
      const credential: any = await navigator.credentials.create({
        publicKey: registrationOptions
      });

  
      const credentialId = this.bufferToBase64(credential.rawId);
  
      localStorage.setItem('credential', JSON.stringify({credentialId}));
  
      const data = {
        rawId: credentialId,
        response: {
          attestationObject: this.bufferToBase64(credential.response.attestationObject),
          clientDataJSON: this.bufferToBase64(credential.response.clientDataJSON),
          id: credential.id,
          type: credential.type,
          session:session
        }
      };
  
      const resp = await (await fetch(`${this.apiUrl}/register`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({credential: data}),
        credentials: 'include'
      })).json();

      localStorage.setItem('session', JSON.stringify(resp.session));
  
      return true
    }
    catch(e) {
      console.error('registration failed', e);
      return false
    }
  }

  async authenticate(): Promise<boolean> {
    try {
      const {authnOptions} = await (await fetch(`${this.apiUrl}/authentication-options`, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })).json();

      const {credentialId} = JSON.parse(localStorage.getItem('credential') || '');
      const session = JSON.parse(localStorage.getItem('session') || '');
      session.challenge = authnOptions.challenge;
      authnOptions.challenge = new Uint8Array(authnOptions.challenge.data);
      authnOptions.allowCredentials = [
        {
          id: this.base64ToBuffer(credentialId),
          type: 'public-key',
          transports: ['internal']
        }
      ];

      const credential: any = await navigator.credentials.get({
        publicKey: authnOptions
      });

      const data = {
        rawId: this.bufferToBase64(credential.rawId),
        response: {
          authenticatorData: this.bufferToBase64(credential.response.authenticatorData),
          signature: this.bufferToBase64(credential.response.signature),
          userHandle: this.bufferToBase64(credential.response.userHandle),
          clientDataJSON: this.bufferToBase64(credential.response.clientDataJSON),
          id: credential.id,
          type: credential.type,
          session:session
        }
      };

      const response = (await fetch(`${this.apiUrl}/authenticate`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({credential: data}),
        credentials: 'include'
      }));

      if(response.status === 404) {
        this.removeCredential();
        return false;
      }
      else {
        const assertionResponse = await response.json();

        return true;
      }
    }
    catch(e) {
      console.error('authentication failed', e);
      return false;
    }
  }

  public removeCredential(): void {
    localStorage.removeItem('credential');
    localStorage.removeItem('session');
  }

  
  private bufferToBase64(buffer: ArrayBufferLike) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
  }

  private base64ToBuffer(base64: string) {
    return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
  }
}
