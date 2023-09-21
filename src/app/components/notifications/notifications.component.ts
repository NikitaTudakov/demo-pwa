import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications.service';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  public notificationToken: string = '';
  public notificationMessage: string = '';

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit(): void {
    this.requestPermission();
    this.listen();
  }


  public onSendNotification() {
    this.notificationsService.sendNotification(this.notificationMessage);
  }

  public onRequestNotificationPermision() {
    this.notificationsService.requestNotificationPermission();
  }

  private requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, 
     { vapidKey: environment.firebaseConfig.vapidKey}).then(
       (currentToken) => {
         if (currentToken) {
           console.log(currentToken);
           this.notificationToken = currentToken;
           
         } else {
           console.log('No registration token available. Request permission to generate one.');
         }
     }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
  }

  private listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
    });
  }
}
