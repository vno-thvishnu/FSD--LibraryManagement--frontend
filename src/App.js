import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Welcome from './welcome-page/Welcome';

function App() {
  return (
    <div >
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Welcome/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
