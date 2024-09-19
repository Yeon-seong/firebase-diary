import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Header from './components/header/Header';
import { useAuthContext } from './hooks/useAuthContext';

function App() {

  const { isAuthReady } = useAuthContext();

  return (
    <div>
      {/* isAuthReady가 true라면 아래 내용을 반환 */}
      {isAuthReady ?
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path="/"
              element={<Home />}>
            </Route>
            <Route
              path="/login"
              element={<Login />}>
            </Route>
            <Route
              path="/signup"
              element={<Signup />}>
            </Route>
          </Routes>
        </BrowserRouter> : '로딩중입니다...'
      }
    </div>
  );
}
export default App;