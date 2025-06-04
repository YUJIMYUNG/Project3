import React, { useState } from 'react';
import FormField from '../../../molecules/FormField';
import Button from '../../atoms/Button';
import api from '../../../api/axios';


const Login = (props) => {

    // 1. useStste
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // 2. 유효성 검사
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!email) {
            setEmailError('이메일을 입력해주세요.');
            return false;
        } else if(!emailRegex.test(email)){
            setEmailError('유효한 이메일 형식이 아닙니다.');
            return false;
        }
        setEmailError('');
        return true;
    }

    const validatePassword = (password) => {

        if(!password) {
            setPasswordError('비밀번호를 입력해주세요.');
            return false;
        }
        setPasswordError('');
        return true;
    }


    // 3. 전송 합수
    const onLogin = (e) => {
        console.log(email);
        console.log(password);

        e.preventDefault(); //폼 제출 기본 동작 방지

        // 1.유효성 검사
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        if(!isEmailValid || !isPasswordValid) {
            return;
        }

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        let info = {
            email : email,
            password : password
        }

        api.post("/auth/login.do", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {console.log(response)
                if(response.data){
                    alert('로그인 성공')
                    window.location.href = '/';
                } else {
                    alert('로그인 실패')
                } // if-else end
            })
            .catch(error => {
                console.log(error);
                alert('로그인 중 오류 발생!')
            })
    }

    return (
        <div className="container flex justify-center items-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">로그인</h2>
                </div>

                <form onSubmit={onLogin} className="mt-8 space-y-6">
                    {/* 이메일 입력 필드 */}
                    <div>
                        <FormField 
                            label="이메일"
                            type="text"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                validateEmail(e.target.value);
                            }}
                            id="email"
                            placeholder="이메일을 입력하세요"
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        />
                        {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                    </div>

                    {/* 비밀번호 입력 필드 */}
                    <div>
                        <FormField 
                            label="비밀번호"
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                validatePassword(e.target.value);
                            }}
                            id="password"
                            placeholder="비밀번호를 입력하세요"
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        />
                        {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                    </div>

                    {/* 로그인 버튼 */}
                    <Button 
                        type="submit"
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        로그인
                    </Button>

                    {/* 소셜 로그인 */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-4">소셜 로그인</p>
                        <div className="space-y-3">
                            <Button 
                                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md flex items-center justify-center"
                            >
                                네이버 로그인
                            </Button>
                            <Button 
                                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 rounded-md flex items-center justify-center"
                            >
                                카카오 로그인
                            </Button>
                        </div>
                    </div>
                </form>

                {/* 회원가입 링크 */}
                <p className="mt-2 text-center text-sm text-gray-600">
                    아직 계정이 없으신가요?{' '}
                    <a href="/auth/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                        회원가입
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;