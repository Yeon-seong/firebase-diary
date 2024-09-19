import React from 'react'
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useLogout } from '../hooks/useLogout';


export default function Header() {
  const {logout} = useLogout();

  return (
    <header>
      <div className={styles["header-wrap"]}>
        <h1>
          <Link to="./">
            <img className={styles.logo} src={logo} alt="두근두근 비밀일기" />
          </Link>
        </h1>
        <div>
          {/* 공통 스타일 : 재사용되는 부분이라 로그인 버튼은 index.js에서 불러오고 있다 */}
          <Link to="./signup" className="btn-join">회원가입</Link>
          <Link to="/" className="btn-join" onClick={logout}>로그아웃</Link>
        </div>
      </div>
    </header>
  )
}