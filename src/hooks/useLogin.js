import { useState } from 'react';
import { useAuthContext } from "./useAuthContext";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { appAuth } from '../firebase/config';


export const useLogin = () => {
  // 에러 상태를 관리
  const [error, setError] = useState(null);

  // 통신 상태를 관리 => true: 통신 중o, false: 통신 중x
  const [isPending, setIsPending] = useState(false);

  // 전역 context에서 제공되는 값 중, dispatch 함수를 받아온다
  const { dispatch } = useAuthContext();


  // signOut 함수를 실행시키는 logout 함수
  const login = (email, password) => {
    setIsPending(true);

    signInWithEmailAndPassword(appAuth, email, password)
    .then((userCredential) => {
    // 로그인 성공
      const user = userCredential.user;
      dispatch({ type: 'login', payload: user });
      setIsPending(false);
      setError(null);
    })

    // 로그인 실패
    .catch((error) => {
      setError(error.message);
      console.error(error.message);
      setIsPending(false);
    });
  }
  return [ login, isPending, error ];
};