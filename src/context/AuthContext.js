import { createContext, useEffect, useReducer } from "react";
import { appAuth } from '../firebase/config';


// AuthContext 컨텍스트
const AuthContext = createContext();

// dispatch를 통해서 호출할 리듀서 함수
const authReducer = (state, action) => {
  switch (action.type) {
    // dispatch의 액션 타입이 로그인인 경우 타입 지정(로그인, 회원가입)
    case 'login':
      return { ...state, user: action.payload }
    case 'logout':
      return { ...state, user: null }
    case 'authIsReady':
      return { ...state, user: action.payload, isAuthReady: true }
    default:
      return state
  }
};


// AuthContextProvider 컴포넌트
const AuthContextProvider = ({ children }) => {

  /*
    사용자의 로그인 상태를 관찰하는 옵저버를 붙인다
    파이어베이스의 사용자의 정보(로그인) 상태를 관찰하기 위해
    onAuthStateChanged 함수를 사용한다

    onAuthStateChanged : 사용자의 인증정보 변화를 관찰하는 함수다
    onAuthStateChanged 함수는 Unsubscribe 함수를 반환하며,
    더 이상 사용자의 변화를 관찰하지 않도록 하는 함수다
    새로고침 후 초기에 딱 한번 실행하면 되기 때문에 이후에는 구독을 중지한다
  */
  useEffect(() => {
    const unsubscribe = appAuth.onAuthStateChanged((user) => {
      dispatch({ type: 'authIsReady', payload: user })
    });
    // 클린업 함수로 구독을 취소하도록 만든다.
    return () => {
      unsubscribe();
    };
  }, []);
  // console.log('context: ', state);


  // useReducer는 상태와 디스패치 함수를 반환한다
  // isAuthReady : 사용자의 정보가 우리 애플리케이션으로 들어갔는지 유무 판단
  const [state, dispatch] = useReducer(
    authReducer, { user: null, isAuthReady: false }
  );
  return (
    // 전역으로 관리될 value
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };