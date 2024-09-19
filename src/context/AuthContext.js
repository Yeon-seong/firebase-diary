import { createContext, useReducer } from "react";


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
    default:
      return state;
  }
};


// AuthContextProvider 컴포넌트
const AuthContextProvider = ({ children }) => {

  // useReducer는 상태와 디스패치 함수를 반환한다
  const [state, dispatch] = useReducer(authReducer, {user: null});
  console.log('context: ', state);
  return (
    // 전역으로 관리될 value
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthContextProvider};