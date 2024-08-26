import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './login';
import Home from './home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
