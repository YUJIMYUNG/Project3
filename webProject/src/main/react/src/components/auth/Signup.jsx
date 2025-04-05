import React, { useState } from 'react';
import DuplicationCheckField from '../../molecules/DuplicationCheckField';
import FormField from '../../molecules/FormField';
import Button from '../atoms/Button';
import api from '../../api/axios';

const Signup = (props) => {

    // 1. useState 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');

    const [isEmailValid, setIsEmailValid] = useState(false); // 이메일 유효성 상태 
    const [isPasswordValid, setIsPasswordValid] = useState(false); // 비밀번호 유효성 상태 
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false); // 비밀번호 확인란 유효성 상태 
    const [isNicknameValid, setIsNicknameValid] = useState(false); // 닉네임 유효성 상태 

    const [emailError, setEmailError] = useState(''); //이메일 에러 상태
    const [passwordError, setPasswordError] = useState(''); //비밀번호 에러 상태
    const [confirmPasswordError, setConfirmPasswordError] = useState(''); //비밀번호 확인 에러 상태
    const [nicknameError, setNicknameError] = useState('') // 닉네임 에러 상태
    
    // 2. 입력되는 정보 수정 및 유효성 검사 함수
    const onChangeEmail = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        // 이메일 형식 유효성 검사
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!newEmail) { // 이메일 입력칸이 비어있을 경우
            setEmailError('이메일을 입력해주세요.');
            setIsEmailValid(false);
        } else if(!emailRegex.test(newEmail)) { // 유효성 검증 안된 경우
            setEmailError('이메일 형식에 맞게 작성해주세요.');
            setIsEmailValid(false);
        } else {
            setEmailError('');
            // 이메일 중복검사 후 setIsEmailValid true 처리
        }

    }

    const onChangePassword = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        // 비밀번호 정규식 검사
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!newPassword) { // 비밀번호 입력칸이 비어있을 경우
            setPasswordError('비밀번호를 입력해주세요');
            setIsPasswordValid(false);
        } else if( !passwordRegex.test(newPassword)) { //비밀번호 유효성 검증 안된 경우
            setPasswordError('비밀번호는 8자 이상, 문자, 숫자, 특수문자(@$!%*?&)를 포함해야 합니다.');
            setIsPasswordValid(false);
        } else {
            setPasswordError('');
            setIsPasswordValid(true);
        }

        // 비밀번호 변경되면 비밀번호 확인도 재검증 해야함
        if (confirmPassword) {
            if(confirmPassword !==  newPassword) {
                setConfirmPasswordError('비밀번호가 일치하지 않습니다.')
                setIsConfirmPasswordValid(false);
            } else {
                setConfirmPasswordError('');
                setIsConfirmPasswordValid(true);
            }
        }
    }

    const onChangeComfirmPassword = (e) =>{
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);

        if(!newConfirmPassword) { // 비밀번호 확인란이 비어있을 경우
            setConfirmPasswordError('비밀번호 확인을 입력해주세요');
            setIsConfirmPasswordValid(false);
        } else if(newConfirmPassword !== password) { // 입력한 비밀번호와 일치하지 않은 경우
            setConfirmPasswordError('비밀번호가 일치하지 않습니다.')
            setIsConfirmPasswordValid(false);
        } else {
            setConfirmPasswordError('');
            setIsConfirmPasswordValid(true);
        }
    }


    const onChangeNickname = (e) => {
        const newNickname = e.target.value;
        setNickname(newNickname);

        if(!newNickname) { // 닉네임 입력칸이 비어있을 경우
            setNicknameError('닉네임을 입력해주세요.');
            setIsNicknameValid(false);
        } else if(newNickname.length < 2 || newNickname.length > 10){ // 닉네임 유효성 검증 안된 경우
            setNicknameError('닉네임은 2~10자 사이어야 합니다.');
            setIsNicknameValid(false);
        } else {
            setNicknameError('');
            // 닉네임 중복검사 후 setIsNicknameValid true 처리
        }
        
    }

    // 3. 전송 함수
    const onSignup = (e) => {
        console.log(email);
        console.log(password);
        console.log(nickname);

        // 1. 입력값 검증, 유효성검사
        if(!isEmailValid || !isPasswordValid || !isNicknameValid || !isConfirmPasswordValid) {
            alert('모든 필드를 올바르게 입력해주세요');
            return;
        }

        let info = {
            email : email,
            password : password,
            nickname : nickname
        }

        api.post("/auth/signup.do", info)
            .then(response => {console.log(response)
                if(response.data) {
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
        // 폼이 제출되어 페이지가 새로고침 되는것을 방지
        e.preventDefault();
        
        if(!email) {
            setEmailError('이메일을 입력해주세요');
            return;
        }
        
        // 기본 이메일 유효성 검사
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('유효한 이메일 형식이 아닙니다');
            return;
        }
        
        // fetch
        api.get(`/auth/checkedemail.do?email=${email}`)
            .then(response => {console.log(response)
                if(response.data) {
                    setEmailError('사용 가능한 이메일입니다.');
                    setIsEmailValid(true);
                } else {
                    setEmailError('이미 사용중인 이메일입니다.');
                    setIsEmailValid(false);
                }
            })
            .catch(error => {
                console.log(error);
                setEmailError('이메일 중복확인 중 에러 발생');
                setIsEmailValid(false);
            }); 
    }

    // 5. 닉네임 중복검사 함수
    const checkNicknameDuplication = (e) => {
        // 폼이 제출되어 페이지가 새로고침 되는것을 방지
        e.preventDefault();
        
        // 닉네임이 작성되어있지 않으면 에러메세지 출력
        if(!nickname) {
            setNicknameError('닉네임을 입력해주세요');
            return;
        }
        
        // 기본 닉네임 유효성 검사
        if (nickname.length < 2 || nickname.length > 10) {
            setNicknameError('닉네임은 2~10자 사이여야 합니다');
            return;
        }

        api.get(`/auth/checkednickname.do?nickname=${nickname}`)
            .then(response => {console.log(response)
                if(response.data) {
                    setNicknameError('사용 가능한 닉네임입니다.');
                    setIsNicknameValid(true);
                } else {
                    setNicknameError('이미 사용중인 닉네입니다.');
                    setIsNicknameValid(false);
                }
            })
            .catch(error => {
                console.log(error);
                setNicknameError('닉네임 중복확인 중 에러 발생');
                setIsNicknameValid(false);
                
            })
    }

    return (
        <div  className="container flex justify-center items-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div  className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">회원가입</h2>
                </div>
            

                <form onSubmit={onSignup} className="mt-8 space-y-6">
                    {/* 이메일 작성 필드 */}
                    <DuplicationCheckField 
                        label="이메일"
                        value={email}
                        onChange={onChangeEmail}
                        onCheck={checkEmailDuplication}
                        errorMessage={emailError}
                        type="text"
                        placeholder="이메일을 입력하세요"
                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />

                    <Button 
                        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            인증번호 발송하기</Button>

                    {/* 비밀번호 작성 필드 */}
                    <FormField 
                        label="비밀번호"
                        type="password"
                        value={password}
                        onChange={onChangePassword}
                        id="password"
                        placeholder="비밀번호를 입력하세요"
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />

                    {/* 비밀번호 확인 필드 */}
                    <FormField 
                        label="비밀번호 확인"
                        type="password"
                        value={confirmPassword}
                        onChange={onChangeComfirmPassword}
                        id="confirmPassword"
                        placeholder="비밀번호를 한번 더 입력하세요"
                        errorMessage={confirmPasswordError}
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />

                    {/* 닉네임 작성 필드 */}
                    <DuplicationCheckField
                        label="닉네임"
                        value={nickname}
                        onChange={onChangeNickname}
                        onCheck={checkNicknameDuplication}
                        errorMessage={nicknameError}
                        type="text"
                        placeholder="닉네임을 입력하세요"
                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />

                    <Button 
                        type={submit}
                        className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${!isEmailValid || !isPasswordValid || !isConfirmPasswordValid || !isNicknameValid 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`}
                        disabled = {!isEmailValid || !isPasswordValid || !isConfirmPasswordValid || !isNicknameValid}
                        >
                            회원가입</Button>
                

                </form>

                <p className="mt-2 text-sm text-gray-600"> 이미 계정이 있으신가요?
                    <a href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">로그인</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
