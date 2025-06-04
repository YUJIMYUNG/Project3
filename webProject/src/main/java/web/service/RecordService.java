package web.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import web.model.dto.RecordDto;
import web.model.dto.RecordResponseDto;
import web.model.dto.UserDto;
import web.model.entity.CategoryEntity;
import web.model.entity.RecordEntity;
import web.model.entity.UserEntity;
import web.repository.CategoryRepository;
import web.repository.RecordRepository;
import web.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class RecordService {
    @Autowired
    private RecordRepository recordRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    // 1. 학습기록 등록
    @Transactional
    public boolean registerRecord(RecordDto registerRecordDto) {
        System.out.println("DTO의 content 값: " + registerRecordDto.getContent());
        // 1. 사용자로부터 전달받은 dto를 엔티티로 변환
        RecordEntity recordEntity = registerRecordDto.toEntity();

        // 2-1. 로그인(인증)된 사용자의 엔티티 가져오기
        UserEntity loginUser = userService.getCurrentUser();
        UserEntity userEntity = userRepository.findByEmail(loginUser.getEmail());

        // 2-2. 로그인 상태가 아니면 등록 실패
        if(userEntity == null) {
            return false;
        }// if end

        System.out.println("register Record에서 로그인한 유저 정보" + loginUser.getEmail());

        // 2-3. 로그인된 사용자를 작성자로 대입
        recordEntity.setUserEntity(userEntity);

        // 3. 작성할 학습기록의 카테고리를 조회하고 가져옴
        CategoryEntity categoryEntity = categoryRepository.findById(registerRecordDto.getCindex()).get();
        recordEntity.setCategoryEntity(categoryEntity);

        System.out.println("저장할 학습 카테고리 번호 조회" + registerRecordDto.getCindex());

        // 4. 엔티티 저장
        RecordEntity saveRecordEntity = recordRepository.save(recordEntity);

        if(saveRecordEntity.getRindex() > 0) {
            return true;
        } else {
            return false;
        } // if-else end
    } // registerRecord end

    // 2. 모든 학습 기록 조회
    public List<RecordResponseDto> getRecordList() {
        // 1. 로그인 유저 정보 가져오기
        UserEntity loginUser = userService.getCurrentUser();
        UserEntity userEntity = userRepository.findByEmail(loginUser.getEmail());

        // 2. 가져온 유저의 학습기록을 조회
        List<RecordEntity> recordEntityList = recordRepository.findByUserEntity(userEntity);

        // 3. 조회된 회원의 학습기록 엔티티를 Dto로 변환
        List<RecordResponseDto> recordDtoList = new ArrayList<>();
        recordEntityList.forEach( entity -> {
            RecordResponseDto recordDto = entity.toResponseDto();
            recordDtoList.add(recordDto);
        });
        return recordDtoList;
    }

    // 3. 카테고리별 학습 기록 조회

    // 4. 날짜별 학습 기록 조회

    // 5. 특정 학습 기록 상세 조회

    // 6. 학습기록 수정

    // 7. 학습기록 삭제
}

