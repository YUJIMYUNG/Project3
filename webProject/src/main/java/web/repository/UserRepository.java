package web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import web.model.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    // 1. 아이디로 엔티티 조회
    UserEntity findByEmail(String email);
}
