import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Home';
import {SignUp, SignIn} from './Sign';
import Profile from './Profile';
import '../styles/App.css';
function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
