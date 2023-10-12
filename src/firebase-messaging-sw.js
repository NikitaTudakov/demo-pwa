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