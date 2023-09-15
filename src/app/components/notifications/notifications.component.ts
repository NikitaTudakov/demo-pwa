import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit(): void {
  }


  public onSendNotification(message: string) {
    this.notificationsService.sendNotification(message);
  }

  public onRequestNotificationPermision() {
    this.notificationsService.requestNotificationPermission();
  }
}
