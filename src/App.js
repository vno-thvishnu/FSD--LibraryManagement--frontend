import './App.css';
import './constant-scss/main.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Welcome from './welcome-page/Welcome';
import Layout from './login-page/Layout';
import Login from './login-page/Login';
import Signup from './login-page/Signup';

function App() {
  return (
    <div >
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Welcome/>} />
      <Route path="/layout" element={<Layout/>} >
        
        <Route path="/layout" element={<Login/>}/>
        <Route path="/layout/signup" element={<Signup/>}/>

        </Route>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
