import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ContentPage from './pages/ContentPage';

function App() {
  const isLoggedIn = !!localStorage.getItem('vidgenz_token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/content" /> : <LoginPage />} />
        <Route path="/content" element={<ContentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;