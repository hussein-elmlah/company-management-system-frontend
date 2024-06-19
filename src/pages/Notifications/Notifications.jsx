import { Link } from "react-router-dom";
import { createDummyProject, sendRealNotifications, subscribeNotification } from "../../axios/notifications";

const Notifications = () => {
  
  createDummyProject()
  .then((keys) => {
  
    const publicVapidKey =  keys.data.publicKey

    // Check for service worker support
    if ('serviceWorker' in navigator) {
      send().catch(err => console.error(err));
    }

    async function send() {
      // Register service worker
      // const register = await navigator.serviceWorker.register('/service_worker.js', {
      //   scope: '/'
      // });

      const register = await navigator.serviceWorker
                       .getRegistrations().then(registrations => registrations[0]);

      console.log(register);
      // Register push
      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
      });

      subscribeNotification(subscription)
      sendRealNotifications()
      // Send push subscription to the server
      // await fetch('/subscribe', {
      //   method: 'POST',
      //   body: JSON.stringify(subscription),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // });
    }

    // Utility function to convert VAPID key
    function urlBase64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);
      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }

  })
 

  
  
};
export default Notifications;
