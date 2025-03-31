package web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.model.entity.CategoryEntity;
import web.model.entity.UserEntity;

import java.util.List;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Integer> {
    // 1. 특정 회원 엔티티의 카테고리 목록 조회
    List<CategoryEntity> findByUserEntity(UserEntity userEntity);
}
