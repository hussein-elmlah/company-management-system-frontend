import './App.css'
import { RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import router from "./router";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.css';
import { store } from './store/store';

function App() {

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service_worker.js', { scope: '/' })
          .then( registration         => registration.pushManager.getSubscription())
          .then( existingSubscription => existingSubscription.unsubscribe())
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          })
      
    }

  return (
    <>
      <Provider store={store}>
        <div className="App" data-choose-theme>
          <RouterProvider router={router} />
        </div>
      </Provider>,

    </>
  )
}

export default App
