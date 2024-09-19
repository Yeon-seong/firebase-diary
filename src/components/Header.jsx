import React from 'react';
import styles from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';


export default function Header() {
  const [logout] = useLogout();
  const { user } = useAuthContext();
  const location = useLocation();

  return (
    <header>
      <div className={styles["header-wrap"]}>
        <h1>
          <Link to="./">
            <img
              className={styles.logo}
              src={logo}
              alt="두근두근 비밀일기"
            />
          </Link>
        </h1>
        <div>
          {/* ----- 만약 유저의 상태가 null, 즉 로그아웃 이라면 ----- */}
          {!user && (
            <>
              {
                /*
                  사용자 정보가 없고, 회원가입 화면이라면 로그인 버튼을 노출,
                  로그인 화면이라면 회원가입 버튼을 노출한다.
                */
                location.pathname === "/signup"
                ? (<Link to="/login" className="btn-login">로그인</Link>)
                : (<Link to="/signup" className="btn-join">회원가입</Link>)
              }
            </>
          )}
          {/* ----- 만약 유저의 상태가 null 이 아니라면 ----- */}
          {!user && (
            <>
              {/*
                사용자 정보가 없고, 회원가입 화면이라면 로그인 버튼을 노출,
                로그인 화면이라면 회원가입 버튼을 노출한다.
              */}
              <p className="hello">환영합니다 <strong>{user.displayName}</strong>님!</p>
              <Link to="/" className="btn-logout" onClick={logout}>로그아웃</Link>
            </>
          )}
          {/* 공통 스타일 : 재사용되는 부분이라 로그인 버튼은 index.js에서 불러오고 있다 */}
          <Link to="./signup" className="btn-join">회원가입</Link>
          <Link to="/" className="btn-join" onClick={logout}>로그아웃</Link>
        </div>
      </div>
    </header>
  )
}