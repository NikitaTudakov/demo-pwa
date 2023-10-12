import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { BackgroundSyncService } from 'src/app/services/background-sync.service';

@Component({
    selector: 'app-background-sync',
    templateUrl: './background-sync.component.html',
    styleUrls: ['./background-sync.component.scss']
})
export class BackgroundSyncComponent implements OnInit {
    public dataSource : any[] = [];
    displayedColumns: string[] = ['id','name', 'surname', 'date-of-birth'];
    public userForm: FormGroup;

    constructor(private userService: BackgroundSyncService) { }

    ngOnInit(): void {
        this._initUserForm();
        this.userService.getUsers().subscribe((users: any) => {
            this.dataSource  = users;
        });
    }

    public async saveUser() {
        if(navigator.onLine) {
            this.userService.addUser(this.userForm.value).pipe(switchMap(() => {
                this._resetForm()
                return this.userService.getUsers();
            })).subscribe((users: any) => {
                this.dataSource  = users;
            });
        } else {
            await this.userService.addUserOffline(this.userForm.value);
            this.dataSource = await this.userService.getOfflineUsers();
            this._resetForm();
            (this.dataSource.length === 1) && this._triggerBackgroundSync();
        }

    }

    private _triggerBackgroundSync() {
        if (!navigator.serviceWorker.controller) {
          // Service worker not registered, handle this case accordingly
          console.error('Service worker not registered.');
        } else {
          navigator.serviceWorker.ready
            .then((registration:any) => {
              // Register a sync event for background synchronization
              return registration.sync.register('syncUsers');
            })
            .then(() => {
              console.log('Background sync registered.');
            })
            .catch(error => {
              // Handle error while registering background sync
              console.error('Error registering background sync:', error);
            });
        }
    }

    private _initUserForm() {
        this.userForm = new FormGroup({
            name: new FormControl('', Validators.required),
            surname: new FormControl('', Validators.required),
            dateOfBirth: new FormControl('', Validators.required)
        });
    }

    private _resetForm() {
        this.userForm.reset();
        this.userForm.markAsUntouched();
        this.userForm.markAsPristine();
    }

}
