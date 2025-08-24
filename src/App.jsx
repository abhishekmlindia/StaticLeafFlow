import { useState } from 'react'
import { Provider } from "react-redux";
import store from "./reduxToolKit/store.js";
import RouteConfig from './config/routeConfig';
import ToastComponent from './components/common/toast/ToastContainer.jsx';


function App() {

  return (
    <Provider store={store}>
      <ToastComponent />
      <RouteConfig />
    </Provider>
  )
}

export default App
