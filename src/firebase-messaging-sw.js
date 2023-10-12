importScripts("https://www.gstatic.com/firebasejs/10.4.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging-compat.js");

console.log('helo from sw');

firebase.initializeApp({
    measurementId: "config data from general tab",
    apiKey: "AIzaSyBu3EdpMgXfpe28b8IdhJYcpAKDD5pfH4c",
    authDomain: "fir-pwa-3fcce.firebaseapp.com",
    projectId: "fir-pwa-3fcce",
    storageBucket: "fir-pwa-3fcce.appspot.com",
    messagingSenderId: "964799810551",
    appId: "1:964799810551:web:b8f43dd77d2c228fcefcf2"
   });
const messaging = firebase.messaging();

self.addEventListener('sync', function(event) {
    console.log('hello from sync')
    if (event.tag === 'syncUsers') {
      event.waitUntil(syncUsers());
    }
});

function syncUsers() {
    // Retrieve form data from storage
    const localUsers = retrievelocalUsers();
  
    // Send the data to the server
    if(localUsers) {
        localUsers.forEach(user => {
            return fetch('/api/submit-form', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                  'Content-Type': 'application/json'
                }
            })
        })
        removelocalUsers();
    }
}

function retrievelocalUsers() {
    return JSON.parse(localStorage.getItem('localUsers'));
}

function removelocalUsers() {
    localStorage.removeItem('localUsers');
}