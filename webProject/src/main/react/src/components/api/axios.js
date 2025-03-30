import axios from "axios";

// axios 인스턴스 생성
const api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000, // 요청 타임아웃 설정
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // 응답 인터셉터 추가 (필요한 경우)
api.interceptors.response.use(
    response => {
      // 응답 데이터 가공
      return response;
    },
    error => {
      // 오류 응답 처리
      // 예: 401 오류 시 로그인 페이지로 리다이렉트
      if (error.response && error.response.status === 401) {
        // 인증 오류 처리
      }
      return Promise.reject(error);
    }
  );
  
  export default api;