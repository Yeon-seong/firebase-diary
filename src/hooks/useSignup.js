import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { appAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';


/* 회원가입 커스텀 Hook : 에러인지, 통신 중인지 아닌지 확인한다 */
export const useSignup = () => {

  // 에러 상태를 관리
  const [error, setError] = useState(null);


  // 통신 상태를 관리 => true: 통신 중o, false: 통신 중x
  const [isPending, setIsPending] = useState(false);


  // 전역 context에서 제공되는 값 중, dispatch 함수를 받아온다
  const { dispatch } = useAuthContext();

  // 회원가입을 처리할 핵심적인 함수 : 3가지 데이터를 매개변수로 받는다
  // setIsPending 함수가 실행되면 통신이 시작된다
  const signup = (email, password, displayName) => {

    setIsPending(true);

    createUserWithEmailAndPassword(appAuth, email, password)
      .then((userCredential) => {
        // 현재 회원가입을 통해 로그인에 성공한 사용자의 정보
        const user = userCredential.user;
        console.log(user);

        // (사용자의 정보가 들어오지 않았을 경우)예외처리
        if (!user) {
          throw new Error('회원가입에 실패했습니다.');
        }

        // 사용자 프로파일을 업데이트 : displayName(별명)을 등록한다
        updateProfile(appAuth.currentUser, { displayName })
        .then(() => {
          dispatch({ type: 'login', payload: user });
          setIsPending(false);
        }).catch((error) => {
          const errorMessage = error.message;
          setError(errorMessage);
          console.error(error);
          setIsPending(false);
        });
      })

      // throw new Error의 에러가 catch((error))의 error로 들어온다
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        console.error(`에러코드 : ${errorCode}, ${error}`);
        setIsPending(false);
      });
  }
  return { error, isPending, signup };
};