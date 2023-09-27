import logo from "./logo.svg";
import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./userComponent/Home";
import UserFormPage from "./userComponent/UserFormPage";
import ResultPage from "./userComponent/ResultPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user_form" element={<UserFormPage />} />
        <Route path="/result" element={<ResultPage />} />

        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
