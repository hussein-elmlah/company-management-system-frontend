import './App.css'
import { RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import router from "./router";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.css';
import { store } from './store/store';
import "./styles/style.css";
function App() {

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
