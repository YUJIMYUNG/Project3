import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from '../auth/Signup';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Main from '../common/Main';
import RegisterCategory from '../category/RegisterCategory';
import Login from '../auth/Login';




// 컨텍스트 만들기

export const LoginInfoContext = React.createContext('');


export default function Index(props){

    // loginInfo 상태 추가
    const [loginInfo, setLoginInfo] = useState(null);


    return (
        <>
            <LoginInfoContext.Provider value={{loginInfo, setLoginInfo}}>
                <BrowserRouter>
                    <div id="wrap">
                        <Header />

                        <Routes>
                            <Route path="/" element = { <Main />} />
                            <Route path="/auth/signup" element = { <Signup />} />
                            <Route path="/auth/login" element = { <Login />} />
                            <Route path="/category/register" element = { <RegisterCategory />} />
                        </Routes>

                        <Footer />
                    </div>
                </BrowserRouter>
            </LoginInfoContext.Provider>


        </>
    );
};
