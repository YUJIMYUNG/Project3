package web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.model.entity.RecordEntity;
import web.model.entity.UserEntity;

import java.util.List;

public interface RecordRepository extends JpaRepository<RecordEntity, Integer> {
    // 1. 특정 유저의 학습기록 목록 조회
    List<RecordEntity> findByUserEntity(UserEntity userEntity);
}
