import { useEffect, useState } from 'react'
import Index from './components/record/Index';

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState(null)  // data 상태 추가

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
    <>
      <h3>자바통신확인</h3>
      {data && <p>서버 응답: {JSON.stringify(data)}</p>}
      <button onClick={fetchDataFromJava}>데이터 다시 가져오기</button>
      <Index />
      
    </>
  )
}

export default App
