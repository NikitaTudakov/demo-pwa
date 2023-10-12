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