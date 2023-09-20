import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  public notificationMessage: string = '';

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit(): void {
  }


  public onSendNotification() {
    this.notificationsService.sendNotification(this.notificationMessage);
  }

  public onRequestNotificationPermision() {
    this.notificationsService.requestNotificationPermission();
  }
}
