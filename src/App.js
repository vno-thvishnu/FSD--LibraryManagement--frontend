import "./App.css";
import "./constant-scss/main.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./welcome-page/Welcome";
import Layout from "./login-page/Layout";
import Login from "./login-page/Login";
import Signup from "./login-page/Signup";
import Forgotpassword from "./login-page/Forgotpassword";
import Changepassword from "./login-page/Changepassword";
import Dashboard from "./dashboard components/Dashboard";
import Addbooks from "./dashboard components/Addbooks";
import Updatebooks from "./dashboard components/Updatebooks";
import User from "./user components/User";
import Adduser from "./user components/Adduser";
import Updateuser from "./user components/Updateuser";
import Register from "./dashboard components/Register";
import History from "./dashboard components/History";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/layout" element={<Layout />}>
            <Route path="/layout" element={<Login />} />
            <Route path="/layout/signup" element={<Signup />} />
            <Route path="/layout/forgotpassword" element={<Forgotpassword />} />
            <Route path="/layout/changepassword" element={<Changepassword />} />
          </Route>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addbooks" element={<Addbooks />} />
          <Route path="/updatebooks/:_id" element={<Updatebooks />} />

          <Route path="/user" element={<User />} />
          <Route path="/addusers" element={<Adduser />} />
          <Route path="/updateusers/:_id" element={<Updateuser />} />

          <Route path="/register" element={<Register />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
