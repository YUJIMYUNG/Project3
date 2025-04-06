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

import java.util.ArrayList;
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
    public boolean registerCategory(CategoryDto registerCategory){
        // 1. 사용자로부터 전달받은 categorydto를 엔티티로 변환
        CategoryEntity categoryEntity = registerCategory.toEntity();

        // 2. 로그인(인증)된 사용자의 엔티티 가져오기
        UserEntity currentUser = userService.getCurrentUser();

        // 3. 로그인 상태가 아니면 카테고리 등록 실패
        if(currentUser == null) {
            return false;
        }// if end

        // 4. 해당 사용자의 카테고리 중 동일한 이름, 색상의 카테고리가 있는지 확인
        if(categoryRepository.existsByNameAndUserEntity(categoryEntity.getName(), currentUser) &&
                categoryRepository.existsByColorAndUserEntity(categoryEntity.getColor(), currentUser)){
            System.out.println("카테고리 이름,색상 중복 확인");
            return false;
        }

        // 5. 로그인된 상태이면 회원 이메일 조회
        String loginUser = currentUser.getEmail();

        // 6. 로그인된 회원 엔티티를 카테고리 엔티티에 대입
        UserEntity loginEntity = userRepository.findByEmail(loginUser);
        categoryEntity.setUserEntity(loginEntity);

        // 7. 엔티티 저장
        CategoryEntity savedCategory = categoryRepository.save(categoryEntity);

        // 8. 카티고리 등록 여부에 따라 결과 반환
       if(savedCategory.getCindex() > 0 ) {
           return true;
       } else {
           return false;
       } // if-else end
    } // registerCategory end

    // 2. 카테고리 목록 전체 조회
    public List<CategoryDto> findAllCategory() {
        // 1. 로그인 된 유저 정보 가져오기
        UserEntity currentUser = userService.getCurrentUser();

        // 2. 로그인한 유저의 카테고리 조회 리스트
        List<CategoryEntity> categoryEntityList;
        categoryEntityList = categoryRepository.findByUserEntity(currentUser);

        // 3. 조회된 회원의 카테고리 엔티티를 dto로 변환
        List<CategoryDto> categoryDtoList = new ArrayList<>();
        categoryEntityList.forEach( entity -> {
            CategoryDto categoryDto = entity.toDto();
            categoryDtoList.add(categoryDto);
                });

        return categoryDtoList;

    }


}
