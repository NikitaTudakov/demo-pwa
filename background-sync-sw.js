// self.addEventListener('sync', function(event) {
//     console.log('hello from sync')
//     if (event.tag === 'syncUsers') {
//       event.waitUntil(syncUsers());
//     }
// });

// function syncUsers() {
//     // Retrieve form data from storage
//     const localUsers = retrievelocalUsers();
  
//     // Send the data to the server
//     if(localUsers) {
//         localUsers.forEach(user => {
//             return fetch('/api/submit-form', {
//                 method: 'POST',
//                 body: JSON.stringify(user),
//                 headers: {
//                   'Content-Type': 'application/json'
//                 }
//             })
//         })
//         removelocalUsers();
//     }
// }

// function retrievelocalUsers() {
//     return JSON.parse(localStorage.getItem('localUsers'));
// }

// function removelocalUsers() {
//     localStorage.removeItem('localUsers');
// }

self.addEventListener('sync', function(event) {
    console.log('hello from sync');
    if (event.tag === 'syncUsers') {
      event.waitUntil(syncUsers());
    }
  });
  
  function syncUsers() {
    // Open the IndexedDB database
    const dbPromise = indexedDB.open('userDatabase', 1);
  
    return dbPromise
      .then(db => {
        const transaction = db.transaction('users', 'readonly');
        const objectStore = transaction.objectStore('users');
        return objectStore.getAll();
      })
      .then(localUsers => {
        // Send the data to the server
        if (localUsers.length > 0) {
          const syncPromises = localUsers.map(user => {
            return fetch('/api/submit-form', {
              method: 'POST',
              body: JSON.stringify(user),
              headers: {
                'Content-Type': 'application/json',
              },
            });
          });
  
          // Remove data from IndexedDB after successful synchronization
          return Promise.all(syncPromises).then(() => {
            return dbPromise.then(db => {
              const transaction = db.transaction('users', 'readwrite');
              const objectStore = transaction.objectStore('users');
              objectStore.clear();
            });
          });
        }
      });
  }

  self.addEventListener('fetch', function(event) {
    // You can add caching strategies here if needed
    // ...
  });
  
  self.addEventListener('install', function(event) {
    event.waitUntil(
      // Open or create the IndexedDB database
      indexedDB.open('userDatabase', 1).onsuccess = function(event) {
        const db = event.target.result;
  
        // Create an object store for user data
        if (!db.objectStoreNames.contains('users')) {
          db.createObjectStore('users', { autoIncrement: true });
        }
      }
    );
  });