import React, { useState } from 'react';
import api from '../api/axios';

const Signup = (props) => {

    // 1. useState 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');
    
    // 2. 이메일 수정함수
    const onChangeEmail = (e) => {setEmail(e.target.value);}

    // 3. 전송 함수
    const onSignup = (e) => {
        console.log(email);
        console.log(password);
        console.log(nickname);

        let info = {
            email : email,
            password : password,
            nickname : nickname
        }

        api.post("/auth/signup.do", info)
            .then(response => {console.log(response)
                if(response.date) {
                    alert('회원가입 성공')
                    window.location.href = "/auth/login";
                } else {
                    alert('회원가입 실패')
                } // if-else end
            })
            .catch(error => {console.log(error);})

    }

    // 4. 이메일 중복검사 함수
    const checkEmailDuplication = (e) => {
        // 폼이 제출되어 페이지가 새로고침 죄는것을 방지
        e.preventDefault();
        
        // 이메일이 작성되어있지 않으면 에러메세지 출력
        if(!email) {
            document.getElementById('emailErrorMessage').innerText = '이메일을 입력해주세요.';
        }

        api.get(`/auth/checkedemail.do?email=${email}`)
            .then(response => {console.log(response)
                if(response.data) {
                    document.getElementById('emailErrorMessage').innerText = '사용 가능한 이메일입니다.';
                } else {
                    document.getElementById('emailErrorMessage').innerText = '이미 사용중인 이메일입니다.';
                }
            })
            .catch(error => {
                console.log(error);
                document.getElementById('emailErrorMessage').innerText = '이메일 중복확인 중 에러가 발생했습니다.';
                
            })
    }

    // 5. 닉네임 중복검사 함수
    const checkNicknameDuplication = (e) => {
        // 폼이 제출되어 페이지가 새로고침 되는것을 방지
        e.preventDefault();
        
        // 닉네임이 작성되어있지 않으면 에러메세지 출력
        if(!nickname) {
            document.getElementById('nicknameErrorMessage').innerText = '닉네임을 입력해주세요.';
        }

        api.get(`/auth/checkednickname.do?nickname=${nickname}`)
            .then(response => {console.log(response)
                if(response.data) {
                    document.getElementById('nicknameErrorMessage').innerText = '사용 가능한 닉네임입니다.';
                } else {
                    document.getElementById('nicknameErrorMessage').innerText = '이미 사용중인 닉네임입니다.';
                }
            })
            .catch(error => {
                console.log(error);
                document.getElementById('nicknameErrorMessage').innerText = '닉네임 중복확인 중 에러가 발생했습니다.';
                
            })
    }

    return (
        <div>
            <form>
                <div>
                    이메일 : <input type="text" value={email} onChange={onChangeEmail} /> <br />
                    <button type='button' onClick={checkEmailDuplication}>중복검사</button>
                    <p id="emailErrorMessage"></p>
                    
                    <button>인증번호 발송하기</button>
                </div>
                
                <div>
                    비밀번호 : <input type="password" value={password} onChange={ (e) => setPassword(e.target.value)} /> <br />
                    {/* 비밀번호 확인 : <input type="password" value={confirmPassword} onChange={ (e) => setConfirmPassword(e.target.value)} /> <br /> */}
                </div>
                
                <div>
                    닉네임 : <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} /> <br />
                    <button type='button' onClick={checkNicknameDuplication}>중복검사</button>
                    <p id="nicknameErrorMessage"></p>
                </div>

                <div>
                    <button type="button" onClick={onSignup}>회원가입</button>
                </div>

            </form>
        </div>
    );
};

export default Signup;
