package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import web.service.CategoryService;

@RestController
@RequestMapping("/category")
@CrossOrigin("http://localhost:5173")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;
}
