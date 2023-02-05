import './App.css';
import './constant-scss/main.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Welcome from './welcome-page/Welcome';
import Layout from './login-page/Layout';
import Login from './login-page/Login';

function App() {
  return (
    <div >
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Welcome/>} />
      <Route path="/login_page" element={<Layout/>} >
        
        <Route path="/login_page" element={<Login/>}/>
        </Route>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
