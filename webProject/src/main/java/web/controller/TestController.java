package web.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:5173") // 서로 다른 서버간(도메인) 간의 교차 통신 허용
public class TestController {
    @GetMapping("/react")
    public String react() {
        System.out.println("리액트가 요청 해왔다.");
        return "안녕리액트!";
    }
}