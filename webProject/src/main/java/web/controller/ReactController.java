package web.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:5173") // 서로 다른 서버간(도메인) 간의 교차 통신 허용
public class ReactController {
    @GetMapping("/react")
    public Map<String, Object> getReactData() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "자바 백엔드에서 보낸 데이터입니다");
        return response;
    }
}