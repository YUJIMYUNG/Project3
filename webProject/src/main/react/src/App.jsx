import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import Main from './components/common/Main';
import RegisterCategory from './components/pages/category/RegisterCategory';
import RecordPage from './components/pages/record/RecordPage';
import Login from './components/pages/auth/Login';
import Signup from './components/pages/auth/Signup';


// 컨텍스트 만들기

export const LoginInfoContext = React.createContext('');


function App() {
  const [data, setData] = useState(null)  // data 상태 (백앤드 통신)
  const [loginInfo, setLoginInfo] = useState(null); // logininfo 상태

  // back(자바)와 통신하는 함수
 const fetchDataFromJava = async () => {
  try {
    const response = await fetch('http://localhost:8080/react');
    const result = await response.json(); // 응답을 JSON으로 파싱
    console.log(result); // { message: "자바 백엔드에서 보낸 데이터입니다" }
    setData(result);
  } catch (error) {
    console.error('자바 서버와 통신 중 오류 발생:', error);
  }
}

  // 컴포넌트가 마운트될 때 자바 서버에서 데이터 가져오기
  useEffect(() => {
    fetchDataFromJava();
  }, []);

  return (
    <LoginInfoContext.Provider value={{loginInfo, setLoginInfo}}>
      <div className="container">

        <Header />

        <Routes>
          {/* <h3>자바통신확인</h3>
          {data && <p>서버 응답: {JSON.stringify(data)}</p>}
          <button onClick={fetchDataFromJava}>데이터 다시 가져오기</button> */}
            <Route path="/" element={ <Main />}/>
            <Route path="/auth/login" element={ <Login />}/>
            <Route path="/auth/signup" element={ <Signup />}/>
            <Route path="/category/register" element = { <RegisterCategory />} />
            <Route path="/record" element = { <RecordPage />} />
        </Routes>

        <Footer />
      </div>

    </LoginInfoContext.Provider>
    
  )
}

export default App
