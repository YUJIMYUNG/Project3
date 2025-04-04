import React, { useState } from 'react';
import api from '../api/axios';
import FormField from '../../molecules/FormField';
import Button from '../atoms/Button';

const Login = (props) => {

    // 1. useStste
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // 2. 전송 합수
    const onLogin = (e) => {
        console.log(email);
        console.log(password);

        let data = {
            email : email,
            password : password
        }

        api.post("/auth/login.do", info)
            .then(response => {console.log(response)
                if(response.data){
                    alert('로그인 성공')
                    window.location.href = '/';
                } else {
                    alert('로그인 실패')
                } // if-else end
            })
            .catch(error => {console.log(error);})
    }

    return (
        <div className='login-container'>
            <form className='login-form'>
                <FormField  label="이메일" type="text" value={email} onChange={(e) => setEmail(e.target.value)} id="email" />
                <FormField  label="비밀번호" type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" />
                
                <Button onClick={onLogin} className="login-buttin">로그인</Button>

                <div className='social-login'>
                    <p>소셜 로그인</p>
                    <Button className="naver-button">네이버 로그인</Button>
                    <Button className="kakao-button">카카오 로그인</Button>
                </div>
            </form>
        </div>
    );
};

export default Login;