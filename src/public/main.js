const public_key = "BP75s7bIwMAvFpjMaa6sW6Xp9p7yQ4Z1uT5-eX2yBaChgBhUMSaH2u4eN-1w3DOSAcuoHklVdkHkoSTTt6_RWHE"

function urlBase64ToUint8Array(base64String) {
   const padding = '='.repeat((4 - base64String.length % 4) % 4);
   const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

   const rawData = window.atob(base64);
   const outputArray = new Uint8Array(rawData.length);

   for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
   }
   return outputArray;
}


const subscription = async () => {
   // Server Worker
   const register = await navigator.serviceWorker.register("/worker.js", {
      scope: "/"
   })
   console.log('New Server Worker');

   const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(public_key)
   })

   await fetch("/subscription", {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
         "Content-Type": "application/json"
      }
   })
   console.log('Subscribed !');
}

const form = document.querySelector("form")
const message = document.querySelector("#message")
const title = document.querySelector("#title")

form.addEventListener("submit", (e) => {
   e.preventDefault()
   fetch("/new-message", {
      method: "POST",
      body: JSON.stringify({
         title: title.value,
         message: message.value
      }),
      headers: {
         "Content-Type": "application/json"
      }
   })
   form.reset()
})

subscription()