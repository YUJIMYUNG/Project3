import { useContext, useEffect } from "react";

import React from 'react';
import { Link } from "react-router-dom";
import { LoginInfoContext } from "../record/Index";
import axios from "axios";
import '../../index.css'

const Header = (props) => {

     // Provider 컴포넌트의 value 호출
     const {loginInfo, setLoginInfo} = useContext(LoginInfoContext);

     // 컴포넌트 생성시 axios 실행해서 로그인 회원정보 호출
     // 1. z컴포넌트가 실행될때 한 번 axios 요청을 보내 회원정보를 가져온다.
     useEffect ( () => {
         axios.get('/auth/login/info/get.do')
             .then( r => {console.log(r);
                 setLoginInfo(r.data); // 현재 로그인 정보를 state에 담기
             })
             .catch( e => {console.log(e)})
     }, [])

    return (
        <div>
            { loginInfo && <span> {loginInfo.nickname} 님 안녕하세요. </span>}
            <ul>
                <li><Link to="/"> MAIN </Link></li>
                <li><Link to="/auth/signup"> SIGN UP </Link></li>
                <li><Link to="/auth/login"> LOGIN </Link></li>
            </ul>
        </div>
    );
};

export default Header;