package web.controller;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.model.dto.RecordDto;
import web.model.dto.RecordResponseDto;
import web.service.RecordService;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@Slf4j
@RequestMapping("/record")
public class RecordController {
    @Autowired private RecordService recordService;

    // 1. 학습기록 등록
    @PostMapping("/register.do")
    public ResponseEntity<?> registerRecord(@Valid @RequestBody RecordDto registerRecordDto){
        try{
            log.info(registerRecordDto.toString());
            boolean result = recordService.registerRecord(registerRecordDto);
            if(result) {
                return ResponseEntity.status(HttpStatus.CREATED).body(result);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Record Register status bad");
            }
        } catch (Exception e) {
            log.error("\"Record Register error: ", e); // 상세 로그 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Record Register status error");
        } // try-catch end
    }

    // 2. 모든 학습 기록 조회
    @GetMapping("/findAll.do")
    public ResponseEntity<?> getRecordList() {
        try{
            List<RecordResponseDto> result = recordService.getRecordList();
            if(result != null) {
                return ResponseEntity.status(HttpStatus.CREATED).body(result);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(" Get Record List status bad");
            }// if -else end
        } catch (Exception e) {
            log.error("getRecordList error" , e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("getRecordList server error");
        } // try- catch end
    }

    // 3. 카테고리별 학습 기록 조회

    // 4. 날짜별 학습 기록 조회

    // 5. 특정 학습 기록 상세 조회

    // 6. 학습기록 수정

    // 7. 학습기록 삭제
}
