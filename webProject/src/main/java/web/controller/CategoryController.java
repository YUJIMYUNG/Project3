package web.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import web.model.dto.CategoryDto;
import web.service.CategoryService;

import java.util.List;

@RestController
@RequestMapping("/category")
@CrossOrigin("http://localhost:5173")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/register.do")
    public ResponseEntity<?> registerCategory(@Valid  @RequestBody CategoryDto registerCategory) {
        try{
            boolean result = categoryService.registerCategory(registerCategory);
            if(result) {
                return ResponseEntity.status(HttpStatus.CREATED).body(result);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Regist Category Status Bad");
            }// if- else
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Regist Category Status Error");
        } // try-catch end
    } // registCategory end


    // 카테고리 목록 전체 조회
    @GetMapping("/findAll.do")
    public ResponseEntity<?> findAllCategory() {
        try{
            List<CategoryDto> result = categoryService.findAllCategory();
            if(result == null) {// category 리스트가 없고
                // 로그인 정보도 없으면
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Find All Category : Please Login");
            } else if(result.isEmpty()) { // 로그인 했지만 리스트가 비어있으면
                return ResponseEntity.status(HttpStatus.OK).body("Category List is null");
            } else {
                return ResponseEntity.status(HttpStatus.OK).body(result);
            } // if- else
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Find All Category Status Error");
        } // try-catch end
    } // findAllCategory end

}
