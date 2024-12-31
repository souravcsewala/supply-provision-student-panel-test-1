import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; 
import store from "../src/redux/store.js"; 
import "./index.css";
import App from "./App.jsx";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Bounce } from 'react-toastify';




createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}> 
      <BrowserRouter>
      <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce} 
        />
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
