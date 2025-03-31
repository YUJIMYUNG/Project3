package web.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.model.dto.CategoryDto;
import web.model.dto.UserDto;
import web.model.entity.CategoryEntity;
import web.model.entity.UserEntity;
import web.repository.CategoryRepository;
import web.repository.UserRepository;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    // 1. 카테고리 등록
    @Transactional
    public boolean registCategory(CategoryDto registCategory){

        // 1. 로그인(인증)된 사용자의 엔티티 가져오기
        UserEntity currentUser = userService.getCurrentUser();

        // 2. 로그인 상태가 아니면 카테고리 등록 실패
        if(currentUser == null) {
            return false;
        }// if end

        // 3. categoryDto를 엔티티로 변환
        CategoryEntity categoryEntity = registCategory.toEntity();

        // 4. 카테고리 소유자를 현재 로그인 사용자로 설정
        categoryEntity.setCurrentEmail(currentUser);

        // 5. 엔티티 저장
        CategoryEntity savedCategory = categoryRepository.save(categoryEntity);

        // 5. 카티고리 등록 여부에 따라 결과 반환
        return savedCategory.getCindex() != null && savedCategory.getCindex() > 0;

    }

    // 2. 카테고리 목록 전체 조회
    public List<CategoryDto> findAllCategory() {

    }


}
