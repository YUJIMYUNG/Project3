import { useContext, useEffect, useState } from "react";

import React from 'react';
import { Link } from "react-router-dom";
import '../../index.css';
import api from '../../api/axios';
import { LoginInfoContext } from "../record/Index";

const Header = (props) => {

     // Provider 컴포넌트의 value 호출
     const {loginInfo, setLoginInfo} = useContext(LoginInfoContext);
     const [isLoading, setIsLoading] = useState(true);

     // 컴포넌트 생성시 axios 실행해서 로그인 회원정보 호출
     // 1. z컴포넌트가 실행될때 한 번 axios 요청을 보내 회원정보를 가져온다.
     useEffect ( () => {
        // 로그인 되어있는지 확인 후
        const checkLoginStatus = () => {
        
            api.get('/auth/info/get.do')
                .then( r => 
                    {console.log(r);
                    setLoginInfo(r.data); // 현재 로그인 정보를 state에 담기
                })
                .catch( e => {
                    console.log(e);
                    // 오류 발생 시 loginInfo를 null로 설정
                    setLoginInfo(null);
                })
                .finally(() => {
                    setIsLoading(false);
                })
        };
        checkLoginStatus();
     }, [setLoginInfo])



    // 로그인 상태와 로딩 상태 디버깅
    console.log("로그인 상태:", loginInfo);
    console.log("로딩 상태:", isLoading);

    return (
        <header className="bg-indigo-600 py-3 shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="text-white font-bold text-xl tracking-wide">
                        Study Tracker
                    </Link>
                    
                    <nav className="flex items-center gap-4">
                        <Link to="/" className="text-white hover:bg-indigo-500 px-3 py-2 rounded transition-colors duration-200">
                            MAIN
                        </Link>
                        
                        <Link to="/category/register" className="text-white hover:bg-indigo-500 px-3 py-2 rounded transition-colors duration-200">
                            학습 카테고리
                        </Link>
                        
                        {!isLoading ? (
                            loginInfo ? (
                                <div className="flex items-center gap-3">
                                    <span className="text-white">
                                        {loginInfo.nickname} 님 안녕하세요
                                    </span>
                                    <button className="bg-white text-indigo-600 hover:bg-gray-100 px-3 py-2 rounded transition-colors duration-200">
                                        로그아웃
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Link to="/auth/login" className="text-white hover:bg-indigo-500 px-3 py-2 rounded transition-colors duration-200">
                                        로그인
                                    </Link>
                                    <Link to="/auth/signup" className="bg-white text-indigo-600 hover:bg-gray-100 px-3 py-2 rounded transition-colors duration-200">
                                        회원가입
                                    </Link>
                                </>
                            )
                        ) : (
                            <span className="text-white">로딩 중...</span>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;