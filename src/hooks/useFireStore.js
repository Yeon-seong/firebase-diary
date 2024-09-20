import { collection, addDoc, Timestamp } from "firebase/firestore";
import { appfireStore } from "../firebase/config";
import { useReducer } from "react";


/* 초기값 설정
  document : 파이어스토어에 document의 생성을 요청하면 우리가 생성한 document를 반환 
  isPending: 통신중인지 아닌지 상태
  success : 요청에 대한 응답의 성공 유무 */
const initState = {
  document: null,
  isPending: false,
  error: null,
  isSuccess: false
}


const storeReducer = (state, action) => {
  switch (action.type) {
    case 'isPending': // isPending 상태일 때 데이터 반환
      return {
        document: null,
        isPending: true,
        error: null,
        isSuccess: false
      }
    case 'addDoc': // addDoc 상태일 때 데이터 반환
      return {
        document: action.payload,
        isPending: false,
        error: null,
        isSuccess: true
      }
    case 'error': // error 상태일 때 데이터 반환
      return {
        document: null,
        isPending: false,
        error: action.payload,
        isSuccess: false
      }
    default:
      return state;
  }
}


// transaction: 만들어질 컬렉션의 이름
export const useFireStore = (transaction) => {

  // response: 파이어베이스의 응답
  const [response, dispatch] = useReducer(storeReducer, initState);

  // 컬렉션 생성
  const colRef = collection(appfireStore, transaction);

  // 문서 추가(doc: 일기 제목, 일기 내용이 들어간다)
  const addDocument = async (doc) => {
    dispatch({ type: "isPending" });

    try {
      // createdTime: 데이터베이스에 등록한 시간
      // const createdTime = Timestamp.fromDate(new Date());
      // const docRef = await addDoc(colRef, { ...doc, createdTime });
      const createdTime = Timestamp.fromDate(new Date());
      const docRef = await addDoc(colRef, { ...doc, createdTime });
      dispatch({ type: "addDoc", payload: docRef });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
      console.error(error.message);
    }

  }

  // 문서 삭제 : 문서를 지울 때는 id 값이 필요
  const delDocument = (id) => {

  }

  return { addDocument, delDocument, response }
}