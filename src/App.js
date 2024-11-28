import './App.css';
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import PrivateRouter from './utils/PrivateRouter';
import PublicRouter from './utils/PublicRouter';



function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={
          <PrivateRouter>
            <HomePage />
          </PrivateRouter>
        } />
        <Route path='/login' element={
          <PublicRouter>
            <LoginPage />
          </PublicRouter>
        } />
      </Routes>
    </div>
  );
}

export default App;
