import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BackgroundSyncService {
    private dbApiUrl = environment.dbApiUrl;

    constructor(private http: HttpClient) { }

    getUsers() {
        return this.http.get(`${this.dbApiUrl}/users`);
    }

    getUser(id: number) {
        return this.http.get(`${this.dbApiUrl}/users/${id}`);
    }

    addUser(user: any) {
        return this.http.post(`${this.dbApiUrl}/users`, user);
    }

    storeUserLocally(user: any) {
        const localUsers = this.getLocalUsers();

        localUsers.push(user);
        localStorage.setItem('localUsers', JSON.stringify(localUsers));
    }

    getLocalUsers() {
        return localStorage.getItem('localUsers') ? 
        JSON.parse(localStorage.getItem('localUsers')!) : [];
    }

    updateUser(id: number, user: any) {
        return this.http.put(`${this.dbApiUrl}/users/${id}`, user);
    }

    deleteUser(id: number) {
        return this.http.delete(`${this.dbApiUrl}/users/${id}`);
    }
}

