import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor() { }

  async sendNotification(message: string) {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        this.showNotification(message);
      } else if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          this.showNotification(message);
        }
      }
    }
  }

  async requestNotificationPermission () {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        // Permission granted, you can now send notifications
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  }

  private showNotification(body: string) {
    const title = 'Demo PWA App';
    const payload = {
      body
    };
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification(title, payload);
      });
    } else {
      new Notification(title, payload);
    }
  }
}

