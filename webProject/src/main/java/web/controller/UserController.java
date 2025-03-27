package web.controller;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.model.dto.UserDto;
import web.service.UserService;

@RestController
@RequestMapping("/auth")
@Slf4j
public class UserController {
    @Autowired
    private UserService userService;

    // 1. 회원가입
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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("signup status error");
        } // try-catch end
    }



}
