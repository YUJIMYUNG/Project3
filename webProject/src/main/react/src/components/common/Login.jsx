import axios from 'axios';
import React, { useState } from 'react';

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

        axios.post("/auth/login.do", info)
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
        <div>
            <form>
                <div>
                    이메일 : <input type="text" value={email} />
                </div>
                <div>
                    비밀번호 : <input type="password" value={password} />
                </div>

                <div>
                    <button type="button" onClick={onLogin}>로그인</button>
                </div>

                <div>
                    <p>소셜 로그인</p>
                    <button type='button'>네이버 로그인</button>
                    <button type='button'>카카오 로그인</button>
                </div>
            </form>
        </div>
    );
};

export default Login;