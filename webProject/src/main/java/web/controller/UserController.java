package web.controller;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.model.dto.AuthDto;
import web.model.dto.UserDto;
import web.service.UserService;

@RestController
@RequestMapping("/auth")
@Slf4j
@CrossOrigin("http://localhost:5173")
public class UserController {
    @Autowired
    private UserService userService;

    // 1. (Oauth2 X) 일반 회원가입
    @PostMapping("/signup.do")
    public ResponseEntity<?> signup(@Valid @RequestBody UserDto userDto){
        try{
            log.info(userDto.toString());
            boolean result = userService.signup(userDto);
            if(result) {
                return ResponseEntity.status(HttpStatus.CREATED).body(result);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("signup status bad");
            }
        } catch (Exception e) {
            log.error("Signup error: ", e); // 상세 로그 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("signup status error");
        } // try-catch end
    }

    // 2. 로그인은 SecurityConfig에서 설정

    // 3. 로그인 정보 가져오기
    @GetMapping("/info/get.do")
    public ResponseEntity<?> getLoginInfo (){
        try{
            UserDto result = userService.getLoginInfo();
            if(result != null) {
                return ResponseEntity.status(HttpStatus.CREATED).body(result);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("GetLoginInfo status bad");
            } // if-else end
        } catch (Exception e) {
            log.error("GetLoginInfo  Error : ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("GetLoginInfo Server Error");
        } // try-catch end
    }



    // 4. 이메일 중복검사
    @GetMapping("/checkedemail.do")
    public ResponseEntity<?> checkedEmail (@RequestParam String email) {
        try{
            log.info(email);
            boolean result = userService.checkedEmail(email);
            if(result) {
                return ResponseEntity.status(HttpStatus.CREATED).body(result);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("chekedEmail status bad");
            } // if-else end
        } catch (Exception e) {
            log.error("Checked Email Error : ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Cheked Email Server Error");
        } // try-catch end
    }// chekedEmail end

    // 5. 닉네임 중복검사
    @GetMapping("/checkednickname.do")
    public ResponseEntity<?> checkedNickname (@RequestParam String nickname) {
        try{
            log.info(nickname);
            boolean result = userService.checkedNickname(nickname);
            if(result) {
                return ResponseEntity.status(HttpStatus.CREATED).body(result);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("checkedNickname status bad");
            } // if-else end
        } catch (Exception e) {
            log.error("Checked Nickname Error : ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Checked Nickname Server Error");
        } // try-catch end
    }// chekedEmail end






}
