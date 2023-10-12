import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BackgroundSyncService {
    private dbApiUrl = environment.dbApiUrl;
    private db: IDBDatabase;

    constructor(private http: HttpClient) {
        this.initializeDb();
    }

    getUsers() {
        return this.http.get(`${this.dbApiUrl}/users`);
    }

    getUser(id: number) {
        return this.http.get(`${this.dbApiUrl}/users/${id}`);
    }

    addUser(user: any) {
        return this.http.post(`${this.dbApiUrl}/users`, user);
    }

    // storeUserLocally(user: any) {
    //     const localUsers = this.getLocalUsers();

    //     localUsers.push(user);
    //     if ('serviceWorker' in navigator) {
    //         navigator.serviceWorker.controller!.postMessage({ action: 'addDataArray', localUsers });
    //         // navigator.serviceWorker.controller!.postMessage({ action: 'getAllData' });
    //     }

    //     navigator.serviceWorker.onmessage = function (event) {
    //         const message = event.data;
    //         if (message.success) {
    //           if (message.data) {
    //             console.log('Data retrieved:', message.data);
    //           } else {
    //             console.log('Data added successfully.');
    //           }
    //         } else {
    //           console.error('Error:', message.error);
    //         }
    //     };

    //     // localStorage.setItem('localUsers', JSON.stringify(localUsers));
    // }

    private async initializeDb() {
        const request = indexedDB.open('myDatabase', 1);
    
        request.onupgradeneeded = (event) => {
          this.db = request.result;
          if (!this.db.objectStoreNames.contains('users')) {
            this.db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
          }
        };
    }

    async addUserOffline(user: any) {
        const transaction = this.db.transaction(['users'], 'readwrite');
        const objectStore = transaction.objectStore('users');
    
        const request = objectStore.add(user);
    
        return new Promise((resolve, reject) => {
          request.onsuccess = () => {
            resolve([]);
          };
          request.onerror = (error) => {
            reject(error);
          };
        });
    }

    async getOfflineUsers(): Promise<any> {
        const transaction = this.db.transaction(['users'], 'readonly');
        const objectStore = transaction.objectStore('users');
    
        const request = objectStore.getAll();
    
        return new Promise<any>((resolve, reject) => {
          request.onsuccess = () => {
            resolve(request.result);
          };
          request.onerror = (error) => {
            reject(error);
          };
        });
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

