import './App.css';
import Login from './Components/Login';
import Home from './Components/Home';
import {
  BrowserRouter ,
  Routes,
  Route
} from "react-router-dom";
function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/Home' element={<Home/>} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App;
