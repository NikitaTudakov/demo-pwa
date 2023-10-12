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

    public saveUser() {
        this.userService.addUser(this.userForm.value).pipe(switchMap(() => {
            this.userForm.reset();
            this.userForm.markAsPristine();
            this.userForm.markAsUntouched();
            return this.userService.getUsers();
        })).subscribe((users: any) => {
            this.dataSource  = users;
        });
    }

    private _initUserForm() {
        this.userForm = new FormGroup({
            name: new FormControl('', Validators.required),
            surname: new FormControl('', Validators.required),
            dateOfBirth: new FormControl('', Validators.required)
        });
    }

}
