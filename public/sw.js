self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Virtual Assistant - Pengingat';
  const options = {
    body: data.body || 'Waktunya kelas dimulai!',
    icon: '/icon-192x192.png',
    requireInteraction: true,
    data: data,
  };

  const notificationPromise = self.registration.showNotification(title, options);

  // Send message to open client windows to play audio
  const audioPromise = self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
    for (const client of clientList) {
      if (data.sound) {
        client.postMessage({ type: 'PLAY_ALARM' });
      }
    }
  });

  event.waitUntil(Promise.all([notificationPromise, audioPromise]));
});
  
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Stop alarm when notification is clicked
      for (const client of clientList) {
        client.postMessage({ type: 'STOP_ALARM' });
        if (client.url && 'focus' in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow('/reminders');
      }
    })
  );
});
