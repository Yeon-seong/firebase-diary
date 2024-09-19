import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Header from './components/header/Header';
import { useAuthContext } from './hooks/useAuthContext';

function App() {

  // 통신이 완료되었다면 true를 반환
  const { isAuthReady, user } = useAuthContext();

  return (
    <div>
      {/* isAuthReady가 true라면 아래 내용을 반환 */}
      {isAuthReady ?
        <BrowserRouter>
          <Header />
          <Routes>
            {/* root 경로 지정 : 현재 URL 창의 경로 */}
            <Route
              path='/'
              element={user ? <Home /> : <Navigate replace={true} to='/login' />}>
            </Route>
            <Route
              path='/login'
              element={!user ? <Login /> : <Navigate replace={true} to='/' />}>
            </Route>
            <Route
              path='/signup'
              element={!user ? <Signup /> : <Navigate replace={true} to='/' />}>
            </Route>
          </Routes>
        </BrowserRouter> : '로딩중입니다...'
      }
    </div>
  );
}
export default App;