import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { useFireStore } from '../../hooks/useFireStore';

export default function DiaryForm({ userId }) {

const [title, setTitle] = useState('');
const [secret, setSecret] = useState('');
const { addDocument, response } = useFireStore('diary');


const handleData = (event) => {
  if (event.target.type === 'text') {
    setTitle(event.target.value);
  } else {
    setSecret(event.target.value);
  }
}

const handleSubmit = (event) => {
  event.preventDefault();
  // console.log(title, secret);
  console.log(userId, title, secret);
  addDocument({ userId, title, secret });
}

useEffect(() => {
  if(response.isSuccess) {
    setTitle('');
    setSecret('');
  }
}, [response.isSuccess]);

return (
  <form onSubmit={handleSubmit}>
    <label className="a11y-hidden" for="diary-title">일기 제목</label>
    <input className="input-style" id="diary-title" type="text" placeholder="제목" required onChange={handleData} value={title} />

    <label className="a11y-hidden" for="diary-content">일기 내용</label>
    <textarea className={styles["diary-textarea"]} id="diary-content" placeholder="오늘의 비밀은 무엇인가요?" onChange={handleData} value={secret}></textarea>
    <button className="black-btn" type="submit">작성하기</button>
  </form>
)
}