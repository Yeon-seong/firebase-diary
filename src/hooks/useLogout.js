import { useState } from 'react';
import { signOut } from "firebase/auth";
import { appAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";


export const useLogout = () => {
  // 에러 상태를 관리
  const [error, setError] = useState(null);

  // 통신 상태를 관리 => true: 통신 중o, false: 통신 중x
  const [isPending, setIsPending] = useState(false);

  // 전역 context에서 제공되는 값 중, dispatch 함수를 받아온다
  const { dispatch } = useAuthContext();


  // signOut 함수를 실행시키는 logout 함수
  const logout = () => {
    setIsPending(true);

    signOut(appAuth).then(() => {
      // type은 필수지만 payload는 생략해도 된다.
      dispatch({ type: 'logout' });
      setIsPending(false);
      setError(null);
      
    }).catch((error) => {
      setIsPending(false);
      setError(error.message);
      console.error(error.message);
    });
  }
  return [ logout, isPending, error ];
};